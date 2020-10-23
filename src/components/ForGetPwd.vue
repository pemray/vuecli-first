
<template>
  <transition name='fade'>
    <div class="">
      <div class="ztitl">代理商验证</div>
      <ul class="grxz">
        <li>
          <bdo>
            <input class="text" maxlength="11" id="PhoneNumber" type="tel" placeholder="请输入手机号码" v-model="PhoneNumber" />
          </bdo>
        </li>
        <li>
          <bdo>
            <input class="text" maxlength="4" id="yzm" type="text" placeholder="请输入验证码" v-model="YZM" />
          </bdo>
          <bdo :class="{z_red:Countdown>0}" @click="SendCode()">{{BtnCodeStr}}</bdo>
        </li>
      </ul>
      <div class="ztitl">新密码</div>
      <ul class="grxz">
        <li>
          <bdo>
            <input class="text" type="password" maxlength="32" id="OnePassword" placeholder="请输入密码" v-model="Pwd" />
          </bdo>
        </li>
        <li>
          <bdo>
            <input class="text" type="password" maxlength="32" id="SecPassword" placeholder="重复密码" v-model="RepeatPwd" />
          </bdo>
        </li>
      </ul>
      <div class="btn">
        <input class="dl_but" @click="Sure()" type="button" value="确认">
      </div>
    </div>
  </transition>
</template>
<script>
import {ResetPwd, SendYzm} from '@/api/login'
export default {
  name: 'ForGetPwd',
  data () {
    return {
      PhoneNumber: '',
      YZM: '',
      Pwd: '',
      RepeatPwd: '',
      Countdown: 0 // 倒计时
    }
  },
  computed: {
    BtnCodeStr () {
      let str = '获取验证码'
      if (this.Countdown > 0) str = `重新获取(${this.Countdown})`
      return str
    }
  },
  methods: {
    SendCode () {
      if (this.Countdown > 0) return false
      var that = this
      if (this.PhoneNumber === '' || !/^1[0-9]{10}/.test(this.PhoneNumber)) {
        this.$toast.show('请输入正确的手机号码')
        return false
      }
      var wload = this.$weui.loading('请稍候...')
      SendYzm({
        PhoneNumber: this.PhoneNumber,
        MemberID: '代理商找回密码'
      }).then((ret) => {
        wload.hide()
        if (ret.Status === 1) {
          that.$toast.show('发送成功')
          that.Countdown = 60
          that.SetTime()
        } else {
          that.$toast.show(ret.Msg || '发送失败')
        }
      })
    },
    SetTime () {
      var that = this
      if (this.Countdown > 0) {
        that.Countdown--
        setTimeout(function () {
          that.SetTime()
        }, 1000)
      }
    },
    Sure () {
      var that = this
      if (this.PhoneNumber === '' || !/^1[0-9]{10}/.test(this.PhoneNumber)) {
        this.$toast.show('请输入正确的手机号码')
        return
      }
      if (this.YZM === '') {
        this.$toast.show('请输入验证码')
        return
      }
      if (this.Pwd === '') {
        this.$toast.show('请输入登录密码')
        return
      }
      if (this.RepeatPwd === '') {
        this.$toast.show('请重复登录密码')
        return
      }
      var wload = this.$weui.loading('请稍候...')
      ResetPwd({
        PhoneNumber: this.PhoneNumber,
        SendMesgCode: this.YZM,
        OnePassword: this.Pwd,
        SecPassword: this.RepeatPwd
      }).then((ret) => {
        wload.hide()
        if (ret.Status === 1) {
          that.$weui.alert(ret.Msg, () => {
            that.$router.replace('/login')
          })
        } else {
          that.$weui.alert(ret.Msg || '重置密码失败')
        }
      })
    }
  }
}
</script>
