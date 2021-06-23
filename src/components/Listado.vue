<template>
<v-container fluid>
<v-row justify="center" no-gutters>
  <v-col
    cols="12"
    md="7"
  >
    <v-text-field
      label="Nueva búsqueda"
      solo
      rounded
      height="60"
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
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
            x-large
            @click="openFilter">mdi-filter-variant
          </v-icon>
        </template>
        <span>Filtrar</span>
      </v-tooltip>
    </template>
    </v-text-field>
  </v-col>
</v-row>

<v-row justify="space-between" no-gutters>
<v-col v-if="drawer" cols="2">
    <v-navigation-drawer
      v-model="drawer"
      absolute
    >
      <v-list-item>
        <v-list-item-icon>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              @click="openFilter">mdi-close-circle-outline
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

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</v-col>
<v-col
  :cols="drawer ? 10:12"
>
<v-row justify="space-around" no-gutters>
  <v-card
    :width="drawer? 500:600"
    height="250"
    outlined
    elevation="5"
    class="mb-4 card-outter"
    v-for="(conflicto, index) in lista"
    :key="index"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Año de Conflicto
        </div>
        <v-list-item-title class="text-h5 mb-1">
          Título de conflicto
        </v-list-item-title>
        <v-list-item-subtitle>
          <span class="dots">{{resumen}}</span>
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
      <v-card-actions class="card-actions">
      <v-btn
        outlined
        rounded
        text
      >
        Descargar PDF
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-row>
</v-col>
  </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      drawer: false,
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
    }
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
  -webkit-line-clamp: 5;
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
