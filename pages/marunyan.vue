<template>
  <v-row>
    <v-col
      cols="8"
    >
      <div style="position: relative;">
        <!-- 画像。 -->
        <img
          ref="marunyanImage"
          :src="imgSrc"
          @load="onImageUploaded"
        >
        <!-- 色を塗るキャンバス。 -->
        <canvas
          ref="colorFillCanvas"
          style="position: absolute; top: 0; left: 0;"
        />
        <!--
          矩形を出すキャンバス。
          NOTE: キャンバスを分けている。
                同じキャンバスにしちゃうと、 "塗った色をリセット" するとき、
                "矩形もリセット" されちゃうため。それを避けたい。
        -->
        <canvas
          ref="rectangleCanvas"
          style="position: absolute; top: 0; left: 0;"
          @click="onClickCanvas"
        />
      </div>
    </v-col>
    <v-col
      cols="4"
      class="text-center"
    >
      <v-card
        elevation="4"
        class="mx-auto"
      >
        <v-text-field
          v-model="mainText"
          label="Selected text"
          readonly
        />
      </v-card>
      <v-card
        elevation="4"
        class="mx-auto"
      >
        <v-card-subtitle>
          Activity log
        </v-card-subtitle>
        <v-divider />
        <v-virtual-scroll
          :items="activityLogs"
          height="600"
          item-height="56"
        >
          <template #default="{ item }">
            <v-list-item :key="item.id">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </template>
        </v-virtual-scroll>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getMarunyanParagraphs } from '~/utils/MarunyanUtils.js'

const IMAGE_SOURCE_PATH = '/marunyan.png'
const ANNOTATE_IMAGE_RESPONSE_JSON_PATH = '/annotate_image_response.json'

export default {
  name: 'MarunyanPage',
  data () {
    return {
      imgSrc: IMAGE_SOURCE_PATH,
      marunyanParagraphs: [],
      activityLogs: [],
      mainText: ''
    }
  },
  async created () {
    this.activityLogs.unshift('created が呼ばれたよ。')
    this.marunyanParagraphs = await getMarunyanParagraphs(ANNOTATE_IMAGE_RESPONSE_JSON_PATH)
    this.$debug(this.marunyanParagraphs)
  },
  mounted () {
    this.activityLogs.unshift('mounted が呼ばれたよ。')
  },
  methods: {
    onImageUploaded () {
      // "canvas のサイズ = 画像のサイズ" にします。
      // NOTE: v-for の中の ref は配列になる。
      //       ということで index で取得できます。
      const rectangleCanvas = this.$refs.rectangleCanvas
      const colorFillCanvas = this.$refs.colorFillCanvas
      const image = this.$refs.marunyanImage
      rectangleCanvas.width = image.naturalWidth
      rectangleCanvas.height = image.naturalHeight
      colorFillCanvas.width = image.naturalWidth
      colorFillCanvas.height = image.naturalHeight

      // 矩形を描画
      const ctx = rectangleCanvas.getContext('2d')
      for (const paragraph of this.marunyanParagraphs) {
        const { text, leftTop, rightTop, rightBottom, leftBottom } = paragraph
        ctx.beginPath()
        ctx.moveTo(leftTop.x, leftTop.y)
        ctx.lineTo(rightTop.x, rightTop.y)
        ctx.lineTo(rightBottom.x, rightBottom.y)
        ctx.lineTo(leftBottom.x, leftBottom.y)
        ctx.closePath()
        ctx.lineWidth = 3
        ctx.strokeStyle = '#FF0000'
        ctx.stroke()
        this.activityLogs.unshift(`${text} に矩形を描画したよ。`)
      }
    },

    onClickCanvas (event) {
      const canvasRect = this.$refs.colorFillCanvas.getBoundingClientRect()
      const x = event.clientX - canvasRect.left
      const y = event.clientY - canvasRect.top
      const ctx = this.$refs.colorFillCanvas.getContext('2d')
      for (const paragraph of this.marunyanParagraphs) {
        const { text, leftTop, rightTop, leftBottom } = paragraph
        if (
          x >= leftTop.x && x <= rightTop.x &&
          y >= leftTop.y && y <= leftBottom.y
        ) {
          // クリックされた矩形内に座標が含まれている場合
          this.mainText = text
          // 矩形の色を変更
          ctx.fillStyle = 'rgba(0, 255, 0, 0.5)' // 色と透明度を設定
          ctx.fillRect(leftTop.x, leftTop.y, rightTop.x - leftTop.x, leftBottom.y - leftTop.y) // 矩形を塗る
          setTimeout(() => {
            // すべての矩形の色をクリア（オプション）
            ctx.clearRect(0, 0, this.$refs.colorFillCanvas.width, this.$refs.colorFillCanvas.height)
          }, 1000)
          this.activityLogs.unshift(`クリックした (${x}, ${y}) には ${text} があるよ。`)
          return
        }
      }
      this.activityLogs.unshift(`クリックした (${x}, ${y}) は矩形の外だよ。`)
    }
  }
}
</script>
