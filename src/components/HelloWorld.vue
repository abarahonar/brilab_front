<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/socioambiental.png')"
          class="my-3"
          contain
          height="300"
        />
      </v-col>
      <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            label="Ingrese su búsqueda"
            solo
            rounded
            height="60"
            clearable
            placeholder="Ingrese su búsqueda"
          >
            <template v-slot:append>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    large
                    @click="algo"
                  >mdi-magnify</v-icon>
                </template>
                <span>Buscar</span>
              </v-tooltip>
            </template>
          </v-text-field>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
  }),
  methods: {
    algo () {
      this.$router.push('resultados')
    }
  }
}
</script>
