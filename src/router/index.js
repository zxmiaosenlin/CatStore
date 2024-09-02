//createRouter创建路由实例
//createWebHistory创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CateList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //配置path和components
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          //这里是二级分类的路由
          //用:id作为占位符
          //意味着这个路径对应的是下方组件
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: CheckOut
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],
  //这里是每次更新路由的时候都回到页面顶部
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
