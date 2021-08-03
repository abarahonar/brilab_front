<template>
<v-container fluid>

  <v-navigation-drawer
    v-model="drawer"
    v-if="!consulta.sinResultados"
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
            v-on="on"
            @click="openFilter">mdi-close-circle
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
    <div class="pa-2">
        <v-btn
          block
          color="warning"
          :disabled="filtrar.region.length == 0 && filtrar.sector.length == 0 && (range[0] == 1900 && range[1] == 2021)"
          @click="restablecerFiltros">
          Restablecer Filtros
        </v-btn>
      </div>
    <template v-slot:append>
    <div class="pa-2">
        <v-btn
          block
          x-large
          color="primary"
          @click="aplicarFiltros(false)">
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
          multiple
        >
          <v-list-item
            v-for="region in filtros.regiones"
            :key="region[0]"
            dense
            link>
              <v-list-item-action>
                <v-checkbox v-model="filtrar.region" :value="region[0]"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-subtitle>{{region[0]}}</v-list-item-subtitle>
              </v-list-item-content>
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
          multiple
        >
          <v-list-item
            v-for="sector in filtros.sectores"
            :key="sector[0]"
            dense
            link>
              <v-list-item-action>
                <v-checkbox v-model="filtrar.sector" :value="sector[0]"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-subtitle>{{sector[0]}}</v-list-item-subtitle>
              </v-list-item-content>
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
        @keydown.enter="buscarPorTexto"
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
      <template v-if="!consulta.sinResultados" v-slot:append-outer>
        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
            x-large
            @click="openFilter">mdi-filter-variant
          </v-icon>
        </template>
        <span>Filtrar Resultados</span>
      </v-tooltip>
      </template>
      </v-text-field>
      <div v-if="!(consulta.sinResultados || filtroSinResultados)" class="text-overline text-center"> <span class="test">Se han encontrado los siguientes resultados para <strong>"{{consulta.termino}}"</strong></span> </div>
    </v-col>
    <v-row v-if="!hayFiltro" justify="center" no-gutters>
      <v-card
        v-if="consulta.sinResultados"
        width="650"
        height="280"
        elevation="5"
        class="card-outter"

      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-subtitle>
              <div class="text-overline">
              Error
            </div>
            </v-list-item-subtitle>
            <div class="text-overline">
              <span style="font-size:15px">No se han encontrado resultados para <strong>"{{consulta.termino}}"</strong></span>
            </div>
              
            <v-list-item-subtitle>
              <span class="warningmsg">Sugerencias
                <ul>
                  <li>Asegúrate de que todas las palabras estén escritas correctamente.</li>
                  <li>Prueba diferentes palabras clave.</li>
                  <li>Prueba palabras clave más generales.</li>
                </ul>
              </span>
            
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="50"
          >
              <v-icon x-large color="warning"
              >mdi-alert-box</v-icon>
          </v-list-item-avatar>
        </v-list-item>
      </v-card>

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
                  @click="downloadPdf(conflicto[0])"
                ></v-img>
            </template>
            <span>Descargar</span>
          </v-tooltip>
          </v-list-item-avatar>
        </v-list-item>
      </v-card>
    </v-row>
    <v-row v-else justify="center" no-gutters>
      <v-card
        v-if="filtroSinResultados"
        width="650"
        height="280"
        elevation="5"
        class="card-outter"

      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-subtitle>
              <div class="text-overline">
              Error
            </div>
            </v-list-item-subtitle>
            <div class="text-overline">
              <span style="font-size:15px">No se han encontrado resultados para los filtros ingresados sobre la consulta <strong>"{{consulta.termino}}"</strong></span>
            </div>
              
            <v-list-item-subtitle>
              <span class="warningmsg">Prueba
                <v-btn
                  color="warning"
                  elevation="0"
                  small
                  :disabled="filtrar.region.length == 0 && filtrar.sector.length == 0 && (range[0] == 1900 && range[1] == 2021)"
                  @click="restablecerFiltros">
                  Restablecer Filtros
                </v-btn> e intenta seleccionando otras opciones de filtrado.
              </span>
            
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="50"
          >
              <v-icon x-large color="warning"
              >mdi-alert-box</v-icon>
          </v-list-item-avatar>
        </v-list-item>
      </v-card>
      <v-card
        width="600"
        height="275"
        outlined
        elevation="5"
        class="mb-4 ml-4 mr-4 card-outter"
        v-for="(conflicto, index) in resultadosFiltrados"
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
                  @click="downloadPdf(conflicto[0])"
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
      url:'https://brilab_files.storage.googleapis.com/',
      terminoConsulta:'',
      hayFiltro:false,
      sinFiltrar:[],
      resultadosFiltrados: [],
      filtroSinResultados: false,
      filtros: [],
      filtrar: { sector: [], region: []},
      min: 1900,
      max: 2021,
      range: [1900, 2021],
      drawer: false,
      items: [
        { title: 'Región', icon: 'mdi-sign-real-estate' },
        { title: 'Sector', icon: 'mdi-map-marker' },
        { title: 'Año', icon: 'mdi-calendar-range' }

      ]
    }
  },
  methods: {
    ...mapMutations(['actualizarConsulta']),
    openFilter(){
      this.drawer = !this.drawer
    },
    buscarPorTexto () {
      this.$router.push({
        name: 'Retrieve',
        query:{text: this.terminoConsulta}
      })
      this.restablecerFiltros ()
      this.hayFiltro = false
      this.resultadosFiltrados = []
      const payload = {add: false, pagina: 1, termino: this.terminoConsulta }
      this.actualizarConsulta(payload)
    },
    restablecerFiltros () {
      this.filtrar = { sector: [], region: []}
      this.resultadosFiltrados = []
      this.range = [1900,2021]
      this.hayFiltro = false
      this.filtroSinResultados = false
    },
    aplicarFiltros(updatePage){
      this.hayFiltro = true
      let tempFiltros = this.filtrar
      let tempRange = this.range
      var filtro = this.consulta.resultados.filter(function (elemento) {
        var filterResult = true
        if(tempFiltros.region.length > 0)
          filterResult = filterResult && tempFiltros.region.includes(elemento[2])
        if(tempFiltros.sector.length > 0)
          filterResult = filterResult && tempFiltros.sector.includes(elemento[3])
        filterResult = filterResult && (elemento[4] >= tempRange[0] && elemento[4] <= tempRange[1])
        return filterResult
      })
      if(updatePage)
        this.resultadosFiltrados = this.resultadosFiltrados.concat(filtro.filter((item) => this.resultadosFiltrados.indexOf(item) < 0))
      else
        this.resultadosFiltrados = filtro

      if(this.resultadosFiltrados.length == 0)
        this.filtroSinResultados = true
      else
        this.filtroSinResultados = false
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
      if(this.hayFiltro)
        this.aplicarFiltros(true)
    },
    downloadPdf (pdf) {
      window.open(this.url+pdf, '_blank')
    }
  },
  computed: {
    ...mapState(['consulta'])
  },
  mounted () {
    const payload = {add: false, pagina: 1, termino: this.$route.query.text }
    this.actualizarConsulta(payload)
    this.getFiltros()
  }
}

</script>

<style scoped>
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
.warningmsg{
   text-align: justify;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
  line-height: 35px;
}

</style>
