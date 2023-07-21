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

      <div v-if="imgSrc">
        <div ref="selectionOverlay" style="position: relative;">
          <img
            ref="uploadedImage"
            :src="imgSrc"
            @load="onImageUploaded"
          >
          <canvas
            ref="overlayCanvas"
            style="position: absolute; top: 0; left: 0;"
            @mousedown="startSelection"
            @mousemove="updateSelection"
            @mouseup="endSelection"
            @mouseleave="endSelection"
          />
        </div>
        <img ref="croppedImage" alt="Cropped content">
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

export default {
  name: 'IndexPage',
  data () {
    return {
      imgSrc: '',
      changeVSheetColor: false,
      isSelecting: false,
      selectionStart: { x: 0, y: 0 },
      selectionEnd: { x: 0, y: 0 }
    }
  },
  methods: {
    startSelection (event) {
      // 矩形選択を開始した。
      this.isSelecting = true
      // 選択開始位置。
      this.selectionStart = { x: event.offsetX, y: event.offsetY }
    },

    updateSelection (event) {
      // 選択が始まっていない?
      if (!this.isSelecting) {
        return
      }
      // いまここ。
      this.selectionEnd = { x: event.offsetX, y: event.offsetY }
      // Canvas 取得。
      const canvas = this.$refs.overlayCanvas
      const ctx = canvas.getContext('2d')
      // 前回の描画を消す。
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // 選択範囲の矩形を描画。
      const width = this.selectionEnd.x - this.selectionStart.x
      const height = this.selectionEnd.y - this.selectionStart.y
      ctx.strokeRect(this.selectionStart.x, this.selectionStart.y, width, height)
    },

    endSelection () {
      // 選択終了。
      this.isSelecting = false
      // 選択範囲の左上と右下の点を取得。
      const startX = Math.min(this.selectionStart.x, this.selectionEnd.x)
      const startY = Math.min(this.selectionStart.y, this.selectionEnd.y)
      const endX = Math.max(this.selectionStart.x, this.selectionEnd.x)
      const endY = Math.max(this.selectionStart.y, this.selectionEnd.y)
      // 選択範囲の幅と高さを計算。
      const width = endX - startX
      const height = endY - startY
      // 選択範囲の画像を切り出す。
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(
        this.$refs.uploadedImage,
        startX, startY, width, height,
        0, 0, width, height
      )
      // Canvas を data URL へ変換。
      this.$refs.croppedImage.src = canvas.toDataURL()
    },

    onDrop (event) {
      this.changeVSheetColor = false
      const files = event.dataTransfer.files
      // NOTE: とりあえず1ファイルに対応。
      this.onFileChange(files[0])
    },

    // NOTE: v-file-input の @change イベントはファイルを直接返します。
    onFileChange (file) {
      if (!file) {
        return
      }

      if (file.type.startsWith('image/')) {
        // 画像ファイルの場合は、この先の PDF -> 画像化は不要。
        this.imgSrc = URL.createObjectURL(file)
        return
      }
      // "ワーカースクリプト" を設定。
      // ブラウザの Web Worker API を使って、処理をバックグラウンドで行うものらしい。
      // メインスレッドを妨害することを防ぐってことみたい。
      GlobalWorkerOptions.workerSrc = pdfjsWorker

      // NOTE: 選択された PDF を読み込むタスクを用意している。
      const loadingTask = getDocument(URL.createObjectURL(file))

      // "PDF ファイル読み込みの処理が終わったら、" の意味。
      loadingTask.promise.then((pdf) => {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          // PDF 各ページを取得。
          pdf.getPage(pageNum).then((page) => {
            // Viewport を作る。
            // Viewport ってのは……描画する領域のことらしい……
            const viewport = page.getViewport({ scale: 1.0 })
            // キャンバスに対応する context を作る。
            // Context はキャンバス上に描画するためのメソッドとプロパティを持ったオブジェクト。
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.height = viewport.height
            canvas.width = viewport.width

            const renderContext = {
              canvasContext: context,
              viewport
            }
            // ページの描画タスクを開始。
            const renderTask = page.render(renderContext)
            renderTask.promise.then(() => {
              // キャンバスの内容を Data URL として取得。
              this.imgSrc = canvas.toDataURL()
            })
          })
        }
      }).catch(function (reason) {
        // eslint-disable-next-line no-console
        console.error('Error: ' + reason)
      })
    },

    onImageUploaded () {
      // "canvas のサイズ = 画像のサイズ" にします。
      const canvas = this.$refs.overlayCanvas
      const image = this.$refs.uploadedImage
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
</style>
