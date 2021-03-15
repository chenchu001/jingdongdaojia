import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'

const routes = [
  {
    path: '/',
    redirect: '/index',
    meta: { title: '首页' }
  },
  {
    path: '/index',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop'),
    meta: { title: '商店' }
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList'),
    meta: { title: '购物车' }
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation'),
    meta: { title: '确认订单' }
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList'),
    meta: { title: '我的订单' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登陆', index: 0 },
    beforeEnter: (to, from, next) => {
      const isLogin = localStorage.isLogin
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register'),
    meta: { title: '注册', index: 1 },
    beforeEnter: (to, from, next) => {
      const isLogin = localStorage.isLogin
      isLogin ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  document.title = to.meta.title
  if (to.name === 'Login' || isLogin || to.name === 'Register') {
    next()
  } else {
    next({ name: 'Login' })
  }
})

export default router
