<template>
  <keep-alive>
    <div>
      <div class="gr" data-descript="顶部数据">
        <div class="gr_t">
          <div class="gr_timg"><img alt="" :src="Agent.PhotoUrl||'img/tx.png'" /></div>
          <div class="gr_title">
            <h1 v-text="Agent.MName || Agent.MemberName"></h1>
            <p v-text="Agent.PhoneNumber"></p>
          </div>
          <div class="gr_ico" @click="Selfcenter()">
            <i class="iconfont icon-gengduo"></i>
          </div>
        </div>
        <div class="fwjl">
          服务老师：
          <span v-text="Agent.LMName || '无'">&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          电话：
          <span v-text="Agent.LPhoneNumber || '无'">&nbsp;&nbsp;</span>
        </div>
        <ul class="gr_j">
          <!-- <li @click="Potentialcustomers()">

          </li> -->
          <router-link to="/potential" tag="li">
            <bdo v-text="ZQPNumber">0</bdo>
            <p><i class="iconfont icon-kehu"></i>抓潜客户</p>
          </router-link>
          <li @click="Graspcustomers()">
            <bdo v-text="JYPepoleCount">0</bdo>
            <p><i class="iconfont icon-shoukuanrenguanli"></i>成交客户</p>
          </li>
        </ul>
      </div>
      <div class="gr_body" data-descript="菜单">
        <template v-if='Agent.RoleID == 4'>
          <div class="fz_bg" v-for='(item) in LectureList' v-bind:key='item.LCID'>
            <div class="fz_d">{{FunLectrueStateStr(item)}}</div>
            <div class="fz_bt">
              <h1>{{item.LectureName}}</h1>
              <p>{{item.LectureClassName}}</p>
              <p>报名学员：{{item.EnrollNumber}}名 共{{item.GroupNumber}}组</p>
            </div>
            <ul class="fz_list">
              <li @click="ClassTable(item)">
                <i class="iconfont icon-kecheng1"></i>
                <p>课程表</p>
              </li>
              <li @click="ScoreSys(item)">
                <i class="iconfont icon-kechengfenxi"></i>
                <p>评分系统</p>
              </li>
              <li @click="StuRoster(item)">
                <i class="iconfont icon-renyuanmingdan"></i>
                <p>学员名册</p>
              </li>
              <li @click="JoinTeam(item)">
                <i class="iconfont icon-kechengshouquan"></i>
                <p>入营签到</p>
              </li>
            </ul>
            <div class="fz_bb" @click="MoreTeam">更多课程</div>
          </div>
        </template>
        <dl class="grtop">
          <dt>销售中心</dt>
          <dd>
            <bdo class="grtop_i" @click="Customersorder()">
              <i class="iconfont icon-peizhitubiaosvg-1"></i>
              <p>客户订单</p>
            </bdo>
            <bdo class="grtop_i" @click="Royaltystatistics()">
              <i class="iconfont bg_ylw icon-yingshou"></i>
              <p>提成统计</p>
            </bdo>
            <bdo v-if="MPartner=='YTJY' && PhoneNumber=='18583994765'" class="grtop_i" @click="Achievement()">
              <i class="iconfont bg_blue icon-peizhitubiaosvg-3"></i>
              <p>员工业绩</p>
            </bdo>
            <bdo v-if="MPartner=='YTJY' && PhoneNumber=='18583994765'" class="grtop_i" @click="GraspPotential()">
              <i class="iconfont bg_red  icon-tongjibaobiao"></i>
              <p>员工抓潜</p>
            </bdo>
          </dd>
        </dl>
        <dl class="grtop" v-if="Agent.RoleID==4">
          <dt>随手签</dt>
          <dd>
            <bdo class="grtop_i" @click="AddNewCustomer">
              <i class="iconfont bg_ble icon-peizhitubiaosvg-">
                <!-- <span>9</span> -->
              </i>
              <p>新增客户</p>
            </bdo>
            <bdo class="grtop_i" @click="AddNewChild">
              <i class="iconfont icon-xueshengdangan"></i>
              <p>新增孩子</p>
            </bdo>
            <bdo class="grtop_i" @click="AddNewOrder">
              <i class="iconfont bg_blue  icon-shuru"></i>
              <p>新增订单</p>
            </bdo>
            <bdo class="grtop_i" @click="QueryOrder">
              <i class="iconfont bg_red icon-sousuo"></i>
              <p>查询订单</p>
            </bdo>
            <bdo class="grtop_i" @click="QueryCustomer">
              <i class="iconfont bg_ylw icon-peizhitubiaosvg-1"></i>
              <p>查询客户</p>
            </bdo>
          </dd>
        </dl>
        <dl class="grtop" v-if="Agent.RoleID==4">
          <dt>签呈</dt>
          <dd>
            <bdo class="grtop_i" @click="MyQC">
              <i class="iconfont bg_ylw icon-shenqingbanka"></i>
              <p>签呈申请</p>
            </bdo>
            <bdo class="grtop_i" @click="MyQCApply">
              <i class="iconfont bg_ble icon-dingdan1"></i>
              <p>我的签呈</p>
            </bdo>
            <bdo class="grtop_i" @click="MyQCAudit">
              <i class="iconfont  icon-shenhe">
                <span v-if="WrCount">{{WrCount}}</span>
              </i>
              <p>我的审批</p>
            </bdo>
            <bdo class="grtop_i" @click="MyQChandle">
              <i class="iconfont bg_blue icon-Icon-daichuli">
                <span v-if="SWrCount">{{SWrCount}}</span>
              </i>
              <p>我的处理</p>
            </bdo>
            <bdo class="grtop_i" @click="TXL">
              <i class="iconfont bg_red icon-tongxunlu"></i>
              <p>通讯录</p>
            </bdo>
          </dd>
        </dl>
        <dl class="grtop">
          <dt>个人设置</dt>
          <dd>
            <!-- <bdo class="grtop_i" @click="MessCenter()">
                        <i class="icon iconfont bg_blue icon-pinglun"></i>
                        <p>消息中心</p>
                    </bdo>
                    <bdo class="grtop_i"  @click="AgentReceivables()">
                        <i class="icon iconfont bg_ble icon-yingshou"></i>
                        <p>收款账号管理</p>
                    </bdo>
                    <bdo class="grtop_i" @click="Selfcenter()">
                        <i class="iconfont icon-geren"></i>
                        <p>个人信息</p>
                    </bdo> -->
            <bdo class="grtop_i" @click="UpdPassword()">
              <i class="iconfont bg_blue icon-mima"></i>
              <p>
                修改密码
              </p>
            </bdo>
            <bdo class="grtop_i">
              <i class="iconfont bg_red icon-tuichu5"></i>
              <router-link to="/login" replace tag="p">
                退出系统
              </router-link>
            </bdo>
          </dd>
        </dl>
      </div>
    </div>
  </keep-alive>
</template>
<script>
import { GetRoyaltyCount } from '@/api/home'
export default {
  name: 'home',
  data () {
    return {
      Agent: {},
      ZQPNumber: 0,
      JYPepoleCount: 0,
      MPartner: '',
      PhoneNumber: '',
      WrCount: 0,
      SWrCount: 0,
      /* 分组相关 */
      LectureList: [],
      showdia: false
    }
  },
  computed: {
    FunLectrueStateStr: function (item) {
      return function (item) {
        var str = '课程未开始'
        if (item.IsTime === 0) {

        } else if (item.IsTime === 1) {
          str = '课程已开始'
        } else if (item.IsTime === 2) {
          str = '课程已结束'
        }
        return str
      }
    }
  },
  methods: {
    Selfcenter: function () {
      // window.location.href = 'Selfcenter.html'
      this.$router.push('/user')
    },
    GetCount: function () {
      const that = this
      GetRoyaltyCount({
        MemberID: this.Agent.MemberID,
        SearchType: '1',
        STime: '',
        ETime: ''
      }).then((ret) => {
        if (ret.Status === 1) {
          var data = ret.Data || {}
          that.ZQPNumber = data.ZQPNumber || 0
          that.JYPepoleCount = data.JYPepoleCount || 0
        }
      })
    },
    Potentialcustomers: function () {
      //
      window.location.href = 'Potentialcustomers.html'
    },
    Graspcustomers: function () {
      window.location.href = 'Graspcustomers.html'
    },
    MessCenter: function () {
      window.location.href = 'MessCenter.html'
    },
    Customersorder: function () {
      // 客户订单
      window.location.href = 'Customersorder.html'
    },
    Royaltystatistics: function () {
      // 提成统计
      window.location.href = 'Royaltystatistics.html'
    },
    AgentReceivables: function () {
      // 收款账户管理
      window.location.href = 'AgentReceivables.html'
    },
    UpdPassword: function () {
      // 修改密码
      window.location.href = 'Updpassword.html'
    },
    CloseLogin: function () {
      // Agent
      // var rphone = localStorage.getItem('rphone')
      // window.localStorage.clear()
      // localStorage.setItem('rphone', rphone)
      // window.location.replace('/Static/Agent/Login.html')
    },
    Achievement: function () {
      // 员工业绩
      window.location.href = ('Achievement.html')
    },
    GraspPotential: function () {
      // 员工抓潜
      window.location.href = ('GraspPotential.html')
    },
    /* 随手签 */
    AddNewCustomer: function () {
      // 新增客户
      window.location.href = ('Autograph/AddNewCustomer.html')
    },
    AddNewOrder: function () {
      // 新增订单
      window.location.href = ('Autograph/AddNewOrder.html')
    },
    QueryOrder: function () {
      // 查询订单
      window.location.href = ('Autograph/QueryOrder.html')
    },
    QueryCustomer: function () {
      // 查询客户
      window.location.href = ('Autograph/QueryCustomer.html')
    },
    AddNewChild: function () {
      // 新增孩子
      window.location.href = ('Autograph/AddChild.html')
    },
    /* 签呈 */
    MyQC: function () {
      // 签呈申请
      window.location.href = ('QianCheng/Apply.html')
    },
    TXL: function () {
      // 通讯录
      window.location.href = ('QianCheng/txl.html')
    },
    MyQCApply: function () {
      // 我的签呈申请-列表
      window.location.href = ('QianCheng/ApplyList.html')
    },
    MyQCAudit: function () {
      // 我的签呈审核列表
      window.location.href = ('QianCheng/AuditList.html')
    },
    MyQChandle: function () {
      // 我的签呈处理列表
      window.location.href = ('QianCheng/HandleList.html')
    },
    // 查询签呈未处理数
    GetNoHandleCount: function () {
      if (this.Agent.RoleID !== '4') return false
      // var that = this
      // var json = {
      //   MemberID: Agent.MemberID,
      //   UserID: Agent.UserID,
      //   OrganizationID: Agent.OrganizationID
      // }
      // $.post('/api/AppWrApproval/AppSWWrCount', json, function (res) {
      //   if (res.Status == 1) {
      //     that.SWrCount = res.Data.WrCount || 0
      //   }
      // }).error((e) => {
      // })
    },
    // 查询签呈未审核数
    GetNoAuditCount: function () {
      if (this.Agent.RoleID !== '4') return false
      // var that = this
      // var json = {
      //   MemberID: Agent.MemberID,
      //   UserID: Agent.UserID
      // }
      // $.post('/api/AppWrApproval/AppWWrCount', json, function (res) {
      //   if (res.Status == 1) {
      //     that.WrCount = res.Data.WrCount || 0
      //   }
      // }).error((e) => {
      // })
    },
    /* 分组模块 */
    GetTeamList: function () {
      if (this.Agent.RoleID !== '4') {
        return false
      }
      console.log('GetTeamList')
      // 加载开课列表
      // var that = this
      // var json = {
      //   MemberID: this.Agent.MemberID,
      //   UserID: this.Agent.UserID,
      //   SearchTimeType: 0, // 0-当前 1-往届
      //   LectureID: '5c560ebceea74f059946aa4c36b13e75'
      // }

      // $.post('/api/AppGroupLectureUser/AppGroupLectureListByAID', json, function (res) {
      //   if (res.Status === 1) {
      //     that.LectureList = res.Data.Items || []
      //   }
      // }).error((e) => {
      // })
    },
    // 课程表
    ClassTable: function (item) {
      window.location.href = 'StudentGrouping/ClassTable.html?LectureID=' + item.LectureID + '&LCID=' + item.LCID
    },
    // 评分系统
    ScoreSys: function (item) {
      if (item.GroupNumber <= 0) {
        this.$toast.show('当前未分组')
        return
      }
      if (item.IsCoach <= 0) {
        this.$toast.show('暂无权限')
        return
      }
      if (item.IsTime === 2) {
        this.$toast.show('课程已结束')
        return
      }
      window.location.href = 'StudentGrouping/ScoreSys.html?LectureID=' + item.LectureID + '&LCID=' + item.LCID
    },
    // 学员名册
    StuRoster: function (item) {
      window.location.href = 'StudentGrouping/StuRoster.html?LectureID=' + item.LectureID + '&LCID=' + item.LCID
    },
    // 入营
    JoinTeam: function (item) {
      if (item.GroupNumber <= 0) {
        this.$toast.show('当前未分组')
        return
      }
      if (item.IsCoach <= 0) {
        this.$toast.show('暂无权限')
        return
      }
      if (item.IsTime === 2) {
        this.$toast.show('课程已结束')
        return
      }
      window.location.href = 'StudentGrouping/JoinTeam.html?LectureID=' + item.LectureID + '&LCID=' + item.LCID
    },
    MoreTeam: function () {
      window.location.href = 'StudentGrouping/MoreTeam.html'
    }
  },
  created () {
    console.log('home-created')
  },
  activated () {
    // 当该组件是keep-live时有效,则使用该生命周期替换 created方法达到刷新数据的方法
    this.Agent = this.$store.state.Agent
    this.GetCount()
    this.GetNoHandleCount()
    this.GetNoAuditCount()
    this.GetTeamList()
  }
}
</script>
