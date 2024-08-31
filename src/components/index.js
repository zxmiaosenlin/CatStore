//把components中所有的组件进行全局注册
//通过插件的方式

import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'

export const componentPlugin = {
  //install(app)是固定写法
  install(app) {
    //使用app.component('组件名字',组件)
    //app.component是全局注册组件的方法
    app.component('ImageView', ImageView),
    app.component('Sku', Sku)
  }
}