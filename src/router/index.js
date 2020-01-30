import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import gameLobby from '@/components/gameLobby'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/gameLobby',
      name: 'gameLobby',
      component: gameLobby
    }
  ]
})
