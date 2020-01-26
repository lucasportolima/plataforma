import Vue from 'vue'
import Router from 'vue-router'
import AuthService from '@/network/services/auth/auth-service'
import Login from '@/views/Login'
import Resume from '@/views/Resume'
import Partner from '@/views/Partner'
import News from '@/views/News'
import CurrentNews from '@/views/CurrentNews'
import Assessments from '@/views/Assessments'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'resume',
    component: Resume
  },
  {
    path: '/partner',
    name: 'partner',
    component: Partner,
    meta: { requiresAuth: true }
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments',
    name: 'assessments',
    component: Assessments,
    meta: { requiresAuth: true }
  },
  {
    path: '/current-news',
    name: 'current-news',
    component: CurrentNews,
    meta: { requiresAuth: true }
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !AuthService.isAuthenticated()) {
    next({
      name: 'login'
    })

    return
  }

  next()
})

export default router
