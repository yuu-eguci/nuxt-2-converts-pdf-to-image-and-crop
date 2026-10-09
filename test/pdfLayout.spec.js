import { computeStackLayout } from '@/utils/pdfLayout'

const A4 = { width: 595, height: 842 }

describe('computeStackLayout', () => {
  test('scales pages to the target width and stacks them', () => {
    const layout = computeStackLayout([{ width: 200, height: 100 }, { width: 200, height: 100 }], 500)
    expect(layout.scale).toBe(2.5)
    expect(layout.width).toBe(500)
    expect(layout.height).toBe(500)
    expect(layout.offsets).toEqual([0, 250])
  })

  test('the widest page decides the scale', () => {
    const layout = computeStackLayout([{ width: 100, height: 100 }, { width: 400, height: 100 }], 500)
    expect(layout.scale).toBe(1.25)
    expect(layout).toMatchObject({ width: 500, height: 250, offsets: [0, 125] })
  })

  test('long documents shrink to stay within the canvas size limit', () => {
    const layout = computeStackLayout(Array(100).fill(A4), 500, 32767)
    expect(layout.height).toBeLessThanOrEqual(32767)
    expect(layout.height).toBeGreaterThan(32000)
    expect(layout.width).toBeLessThan(500)
  })

  test('offsets follow the rounded page heights', () => {
    const layout = computeStackLayout([A4, A4, A4], 500)
    const pageHeight = Math.floor(842 * 500 / 595)
    expect(layout.offsets).toEqual([0, pageHeight, pageHeight * 2])
    expect(layout.height).toBe(pageHeight * 3)
  })

  test('a PDF without pages is rejected', () => {
    expect(() => computeStackLayout([], 500)).toThrow()
  })
})
