/**
 * pdfjs の getDocument に渡すパラメータを作ります。
 * isEvalSupported: false で、フォント経由の任意 JS 実行 (CVE-2024-4367) を防ぎます。
 * @param {string} url - PDF ファイルの URL
 * @returns {{ url: string, isEvalSupported: boolean }}
 */
export function buildPdfLoadParams (url) {
  return { url, isEvalSupported: false }
}
