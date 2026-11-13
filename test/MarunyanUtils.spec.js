import { getMarunyanParagraphs } from '@/utils/MarunyanUtils'

/**
 * Cloud Vision API の応答のうち、段落の抽出に使う部分だけを作ります。
 */
function visionResponse (paragraphs) {
  return {
    fullTextAnnotation: {
      pages: [{
        blocks: [{
          paragraphs: paragraphs.map(({ words, vertices }) => ({
            boundingBox: { vertices },
            words: words.map(word => ({ symbols: [...word].map(text => ({ text })) }))
          }))
        }]
      }]
    }
  }
}

const box = (x1, y1, x2, y2) => [{ x: x1, y: y1 }, { x: x2, y: y1 }, { x: x2, y: y2 }, { x: x1, y: y2 }]

describe('getMarunyanParagraphs', () => {
  afterEach(() => {
    delete global.fetch
  })

  test('joins the symbols of each paragraph and keeps its four corners', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(visionResponse([
        { words: ['こんにちは'], vertices: box(24, 61, 236, 98) },
        { words: ['まるにゃん', '!'], vertices: box(51, 122, 410, 213) }
      ]))
    })

    const paragraphs = await getMarunyanParagraphs('/annotate_image_response.json')

    expect(global.fetch).toHaveBeenCalledWith('/annotate_image_response.json')
    expect(paragraphs).toEqual([
      { text: 'こんにちは', leftTop: { x: 24, y: 61 }, rightTop: { x: 236, y: 61 }, rightBottom: { x: 236, y: 98 }, leftBottom: { x: 24, y: 98 } },
      { text: 'まるにゃん!', leftTop: { x: 51, y: 122 }, rightTop: { x: 410, y: 122 }, rightBottom: { x: 410, y: 213 }, leftBottom: { x: 51, y: 213 } }
    ])
  })
})
