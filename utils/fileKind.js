/**
 * ファイルを、このアプリで扱える種類に分類します。
 * ドラッグ&ドロップでは MIME type が空のことがあるため、 PDF は拡張子でも判定します。
 * @param {{ name: string, type: string }} file
 * @returns {'pdf' | 'image' | 'unsupported'}
 */
export function classifyFile (file) {
  if (file.type === 'application/pdf' || (!file.type && /\.pdf$/i.test(file.name))) {
    return 'pdf'
  }
  if (file.type.startsWith('image/')) {
    return 'image'
  }
  return 'unsupported'
}

/**
 * 読み込みに失敗したときに画面へ出すメッセージを返します。
 * @param {'pdf' | 'image' | 'unsupported'} kind
 * @param {{ name?: string }} [error]
 * @returns {string}
 */
export function loadErrorMessage (kind, error) {
  if (kind === 'unsupported') {
    return 'Unsupported file. Choose a PDF or an image.'
  }
  if (kind === 'image') {
    return 'Could not read this image.'
  }
  if (error && error.name === 'PasswordException') {
    return 'This PDF is password protected.'
  }
  return 'Could not read this PDF.'
}
