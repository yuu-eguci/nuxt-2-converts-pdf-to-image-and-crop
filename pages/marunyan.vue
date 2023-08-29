<template>
  <v-row>
    <v-col
      cols="8"
      class="text-center"
    >
      <img
        src="/marunyan.png"
        alt="Vuetify.js"
        class="mb-5"
      >
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
          <template #default="{ item, index }">
            <v-list-item :key="item.id">
              <v-list-item-content>
                <v-list-item-title>
                  {{ index }} {{ item }}
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
  },
  mounted () {
    this.activityLogs.unshift('mounted が呼ばれたよ。')
  }
}
</script>
