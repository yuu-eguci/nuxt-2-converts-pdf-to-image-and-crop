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
      <v-container>
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

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      fixed: false,
      title: 'Nuxt Converts PDF to Image and Crop'
    }
  }
}
</script>
