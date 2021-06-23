import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Retrieve from '../views/Retrieve.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resultados',
    name: 'Retrieve',
    component: Retrieve
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
