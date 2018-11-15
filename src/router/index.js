import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/Login'
import Home from '@/components/page/Home'
import Register from '@/components/page/Register'
import Error from '@/components/common/Error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home/:userid(\\d+)',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/*',
      name: 'Error',
      component: Error
    }
  ]
})
