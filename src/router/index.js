import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: () => import('../components/Home.vue'),
    children:[
      {
        path: '/welcome',
        name: 'WelCome',
        component: () => import('../components/WelCome.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
