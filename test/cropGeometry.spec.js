import { clampPoint, isTooSmall, normalizeRect, toCanvasPoint } from '@/utils/cropGeometry'

describe('normalizeRect', () => {
  test.each([
    ['down-right', { x: 10, y: 10 }, { x: 60, y: 40 }],
    ['up-left', { x: 60, y: 40 }, { x: 10, y: 10 }],
    ['down-left', { x: 60, y: 10 }, { x: 10, y: 40 }],
    ['up-right', { x: 10, y: 40 }, { x: 60, y: 10 }]
  ])('%s drag gives the same rectangle', (_, start, end) => {
    expect(normalizeRect(start, end)).toEqual({ x: 10, y: 10, width: 50, height: 30 })
  })

  test('fractional points are rounded to whole pixels', () => {
    expect(normalizeRect({ x: 10.4, y: 9.6 }, { x: 59.6, y: 40.4 })).toEqual({ x: 10, y: 10, width: 50, height: 30 })
  })
})

describe('clampPoint', () => {
  test('keeps points inside the image', () => {
    expect(clampPoint({ x: 20, y: 30 }, 500, 750)).toEqual({ x: 20, y: 30 })
  })

  test('moves points outside the image to the nearest edge', () => {
    expect(clampPoint({ x: 600, y: -100 }, 500, 750)).toEqual({ x: 500, y: 0 })
    expect(clampPoint({ x: -5, y: 900 }, 500, 750)).toEqual({ x: 0, y: 750 })
  })
})

describe('toCanvasPoint', () => {
  test('maps client coordinates to canvas pixels', () => {
    const canvas = { width: 1000, height: 500 }
    const rect = { left: 100, top: 50, width: 500, height: 250 }
    expect(toCanvasPoint({ clientX: 350, clientY: 100 }, canvas, rect)).toEqual({ x: 500, y: 100 })
  })

  test('clamps points dragged outside the canvas', () => {
    const canvas = { width: 500, height: 750 }
    const rect = { left: 0, top: 0, width: 500, height: 750 }
    expect(toCanvasPoint({ clientX: 600, clientY: -100 }, canvas, rect)).toEqual({ x: 500, y: 0 })
  })
})

describe('isTooSmall', () => {
  test('a click without moving is too small', () => {
    expect(isTooSmall({ x: 10, y: 10, width: 0, height: 0 })).toBe(true)
  })

  test('a thin line is too small', () => {
    expect(isTooSmall({ x: 10, y: 10, width: 50, height: 1 })).toBe(true)
  })

  test('a real selection is not too small', () => {
    expect(isTooSmall({ x: 10, y: 10, width: 2, height: 2 })).toBe(false)
  })
})
