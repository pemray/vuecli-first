// 登录页
import {HOST} from '@/common/config'
import http from '@/common/http'
export function Login (params) {
  // 登录
  var opt = {
    LoginAccount: params.LoginAccount,
    LoginPass: params.LoginPass
  }
  const action = '/api/AppAgent/AppAgentLogin'
  const url = HOST + action
  return http.post(url, opt)
}

export function ResetPwd (params) {
  // 忘记密码/重置密码
  var opt = {
    PhoneNumber: params.PhoneNumber,
    SendMesgCode: params.SendMesgCode,
    OnePassword: params.OnePassword,
    SecPassword: params.SecPassword
  }
  const action = '/api/AppAgent/AppBackPassword'
  const url = HOST + action
  return http.post(url, opt)
}

export function SendYzm (params) {
  // 发送验证码
  var opt = {
    PhoneNumber: params.PhoneNumber,
    MemberID: '代理商找回密码'
  }
  const action = '/api/AppQuestion/SendMesg'
  const url = HOST + action
  return http.post(url, opt)
}
const api = {
  Login, ResetPwd, SendYzm
}
// 导出所有方法
export default api
