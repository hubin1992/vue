import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/get',
      name: 'get',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "get" */ './views/get.vue')
    }, 
    {
      path: '/all',
      name: "axios.all",
      component: () => import(/* webpackChunkName: "all" */ "./views/all.vue")
    },
    {
      path: '/cantacList',
      name: "cantacList",
      component: () => import(/* webpackChunkName: "cantacList" */ "./views/cantacList.vue")
    }
  ]
})
