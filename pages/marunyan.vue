<template>
  <v-row>
    <v-col
      cols="8"
    >
      <div style="position: relative;">
        <img
          ref="marunyanImage"
          src="/marunyan.png"
          @load="onImageUploaded"
        >
        <canvas
          ref="overlayCanvas"
          style="position: absolute; top: 0; left: 0;"
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
import { marunyanParagraphs } from '~/utils/MarunyanUtils.js'

export default {
  name: 'MarunyanPage',
  data () {
    return {
      activityLogs: [],
      mainText: ''
    }
  },
  created () {
    this.activityLogs.unshift('created が呼ばれたよ。')
    this.activityLogs.unshift('marunyanParagraphs をロードしたよ。')
  },
  mounted () {
    this.activityLogs.unshift('mounted が呼ばれたよ。')
  },
  methods: {
    onImageUploaded () {
      // "canvas のサイズ = 画像のサイズ" にします。
      // NOTE: v-for の中の ref は配列になる。
      //       ということで index で取得できます。
      const canvas = this.$refs.overlayCanvas
      const image = this.$refs.marunyanImage
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight

      // 矩形を描画
      const ctx = canvas.getContext('2d')
      for (const paragraph of marunyanParagraphs) {
        ctx.beginPath()
        ctx.moveTo(paragraph.leftTop.x, paragraph.leftTop.y)
        ctx.lineTo(paragraph.rightTop.x, paragraph.rightTop.y)
        ctx.lineTo(paragraph.rightBottom.x, paragraph.rightBottom.y)
        ctx.lineTo(paragraph.leftBottom.x, paragraph.leftBottom.y)
        ctx.closePath()
        ctx.lineWidth = 3
        ctx.strokeStyle = '#FF0000'
        ctx.stroke()
      }
    }
  }
}
</script>
