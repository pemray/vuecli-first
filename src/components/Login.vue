<template>
  <div>
    <div class="logo">
      <img alt="" src="@/../src/img/logo.png" />
      <p>代理商结算系统</p>
    </div>
    <ul class="dl_name">
      <li>
        <i class="icon iconfont icon-geren"></i>
        <input class="dl_text" type="text" id="LoginAccount" maxlength="32" placeholder="请输入账号" v-model="LoginAccount" />
      </li>
      <li>
        <i class="icon iconfont icon-mima"></i>
        <input class="dl_text" type="password" id="LoginPass" maxlength="32" placeholder="请输入密码" v-model="LoginPass" @keyup.enter="UserLogin"/>
      </li>
      <li><input class="dl_but" @click="UserLogin()" type="button" value="登录" /></li>
    </ul>
    <div class="dl_pass">
      <router-link to="/forgetPwd">忘记密码? </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import { Login } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      LoginAccount: '',
      LoginPass: ''
    }
  },
  comments: {},
  methods: {
    UserLogin () {
      const that = this
      if (this.LoginAccount === '') {
        this.$toast.show('请输入登录账号')
        return
      }
      if (this.LoginPass === '') {
        this.$toast.show('请输入登录密码')
        return
      }
      var wload = this.$weui.loading('请稍候...')
      Login({
        LoginAccount: this.LoginAccount,
        LoginPass: this.LoginPass
      }).then((ret) => {
        wload.hide()
        if (ret.Status === 1) {
          const data = ret.Data
          that.Agent = data
          localStorage.setItem('rphone', that.LoginAccount)
          localStorage.removeItem('Agent')
          localStorage.setItem('Agent', JSON.stringify(data))
          // 设置store数据
          that.$store.commit('RefreshAgent', data)
          that.$router.push('/home')
        } else {
          that.$weui.alert(ret.Msg || '登录失败')
        }
      })
    }
  },
  created () {
    const PhoneNumber = window.localStorage.getItem('rphone')
    if (PhoneNumber) {
      this.LoginAccount = PhoneNumber || ''
    }
    window.localStorage.clear()
    window.localStorage.setItem('rphone', PhoneNumber)
  }
}
</script>
