import type { Size } from './cropGeometry'

/**
 * ブラウザがどれでも扱えるキャンバスの最大の辺の長さ (px) です。
 */
export const MAX_CANVAS_SIDE = 32767

export interface StackLayout extends Size {
  scale: number
  /** 各ページを描画する y 座標です。 */
  offsets: number[]
}

/**
 * PDF の各ページを縦に並べた 1 枚の画像のレイアウトを計算します。
 * 一番幅の広いページを targetWidth に合わせ、全体の高さが maxSide を超えるときはさらに縮めます。
 * @param pageSizes - 拡大率 1 のときのページサイズ
 */
export function computeStackLayout (pageSizes: Size[], targetWidth: number, maxSide = MAX_CANVAS_SIDE): StackLayout {
  if (pageSizes.length === 0) {
    throw new Error('PDF has no pages')
  }
  const maxWidth = Math.max(...pageSizes.map(size => size.width))
  const totalHeight = pageSizes.reduce((sum, size) => sum + size.height, 0)
  const scale = Math.min(targetWidth / maxWidth, maxSide / totalHeight)

  const offsets: number[] = []
  let height = 0
  for (const size of pageSizes) {
    offsets.push(height)
    height += Math.floor(size.height * scale)
  }
  return { scale, width: Math.floor(maxWidth * scale), height, offsets }
}
