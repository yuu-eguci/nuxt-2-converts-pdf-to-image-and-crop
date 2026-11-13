<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title>
        <v-icon left>
          mdi-fruit-cherries
        </v-icon>
        {{ title }}
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        text
        to="/"
      >
        Index
      </v-btn>
      <v-btn
        text
        to="/marunyan"
      >
        Marunyan
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        fluid
      >
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      fixed: false,
      title: 'Nuxt Converts PDF to Image and Crop'
    }
  }
})
</script>
