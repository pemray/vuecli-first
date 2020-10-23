/** 首页请求api */

import {HOST} from '@/common/config'
import http from '@/common/http'

// 获取统计数
export function GetRoyaltyCount (params) {
  var opt = {
    MemberID: params.MemberID,
    SearchType: params.SearchType,
    STime: params.STime,
    ETime: params.ETime
  }
  const action = '/api/AppAgent/AppGetAgentRoyaltyCount'
  const url = HOST + action
  return http.post(url, opt)
}
