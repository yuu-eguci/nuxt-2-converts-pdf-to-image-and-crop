// 起動中のアプリ (APP_URL, 既定 http://localhost:3000) を実ブラウザで操作し、
// PDF の画像化と切り抜きをシナリオごとに確認します。
// ブラウザは CHROME_PATH で指定します。引数にシナリオ名の一部を渡すと、それだけを実行します。
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import puppeteer from 'puppeteer-core'

const RED = [255, 0, 0, 255]
const GREEN = [0, 255, 0, 255]
const BLUE = [0, 0, 255, 255]
const WHITE = [255, 255, 255, 255]
const A4 = { width: 595, height: 842 }

/**
 * 単色で塗りつぶしたページを並べた PDF を生成します。
 * @param {{ width: number, height: number, color: number[] }[]} pages
 */
function buildPdf (pages) {
  const objs = ['<< /Type /Catalog /Pages 2 0 R >>', null]
  const kids = []
  for (const { width, height, color } of pages) {
    const id = objs.length + 1
    const rgb = color.slice(0, 3).map(v => v / 255).join(' ')
    const content = `${rgb} rg 0 0 ${width} ${height} re f`
    kids.push(`${id} 0 R`)
    objs.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Contents ${id + 1} 0 R >>`)
    objs.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`)
  }
  objs[1] = `<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${pages.length} >>`
  let out = '%PDF-1.4\n'
  const offsets = objs.map((obj, i) => {
    const offset = out.length
    out += `${i + 1} 0 obj\n${obj}\nendobj\n`
    return offset
  })
  const xref = out.length
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`
  out += offsets.map(o => `${String(o).padStart(10, '0')} 00000 n \n`).join('')
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`
  return out
}

const dir = mkdtempSync(join(tmpdir(), 'smoke-'))
const fixtures = {
  'two-pages.pdf': buildPdf([{ width: 200, height: 100, color: RED }, { width: 200, height: 100, color: BLUE }]),
  'mixed-widths.pdf': buildPdf([{ width: 100, height: 100, color: RED }, { width: 400, height: 100, color: BLUE }]),
  'a4-100-pages.pdf': buildPdf(Array.from({ length: 100 }, (_, i) => ({ ...A4, color: [RED, GREEN, BLUE][i % 3] }))),
  'broken.pdf': 'this is not a pdf\n',
  'note.txt': 'plain text\n',
  'broken.png': 'this is not a png\n'
}
for (const [name, body] of Object.entries(fixtures)) {
  writeFileSync(join(dir, name), body, 'latin1')
}
const fixture = name => join(dir, name)

class Ng extends Error {}
const expect = (ok, message) => { if (!ok) { throw new Ng(message) } }
const same = (a, b) => a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) <= 8)

async function upload (page, name) {
  const input = await page.$('input[type=file]')
  await input.uploadFile(fixture(name))
}

/** ドロップ領域へファイルをドラッグ&ドロップします。 */
async function drop (page, name, type) {
  const body = fixtures[name]
  await page.evaluate((name, body, type) => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([body], name, { type }))
    const area = document.querySelector('.drag-drop-area')
    area.dispatchEvent(new DragEvent('dragover', { dataTransfer, bubbles: true, cancelable: true }))
    area.dispatchEvent(new DragEvent('drop', { dataTransfer, bubbles: true, cancelable: true }))
  }, name, body, type)
}

/** ブラウザ内で単色の PNG を作り、ドロップ領域へドラッグ&ドロップします。 */
async function dropPng (page, color, width, height) {
  await page.evaluate(async (color, width, height) => {
    const canvas = new OffscreenCanvas(width, height)
    const context = canvas.getContext('2d')
    context.fillStyle = `rgba(${color.join(',')})`
    context.fillRect(0, 0, width, height)
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([await canvas.convertToBlob()], 'color.png', { type: 'image/png' }))
    document.querySelector('.drag-drop-area').dispatchEvent(new DragEvent('drop', { dataTransfer, bubbles: true, cancelable: true }))
  }, color, width, height)
}

/** 表示中の画像を待ち、サイズと縦方向の位置ごとの色を返します。 */
async function readImage (page, previousSrc = null) {
  await page.waitForFunction((previousSrc) => {
    const img = document.querySelector('img.uploaded-image')
    return img && img.src !== previousSrc && img.complete && img.naturalWidth > 0
  }, { timeout: 60000 }, previousSrc)
  return page.evaluate(() => {
    const img = document.querySelector('img.uploaded-image')
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const context = canvas.getContext('2d')
    context.drawImage(img, 0, 0)
    const at = (fx, fy) => Array.from(context.getImageData(
      Math.min(canvas.width - 1, Math.floor(canvas.width * fx)),
      Math.min(canvas.height - 1, Math.floor(canvas.height * fy)), 1, 1).data)
    return { src: img.src, width: img.naturalWidth, height: img.naturalHeight, at: [at(0.5, 0.25), at(0.5, 0.75)] }
  })
}

/** 画像左上からの座標で矩形をドラッグし、切り抜き結果を返します。 */
async function dragCrop (page, from, to) {
  const box = await (await page.$('canvas.overlay-canvas')).boundingBox()
  await page.mouse.move(box.x + from[0], box.y + from[1])
  await page.mouse.down()
  await page.mouse.move(box.x + to[0], box.y + to[1], { steps: 5 })
  await page.mouse.up()
  return readCrop(page)
}

async function readCrop (page) {
  await new Promise(resolve => setTimeout(resolve, 300))
  return page.evaluate(async () => {
    const img = document.querySelector('img.cropped-image')
    if (!img || !img.getAttribute('src')) { return null }
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const context = canvas.getContext('2d')
    context.drawImage(img, 0, 0)
    return { src: img.src, width: img.naturalWidth, height: img.naturalHeight, center: Array.from(context.getImageData(canvas.width >> 1, canvas.height >> 1, 1, 1).data) }
  })
}

const alertText = page => page.evaluate(() => {
  const alert = document.querySelector('[role=alert]')
  return alert ? alert.innerText : ''
})

const scenarios = {
  async 'pdf-two-pages' (page) {
    await upload(page, 'two-pages.pdf')
    const image = await readImage(page)
    expect(image.width === 500 && image.height === 500, `連結画像のサイズが 500x500 ではありません: ${image.width}x${image.height}`)
    expect(same(image.at[0], RED) && same(image.at[1], BLUE), `ページの順序か描画が不正です: ${JSON.stringify(image.at)}`)
    const crop = await dragCrop(page, [10, 10], [60, 40])
    expect(crop && crop.width === 50 && crop.height === 30 && same(crop.center, RED), `切り抜き結果が不正です: ${JSON.stringify(crop)}`)
  },

  async 'pdf-parsed-in-worker' (page) {
    const workers = []
    page.on('workercreated', worker => workers.push(worker.url()))
    await upload(page, 'two-pages.pdf')
    await readImage(page)
    expect(workers.some(url => url.includes('pdf.worker')), `PDF の解析が Web Worker で動いていません: ${JSON.stringify(workers)}`)
  },

  async 'mixed-widths-white-background' (page) {
    await upload(page, 'mixed-widths.pdf')
    const image = await readImage(page)
    // 1 ページ目 (幅の狭い赤) の右側は、透明ではなく白で埋まります。
    const right = await page.evaluate(() => {
      const img = document.querySelector('img.uploaded-image')
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const context = canvas.getContext('2d')
      context.drawImage(img, 0, 0)
      return Array.from(context.getImageData(Math.floor(canvas.width * 0.75), Math.floor(canvas.height * 0.25), 1, 1).data)
    })
    expect(image.width === 500 && image.height === 250, `連結画像のサイズが不正です: ${image.width}x${image.height}`)
    expect(same(image.at[1], BLUE) && same(right, WHITE), `幅の狭いページの横が白ではありません: ${JSON.stringify(right)}`)
  },

  async 'long-pdf-fits-canvas-limit' (page) {
    await upload(page, 'a4-100-pages.pdf')
    const image = await readImage(page)
    expect(image.height <= 32767, `ブラウザのキャンバス上限を超えています: ${image.width}x${image.height}`)
    expect(same(image.at[0], RED) || same(image.at[0], GREEN) || same(image.at[0], BLUE), `ページが描画されていません: ${JSON.stringify(image.at)}`)
    expect(await alertText(page) === '', 'エラーが表示されました')
  },

  async 'crop-any-direction' (page) {
    await upload(page, 'two-pages.pdf')
    await readImage(page)
    // 上半分が赤、下半分が青です。どの向きにドラッグしても同じ矩形になります。
    const drags = { downRight: [[10, 10], [60, 40]], upLeft: [[60, 40], [10, 10]], downLeft: [[60, 260], [10, 290]], upRight: [[10, 290], [60, 260]] }
    for (const [direction, [from, to]] of Object.entries(drags)) {
      const crop = await dragCrop(page, from, to)
      const color = from[1] < 250 ? RED : BLUE
      expect(crop && crop.width === 50 && crop.height === 30 && same(crop.center, color), `${direction} の切り抜き結果が不正です: ${JSON.stringify(crop)}`)
    }
  },

  async 'no-crop-before-selection' (page) {
    expect(await page.$('img.cropped-image') === null, '切り抜く前から切り抜き画像の枠が出ています')
  },

  async 'click-keeps-previous-crop' (page) {
    await upload(page, 'two-pages.pdf')
    await readImage(page)
    const crop = await dragCrop(page, [10, 10], [60, 40])
    const afterClick = await dragCrop(page, [100, 100], [100, 100])
    expect(afterClick && afterClick.src === crop.src, `クリックだけで切り抜き画像が変わりました: ${JSON.stringify(afterClick)}`)
  },

  async 'drag-past-edge-clamps' (page) {
    await upload(page, 'two-pages.pdf')
    await readImage(page)
    // 右端と上端の外までドラッグし、外でボタンを離します。
    const crop = await dragCrop(page, [450, 50], [600, -100])
    expect(crop && crop.width === 50 && crop.height === 50 && same(crop.center, RED), `画像の端までの切り抜きになっていません: ${JSON.stringify(crop)}`)
  },

  async 'new-upload-clears-crop' (page) {
    await upload(page, 'two-pages.pdf')
    const first = await readImage(page)
    await dragCrop(page, [10, 10], [60, 40])
    await drop(page, 'two-pages.pdf', 'application/pdf')
    await readImage(page, first.src)
    expect(await page.$('img.cropped-image') === null, '別のファイルを読んだあとも前の切り抜き画像が残っています')
  },

  async 'reselect-same-file' (page) {
    await upload(page, 'two-pages.pdf')
    const first = await readImage(page)
    await dragCrop(page, [10, 10], [60, 40])
    await upload(page, 'two-pages.pdf')
    await readImage(page, first.src)
  },

  async 'latest-upload-wins' (page) {
    // 時間のかかる PDF の読み込み中に、別の画像を読み込みます。
    await upload(page, 'a4-100-pages.pdf')
    await dropPng(page, GREEN, 100, 50)
    await new Promise(resolve => setTimeout(resolve, 5000))
    const images = await page.$$eval('img.uploaded-image', imgs => imgs.map(img => `${img.naturalWidth}x${img.naturalHeight}`))
    expect(images.length === 1 && images[0] === '500x250', `最後に読み込んだ画像だけが表示されていません: ${JSON.stringify(images)}`)
  },

  async 'previous-image-url-released' (page, errors) {
    await upload(page, 'two-pages.pdf')
    const first = await readImage(page)
    await dropPng(page, GREEN, 100, 50)
    await readImage(page, first.src)
    expect(errors.length === 0, `ブラウザでエラーが出ました: ${errors.join(' / ')}`)
    const stillReadable = await page.evaluate(src => fetch(src).then(() => true, () => false), first.src)
    expect(!stillReadable, '前の画像の Blob URL が解放されていません')
    // 解放済みの URL を読もうとしたことによるエラーは想定どおりなので除きます。
    errors.splice(0, errors.length, ...errors.filter(error => !error.includes('ERR_FILE_NOT_FOUND')))
  },

  async 'broken-pdf-shows-error' (page) {
    await upload(page, 'broken.pdf')
    await page.waitForSelector('[role=alert]', { timeout: 30000 })
    expect(/PDF/.test(await alertText(page)), 'PDF を読めない旨のメッセージがありません')
    // エラーのあとも続けて使えることを確認します。
    await upload(page, 'two-pages.pdf')
    const image = await readImage(page)
    expect(image.width === 500, '壊れた PDF のあとに正しい PDF を読めません')
    expect(await alertText(page) === '', '正しい PDF を読んだあともエラーが残っています')
  },

  async 'unsupported-drop-keeps-image' (page) {
    await upload(page, 'two-pages.pdf')
    const before = await readImage(page)
    await drop(page, 'note.txt', 'text/plain')
    await page.waitForSelector('[role=alert]', { timeout: 30000 })
    expect(/PDF|image/i.test(await alertText(page)), '対応していない形式である旨のメッセージがありません')
    const after = await page.$eval('img.uploaded-image', img => img.src)
    expect(after === before.src, '対応していないファイルで表示中の画像が消えました')
  },

  async 'broken-image-shows-error' (page) {
    await drop(page, 'broken.png', 'image/png')
    await page.waitForSelector('[role=alert]', { timeout: 30000 })
    expect(/image/i.test(await alertText(page)), '画像を読めない旨のメッセージがありません')
  }
}

if (!process.env.CHROME_PATH) {
  console.error('NG: CHROME_PATH を指定してください')
  process.exit(1)
}
const filter = process.argv[2] || ''
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true })
let failed = 0
for (const [name, run] of Object.entries(scenarios)) {
  if (!name.includes(filter)) { continue }
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', e => errors.push(String(e)))
  page.on('console', m => { if (m.type() === 'error') { errors.push(m.text()) } })
  await page.setViewport({ width: 1200, height: 900 })
  try {
    await page.goto(process.env.APP_URL || 'http://localhost:3000/', { waitUntil: 'load', timeout: 120000 })
    await page.waitForSelector('input[type=file]', { timeout: 120000 })
    await run(page, errors)
    expect(errors.length === 0, `ブラウザでエラーが出ました: ${errors.join(' / ')}`)
    console.log(`OK: ${name}`)
  } catch (e) {
    failed++
    console.error(`NG: ${name}: ${e instanceof Ng ? e.message : e}`)
  }
  await page.close()
}
await browser.close()
if (failed) { process.exit(1) }
console.log('OK')
