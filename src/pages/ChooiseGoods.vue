<template>
  <div style="background-color: #f3f3f3;min-height: 100vh">

  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import * as common from '../common'
  import * as config from '../config'
  export default {
    data() {
      return {

      }
    },
    computed:{
      ...mapState({
        'assistList':state => state.assist.assistList
      })
    },
    created(){
//      this.$store.dispatch('getAssistList')
    },
    mounted(){

    },
    methods:{
      submit(){

      }
    }
  }
</script>
<style scoped>

</style>
