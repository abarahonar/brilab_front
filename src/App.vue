<template>
  <v-app >
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-row justify="center" class="hand" @click="algo">
        <v-img
          class="shrink mr-2"
          contain
          :src="require('@/assets/tierra.png')"
          transition="scale-transition"
          width="40"
        />
        <h2 class="titulos">Buscador de conflictos socioambientales</h2>
        </v-row>
    </v-app-bar>

    <v-main class="background">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    algo () {
      this.$router.push('/')
    }
  }
}
</script>
<style>
.background{
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: url(./assets/backg.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size:cover;
  }
  .titulos{
    font-family: 'Alfa Slab One', cursive;
    size: 50;
    text-shadow: 0 0 2px #000000, 0 0 2px #000000;
  }
  .hand{
    cursor: pointer;
  }
</style>
