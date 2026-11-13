<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <!--
        dragover, drop 両方 prevent:
          ブラウザの規定の動作 (別タブでファイルを開く) をキャンセル。
        色を変更:
          dragover, mouseover で色を変える
          dragleave, drop, mouseleave で色を戻す
        NOTE: @drop だけ、 changeVSheetColor 変更処理が method に書いてあるのが気になる……。
      -->
      <v-sheet
        class="drag-drop-area d-flex flex-column align-center pa-5"
        elevation="4"
        :color="changeVSheetColor ? 'blue lighten-2' : 'lighten-3'"
        @dragover.prevent="changeVSheetColor = true"
        @mouseover="changeVSheetColor = true"
        @mouseleave="changeVSheetColor = false"
        @drop.prevent="onDrop"
        @dragleave="changeVSheetColor = false"
        @click="openFilePicker"
      >
        <v-icon x-large>
          mdi-upload
        </v-icon>
        <p>Drop your file here, or click to select file to upload.</p>
        <v-file-input
          ref="fileInput"
          accept="application/pdf, image/*"
          label="Upload PDF or Image"
          prepend-icon=""
          hide-input
          @change="onFileChange"
        />
      </v-sheet>

      <v-alert v-if="errorMessage" type="error" class="mt-4">
        {{ errorMessage }}
      </v-alert>

      <div
        v-for="(imgSrc, index) in imgSrcs"
        :key="index"
        style="position: relative;"
      >
        <!--
          NOTE: ref が固定値なので、エッてなると思うけど
                v-for の中の ref は配列になるという仕様があるので大丈夫。
        -->
        <img
          ref="uploadedImage"
          class="uploaded-image"
          :src="imgSrc"
          @load="onImageUploaded(index)"
        >
        <canvas
          ref="overlayCanvas"
          class="overlay-canvas"
          @pointerdown="startSelection($event, index)"
          @pointermove="updateSelection($event, index)"
          @pointerup="endSelection($event, index)"
          @pointercancel="cancelSelection(index)"
        />
      </div>
      <img v-if="croppedSrc" class="cropped-image" :src="croppedSrc" alt="Cropped content">
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type Vue from 'vue'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf'
import type { PDFDocumentProxy } from 'pdfjs-dist/build/pdf'
// pdf.js の worker は別ファイルとして配信し、 PDF の解析を Web Worker で動かします。
// この 1 ファイルだけを URL として扱うため、 loader をここで指定します。
// eslint-disable-next-line import/no-webpack-loader-syntax
import pdfjsWorkerURL from '!!file-loader?name=[name].[contenthash:7].[ext]!pdfjs-dist/build/pdf.worker.min.js'
import { buildPdfLoadParams } from '@/utils/pdfLoadParams'
import { classifyFile, loadErrorMessage } from '@/utils/fileKind'
import { isTooSmall, normalizeRect, toCanvasPoint } from '@/utils/cropGeometry'
import type { Point } from '@/utils/cropGeometry'
import { computeStackLayout } from '@/utils/pdfLayout'

GlobalWorkerOptions.workerSrc = pdfjsWorkerURL

/**
 * 表示する画像の幅 (px) です。
 */
const IMAGE_WIDTH = 500

/**
 * キャンバスの 2D コンテキストを返します。取得できないときは例外にします。
 */
function context2d (canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas 2D is not supported')
  }
  return context
}

/**
 * PDF ファイルの各ページを縦に並べた 1 枚の画像にして Blob URL 形式で返す。
 * 各ページは最初から表示サイズで描画します。
 * @param pdfFileURL - PDF ファイルの URL
 * @returns 結合された画像の Blob URL 文字列
 */
async function pdfToBlobURLImage (pdfFileURL: string): Promise<string> {
  const loadingTask = getDocument(buildPdfLoadParams(pdfFileURL))
  try {
    return await renderStackedImage(await loadingTask.promise)
  } finally {
    // 読み込んだ PDF と worker を解放します。
    loadingTask.destroy()
  }
}

/**
 * PDF の全ページを縦に並べて描画し、 Blob URL 形式で返す。
 * @returns 結合された画像の Blob URL 文字列
 */
async function renderStackedImage (pdf: PDFDocumentProxy): Promise<string> {
  const pages = []
  for (let i = 1; i <= pdf.numPages; i++) {
    pages.push(await pdf.getPage(i))
  }
  const layout = computeStackLayout(pages.map(page => page.getViewport({ scale: 1 })), IMAGE_WIDTH)

  const finalCanvas = document.createElement('canvas')
  finalCanvas.width = layout.width
  finalCanvas.height = layout.height
  const finalContext = context2d(finalCanvas)
  // 幅の狭いページの横が透明にならないよう、白で塗っておきます。
  finalContext.fillStyle = 'white'
  finalContext.fillRect(0, 0, layout.width, layout.height)

  for (const [i, page] of pages.entries()) {
    const viewport = page.getViewport({ scale: layout.scale })
    const canvas = document.createElement('canvas')
    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    await page.render({ canvasContext: context2d(canvas), viewport }).promise
    finalContext.drawImage(canvas, 0, layout.offsets[i])
    // ページごとのキャンバスのメモリをすぐ手放します。
    canvas.width = 0
  }

  return new Promise<string>((resolve, reject) => {
    finalCanvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob))
      } else {
        reject(new Error('Failed to create blob'))
      }
    })
  })
}

/**
 * 画像を幅 IMAGE_WIDTH に合わせて拡大縮小し、 Blob URL 形式で返します。
 * @param image - 画像の URL
 * @returns 縮小した画像の Blob URL 文字列
 */
const resizeImage = (image: string) => new Promise<string>((resolve, reject) => {
  const canvas = document.createElement('canvas')
  const context = context2d(canvas)

  const imgElement = new Image()
  imgElement.onerror = () => reject(new Error('Failed to load image'))
  imgElement.src = image
  imgElement.onload = () => {
    // リサイズ後のサイズを指定します。
    const resizedWidth = IMAGE_WIDTH
    const resizedHeight = imgElement.height * (resizedWidth / imgElement.width)
    canvas.width = resizedWidth
    canvas.height = resizedHeight

    // 画像を新しいキャンバスに描画します。
    context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height, 0, 0, resizedWidth, resizedHeight)
    // 新しいキャンバスの内容を Data URL として取得します。
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob))
      } else {
        reject(new Error('Failed to create blob'))
      }
    })
  }
})

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      imgSrcs: [] as string[],
      errorMessage: '',
      croppedSrc: '',
      // 読み込みのたびに増やし、古い読み込みの結果を捨てるのに使います。
      loadSeq: 0,
      changeVSheetColor: false,
      isSelecting: false,
      selectionStart: { x: 0, y: 0 } as Point,
      selectionEnd: { x: 0, y: 0 } as Point
    }
  },
  methods: {
    startSelection (event: PointerEvent, index: number) {
      // 主ボタン (タッチ・ペンを含む) 以外では選択しません。
      if (event.button !== 0) {
        return
      }
      // ポインタがキャンバスの外へ出ても、離すまでイベントを受け取ります。
      (event.target as Element).setPointerCapture(event.pointerId)
      this.isSelecting = true
      this.selectionStart = this.toPoint(event, index)
      this.selectionEnd = this.selectionStart
    },

    updateSelection (event: PointerEvent, index: number) {
      if (!this.isSelecting) {
        return
      }
      this.selectionEnd = this.toPoint(event, index)
      const canvas = this.overlayCanvas(index)
      const ctx = context2d(canvas)
      // 前回の描画を消して、選択範囲の矩形を描画。
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x, y, width, height } = normalizeRect(this.selectionStart, this.selectionEnd)
      ctx.strokeRect(x, y, width, height)
    },

    endSelection (event: PointerEvent, index: number) {
      if (!this.isSelecting) {
        return
      }
      this.selectionEnd = this.toPoint(event, index)
      this.cancelSelection(index)
      const { x, y, width, height } = normalizeRect(this.selectionStart, this.selectionEnd)
      // クリックだけのときは、前の切り抜き結果を残します。
      if (isTooSmall({ width, height })) {
        return
      }
      // 選択範囲の画像を切り出す。
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      context2d(canvas).drawImage(
        this.uploadedImage(index),
        x, y, width, height,
        0, 0, width, height
      )
      this.croppedSrc = canvas.toDataURL()
    },

    cancelSelection (index: number) {
      this.isSelecting = false
      const canvas = this.overlayCanvas(index)
      context2d(canvas).clearRect(0, 0, canvas.width, canvas.height)
    },

    toPoint (event: PointerEvent, index: number): Point {
      const canvas = this.overlayCanvas(index)
      return toCanvasPoint(event, canvas, canvas.getBoundingClientRect())
    },

    // v-for の中の ref は配列になるため、 index で取り出します。
    overlayCanvas (index: number): HTMLCanvasElement {
      return (this.$refs.overlayCanvas as HTMLCanvasElement[])[index]
    },

    uploadedImage (index: number): HTMLImageElement {
      return (this.$refs.uploadedImage as HTMLImageElement[])[index]
    },

    // v-file-input の中にある input 要素です。
    fileInputElement (): HTMLInputElement {
      return (this.$refs.fileInput as Vue).$refs.input as HTMLInputElement
    },

    openFilePicker () {
      this.fileInputElement().click()
    },

    onDrop (event: DragEvent) {
      this.changeVSheetColor = false
      const files = event.dataTransfer?.files
      // NOTE: とりあえず1ファイルに対応。
      this.onFileChange(files?.[0])
    },

    // NOTE: v-file-input の @change イベントはファイルを直接返します。
    async onFileChange (file: File | null | undefined) {
      if (!file) {
        return
      }
      // 同じファイルを選び直しても change が届くように、選択状態を空にします。
      this.fileInputElement().value = ''

      const kind = classifyFile(file)
      if (kind === 'unsupported') {
        // 表示中の画像はそのまま残します。
        this.errorMessage = loadErrorMessage(kind)
        return
      }

      // 既存のアップロードファイルと切り抜き結果は削除しとく。
      const seq = ++this.loadSeq
      this.imgSrcs.forEach(src => URL.revokeObjectURL(src))
      this.imgSrcs = []
      this.croppedSrc = ''
      this.errorMessage = ''

      const sourceURL = URL.createObjectURL(file)
      try {
        const imgSrc = kind === 'image'
          ? await resizeImage(sourceURL)
          : await pdfToBlobURLImage(sourceURL)
        // 読み込み中に別のファイルが選ばれていたら、この結果は捨てます。
        if (seq !== this.loadSeq) {
          URL.revokeObjectURL(imgSrc)
          return
        }
        this.imgSrcs.push(imgSrc)
      } catch (error) {
        if (seq === this.loadSeq) {
          this.errorMessage = loadErrorMessage(kind, error)
        }
      } finally {
        URL.revokeObjectURL(sourceURL)
      }
    },

    onImageUploaded (index: number) {
      // "canvas のサイズ = 画像のサイズ" にします。
      const canvas = this.overlayCanvas(index)
      const image = this.uploadedImage(index)
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
    }
  }
})
</script>

<style scoped>
.drag-drop-area {
  transition: background-color 0.5s ease;
}

.overlay-canvas {
  position: absolute;
  top: 0;
  left: 0;
  /* タッチでのドラッグをスクロールではなく選択に使います。 */
  touch-action: none;
}
</style>
