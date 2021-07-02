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
      <v-col cols="5" class="mb-4">
        <v-btn x-large>
        <v-icon large left>mdi-database-import-outline</v-icon>
          Ver Listado Completo de Documentos
        </v-btn>
      </v-col>
      <v-col
          cols="12"
          sm="8"
          md="8"
        >
          <v-text-field
            v-model="consulta"
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
                    @click="buscarPorTexto"
                  >mdi-magnify</v-icon>
                </template>
                <span>Buscar</span>
              </v-tooltip>
            </template>
          </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col cols="2">
        <v-btn block color="primary" x-large>
          Buscar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',

  data: () => ({
    consulta: ''
  }),
  methods: {
    ...mapMutations(['actualizarConsulta']),
    algo () {
      this.$router.push('resultados')
    },
    async buscarPorTexto () {
      await axios.get('http://localhost:5000/api/search',
        {
          params: { text: this.consulta, page: 1 }
        }
      )
        .then(response => {
          console.log(response.data)
          const payload = { resultados: response.data, add: 0, pagina: 1, termino: this.consulta }
          this.actualizarConsulta(payload)
          this.$router.push('resultados')
        })
        .catch(e => {
          console.log(e)
        })
    },
    async verTodos () {
      await axios.post('http://localhost:5000/api/get',
        {
          page: 1
        }
      )
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
