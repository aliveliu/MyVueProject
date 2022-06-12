import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import User from '../components/User/user'
import Welcome from '../components/Welcome'
import Report from '../components/report/Report'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: { title: '登录' }
  },

  {
    path: '/home',
    component: Home,
    meta: { title: '首页' },
    redirect: '/welcome',
    children: [
      {
        path: '/users',
        component: User,
        meta: { title: '用户' }
      },
      {
        path: '/welcome',
        component: Welcome,
        meta: { title: '欢迎' }
      },
      {
        path: '/reports',
        component: Report,
        meta: { title: '报告' }
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.path === '/login') {

    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  console.log(tokenStr);
  if (!tokenStr) return next('./login')
  next()
})

export default router
