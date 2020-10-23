<template>
  <div ref="Mescroll">
    <div class="tj_x">
      <div>
        <h2></h2>
        <p></p>
      </div>
      <div>
        <h2 id="ZQPNumber">{{ZQPNumber}}</h2>
        <p>抓潜总客户</p>
      </div>
      <div>
        <h2 id="ZQDRPNumber">{{ZQDRPNumber}}</h2>
        <p>今日新增</p>
      </div>
    </div>
    <div class="">
      <div class="wih_src">
        <div class="bar_src">
          <bdo class="bar_src_img"><i class="iconfont icon-sousuo"></i></bdo>
          <bdo class="bar_srcs">
            <input type="text" id="Strwhere" placeholder="请输入姓名" v-model="keyword">
          </bdo>
          <bdo class="bar_src_an">
            <input type="button" id="Search" @click="Search()" value="搜索">
          </bdo>
        </div>
      </div>
    </div>
    <div>
      <div ref="MescrollRefreshData"></div>
      <div ref="MescrollData">
        <dl class="hslist" v-for="(item) in list" :key="item.MemberID">
          <dt>
            <bdo>{{item.MemberName}}-{{item.Sex}}</bdo>
            <bdo class="hs_r">
              <span>(<span style="color:red;">{{item.StrISRZ}}</span>)</span>&nbsp;{{(item.MGNAME == null ? '' : item.MGNAME)}}
            </bdo>
          </dt>
          <dd>
            <bdo>电话：{{(item.PhoneNumber == null ? '' : item.PhoneNumber)}}</bdo>
            <bdo class="hs_r">注册时间：{{item.CreateTimeStr}}</bdo>
          </dd>
          <dd v-if="item.Member_ChildrenList.length>0">
            <bdo>
              <div class="hzxx">
                <dl class="hslist" v-for="(citem,cindex) in item.Member_ChildrenList" :key="cindex">
                  <dt class="z_blie">
                    <bdo>{{citem.LCPNAME}}</bdo>
                    <bdo> 性别：{{citem.MCXB}}</bdo>
                    <bdo class="hs_r">年龄：{{citem.MCAGE}}岁</bdo>
                  </dt>
                  <dd>
                    <bdo> 所在学校：
                      <span>{{(citem.MCSCHOOL || '')}}</span>
                    </bdo>
                  </dd>
                  <dd>
                    <bdo>所在年级：<span>{{(citem.MCNJ || '')}}</span>
                    </bdo>
                    <bdo class="hs_r">
                      所在班级：<span>{{(citem.MCBJ || '')}}</span>
                    </bdo>
                  </dd>
                </dl>
              </div>
            </bdo>
          </dd>
        </dl>
      </div>
      <div ref="MescrollNOData"></div>
      <div ref="MescrollTips"></div>
    </div>
  </div>
</template>
<script>
import { GetRoyaltyCount } from '@/api/home'
// import Mescroll from '@/components/common/Mescroll'
import { GetPotentialList } from '@/api/customer'
import Mescroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default {
  name: 'PotentialCustomer',
  components: {
    // Mescroll
  },
  data () {
    return {
      Agent: {},
      ZQPNumber: 0,
      ZQDRPNumber: 0,
      mescroll: null,
      list: [],
      keyword: ''
    }
  },
  computed: {

  },
  methods: {
    GetRoyaltyCount () {
      const that = this
      GetRoyaltyCount({
        MemberID: this.Agent.MemberID,
        SearchType: '1',
        STime: '',
        ETime: ''
      }).then((res) => {
        if (res.Status === 1) {
          that.ZQPNumber = res.Data.ZQPNumber
          that.ZQDRPNumber = res.Data.ZQDRPNumber
        }
      })
    },
    Search () {
      this.downCallback()
    },
    GetList (page) {
      var that = this
      GetPotentialList({
        MemberID: this.Agent.MemberID,
        StrWhere: this.keyword,
        PageIndex: page.num,
        PageSize: page.size
      }).then((res) => {
        if (res.Status === 1) {
          var _data = res.Data.Items || []
          that.mescroll.endSuccess(_data.length)
          that.list = [...that.list, ..._data]
        } else {
          that.mescroll.endErr()
        }
      })
    },
    downCallback () {
      this.list = []
      this.mescroll.resetUpScroll()
    },
    upCallback (page) {
      this.GetList(page)
    }
  },
  created () {
    this.Agent = this.$store.state.Agent
    this.GetRoyaltyCount()
  },
  mounted () {
    this.mescroll = new Mescroll(this.$refs.Mescroll, {
      down: {
        use: true,
        auto: false,
        warpId: this.$refs.MescrollRefreshData, // 指定下拉刷新显示容器
        callback: this.downCallback
      },
      up: {
        use: true,
        auto: true,
        clearEmptyId: this.$refs.MescrollData,
        callback: this.upCallback, // 上拉加载的回调
        page: {
          num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 20 // 每页数据条数,默认10
        },
        warpId: this.$refs.MescrollTips, // 指定加载提示,没有更多数据(htmlNodata)等提示容器
        warpClass: 'mescroll-upwarp', // 添加自定义样式(htmlNodata)
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        toTop: {
          // 回到顶部按钮
          src: '/img/mescroll-totop.png', // 图片路径,默认null,支持网络图
          offset: 100 // 列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: this.$refs.MescrollNOData, // 父布局的id (1.3.5版本支持传入dom元素)
          icon: '/img/nocurse.png', // 图标
          tip: '暂无数据~' // 提示
        },
        lazyLoad: {
          use: true, // 是否开启懒加载,默认false
          attr: 'imgurl' // 示例 : <img imgurl='网络图  src='占位图''/>
        }
      }
    })
  }
}
</script>
