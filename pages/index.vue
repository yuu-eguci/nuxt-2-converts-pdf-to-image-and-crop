<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <!--
        dragover, drop 両方 prevent:
          ブラウザの規定の動作 (別タブでファイルを開く) をキャンセル。
        色を変更:
          dragover で色を変える
          dragleave, drop で色を戻す
      -->
      <v-sheet
        class="drag-drop-area d-flex flex-column align-center pa-5"
        elevation="4"
        :color="changeVSheetColor ? 'blue lighten-2' : 'lighten-3'"
        @dragover.prevent="changeVSheetColor = true"
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
          multiple
          @change="onFileChange"
        />
      </v-sheet>

      <div v-for="(src, index) in imgSrcs" :key="index">
        <img :src="src" alt="pdf content">
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
      imgSrcs: [],
      changeVSheetColor: false
    }
  },
  methods: {
    onDrop (event) {
      this.changeVSheetColor = false
      const files = event.dataTransfer.files
      this.onFileChange(Array.from(files))
    },

    // NOTE: v-file-input の @change イベントはファイルを直接返します。
    onFileChange (files) {
      // NOTE: とりあえず1ファイルに対応。
      const file = files[0]
      if (!file) {
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
              // キャンバスの内容を Data URL として取得して、 imgSrcs に追加。
              this.imgSrcs.push(canvas.toDataURL())
            })
          })
        }
      }).catch(function (reason) {
        // eslint-disable-next-line no-console
        console.error('Error: ' + reason)
      })
    }
  }
}
</script>

<style scoped>
.drag-drop-area {
  transition: background-color 0.5s ease;
}
</style>
