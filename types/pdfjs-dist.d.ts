// pdfjs-dist 2.5.207 には型定義が含まれていないため、このアプリで使う API だけを宣言します。
// pdfjs-dist を更新するときは、 node_modules/pdfjs-dist/build/pdf.js と食い違っていないか確認してください。
declare module 'pdfjs-dist/build/pdf' {
  export const GlobalWorkerOptions: {
    /** PDF を解析する Web Worker のスクリプトの URL です。 */
    workerSrc: string
  }

  export interface DocumentInitParameters {
    url: string
    /** false にすると、フォントの描画で eval を使いません。 */
    isEvalSupported?: boolean
  }

  export interface PageViewport {
    readonly width: number
    readonly height: number
  }

  export interface RenderTask {
    readonly promise: Promise<void>
  }

  export interface PDFPageProxy {
    getViewport (params: { scale: number }): PageViewport
    render (params: { canvasContext: CanvasRenderingContext2D, viewport: PageViewport }): RenderTask
  }

  export interface PDFDocumentProxy {
    readonly numPages: number
    getPage (pageNumber: number): Promise<PDFPageProxy>
  }

  export interface PDFDocumentLoadingTask {
    readonly promise: Promise<PDFDocumentProxy>
    destroy (): Promise<void>
  }

  export function getDocument (src: DocumentInitParameters): PDFDocumentLoadingTask
}
