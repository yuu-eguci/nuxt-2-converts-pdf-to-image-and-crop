export interface Point {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Rect extends Point, Size {}

/**
 * 2 点から、左上の座標と幅・高さを持つ矩形を作ります。どの向きにドラッグしても同じ矩形になります。
 */
export function normalizeRect (start: Point, end: Point): Rect {
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
 */
export function clampPoint (point: Point, width: number, height: number): Point {
  return {
    x: Math.min(Math.max(point.x, 0), width),
    y: Math.min(Math.max(point.y, 0), height)
  }
}

/**
 * ポインタの座標を、キャンバスのピクセル座標へ変換します。キャンバスの外の点は端に収めます。
 * @param canvas - キャンバスのピクセルサイズ
 * @param rect - 画面上の表示位置とサイズ
 */
export function toCanvasPoint (
  event: { clientX: number, clientY: number },
  canvas: Size,
  rect: { left: number, top: number } & Size
): Point {
  return clampPoint({
    x: (event.clientX - rect.left) * canvas.width / rect.width,
    y: (event.clientY - rect.top) * canvas.height / rect.height
  }, canvas.width, canvas.height)
}

/**
 * クリックだけ、または線のように細い選択かどうかを返します。
 */
export function isTooSmall (rect: Size, min = 2): boolean {
  return rect.width < min || rect.height < min
}
