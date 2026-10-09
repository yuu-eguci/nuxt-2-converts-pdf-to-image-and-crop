/**
 * ブラウザがどれでも扱えるキャンバスの最大の辺の長さ (px) です。
 */
export const MAX_CANVAS_SIDE = 32767

/**
 * PDF の各ページを縦に並べた 1 枚の画像のレイアウトを計算します。
 * 一番幅の広いページを targetWidth に合わせ、全体の高さが maxSide を超えるときはさらに縮めます。
 * @param {{ width: number, height: number }[]} pageSizes - 拡大率 1 のときのページサイズ
 * @param {number} targetWidth
 * @param {number} [maxSide=MAX_CANVAS_SIDE]
 * @returns {{ scale: number, width: number, height: number, offsets: number[] }}
 */
export function computeStackLayout (pageSizes, targetWidth, maxSide = MAX_CANVAS_SIDE) {
  if (pageSizes.length === 0) {
    throw new Error('PDF has no pages')
  }
  const maxWidth = Math.max(...pageSizes.map(size => size.width))
  const totalHeight = pageSizes.reduce((sum, size) => sum + size.height, 0)
  const scale = Math.min(targetWidth / maxWidth, maxSide / totalHeight)

  const offsets = []
  let height = 0
  for (const size of pageSizes) {
    offsets.push(height)
    height += Math.floor(size.height * scale)
  }
  return { scale, width: Math.floor(maxWidth * scale), height, offsets }
}
