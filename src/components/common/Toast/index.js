import Toast from '@/components/common/Toast/Toast'
const obj = {}
obj.install = function (Vue) {
  // 创建构造器
  const ToastContrustor = Vue.extend(Toast)
  // 使用new 创建对象
  const toast = new ToastContrustor()
  // 将组件挂载到指定元素上
  toast.$mount(document.createElement('div'))
  // 最后将组件的dom挂载到页面(document)上
  document.body.appendChild(toast.$el)
  // 全局使用
  Vue.prototype.$toast = toast
}
export default obj
