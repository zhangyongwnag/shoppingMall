import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import("@/pages/Index.vue")
const Login = () => import("@/pages/user/Login.vue")
const LoginQuick = () => import("@/pages/user/LoginQuick.vue")
const ForgotPassword = () => import("@/pages/user/ForgotPassword.vue")
const SLA = () => import("@/pages/user/SLA.vue")
const FAQ = () => import("@/pages/user/FAQ.vue")
const TourGuideLogin = () => import("@/pages/user/TourGuideLogin.vue")
const TourGuideMange = () => import("@/pages/user/TourGuideMange.vue")
const TourGuideVerify = () => import("@/pages/user/TourGuideVerify.vue")
const AddressList = () => import("@/pages/user/AddressList.vue")
const AddressListAction = () => import("@/pages/user/AddressListAction.vue")
const Userinfo = () => import("@/pages/user/Userinfo.vue")
const FixUserName = () => import("@/pages/user/FixUserName.vue")
const SetPaypwd = () => import("@/pages/user/SetPaypwd.vue")
const MyQRcode = () => import("@/pages/user/MyQRcode.vue")
const MyInviteQRcode = () => import("@/pages/user/MyInviteQRcode.vue")
const setting = () => import("@/pages/user/setting.vue")
const RevisePassword = () => import("@/pages/user/RevisePassword.vue")
const InviteVipUser = () => import("@/pages/invites/InviteVipUser.vue")
const BeInvitedHighVipUser = () => import("@/pages/invites/BeInvitedHighVipUser.vue")
const MyInviteUser = () => import("@/pages/invites/MyInviteUser.vue")
const BecomeHighVip = () => import("@/pages/invites/BecomeHighVip.vue")
const InviteVipMiddlePage = () => import("@/pages/invites/InviteVipMiddlePage.vue")
const InviteHighVipMiddlePage = () => import("@/pages/invites/InviteHighVipMiddlePage.vue")
const InviteHighVipRegisterMiddlePage = () => import("@/pages/invites/InviteHighVipRegisterMiddlePage.vue")
const Main = () => import("@/pages/home/Main.vue")
const Home = () => import("@/pages/home/Home.vue")
const Classify = () => import("@/pages/home/Classify.vue")
const ShoppingCart = () => import("@/pages/home/ShoppingCart.vue")
const PersonCenter = () => import("@/pages/home/PersonCenter.vue")
const BankCardManage = () => import("@/pages/finance/BankCardManage.vue")
const BankCardAddCardId = () => import("@/pages/finance/BankCardAddCardId.vue")
const BankCardAdd = () => import("@/pages/finance/BankCardAdd.vue")
const OrderManage = () => import("@/pages/order/OrderManage.vue")
const OrderDetails = () => import("@/pages/order/OrderDetails.vue")
const DeliveryOrderMange = () => import("@/pages/order/DeliveryOrderMange.vue")
const DeliveryLumpMange = () => import("@/pages/order/DeliveryLumpMange.vue")
const DeliveryOrderDetail = () => import("@/pages/order/DeliveryOrderDetail.vue")
const AppendTours = () => import("@/pages/order/AppendTours.vue")
const AfterSaleList = () => import("@/pages/order/AfterSaleList.vue")
const PaymentMethods = () => import("@/pages/order/PaymentMethods.vue")
const PaySuccess = () => import("@/pages/order/PaySuccess.vue")
const OrderPaySuccess = () => import("@/pages/order/OrderPaySuccess.vue")
const ConfirmOrders = () => import("@/pages/order/ConfirmOrders.vue")
const StartCityChooise = () => import("@/pages/order/StartCityChooise.vue")
const ToProvinceChooise = () => import("@/pages/order/ToProvinceChooise.vue")
const MyRecomment = () => import("@/pages/good/MyRecomment.vue")
const MyCollation = () => import("@/pages/good/MyCollation.vue")
const GoodDetails = () => import("@/pages/good/GoodDetails.vue")
const ActiveGoodDetails = () => import("@/pages/good/ActiveGoodDetails.vue")
const MyBalance = () => import("@/pages/finance/MyBalance.vue")
const WithdrawMoney = () => import("@/pages/finance/WithdrawMoney.vue")
const NotAccountBalance = () => import("@/pages/finance/NotAccountBalance.vue")
const MyCoupon = () => import("@/pages/finance/MyCoupon.vue")
const CaseGift = () => import("@/pages/finance/CaseGift.vue")
const SearchShop = () => import("@/pages/shop/SearchShop.vue")
const ClassifyAFP = () => import("@/pages/shop/ClassifyAFP.vue")

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name:'Index'
      }
    },
    {
      path:'/Index',
      name:'Index',
      component:Index,
      meta:{
        title:'蝶库·旅游特惠精选'
      }
    },
    {
      path:'/Login',
      name:'Login',
      component:Login,
      meta:{
        title:'密码登录'
      }
    },
    {
      path:'/LoginQuick',
      name:'LoginQuick',
      component:LoginQuick,
      meta:{
        title:'快速登录'
      }
    },
    {
      path:'/ForgotPassword',
      name:'ForgotPassword',
      component:ForgotPassword,
      meta:{
        title:'忘记密码'
      }
    },
    {
      path:'/SLA',
      name:'SLA',
      component:SLA,
      meta:{
        title:'蝶库服务协议'
      }
    },
    {
      path:'/FAQ',
      name:'FAQ',
      component:FAQ,
      meta:{
        title:'常见问题',
        keepAlive:true
      }
    },
    {
      path:'/TourGuideLogin',
      name:'TourGuideLogin',
      component:TourGuideLogin,
      meta:{
        title:'导游注册验证',
        keepAlive:true
      }
    },
    {
      path:'/TourGuideMange',
      name:'TourGuideMange',
      component:TourGuideMange,
      meta:{
        title:'导游身份认证'
      }
    },
    {
      path:'/TourGuideVerify',
      name:'TourGuideVerify',
      component:TourGuideVerify,
      meta:{
        title:'导游身份认证'
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
      path:'/Userinfo',
      name:'Userinfo',
      component:Userinfo,
      meta:{
        title:'个人信息',
      }
    },
    {
      path:'/FixUserName',
      name:'FixUserName',
      component:FixUserName,
      meta:{
        title:'修改昵称'
      }
    },
    {
      path:'/SetPaypwd',
      name:'SetPaypwd',
      component:SetPaypwd,
      meta:{
        title:'修改支付密码'
      }
    },
    {
      path:'/MyQRcode',
      name:'MyQRcode',
      component:MyQRcode,
      meta:{
        title:'专属二维码',
        keepAlive:true
      }
    },
    {
      path:'/MyInviteQRcode',
      name:'MyInviteQRcode',
      component:MyInviteQRcode,
      meta:{
        title:'我的二维码',
        keepAlive:true
      }
    },
    {
      path:'/setting',
      name:'setting',
      component:setting,
      meta:{
        title:'设置中心'
      }
    },
    {
      path:'/RevisePassword',
      name:'RevisePassword',
      component:RevisePassword,
      meta:{
        title:'设置登录密码'
      }
    },
    {
      path:'/InviteVipUser',
      name:'InviteVipUser',
      component:InviteVipUser,
      meta:{
        title:'邀请VIP好友'
      }
    },
    {
      path:'/BeInvitedHighVipUser',
      name:'BeInvitedHighVipUser',
      component:BeInvitedHighVipUser,
      meta:{
        title:'填写注册信息',
        keepAlive:true
      }
    },
    {
      path:'/MyInviteUser',
      name:'MyInviteUser',
      component:MyInviteUser,
      meta:{
        title:'我的邀请'
      }
    },
    {
      path:'/BecomeHighVip',
      name:'BecomeHighVip',
      component:BecomeHighVip,
      meta:{
        title:'成为钻石会员',
        toTopHidden:true,
        keepAlive:true
      }
    },
    {
      path:'/InviteVipMiddlePage',
      name:'InviteVipMiddlePage',
      component:InviteVipMiddlePage,
      meta:{
        title:'邀请好友成为VIP会员',
        keepAlive:true
      }
    },
    {
      path:'/InviteHighVipMiddlePage',
      name:'InviteHighVipMiddlePage',
      component:InviteHighVipMiddlePage,
      meta:{
        title:'邀请好友成为钻石会员',
        toTopHidden:true,
        keepAlive:true
      }
    },
    {
      path:'/InviteHighVipRegisterMiddlePage',
      name:'InviteHighVipRegisterMiddlePage',
      component:InviteHighVipRegisterMiddlePage,
      meta:{
        title:'成为钻石会员',
        toTopHidden:true
      }
    },
    {
      path:'/Main',
      name:'Main',
      component:Main,
      meta:{
        title:'主页'
      },
      redirect:{
        name:'Home'
      },
      children:[
        {
          path:'/Main/Home',
          name:'Home',
          component:Home,
          meta:{
            active:0,
            title:'蝶库·旅游特惠精选'
          },
        },
        {
          path:'/Main/Classify',
          name:'Classify',
          component:Classify,
          meta:{
            active:1,
            title:'分类',
          },
        },
        {
          path:'/Main/PersonCenter',
          name:'PersonCenter',
          component:PersonCenter,
          meta:{
            active:3,
            title:'我的',
            toTopHidden:true
          },
        },
      ]
    },
    {
      path:'/ShoppingCart',
      name:'ShoppingCart',
      component:ShoppingCart,
      meta:{
        active:2,
        title:'购物车'
      },
    },
    {
      path:'/SearchShop',
      name:'SearchShop',
      component:SearchShop,
      meta:{
        title:'搜索商品',
        keepAlive:true
      },
    },
    {
      path:'/ClassifyAFP',
      name:'ClassifyAFP',
      component:ClassifyAFP,
      meta:{
        title:'商品分类',
        keepAlive:false
      },
    },
    {
      path:'/BankCardManage',
      name:'BankCardManage',
      component:BankCardManage,
      meta:{
        title:'银行卡管理'
      },
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
      path:"/OrderManage",
      name:'OrderManage',
      component:OrderManage,
      meta:{
        title:'订单中心'
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
    {
      path:"/DeliveryOrderMange",
      name:'DeliveryOrderMange',
      component:DeliveryOrderMange,
      meta:{
        title:'行程管理'
      }
    },
    {
      path:"/DeliveryLumpMange",
      name:'DeliveryLumpMange',
      component:DeliveryLumpMange,
      meta:{
        title:'现场发货'
      }
    },
    {
      path:"/DeliveryOrderDetail",
      name:'DeliveryOrderDetail',
      component:DeliveryOrderDetail,
      meta:{
        title:'行程详情'
      }
    },
    {
      path:"/AppendTours",
      name:'AppendTours',
      component:AppendTours,
      meta:{
        title:'新增行程',
        keepAlive:true
      }
    },
    {
      path:"/AfterSaleList",
      name:'AfterSaleList',
      component:AfterSaleList,
      meta:{
        title:'售后列表'
      }
    },
    {
      path:"/ConfirmOrders",
      name:'ConfirmOrders',
      component:ConfirmOrders,
      meta:{
        title:'订单结算'
      }
    },
    {
      path:"/StartCityChooise",
      name:'StartCityChooise',
      component:StartCityChooise,
      meta:{
        title:'选择出发城市',
        keepAlive:true
      }
    },
    {
      path:"/ToProvinceChooise",
      name:'ToProvinceChooise',
      component:ToProvinceChooise,
      meta:{
        title:'选择到达省份',
        keepAlive:true
      }
    },
    {
      path:"/PaymentMethods",
      name:'PaymentMethods',
      component:PaymentMethods,
      meta:{
        title:'支付成功'
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
      path:"/OrderPaySuccess",
      name:'OrderPaySuccess',
      component:OrderPaySuccess,
      meta:{
        title:'支付成功'
      }
    },
    {
      path:"/MyRecomment",
      name:'MyRecomment',
      component:MyRecomment,
      meta:{
        title:'我的推荐'
      }
    },
    {
      path:"/MyCollation",
      name:'MyCollation',
      component:MyCollation,
      meta:{
        title:'我的收藏'
      }
    },
    {
      path:"/GoodDetails",
      name:'GoodDetails',
      component:GoodDetails,
      meta:{
        title:'商品详情'
      }
    },
    {
      path:"/ActiveGoodDetails",
      name:'ActiveGoodDetails',
      component:ActiveGoodDetails,
      meta:{
        title:'活动商品详情'
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
      path:"/MyBalance",
      name:'MyBalance',
      component:MyBalance,
      meta:{
        title:'我的余额',
      }
    },
    {
      path:"/NotAccountBalance",
      name:'NotAccountBalance',
      component:NotAccountBalance,
      meta:{
        title:'未到账余额'
      }
    },
    {
      path:"/MyCoupon",
      name:'MyCoupon',
      component:MyCoupon,
      meta:{
        title:'我的优惠券'
      }
    },
    {
      path:"/CaseGift",
      name:'CaseGift',
      component:CaseGift,
      meta:{
        title:'兑换礼包',
        toTopHidden:true,
        keepAlive:true
      }
    },
  ]
})
