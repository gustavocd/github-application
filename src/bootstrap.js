import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import './assets/sass/app.scss'
import Axios from 'axios'
import VueMaterial from 'vue-material'

Axios.defaults.baseURL = process.env.API_LOCATION
Axios.defaults.headers.common.Accept = 'application/vnd.github.v3+json'

Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios
  }
})

Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.use(VueRouter)
Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'deep-orange',
  accent: 'blue'
})

export const router = new VueRouter({
  routes
})

export default {
  router
}
