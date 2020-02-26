import Vue from 'vue'
import Router from 'vue-router'
import Resume from '@/views/Resume'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'resume',
    component: Resume
  }]
})

export default router
