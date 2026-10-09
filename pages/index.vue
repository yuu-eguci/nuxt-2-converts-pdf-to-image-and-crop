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
        @click="$refs.fileInput.$refs.input.click()"
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

<script>
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { buildPdfLoadParams } from '@/utils/pdfLoadParams'
import { classifyFile, loadErrorMessage } from '@/utils/fileKind'
import { isTooSmall, normalizeRect, toCanvasPoint } from '@/utils/cropGeometry'

/**
 * PDF ファイルの各ページを 1 つの画像に結合して Blob URL 形式で返す。
 * WARN: この関数はブラウザ環境に依存しており、ユニットテストを書けていない。
 * @param {string} pdfFileURL - PDF ファイルの URL
 * @returns {Promise<string>} 結合された画像の Blob URL 文字列
 */
async function pdfToBlobURLImage (pdfFileURL) {
  // "ワーカースクリプト" を設定。
  GlobalWorkerOptions.workerSrc = pdfjsWorker

  // NOTE: 選択された PDF を読み込むタスクを用意している。
  const loadingTask = getDocument(buildPdfLoadParams(pdfFileURL))

  // "PDF ファイル読み込みの処理が終わったら、" の意味。
  const pdf = await loadingTask.promise

  let totalHeight = 0
  let maxWidth = 0

  const canvases = []

  for (let i = 1; i <= pdf.numPages; i++) {
    // PDF 各ページを取得。
    const page = await pdf.getPage(i)

    // Viewport を作る。
    const viewport = page.getViewport({ scale: 1.0 })

    totalHeight += viewport.height
    maxWidth = Math.max(maxWidth, viewport.width)

    // キャンバスと、対応する context を作る。
    // Context はキャンバス上に描画するためのメソッドとプロパティを持ったオブジェクト。
    const canvas = document.createElement('canvas')
    canvas.height = viewport.height
    canvas.width = viewport.width
    const canvasContext = canvas.getContext('2d')

    // ページの描画タスクを開始。
    await page.render({
      canvasContext,
      viewport
    }).promise

    canvases.push(canvas)
  }

  const finalCanvas = document.createElement('canvas')
  finalCanvas.height = totalHeight
  finalCanvas.width = maxWidth
  const finalContext = finalCanvas.getContext('2d')

  let yOffset = 0
  for (const canvas of canvases) {
    finalContext.drawImage(canvas, 0, yOffset)
    yOffset += canvas.height
  }

  return new Promise((resolve, reject) => {
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
 * 画像を幅 500px に縮小し、 Blob URL 形式で返します。
 * @param {string} image - 画像の URL
 * @returns {Promise<string>} 縮小した画像の Blob URL 文字列
 */
const resizeImage = image => new Promise((resolve, reject) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  const imgElement = new Image()
  imgElement.onerror = () => reject(new Error('Failed to load image'))
  imgElement.src = image
  imgElement.onload = () => {
    // リサイズ後のサイズを指定します。
    const resizedWidth = 500
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

export default {
  name: 'IndexPage',
  data () {
    return {
      imgSrcs: [],
      errorMessage: '',
      croppedSrc: '',
      changeVSheetColor: false,
      isSelecting: false,
      selectionStart: { x: 0, y: 0 },
      selectionEnd: { x: 0, y: 0 }
    }
  },
  methods: {
    startSelection (event, index) {
      // 主ボタン (タッチ・ペンを含む) 以外では選択しません。
      if (event.button !== 0) {
        return
      }
      // ポインタがキャンバスの外へ出ても、離すまでイベントを受け取ります。
      event.target.setPointerCapture(event.pointerId)
      this.isSelecting = true
      this.selectionStart = this.toPoint(event, index)
      this.selectionEnd = this.selectionStart
    },

    updateSelection (event, index) {
      if (!this.isSelecting) {
        return
      }
      this.selectionEnd = this.toPoint(event, index)
      const canvas = this.$refs.overlayCanvas[index]
      const ctx = canvas.getContext('2d')
      // 前回の描画を消して、選択範囲の矩形を描画。
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x, y, width, height } = normalizeRect(this.selectionStart, this.selectionEnd)
      ctx.strokeRect(x, y, width, height)
    },

    endSelection (event, index) {
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
      canvas.getContext('2d').drawImage(
        this.$refs.uploadedImage[index],
        x, y, width, height,
        0, 0, width, height
      )
      this.croppedSrc = canvas.toDataURL()
    },

    cancelSelection (index) {
      this.isSelecting = false
      const canvas = this.$refs.overlayCanvas[index]
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    },

    toPoint (event, index) {
      const canvas = this.$refs.overlayCanvas[index]
      return toCanvasPoint(event, canvas, canvas.getBoundingClientRect())
    },

    onDrop (event) {
      this.changeVSheetColor = false
      const files = event.dataTransfer.files
      // NOTE: とりあえず1ファイルに対応。
      this.$debug(files)
      this.onFileChange(files[0])
    },

    // NOTE: v-file-input の @change イベントはファイルを直接返します。
    async onFileChange (file) {
      if (!file) {
        return
      }
      // 同じファイルを選び直しても change が届くように、選択状態を空にします。
      this.$refs.fileInput.$refs.input.value = ''

      const kind = classifyFile(file)
      if (kind === 'unsupported') {
        // 表示中の画像はそのまま残します。
        this.errorMessage = loadErrorMessage(kind)
        return
      }

      // 既存のアップロードファイルと切り抜き結果は削除しとく。
      this.imgSrcs = []
      this.croppedSrc = ''
      this.errorMessage = ''

      try {
        // 画像ファイルの場合は、PDF -> 画像化は不要。
        const imageBlobURLBeforeResize = kind === 'image'
          ? URL.createObjectURL(file)
          : await pdfToBlobURLImage(URL.createObjectURL(file))
        this.imgSrcs.push(await resizeImage(imageBlobURLBeforeResize))
      } catch (error) {
        this.errorMessage = loadErrorMessage(kind, error)
      }
    },

    onImageUploaded (index) {
      // "canvas のサイズ = 画像のサイズ" にします。
      // NOTE: v-for の中の ref は配列になる。
      //       ということで index で取得できます。
      const canvas = this.$refs.overlayCanvas[index]
      const image = this.$refs.uploadedImage[index]
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
    }
  }
}
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
