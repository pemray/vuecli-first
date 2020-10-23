/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'; import QS from 'qs'
// import { Toast } from 'vant'
// import store from '../store/index'
import router from 'vue-router'
import {HOST} from '@/common/config'
const instance = axios.create()
instance.defaults.baseURL = HOST
// 请求超时时间
instance.defaults.timeout = 10000
// post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    return config
  },
  error => {
    console.log('http-request-error:' + error)
    return Promise.error(error)
  })

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.status === 200) {
      // 正常结果,处理数据,返回正常需要的数据
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    // console.log('http-response-error:' + error)
    if (error && error.response) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        case 404:
          // Toast({
          //   message: '网络请求不存在',
          //   duration: 1500,
          //   forbidClick: true
          // })
          console.log('网络请求不存在', '404')
          break
          // 其他错误，直接抛出错误提示
        default:
          // Toast({
          //   message: error.response.data.message,
          //   duration: 1500,
          //   forbidClick: true
          // })
          console.log(error.response.data.message)
      }
      return Promise.reject(error.response)
    } else {
      // 这里一般是请求不到服务器,包装返回参数对象使请求流程正常结束
      let err = {
        Status: -999,
        Msg: '网络出现问题,请稍候再试'
      }
      return Promise.resolve(err)
    }
  }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export default instance
