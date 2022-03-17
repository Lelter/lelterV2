import Vue from 'vue'
import Router from 'vue-router'
import oneTimeLoad from '@/components/oneTimeLoad'
import PageLoad from '@/components/PageLoad'
import test from '@/components/test'
import about from '@/components/about'
import tonghuashun from '@/components/tonghuashun'

Vue.use(Router)

export default new Router({
  // mode: 'history',   // 模式，默认hash
  base: '/dist', // 基础路径
  routes: [

    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/oneTimeLoad',
      name: 'oneTimeLoad',
      component: oneTimeLoad
    },
    {
      path: '/PageLoad',
      name: 'PageLoad',
      component: PageLoad
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/tonghuashun',
      name: 'tonghuashun',
      component: tonghuashun
    }
  ]

})
