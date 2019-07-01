<template>
  <div style="min-height: 100vh;background-color: #fff">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item name="1" class="van-cellWrap">
        <div slot="title" class="title"><img src="../../assets/img/user/FAQ_helpPhone.png" alt="">&emsp;客服电话</div>
        <div><a href="tel:010-53515206" style="color: rgb(153,153,153);">010-53515206</a></div>
      </van-collapse-item>
      <van-collapse-item name="2" class="van-cellWrap">
        <div slot="title" class="title"><img src="../../assets/img/user/FAQ_help1.png" alt="">&emsp;优惠券</div>
        <div class="value"><span>问：</span>会员福利是什么？</div>
        <div class="result"><span>答：</span><span>开通会员可以直接兑换陈列的免费产品，之后会员也会有很多福利（例如优惠折扣活动等）。</span></div>
      </van-collapse-item>
      <van-collapse-item name="3" class="van-cellWrap">
        <div slot="title" class="title"><img src="../../assets/img/user/FAQ_help2.png" alt="">&emsp;支付相关</div>
        <div>问：有几种支付方式？</div>
        <div class="result"><span>答：</span><span>目前在公众号页面消费只支持微信支付。</span></div>
        <div class="value">问：下单后多久可以发货？</div>
        <div class="result"><span>答：</span><span>官方会根据下单的先后顺序在1~2个工作日内发货，到货时间基本为发货后的3~5天。</span></div>
        <div class="value">问：购买产品后使用什么快递？</div>
        <div class="result"><span>答：</span><span>蝶库会根据顾客的送货地址灵活选择快递公司，顾客可以根据快递单号直接在百度上搜索就可以查到物流信息。</span></div>
        <div class="value">问：为什么有快递单号了但查不到物流信息？</div>
        <div class="result"><span>答：</span><span>一般在公司发货后的一天内，由于物流公司刚刚接收快递还没有及时录入进物流系统，会出现无法查询到的原因，建议顾客在次日进行查询就可以了。</span></div>
      </van-collapse-item>
      <van-collapse-item name="4" class="van-cellWrap">
        <div slot="title" class="title"><img src="../../assets/img/user/FAQ_sale.png" alt="">&emsp;售后相关</div>
        <div>问：如何进行退货？</div>
        <div class="result"><span>答：</span><span>如果顾客对产品不满意或其他原因要退货，需提前联系客服申请退货，根据客服的指引将完整的产品（食品不得拆封）邮寄至指定收货点，官方在收货后确认无损坏或拆封即可进行退款处理。（确认可退货后运费由官方承担）</span></div>
        <div class="value">问：如何进行换货？</div>
        <div class="result"><span>答：</span><span>如果产品出现损坏等特殊原因，请先拍照保留记录并联系客服。之后根据客服的指引进行快递，待放接到损坏产品后会再1个工作日内安排重新发货。</span></div>
      </van-collapse-item>
      <van-collapse-item name="5" class="van-cellWrap">
        <div slot="title" class="title"><img src="../../assets/img/user/FAQ_help4.png" alt="">&emsp;其他问题</div>
        <div>问：如何申请导游账户？</div>
        <div class="result"><span>答：</span><span>申请导游账户需要在公众号页面进行申请，申请时需要将本人身份证、导游证并手持证件拍照申请即可（审核时间为1个工作日）。</span></div>
        <div class="value">问：产品是否是正规？</div>
        <div class="result"><span>答：</span><span>蝶库的每一款产品都是通过正规渠道注册、生产并具有食品安全认证。</span></div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
  import ClipboardText from '../../components/ClipboardText.vue'
  export default {
    data () {
      return {
        activeName:'1'
      }
    },
    components: {
      ClipboardText
    }
  }
</script>
<style scoped>
  .van-cellWrap{
    padding: 20px 0;
  }
  .van-cellWrap:active{
    background-color: #fff;
  }
.title{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: bold;
}
.title img{
  width: 45px;
  margin-top: 0px;
}
  .value{
    margin-top: 15px;
  }
  .result{
    display: flex;
    text-align: justify;
  }
  .result span:nth-child(2){
    width: 90%;
  }
</style>
