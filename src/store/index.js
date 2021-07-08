import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'
export default new Vuex.Store({
  state: {
    consulta: {
      resultados: [],
      pagina: [],
      termino: [],
      verMas : false,
      sinResultados : false,
    }
  },
  mutations: {
    async actualizarConsulta (state, payload) {
      
      let params = {}

      if (payload.add){
        params = { text: state.consulta.termino, page: state.consulta.pagina + 1}
      }
      
      else{
        params = { text: payload.termino, page: 1 }
      }
        
      await axios.get('http://localhost:5000/api/search',
          {
            params: params
          }
        )
          .then(response => {
            console.log(response.data)

            if(Object.keys(response.data).length === 0){
              state.consulta.resultados = []
              state.consulta.sinResultados = true
              state.consulta.verMas = false
            }
            else{
              state.consulta.sinResultados = false

              if (payload.add){
                state.consulta.resultados = state.consulta.resultados.concat(response.data)
                state.consulta.pagina = state.consulta.pagina + 1
              }
              else{
                state.consulta.resultados = response.data 
                state.consulta.pagina = 1 
                state.consulta.termino = payload.termino
              }

              axios.get('http://localhost:5000/api/search',{
                  params: { text: state.consulta.termino, page: state.consulta.pagina + 1 }
                }
              )
                .then(response => {
                  console.log(response.data)
                  if(Object.keys(response.data).length === 0)
                    state.consulta.verMas = false
                  else{
                    state.consulta.verMas = true
                  }
              })
              .catch(e => {
                console.log(e)
              })

            }
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
  actions: {
  },
  modules: {
  }
})
