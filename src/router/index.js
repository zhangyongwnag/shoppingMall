import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import("@/pages/Index.vue")
const Main = () => import("@/pages/Main.vue")
const Home = () => import("@/pages/Home.vue")
const Classify = () => import("@/pages/Classify.vue")
const ClassifyShopping = () => import("@/pages/ClassifyShopping.vue")
const ShoppingCart = () => import("@/pages/ShoppingCart.vue")
const ConfirmOrders = () => import("@/pages/ConfirmOrders.vue")
const Personal = () => import("@/pages/Personal.vue")
const Login = () => import("@/pages/Login.vue")
const LoginQuick = () => import("@/pages/LoginQuick.vue")
const SetPaypwd = () => import("../pages/SetPaypwd.vue")
const Setinfo = () => import("../pages/Setinfo.vue")
const Userinfo = () => import("../pages/Userinfo.vue")
const FixUserName = () => import("../pages/FixUserName.vue")
const AssistRegister = () => import("../pages/AssistRegister.vue")
const RegisterByScanCode = () => import("../pages/RegisterByScanCode.vue")
const SLA = () => import("../pages/SLA.vue")
const RevisePassword = () => import("../pages/RevisePassword.vue")
const RrvisePaypwd = () => import("../pages/RrvisePaypwd.vue")
const RevisePhone = () => import("../pages/RevisePhone.vue")
const ForgotPassword = () => import("../pages/ForgotPassword.vue")
const VerifyPaypwd = () => import("../pages/VerifyPaypwd.vue")
const SearchShop = () => import("../pages/SearchShop.vue")
const GoodDetails = () => import("../pages/GoodDetails.vue")
const MarketPackgeList = () => import("../pages/MarketPackgeList.vue")
const PlanDetails = () => import("../pages/PlanDetails.vue")
const NewPeopleDetails = () => import("../pages/NewPeopleDetails.vue")
const ChooiseGoods = () => import("../pages/ChooiseGoods.vue")
const PayMoney = () => import("../pages/PayMoney.vue")
const OffinePayMoney = () => import("../pages/OffinePayMoney.vue")
const PayMoneyRecords = () => import("../pages/PayMoneyRecords.vue")
const WithdrawMoney = () => import("../pages/WithdrawMoney.vue")
const WithdrawMoneyRecords = () => import("../pages/WithdrawMoneyRecords.vue")
const AddressList = () => import("../pages/AddressList.vue")
const AddressListAction = () => import("../pages/AddressListAction.vue")
const ServiceInfo = () => import("../pages/ServiceInfo.vue")
const MyPoster = () => import("../pages/MyPoster.vue")
const DirectUsers = () => import("../pages/DirectUsers.vue")
const MyCollection = () => import("../pages/MyCollection.vue")
const BankCardManage = () => import("../pages/BankCardManage.vue")
const BankCardAddCardId = () => import("../pages/BankCardAddCardId.vue")
const BankCardAdd = () => import("../pages/BankCardAdd.vue")
const SupportList = () => import("../pages/SupportList.vue")
const SupportListDetails = () => import("../pages/SupportListDetails.vue")
const PriceDetails = () => import("../pages/PriceDetails.vue")
const CouponList = () => import("../pages/CouponList.vue")
const CommentList = () => import("../pages/CommentList.vue")
const UpgradeManage = () => import("../pages/UpgradeManage.vue")
const MyStorage = () => import("../pages/MyStorage.vue")
const ToRestoking = () => import("../pages/ToRestoking.vue")
const DeliveryOrders = () => import("../pages/DeliveryOrders.vue")
const AllVipOrders = () => import("../pages/AllVipOrders.vue")
const AllOrders = () => import("../pages/AllOrders.vue")
const AftersaleList = () => import("../pages/AftersaleList.vue")
const JuniorOrders = () => import("../pages/JuniorOrders.vue")
const LogisticsList = () => import("../pages/LogisticsList.vue")
const LogisticsInfo = () => import("../pages/LogisticsInfo.vue")
const PaymentMethods = () => import("../pages/PaymentMethods.vue")
const PaymentMethodOfBank = () => import("../pages/PaymentMethodOfBank.vue")
const PaySuccess = () => import("../pages/PaySuccess.vue")
const OrderDetails = () => import("../pages/OrderDetails.vue")

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: {
        name:'Home'
      }
    },
    {
      path:'/Index',
      name:'Index',
      component:Index,
      meta: {
        title:'首页'
      }
    },
    {
      path:'/Main',
      name:'Main',
      component:Main,
      meta: {
        title:'主页'
      },
      children: [
        {
          path:'/Main/Home',
          name:'Home',
          component:Home,
          meta: {
            title:'芭莎贝雅商城',
            active:0
          }
        },
        {
          path:'/Main/Classify',
          name:'Classify',
          component:Classify,
          meta: {
            title:'分类',
            active:1
          }
        },
        {
          path:'/Main/ShoppingCart',
          name:'ShoppingCart',
          component:ShoppingCart,
          meta: {
            title:'购物车',
            active:2
          }
        },
        {
          path:'/Main/Personal',
          name:'Personal',
          component:Personal,
          meta: {
            title:'我的',
            active:3,
            keepAlive:true
          }
        },
      ]
    },
    {
      path:'/ClassifyShopping',
      name:'ClassifyShopping',
      component:ClassifyShopping,
      meta: {
        title:'订单',
        keepAlive:true
      }
    },
    {
      path:'/ConfirmOrders',
      name:'ConfirmOrders',
      component:ConfirmOrders,
      meta: {
        title:'订单结算',
      }
    },
    {
      path:'/Login',
      name:'Login',
      component:Login,
      meta: {
        title:'密码登录',
      }
    },
    {
      path:'/LoginQuick',
      name:'LoginQuick',
      component:LoginQuick,
      meta: {
        title:'快速登录',
      }
    },
    {
      path:'/SLA',
      name:'SLA',
      component:SLA,
      meta: {
        title:'注册协议',
      }
    },
    {
      path:"/SetPaypwd",
      name:'SetPaypwd',
      component:SetPaypwd,
      meta:{
        title:'设置支付密码'
      }
    },
    {
      path:"/AssistRegister",
      name:'AssistRegister',
      component:AssistRegister,
      meta:{
        title:'注册会员'
      }
    },
    {
      path:"/RegisterByScanCode",
      name:'RegisterByScanCode',
      component:RegisterByScanCode,
      meta:{
        title:'扫码注册经销商'
      }
    },
    {
      path:"/Setinfo",
      name:'Setinfo',
      component:Setinfo,
      meta:{
        title:'设置中心'
      }
    },
    {
      path:"/RevisePassword",
      name:'RevisePassword',
      component:RevisePassword,
      meta:{
        title:'管理登录密码'
      }
    },
    {
      path:"/ForgotPassword",
      name:'ForgotPassword',
      component:ForgotPassword,
      meta:{
        title:'找回密码'
      }
    },
    {
      path:"/RrvisePaypwd",
      name:'RrvisePaypwd',
      component:RrvisePaypwd,
      meta:{
        title:'修改支付密码'
      }
    },
    {
      path:"/VerifyPaypwd",
      name:'VerifyPaypwd',
      component:VerifyPaypwd,
      meta:{
        title:'验证支付密码'
      }
    },
    {
      path:"/RevisePhone",
      name:'RevisePhone',
      component:RevisePhone,
      meta:{
        title:'修改绑定手机号'
      }
    },
    {
      path:"/Userinfo",
      name:'Userinfo',
      component:Userinfo,
      meta:{
        title:'个人信息'
      }
    },
    {
      path:"/FixUserName",
      name:'FixUserName',
      component:FixUserName,
      meta:{
        title:'修改昵称'
      }
    },
    {
      path:"/SearchShop",
      name:'SearchShop',
      component:SearchShop,
      meta:{
        title:'搜索商品',
        keepAlive:true
      }
    },
    {
      path:"/GoodDetails",
      name:'GoodDetails',
      component:GoodDetails,
      meta:{
        title:'商品详情',
        shareStatus:true
      }
    },
    {
      path:"/MarketPackgeList",
      name:'MarketPackgeList',
      component:MarketPackgeList,
      meta:{
        title:'市场保障计划'
      }
    },
    {
      path:"/PlanDetails",
      name:'PlanDetails',
      component:PlanDetails,
      meta:{
        title:'保障计划详情'
      }
    },
    {
      path:"/NewPeopleDetails",
      name:'NewPeopleDetails',
      component:NewPeopleDetails,
      meta:{
        title:'新人有礼详情'
      }
    },
    {
      path:"/ChooiseGoods",
      name:'ChooiseGoods',
      component:ChooiseGoods,
      meta:{
        title:'挑选商品'
      }
    },
    {
      path:"/PayMoney",
      name:'PayMoney',
      component:PayMoney,
      meta:{
        title:'充值'
      }
    },
    {
      path:"/OffinePayMoney",
      name:'OffinePayMoney',
      component:OffinePayMoney,
      meta:{
        title:'线下充值'
      }
    },
    {
      path:"/PayMoneyRecords",
      name:'PayMoneyRecords',
      component:PayMoneyRecords,
      meta:{
        title:'充值记录'
      }
    },
    {
      path:"/WithdrawMoney",
      name:'WithdrawMoney',
      component:WithdrawMoney,
      meta:{
        title:'提现'
      }
    },
    {
      path:"/WithdrawMoneyRecords",
      name:'WithdrawMoneyRecords',
      component:WithdrawMoneyRecords,
      meta:{
        title:'提现记录'
      }
    },
    {
      path:"/AddressList",
      name:'AddressList',
      component:AddressList,
      meta:{
        title:'我的收货地址'
      }
    },
    {
      path:"/AddressListAction",
      name:'AddressListAction',
      component:AddressListAction,
      meta:{
        title:'新增/编辑地址'
      }
    },
    {
      path:"/ServiceInfo",
      name:'ServiceInfo',
      component:ServiceInfo,
      meta:{
        title:'服务消息'
      }
    },
    {
      path:"/MyPoster",
      name:'MyPoster',
      component:MyPoster,
      meta:{
        title:'我的海报',
        shareStatus:true
      }
    },
    {
      path:"/DirectUsers",
      name:'DirectUsers',
      component:DirectUsers,
      meta:{
        title:'直推用户'
      }
    },
    {
      path:"/MyCollection",
      name:'MyCollection',
      component:MyCollection,
      meta:{
        title:'我的收藏'
      }
    },
    {
      path:"/BankCardManage",
      name:'BankCardManage',
      component:BankCardManage,
      meta:{
        title:'银行卡管理'
      }
    },
    {
      path:"/BankCardAddCardId",
      name:'BankCardAddCardId',
      component:BankCardAddCardId,
      meta:{
        title:'验证银行卡',
        keepAlive:true
      }
    },
    {
      path:"/BankCardAdd",
      name:'BankCardAdd',
      component:BankCardAdd,
      meta:{
        title:'添加银行卡'
      }
    },
    {
      path:"/SupportList",
      name:'SupportList',
      component:SupportList,
      meta:{
        title:'扶持金列表'
      }
    },
    {
      path:"/SupportListDetails",
      name:'SupportListDetails',
      component:SupportListDetails,
      meta:{
        title:'扶持金明细'
      }
    },
    {
      path:"/PriceDetails",
      name:'PriceDetails',
      component:PriceDetails,
      meta:{
        title:'奖金明细'
      }
    },
    {
      path:"/CouponList",
      name:'CouponList',
      component:CouponList,
      meta:{
        title:'我的优惠券'
      }
    },
    {
      path:"/CommentList",
      name:'CommentList',
      component:CommentList,
      meta:{
        title:'我的评价'
      }
    },
    {
      path:"/UpgradeManage",
      name:'UpgradeManage',
      component:UpgradeManage,
      meta:{
        title:'我要升级'
      }
    },
    {
      path:"/MyStorage",
      name:'MyStorage',
      component:MyStorage,
      meta:{
        title:'我的仓库'
      }
    },
    {
      path:"/ToRestoking",
      name:'ToRestoking',
      component:ToRestoking,
      meta:{
        title:'我要进货'
      }
    },
    {
      path:"/DeliveryOrders",
      name:'DeliveryOrders',
      component:DeliveryOrders,
      meta:{
        title:'提货订单',
      }
    },
    {
      path:"/AllVipOrders",
      name:'AllVipOrders',
      component:AllVipOrders,
      meta:{
        title:'全部订单'
      }
    },
    {
      path:"/AftersaleList",
      name:'AftersaleList',
      component:AftersaleList,
      meta:{
        title:'退换货列表'
      }
    },
    {
      path:"/AllOrders",
      name:'AllOrders',
      component:AllOrders,
      meta:{
        title:'全部订单',
      }
    },
    {
      path:"/JuniorOrders",
      name:'JuniorOrders',
      component:JuniorOrders,
      meta:{
        title:'下级订单'
      }
    },
    {
      path:"/LogisticsList",
      name:'LogisticsList',
      component:LogisticsList,
      meta:{
        title:'物流包裹'
      }
    },
    {
      path:"/LogisticsInfo",
      name:'LogisticsInfo',
      component:LogisticsInfo,
      meta:{
        title:'物流信息'
      }
    },
    {
      path:"/PaymentMethods",
      name:'PaymentMethods',
      component:PaymentMethods,
      meta:{
        title:'快捷支付'
      }
    },
    {
      path:"/PaymentMethodOfBank",
      name:'PaymentMethodOfBank',
      component:PaymentMethodOfBank,
      meta:{
        title:'快捷支付验证'
      }
    },
    {
      path:"/PaySuccess",
      name:'PaySuccess',
      component:PaySuccess,
      meta:{
        title:'支付成功'
      }
    },
    {
      path:"/OrderDetails",
      name:'OrderDetails',
      component:OrderDetails,
      meta:{
        title:'订单详情'
      }
    },
  ]
})
