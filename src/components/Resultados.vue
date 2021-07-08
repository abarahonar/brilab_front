<template>
<v-container fluid>

    <v-navigation-drawer
      v-model="drawer"
      width="300"
      clipped
      app
      stateless
    >
      <v-list-item>
        <v-list-item-icon>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on">mdi-filter-variant
            </v-icon>
          </template>
          <span>Cerrar</span>
        </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Filtrar
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <template v-slot:append>
      <div class="pa-2">
          <v-btn
            block
            x-large
            color="primary"
            :disabled="filtrar.region.length == 0 && filtrar.sector.length == 0 && (range[0] == 1900 && range[1] == 2021)"
            @click="mostrar">
            Aplicar Filtros
          </v-btn>
        </div>
      </template>

      <v-list
        nav
      >
      <v-list-group
        prepend-icon="mdi-map-marker"
        >
          <template v-slot:activator>
            <v-list-item-title>Región</v-list-item-title>
          </template>
          <v-list-item-group
            v-model="filtrar.region"
            multiple
            active-class=""
          >
            <v-list-item
              v-for="region in filtros.regiones"
              :key="region[0]"
              dense
              link>
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-subtitle>{{region[0]}}</v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
      </v-list-group>
      <v-list-group
        prepend-icon="mdi-sign-real-estate"
        >
          <template v-slot:activator>
            <v-list-item-title>Sector</v-list-item-title>
          </template>

          <v-list-item-group
            v-model="filtrar.sector"
            multiple
            active-class=""
          >
            <v-list-item
              v-for="sector in filtros.sectores"
              :key="sector[0]"
              dense
              link>
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-subtitle>{{sector[0]}}</v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
      </v-list-group>
      <v-list-group
        prepend-icon="mdi-calendar-range"
        >
          <template v-slot:activator>
            <v-list-item-title>Año</v-list-item-title>
          </template>
          <v-list-item-group
            multiple
          >
            <v-list-item
              dense>
                <v-range-slider
                  v-model="range"
                  :max="max"
                  :min="min"
                  hide-details
                  class="align-center"
                >
                  <template v-slot:prepend>
                    <v-text-field
                      :value="range[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(range, 0, $event)"
                    ></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field
                      :value="range[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(range, 1, $event)"
                    ></v-text-field>
                  </template>
                </v-range-slider>
            </v-list-item>
          </v-list-item-group>
      </v-list-group>
      </v-list>
    </v-navigation-drawer>

<v-row justify="center">
  <v-col
    cols="8"
  >
    <v-text-field
      v-model="terminoConsulta"
      label="Nueva búsqueda"
      solo
      rounded
      height="65"
      clearable
      placeholder="Ingrese su búsqueda"
      append-icon="mdi-magnify"
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
    <div class="text-overline"> <span class="test">Se han encontrado los siguientes resultados para <strong>"{{consulta.termino}}"</strong></span> </div>
  </v-col>
<v-row justify="center" no-gutters>

  <v-card
    width="600"
    height="275"
    outlined
    elevation="5"
    class="mb-4 ml-4 mr-4 card-outter"
    v-for="(conflicto, index) in consulta.resultados"
    :key="index"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline">
          {{conflicto[4] + ' - ' + conflicto[2] }}
        </div>
        <v-list-item-subtitle>
          <div class="text-overline">
          {{conflicto[3]}}
        </div>
        </v-list-item-subtitle>
        <v-list-item-title class="text-h5 mb-1">
          {{conflicto[1]}}
        </v-list-item-title>
        <v-list-item-subtitle>
          <span class="dots">{{conflicto[5]}}</span>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="40"
      >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-img
            class="hand"
            :src="require('@/assets/pdf.png')"
            v-bind="attrs"
            v-on="on"
          ></v-img>
        </template>
        <span>Descargar</span>
      </v-tooltip>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
  </v-row>
</v-row>
  <v-row justify="center">
   <v-btn
      v-if="consulta.verMas"
      fab
      x-large
      @click="updatePagina"
    >
        <v-icon x-large color="primary">mdi-plus</v-icon>
    </v-btn>
  </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      terminoConsulta:'',
      resultados: [],
      filtros: [],
      filtrar: { sector: '', region: '', from_year: 0, till_year: 0 },
      min: 1900,
      max: 2021,
      range: [1900, 2021],
      drawer: true,
      items: [
        { title: 'Región', icon: 'mdi-sign-real-estate' },
        { title: 'Sector', icon: 'mdi-map-marker' },
        { title: 'Año', icon: 'mdi-calendar-range' }

      ]
    }
  },
  methods: {
    ...mapMutations(['actualizarConsulta']),
    buscarPorTexto () {
      const payload = {add: false, pagina: 1, termino: this.terminoConsulta }
      this.actualizarConsulta(payload)
    },
    openFilter () {
      this.drawer = !this.drawer
    },
    async getFiltros () {
      await axios.get('http://localhost:5000/api/filters'
      )
        .then(response => {
          this.filtros = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    updatePagina () {
      let payload = {}
      payload.add = true
      this.actualizarConsulta(payload)
    },
    mostrar () {
      this.filtrar.from_year = this.range[0]
      this.filtrar.till_year = this.range[1]
      console.log(this.filtrar)
    }
  },
  computed: {
    ...mapState(['consulta'])
  },
  mounted () {
    this.getFiltros()
  }
}

</script>

<style>
.hand{
    cursor: pointer;
  }
.dots {
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
.test{
  font-size: 18px;
}

</style>
