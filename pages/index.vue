<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-file-input
        label="Upload PDF"
        accept=".pdf"
        @change="onFileSelected"
      />

      <div v-if="images.length">
        <v-img
          v-for="(img, i) in images"
          :key="i"
          :src="img"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
