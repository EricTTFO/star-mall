import Vue from 'vue'
import VueRouter from 'vue-router'
// 原因：在路由中添加了相同的路由。
// 解决：重写路由的push方法
// 解决路由命名冲突的方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
import Index from '@/views/Index'
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'home',
    component: Index,
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'goods',
        component: () => import('@/views/Goods')
      },
      {
        path: 'thanks',
        component: () => import('@/views/Thanks')
      },
      {
        path: 'goodsDetail',
        name: 'goodsDetail',
        component: () => import('@/views/GoodsDetail')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User'),
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
