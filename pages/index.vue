<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-file-input
        accept="application/pdf"
        label="Upload PDF"
        outlined
        dense
        prepend-icon=""
        multiple
        @change="onFileChange"
      />
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
      imgSrcs: []
    }
  },
  methods: {
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
