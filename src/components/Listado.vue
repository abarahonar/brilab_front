<template>
<v-container fluid>

<v-row justify="center" no-gutters>
<v-col cols="2">
    <v-navigation-drawer
      v-model="drawer"
      width="300"
      absolute
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
      <div class="pa-2">
          <v-btn
            block
            color="primary"
            :disabled="filtrar.region.length == 0 && filtrar.sector.length == 0 && (range[0] == 1900 && range[1] == 2021)"
            @click="mostrar">
            Aplicar Filtros
          </v-btn>
        </div>

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
</v-col>
<v-col></v-col>

<v-col
  cols="10"
>
<v-row justify="center" no-gutters>
  <v-col
    cols="8"
  >
    <v-text-field
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
            @click="algo"
          >mdi-magnify</v-icon>
        </template>
        <span>Buscar</span>
      </v-tooltip>
    </template>
    </v-text-field>
  </v-col>
<v-col cols="11">
<v-row no-gutters>
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
      <!--v-card-actions class="card-actions">
      <v-btn
        outlined
        rounded
        text
      >
        Descargar PDF
      </v-btn>
    </v-card-actions-->
  </v-card>
  </v-row>
  </v-col>
</v-row>

</v-col>
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
      filtros: [],
      filtrar: { sector: '', region: '', from_year: 0, till_year: 0 },
      min: 1900,
      max: 2021,
      range: [1900, 2021],
      drawer: true,
      resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at vulputate magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum commodo lorem eu erat aliquam, sit amet suscipit enim aliquam. Ut eget neque varius dui tempus semper. Nunc consequat posuere velit et ultrices. Aenean ac urna ut ipsum tempor convallis. Pellentesque ac sem leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In hac habitasse platea dictumst. Etiam vitae leo tristique, maximus nisi vel, placerat sapien. Vestibulum semper quam mauris, non pharetra dolor ultrices vel. Vestibulum enim dolor, lacinia. ',
      lista: [
        { nombre: 'Conflicto 1', anio: 'Año 1', resumen: 'Su resumen piola 1', link: ' ' },
        { nombre: 'Conflicto 2', anio: 'Año 2', resumen: 'Su resumen piola 2', link: ' ' },
        { nombre: 'Conflicto 3', anio: 'Año 3', resumen: 'Su resumen piola 3', link: ' ' },
        { nombre: 'Conflicto 4', anio: 'Año 4', resumen: 'Su resumen piola 4', link: ' ' },
        { nombre: 'Conflicto 5', anio: 'Año 5', resumen: 'Su resumen piola 5', link: ' ' },
        { nombre: 'Conflicto 6', anio: 'Año 6', resumen: 'Su resumen piola 6', link: ' ' },
        { nombre: 'Conflicto 7', anio: 'Año 7', resumen: 'Su resumen piola 7', link: ' ' },
        { nombre: 'Conflicto 8', anio: 'Año 8', resumen: 'Su resumen piola 8', link: ' ' },
        { nombre: 'Conflicto 9', anio: 'Año 9', resumen: 'Su resumen piola 9', link: ' ' },
        { nombre: 'Conflicto 10', anio: 'Año 10', resumen: 'Su resumen piola 10', link: ' ' },
        { nombre: 'Conflicto 11', anio: 'Año 11', resumen: 'Su resumen piola 11', link: ' ' },
        { nombre: 'Conflicto 12', anio: 'Año 12', resumen: 'Su resumen piola 12', link: ' ' },
        { nombre: 'Conflicto 13', anio: 'Año 13', resumen: 'Su resumen piola 13', link: ' ' },
        { nombre: 'Conflicto 14', anio: 'Año 14', resumen: 'Su resumen piola 14', link: ' ' }
      ],
      items: [
        { title: 'Región', icon: 'mdi-sign-real-estate' },
        { title: 'Sector', icon: 'mdi-map-marker' },
        { title: 'Año', icon: 'mdi-calendar-range' }

      ]
    }
  },
  methods: {
    algo () {
      console.log('algo')
    },
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

</style>
