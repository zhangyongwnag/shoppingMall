import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import vant from 'vant'
import '@/assets/css/index.css'
import request from '@/api/request'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import '@/utils/flexible'
import FastClick from 'fastclick'
import lrz from 'lrz'
import VueAMap from "vue-amap";

Vue.use(vant)
Vue.use(VueAMap);

Vue.prototype.httpCli = request //挂载
Vue.config.productionTip = false

importDirective(Vue)
Vue.directive('clickOutside',clickOutside)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App),
  mounted(){
    FastClick.attach(document.body); // click延迟及点透问题
  }
})

router.afterEach(route => {
  window.scrollTo(0,0);
});

if (process.env.NODE_ENV !== 'production'){
  let vConsole = new VConsole();
}else {
  if (process.env.type == 'test'){
    let vConsole = new VConsole();
  }else {
    // let vConsole = new VConsole();
  }
}

VueAMap.initAMapApiLoader({
  key: "77d1bc057fcb811c951dc40d0796cf0c", //自己去高德配key
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  uiVersion: "1.0"
});
