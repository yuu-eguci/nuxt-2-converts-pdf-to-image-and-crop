// 起動中のアプリ (APP_URL, 既定 http://localhost:3000) に 2 ページの PDF を読み込ませ、
// 連結画像 (上が赤、下が青) と矩形切り抜き (赤) を実ブラウザで確認します。
// ブラウザは CHROME_PATH で指定します。
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import puppeteer from 'puppeteer-core'

/** 1 ページ目が赤、 2 ページ目が青の 200x100 PDF を生成します。 */
function buildTwoPagePdf () {
  const objs = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R 5 0 R] /Count 2 >>']
  ;['1 0 0', '0 0 1'].forEach((color, i) => {
    const content = `${color} rg 0 0 200 100 re f`
    objs.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 100] /Contents ${4 + 2 * i} 0 R >>`)
    objs.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`)
  })
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

const fail = (message) => { console.error(`NG: ${message}`); process.exit(1) }
if (!process.env.CHROME_PATH) { fail('CHROME_PATH を指定してください') }
const pdfPath = join(mkdtempSync(join(tmpdir(), 'smoke-')), 'two-pages.pdf')
writeFileSync(pdfPath, buildTwoPagePdf(), 'latin1')
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true })
const page = await browser.newPage()
const errors = []
page.on('pageerror', e => errors.push(String(e)))
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
await page.setViewport({ width: 1200, height: 900 })
await page.goto(process.env.APP_URL || 'http://localhost:3000/', { waitUntil: 'load', timeout: 120000 })
const input = await page.waitForSelector('input[type=file]', { timeout: 120000 })
await input.uploadFile(pdfPath)
await page.waitForFunction(() => { const i = document.querySelector('img[src^="blob:"]'); return i && i.complete && i.naturalWidth > 0 }, { timeout: 60000 })
const info = await page.evaluate(() => {
  const img = document.querySelector('img[src^="blob:"]')
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight
  const x = c.getContext('2d'); x.drawImage(img, 0, 0)
  const px = (yy) => Array.from(x.getImageData(Math.floor(c.width / 2), Math.floor(yy), 1, 1).data)
  return { w: img.naturalWidth, h: img.naturalHeight, top: px(c.height * 0.25), bottom: px(c.height * 0.75) }
})
console.log('merged image', JSON.stringify(info))
const canvas = await page.$('canvas')
const box = await canvas.boundingBox()
await page.mouse.move(box.x + 10, box.y + 10)
await page.mouse.down()
await page.mouse.move(box.x + 60, box.y + 40, { steps: 5 })
await page.mouse.up()
const crop = await page.evaluate(async () => {
  const img = document.querySelector('img[alt="Cropped content"]')
  if (!img.src.startsWith('data:image/png')) return { src: img.src.slice(0, 30) }
  await img.decode()
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight
  const x = c.getContext('2d'); x.drawImage(img, 0, 0)
  return { w: img.naturalWidth, h: img.naturalHeight, center: Array.from(x.getImageData(c.width >> 1, c.height >> 1, 1, 1).data) }
})
console.log('cropped image', JSON.stringify(crop))
console.log('errors', JSON.stringify(errors))
await browser.close()

const same = (a, b) => a.every((v, i) => Math.abs(v - b[i]) <= 8)
if (info.h !== info.w) { fail('2 ページが縦に連結されていません') }
if (!same(info.top, [255, 0, 0, 255]) || !same(info.bottom, [0, 0, 255, 255])) { fail('ページの順序か描画が不正です') }
if (crop.w !== 50 || crop.h !== 30 || !same(crop.center, [255, 0, 0, 255])) { fail('切り抜き結果が不正です') }
if (errors.length) { fail('ブラウザでエラーが出ました') }
console.log('OK')
