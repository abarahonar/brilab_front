import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    consulta: {
      resultados: [],
      pagina: [],
      termino: []
    }
  },
  mutations: {
    actualizarConsulta (state, payload) {
      if (payload.add) {
        state.consulta.resultados = state.consulta.resultados.concat(payload.resultados)
        state.consulta.pagina = state.consulta.pagina + 1
      } else {
        state.consulta.resultados = payload.resultados
        state.consulta.pagina = 1
        state.consulta.termino = payload.termino
      }
      console.log(state.consulta)
    }
  },
  actions: {
  },
  modules: {
  }
})
