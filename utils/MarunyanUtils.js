// originalJson は、 marunyan.png 画像を
// Google Cloud Vision API で解析した結果だよ。
// これを paragraph ごとに整理して export するのが、このファイルの役割だよ。

async function main (jsonPath) {
  const paragraphs = []

  // JSON ファイルを読み込む
  const response = await fetch(jsonPath)
  const originalJson = await response.json()

  const page = originalJson.fullTextAnnotation.pages[0]
  for (const block of page.blocks) {
    for (const paragraph of block.paragraphs) {
      const text = paragraph.words.map(word => word.symbols.map(symbol => symbol.text).join('')).join('')
      const vertices = paragraph.boundingBox.vertices
      const leftTop = { x: vertices[0].x, y: vertices[0].y }
      const rightTop = { x: vertices[1].x, y: vertices[1].y }
      const rightBottom = { x: vertices[2].x, y: vertices[2].y }
      const leftBottom = { x: vertices[3].x, y: vertices[3].y }
      paragraphs.push({ text, leftTop, rightTop, rightBottom, leftBottom })
    }
  }

  return paragraphs
}

export const getMarunyanParagraphs = main
