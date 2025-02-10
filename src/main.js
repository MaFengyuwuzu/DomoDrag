import Vue from 'vue'
import App from './App.vue'
import router from './router'
import print from 'vue-print-nb'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Sortable from 'sortablejs'
// eslint-disable-next-line quotes
import draggable from "vuedraggable"
import store from './store'
// eslint-disable-next-line quotes
import {
  formateArrObjData,
  datalength,
  formatDate
} from "@/utils/utils.js"
import {
  locStorage
} from "@/utils/storage.js"
import indexDb from '@/utils/indexDb.js'

let storeName = {
  index: 'history',
  name: 'history',
  key: 'id'
} //index:索引、name:表名、key:主键
indexDb.openDB('data', 1, storeName, function (db) {
  Vue.prototype.$tableDb = db //全局保存数据库
})
Vue.prototype.$formatDate = formatDate;

let storeNamea = {
  index: 'history',
  name: 'history',
  key: 'id'
} //index:索引、name:表名、key:主键
indexDb.openDB('dataa', 1, storeName, function (db) {
  Vue.prototype.$tableDba = db //全局保存数据库
})


Vue.use(ElementUI)
Vue.use(print);
// 全局input聚焦(使用方法:在input中增加属性"v-focusing")
Vue.directive('focusing', {
  // eslint-disable-next-line space-before-function-paren
  inserted(el, binding, vnode) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})

Vue.prototype.msgSuccess = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    // eslint-disable-next-line quotes
    type: "success"
  })
}

Vue.prototype.msgError = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    // eslint-disable-next-line quotes
    type: "error"
  })
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg)
}
// 方法挂载
Vue.prototype.formateArrObjData = formateArrObjData
Vue.prototype.datalength = datalength
Vue.prototype.formatDate = formatDate
Vue.prototype.$locStorage = locStorage
Vue.config.productionTip = false

new Vue({
  router,
  draggable,
  Sortable,
  store,
  render: h => h(App)
}).$mount('#app')
