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

      GlobalWorkerOptions.workerSrc = pdfjsWorker

      const loadingTask = getDocument(URL.createObjectURL(file))
      loadingTask.promise.then((pdf) => {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          pdf.getPage(pageNum).then((page) => {
            const viewport = page.getViewport({ scale: 1.0 })
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.height = viewport.height
            canvas.width = viewport.width

            const renderContext = {
              canvasContext: context,
              viewport
            }
            const renderTask = page.render(renderContext)
            renderTask.promise.then(() => {
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
