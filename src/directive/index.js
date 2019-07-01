import directives from './directives'

const importDirective = Vue => {
  /**
   * title指令 v-title=""
   */
  Vue.directive('title', function (el, binding) {
    directives.title(binding.value, el.getAttribute('img-set') || null)
  })
  /**
   * loading指令 v-loading="options"
   * options = true | options = false
   */
  Vue.directive('loading', directives.loading)
  /**
   * waves指令 v-waves
   */
  Vue.directive('waves', directives.waves)
  /**
   * clipboard指令 v-clipboard="options"
   * options = {
   *  value:    /在输入框中使用v-model绑定的值/,
   *  success:  /复制成功后的回调/,
   *  error:    /复制失败后的回调/
   * }
   */
  Vue.directive('clipboard', directives.clipboard)
  /**
   * active指令 v-active
   */
  Vue.directive('active', directives.active)
}

export default importDirective
