<template>
  <div class="tc_cont" id="_toast_91">
    <div>{{msg}}</div>
  </div>
</template>
<style lang="css" scope>
.tc_cont {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  top: 0;
  width: 100%;
  vertical-align: middle;
  top: 70%;
}
.tc_cont div {
  line-height: 30px !important;
  display: inline-block;
  font-size: 13px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 15px;
  border-radius: 60px;
}
</style>
<script>
export default {
  name: 'Toast',
  data () {
    return {
      msg: '',
      duration: 1500
    }
  },
  methods: {
    remove () {
      console.log('toast-remove')
      document.body.removeChild(this.$el)
    },
    show (msg, duration = 1500) {
      // TODO 可优化为多个
      console.log('toast-show')
      this.msg = msg
      this.duration = duration
      setTimeout(() => {
        this.remove()
      }, duration)
      this._CreateDom()
    },
    _CreateDom () {
      document.body.appendChild(this.$el)
    }
  }
}
</script>
