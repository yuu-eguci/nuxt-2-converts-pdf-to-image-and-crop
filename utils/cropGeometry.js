/**
 * 2 点から、左上の座標と幅・高さを持つ矩形を作ります。どの向きにドラッグしても同じ矩形になります。
 * @param {{ x: number, y: number }} start
 * @param {{ x: number, y: number }} end
 * @returns {{ x: number, y: number, width: number, height: number }}
 */
export function normalizeRect (start, end) {
  const x = Math.round(Math.min(start.x, end.x))
  const y = Math.round(Math.min(start.y, end.y))
  return {
    x,
    y,
    width: Math.round(Math.max(start.x, end.x)) - x,
    height: Math.round(Math.max(start.y, end.y)) - y
  }
}

/**
 * 点を画像の範囲内に収めます。
 * @param {{ x: number, y: number }} point
 * @param {number} width
 * @param {number} height
 * @returns {{ x: number, y: number }}
 */
export function clampPoint (point, width, height) {
  return {
    x: Math.min(Math.max(point.x, 0), width),
    y: Math.min(Math.max(point.y, 0), height)
  }
}

/**
 * ポインタの座標を、キャンバスのピクセル座標へ変換します。キャンバスの外の点は端に収めます。
 * @param {{ clientX: number, clientY: number }} event
 * @param {{ width: number, height: number }} canvas - キャンバスのピクセルサイズ
 * @param {{ left: number, top: number, width: number, height: number }} rect - 画面上の表示位置とサイズ
 * @returns {{ x: number, y: number }}
 */
export function toCanvasPoint (event, canvas, rect) {
  return clampPoint({
    x: (event.clientX - rect.left) * canvas.width / rect.width,
    y: (event.clientY - rect.top) * canvas.height / rect.height
  }, canvas.width, canvas.height)
}

/**
 * クリックだけ、または線のように細い選択かどうかを返します。
 * @param {{ width: number, height: number }} rect
 * @param {number} [min=2]
 * @returns {boolean}
 */
export function isTooSmall (rect, min = 2) {
  return rect.width < min || rect.height < min
}
