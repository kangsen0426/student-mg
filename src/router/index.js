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
      {
        path: '/studentlist',
        name: 'studentList',
        component: () => import('../views/students/studentList.vue')
      },
      {
        path: '/school',
        name: 'School',
        component: () => import('../views/School/School.vue')
      },
      {
        path: '/grades',
        name: 'grades',
        component: () => import('../views/Grades/grades.vue')
      },
      {
        path: '/facultydata',
        name: 'Facultydata',
        component: () => import('../views/Statistics/Facultydata.vue')
      },
      {
        path: '/classdata',
        name: 'Classdata',
        component: () => import('../views/Statistics/Classdata.vue')
      },
      {
        path: '/edit',
        name: 'edit',
        component: () => import('../views/setting/edit.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/setting/about.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
