<template>
  <div>
    <ul class="grxz">
      <li>
        <bdo class="grxz_titl">头像</bdo>
        <bdo>
          <img id="PhotoUrl" class="tx" alt="" :src="Agent.PhotoUrl" />
        </bdo>
      </li>
      <li>
        <bdo class="grxz_titl">姓名</bdo>
        <bdo id="MName">{{Agent.MName || Agent.MemberName}}</bdo>
      </li>
      <li>
        <bdo class="grxz_titl">账号/手机号</bdo>
        <bdo id="LoginAccount">{{Agent.MemberAccount}}</bdo>
      </li>
      <li>
        <bdo class="grxz_titl">注册日期</bdo>
        <bdo id="CreateTime">{{CreateTime}}</bdo>
      </li>
    </ul>
    <!-- <li>
        <bdo class="grxz_titl">邮箱</bdo>
        <bdo id="Mailbox">{{Agent.Mailbox}}</bdo>
        <bdo class="grtop_ico"><i class="iconfont icon-gengduo"></i></bdo>
    </li>
    <li>
        <bdo class="grxz_titl">手机</bdo>
        <bdo id="PhoneNumber"></bdo>
        <bdo class="grtop_ico"><i class="iconfont icon-gengduo"></i></bdo>
    </li><ul class="grxz">
        <li>
            <bdo class="grxz_titl">修改密码</bdo>
            <bdo></bdo>
            <bdo class="grtop_ico"><i class="iconfont icon-gengduo"></i></bdo>
        </li>
    </ul> -->
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      Agent: {}
    }
  },
  computed: {
    CreateTime () {
      return this.Agent.CreateTime.substr(0, 10)
    }
  },
  created () {
    this.Agent = this.$store.state.Agent
  }
}
</script>
