export type FileKind = 'pdf' | 'image' | 'unsupported'

/**
 * ファイルを、このアプリで扱える種類に分類します。
 * ドラッグ&ドロップでは MIME type が空のことがあるため、 PDF は拡張子でも判定します。
 */
export function classifyFile (file: { name: string, type: string }): FileKind {
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
 * @param error - 読み込みで発生した例外です。 catch した値をそのまま渡せます。
 */
export function loadErrorMessage (kind: FileKind, error?: unknown): string {
  if (kind === 'unsupported') {
    return 'Unsupported file. Choose a PDF or an image.'
  }
  if (kind === 'image') {
    return 'Could not read this image.'
  }
  if (error && (error as { name?: unknown }).name === 'PasswordException') {
    return 'This PDF is password protected.'
  }
  return 'Could not read this PDF.'
}
