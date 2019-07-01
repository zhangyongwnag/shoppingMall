<template>
  <span>
    <button class="copyButton" :data-clipboard-text="text" @click="copy">
      <img src="../assets/img/ctrlC.png" alt="">
    </button>
  </span>
</template>
<script>
  import Clipboard from 'clipboard';
  export default {
    props:['text'],
    data() {
      return {

      }
    },
    methods:{
      copy() {
        var clipboard = new Clipboard('.copyButton')
        clipboard.on('success', e => {
          this.$toast.success('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$toast.fail('请长按复制')
          // 释放内存
          clipboard.destroy()
        })
      },
    },
  }
</script>
<style scoped>
.copyButton{
  background-color: transparent;
  border: 0px;
  display: inline-block;
  margin-left: 5px;
}
.copyButton img{
  width: 20px;
}
</style>
