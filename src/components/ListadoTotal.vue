<template>
  <v-container fluid>

    <v-row no-gutters>
      <v-navigation-drawer
        v-model="drawer"
        clipped
        app
        stateless
        width="300"
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
              @click="getAll(false)">
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
                dense>
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

      <v-row justify="center" no-gutters>
        <v-card
          v-if="sinResultados"
          width="650"
          height="175"
          outlined
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
              <div class="text-overline mb-1">
                No se han encontrado resultados para los filtros ingresados
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
            </v-btn> e intenta seleccionando otras opciones de filtrado</span>
              
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
          class="mb-4 ml-4 mr-4  card-outter"
          v-for="(conflicto, index) in documentos"
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
            v-if="verMas"
            fab
            x-large
            @click="getAll(true)"
          >
            <v-icon x-large color="primary">mdi-plus</v-icon>
        </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      resultados: [],
      verMas: true,
      sinResultados: false,
      filtros: [],
      queryObject:[],
      pagina: 1,
      filtrar: { sector: [], region: [], from_year: 1900, till_year: 2021 },
      min: 1900,
      max: 2021,
      range: [1900, 2021],
      drawer: true,
      documentos:[],
      items: [
        { title: 'Región', icon: 'mdi-sign-real-estate' },
        { title: 'Sector', icon: 'mdi-map-marker' },
        { title: 'Año', icon: 'mdi-calendar-range' }

      ]
    }
  },
  methods: {
    openFilter () {
      this.drawer = !this.drawer
    },
    async getFiltros () {
      await axios.get('http://localhost:5000/api/filters'
      )
        .then(response => {
          console.log(response.data)
          this.filtros = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    async getAll (updatePage) {

      if(updatePage){
        this.queryObject.page = this.queryObject.page + 1
      }
      else{
        this.queryObject = {
            page: 1,
            from: this.range[0],
            until: this.range[1],
        }
        if (this.filtrar.region.length > 0)
        this.queryObject.region = this.filtrar.region

        if (this.filtrar.sector.length > 0)
          this.queryObject.sector = this.filtrar.sector
      }
      
      await axios.post('http://localhost:5000/api/get',
       this.queryObject
      )
        .then(response => {

          if(Object.keys(response.data).length === 0){
            this.sinResultados = true
            this.verMas = false
          }
          
          else{
            this.sinResultados = false

            if (updatePage){
                this.documentos = this.documentos.concat(response.data)
              }
              else{
                this.documentos = response.data
              }

            let nextPage = Object.assign({}, this.queryObject);
            nextPage.page = nextPage.page + 1
            
            axios.post('http://localhost:5000/api/get',
              nextPage
              )
                .then(response => {
                  if(Object.keys(response.data).length === 0)
                    this.verMas = false
                  else
                    this.verMas = true
                  
                })
                .catch(e => {
                  console.log(e)
                }) 
            }
        })
        .catch(e => {
          console.log(e)
        })
    },
    restablecerFiltros () {
      this.filtrar.region = []
      this.filtrar.sector = []
      this.range = [1900,2021]
      this.getAll(false)
    }
  },
  computed: {
    ...mapState(['consulta'])
  },
  mounted () {
    this.getFiltros()
    this.getAll(false)
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
.warningmsg{
   text-align: justify;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 20px;
  line-height: 35px;
}

</style>
