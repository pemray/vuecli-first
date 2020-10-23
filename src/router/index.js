import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ForGetPwd from '@/components/ForGetPwd'
import Home from '@/components/Home'
import UserInfo from '@/components/user/info'
import PotentialCustomer from '@/components/customer/Potential'
import RegularCustomer from '@/components/customer/Regular'
Vue.use(Router)

export default new Router({
  mode: 'history', // 类似C# mvc模式需要服务端支持
  scrollBehavior (to, form, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: ForGetPwd,
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        keepAlive: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: UserInfo,
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/potential',
      name: 'potential',
      component: PotentialCustomer,
      meta: {
        title: '我的客户'
      }
    },
    {
      path: '/regular',
      name: 'regular',
      component: RegularCustomer,
      meta: {
        title: '成交客户'
      }
    },
    // 默认路由
    {
      path: '/',
      name: 'root',
      redirect: '/login'
    }
  ]
})
