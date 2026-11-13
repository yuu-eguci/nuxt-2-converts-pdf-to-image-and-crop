/**
 * pdfjs の getDocument に渡すパラメータを作ります。
 * isEvalSupported: false で、フォント経由の任意 JS 実行 (CVE-2024-4367) を防ぎます。
 * @param url - PDF ファイルの URL
 */
export function buildPdfLoadParams (url: string): { url: string, isEvalSupported: false } {
  return { url, isEvalSupported: false }
}
