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
          :src="imgSrc"
          @load="onImageUploaded(index)"
        >
        <canvas
          ref="overlayCanvas"
          style="position: absolute; top: 0; left: 0;"
          @mousedown="startSelection"
          @mousemove="updateSelection($event, index)"
          @mouseup="endSelection(index)"
          @mouseleave="endSelection(index)"
        />
      </div>
      <img ref="croppedImage" alt="Cropped content">
    </v-col>
  </v-row>
</template>

<script>
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

const resizeImage = (image, callback) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  const imgElement = new Image()
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
    callback(canvas.toDataURL())
  }
}

export default {
  name: 'IndexPage',
  data () {
    return {
      imgSrcs: [],
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
      // 選択終了位置をリセット。
      this.selectionEnd = { x: event.offsetX, y: event.offsetY }
    },

    updateSelection (event, index) {
      // 選択が始まっていない?
      if (!this.isSelecting) {
        return
      }
      // いまここ。
      this.selectionEnd = { x: event.offsetX, y: event.offsetY }
      // Canvas 取得。
      const canvas = this.$refs.overlayCanvas[index]
      const ctx = canvas.getContext('2d')
      // 前回の描画を消す。
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // 選択範囲の矩形を描画。
      const width = this.selectionEnd.x - this.selectionStart.x
      const height = this.selectionEnd.y - this.selectionStart.y
      ctx.strokeRect(this.selectionStart.x, this.selectionStart.y, width, height)
    },

    endSelection (index) {
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
        this.$refs.uploadedImage[index],
        startX, startY, width, height,
        0, 0, width, height
      )
      // Canvas を data URL へ変換。
      // NOTE: croppedImage は v-for の外だよ。 index で取得するヤツじゃない。
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
        // 画像ファイルの場合は、PDF -> 画像化は不要。
        const imgSrc = URL.createObjectURL(file)
        resizeImage(imgSrc, (resizedImgSrc) => {
          this.imgSrcs.push(resizedImgSrc)
        })
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
              const imgSrc = canvas.toDataURL()
              resizeImage(imgSrc, (resizedImgSrc) => {
                this.imgSrcs.push(resizedImgSrc)
              })
            })
          })
        }
      }).catch(function (reason) {
        // eslint-disable-next-line no-console
        console.error('Error: ' + reason)
      })
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
</style>
