import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import title from '@/plugin/title'
import vant from 'vant'
import request from './api/request'
import './assets/css/index.css'
import 'lib-flexible/flexible'
import FastClick from 'fastclick'
import lrz from 'lrz'

Vue.use(vant)
Vue.use(title)

Vue.prototype.httpCli = request //挂载
Vue.config.productionTip = false

/*let vMyDirective = {}
vMyDirective.install = function install (_Vue) {
  let _uid = 'vue-directive-loading' + Date.now().toString('16')
  _Vue.directive('loading', {
    inserted: function (el, binding) {
      var str = '<span id="_uid">我是页面</span>';
      el.childNodes.forEach((item) => {
        item.style.display = binding.value ? 'none' : ''
      })
      el.innerHTML(str)
    },
    update: function (el, binding, vnode) {
      let spinner = document.getElementById(_uid)
      spinner.style.display = binding.value ? 'block' : 'none'
      el.childNodes.forEach((item) => {
        if(item.id === _uid) return
        item.style.display = binding.value ? 'none' : ''
      })
    }
  })
}

Vue.use(vMyDirective)*/

/*window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();*/

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  render: h => h(App),
  mounted(){
    FastClick.attach(document.body); // click延迟及点透问题
  }
})

router.afterEach(route => {
  window.scrollTo(0,0);
});

// if (process.env.NODE_ENV !== 'production'){
  let vConsole = new VConsole();
// }else {
//   if (process.env.type == 'test'){
//     let vConsole = new VConsole();
//   }else {
//
//   }
// }
