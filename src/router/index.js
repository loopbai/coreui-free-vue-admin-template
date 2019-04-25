import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// System
const Mails = () => import('@/customization/Mails')
const MailAdd = () => import('@/customization/MailAdd')
const MailEdit   = () => import('@/customization/MailEdit')
const SysLogin = () => import('@/customization/Login')
const SysRegister = () => import('@/customization/Register')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'mails',
          name: 'Mails',
          component: Mails
        },
        {
          path: 'mail/create',
          name: 'Mail-create',
          component: MailAdd
        },
        // 有參數需最後匹配
        {
          path: 'mail/:id',
          name: 'Mail-edit',
          component: MailEdit
        },

        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },
    {
      path: '/system',
      redirect: '/system/404',
      name: 'System',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: SysLogin
        },
        {
          path: 'register',
          name: 'Register',
          component: SysRegister
        }
      ]
    }
  ]
})
