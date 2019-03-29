<template>
  <div style="min-height: 100vh;background-color: #f3f3f3" v-if="!loading">
    <div class="wrap">
      <div class="infoList" v-for="(item,index) in serveList.gridModel">
        <div class="infoTitle">
          <div class="infoTime" v-if="!item.status">
            {{item.msgSendTime}}
          </div>
        </div>
        <div class="infoContent">
          <p>{{item.msgTitle}}</p>
          <p>{{item.msgAbstract}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="spinner" style="margin-top: 3rem" v-else>
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
  import { mapState , mapActions} from 'vuex'
  import * as config from '../config'
  import * as common from '../common'
  export default {
    data() {
      return {
        loading:false,
        serveList:{}
      }
    },
    created(){
      this.loading = true
      let data = {
        currentPage:'1',
        pageRow:'10000'
      }
      this.httpCli({
        url:config.URL_ASSIST_MSG_LIST,
        data:data
      })
        .then(res => {
          this.loading = false
          if (res.errorCode == 100){
            this.serveList = res.data.list
            if (this.serveList.gridModel){
              this.serveList.gridModel.map(item => {
                item.msgSendTime = common.dateFromat(item.msgSendTime*1000)
                if (item.msgSendTime.substring(14,16) > 12 && item.msgSendTime.substring(14,16) < 18){
                  item.msgSendTime = item.msgSendTime.replace('上午','下午')
                }else if (item.msgSendTime.substring(14,16) > 18 && item.msgSendTime.substring(14,16) < 24) {
                  item.msgSendTime = item.msgSendTime.replace('上午','晚上')
                }
              })
            }
  /*          if (this.serveList.gridModel){
              this.serveList.gridModel.sort((a,b) =>{
                return a.msgSendTime - b.msgSendTime
              })

              for(let i = 0;i<this.serveList.gridModel.length;i++){
                let model = this.serveList.gridModel[i]
                model.msgSendTime = common.dateTime(model.msgSendTime*1000)
                if (model.msgSendTime.substring(14,16) > 12 && model.msgSendTime.substring(14,16) < 18){
                  model.msgSendTime = model.msgSendTime.replace('上午','下午')
                }else if (item.msgSendTime.substring(14,16) > 18 && model.msgSendTime.substring(14,16) < 24) {
                  model.msgSendTime = model.msgSendTime.replace('上午','晚上')
                }
                if (this.serveList.gridModel[i - 1] && (this.serveList.gridModel[i].msgSendTime.substring(8,10) == this.serveList.gridModel[i - 1].msgSendTime.substring(8,10))){
                  this.serveList.gridModel[i].status = '1'
                }
              }
            }*/
          }
        })
        .catch(err => {
          this.loading = false
        })
    },
    mounted(){
    }
  }
</script>
<style scoped>
  .wrap{

  }
.infoList{
}
  .infoTitle{
    padding: 30px 0 30px 0;
  }
  .infoTime{
    border-radius: 5px;
    background-color: #ddd;
    max-width: 270px;
    height:34px;
    text-align: center;
    padding: 5px 10px;
    box-sizing: border-box;
    font-size: 20px;
    color: #999999;
    margin: 0 auto;
    white-space: nowrap;
  }
  .infoContent{
    width: 95%;
    background-color: #fff;
    border-radius: 10px;
    padding: 40px;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .infoContent p:nth-child(1){
     font-size: 32px;
     color: #f82a59;
   }
  .infoContent p:nth-child(2){
    font-size: 28px;
    color: #333333;
    margin-top: 40px;
  }
  .infoContent p:nth-child(3){
    font-size: 24px;
    color: #999999;
    margin-top: 20px;
  }
  .infoContent p:nth-child(3){
    border-top: 1Px #c8c9cc solid;
    font-size: 24px;
    color: #999999;
    margin-top: 30px;
    padding: 30px 0 30px;
  }
</style>
