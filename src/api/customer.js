/** 我的客户相关请求 api */

import {HOST} from '@/common/config'
import http from '@/common/http'

// 获取统计数
export function GetPotentialList (params) {
  var opt = {
    MemberID: params.MemberID,
    StrWhere: params.StrWhere,
    PageIndex: params.PageIndex,
    PageSize: params.PageSize
  }
  const action = '/api/AppAgent/AppGraspMemberByRID'
  const url = HOST + action
  return http.post(url, opt)
}
const api = {
  GetPotentialList
}
export default api
