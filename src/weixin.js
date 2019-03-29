//主要用于调用微信 JS SDK
import api from './api/request';
import * as config from './config'
import {mapActions } from 'vuex';
// import store from 'store/index';
import wx from 'weixin-js-sdk';
import {Toast} from "vant";

export const appId = 'wx0c21963f12da1c55'

export const location = window.location

// 浏览器参数
export const params = (() => {
  let res = {}
  if (location.search) {
    const arr = location.search.substring(1).split('&')
    arr.forEach((item) => {
      let param = item.split('=')
      res[param[0]] = decodeURIComponent(param[1])
    })
  }
  return res
})()

// 初始化
export const initWx = (obj) => {
  return new Promise((resolve, reject) => {
    const plaintext = {
      timestamp: String(new Date().getTime()),
      nonceStr: String(parseInt(Math.random()*100000000000000)),
      url: location.href.split('#')[0]
    }
    let data = {
      plaintext:JSON.stringify(plaintext)
    }
    api({
      url:config.URL_WX_SINGATURE,
      data:data
    })
      .then((res) => {
        wx.config({
          // debug: true,
          appId,
          timestamp: plaintext.timestamp,
          nonceStr: plaintext.nonceStr,
          signature: res.data.signature,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage','onMenuShareTimeline']
        })
        // 注册完毕
        wx.ready(() => {
          console.log('wx.ready')
          console.log(obj)
          // 自定义“分享给朋友”及“分享到QQ”按钮
          wx.updateAppMessageShareData({
            title:obj.title,
            link:obj.link,
            imgUrl:obj.imgUrl,
            desc:obj.desc,
            success: function (res) {
              // 用户确认分享后执行的回调函数
              // Toast.success('分享成功')
            },
            cancel: function () {
              // Toast.fail('取消分享')
            }
          })
          // 自定义“分享到朋友圈”及“分享到QQ空间”按钮
          wx.updateTimelineShareData({
            title:obj.title,
            link:obj.link,
            imgUrl:obj.imgUrl,
            desc:obj.desc,
            success: function (res) {
              // 用户确认分享后执行的回调函数
              // Toast.success('分享成功')
            },
            cancel: function () {
              // Toast.fail('取消分享')
            }
          })
          // 分享到腾讯微博
          // wx.onMenuShareWeibo({
          //   title:'芭莎贝雅商城1',
          //   link:'https://mall-wechat.malrro.com',
          //   imgUrl: `${require('./assets/img/logo.png')}`,
          //   desc:'描述，，，，，，，，',
          //   success: function (res) {
          //     // 用户确认分享后执行的回调函数
          //     // Toast.success('分享成功')
          //   },
          //   cancel: function () {
          //     // Toast.fail('取消分享')
          //   }
          // });
        })
    }, (err) => {
      reject(err)
    })
  })
}

// export const invokePay = (prepayId) => {
//   return new Promise((resolve, reject) => {
//     initWx().then(() => {
//       let timestamp = getTimestamp()
//       let nonceStr = getNonceStr()
//       let packageId = `prepay_id=${prepayId}`
//       let signType = 'MD5'
//       let plaintext = `appId=${appId}&nonceStr=${nonceStr}&package=${packageId}&signType=${signType}&timeStamp=${timestamp}`
//       callPaySign(plaintext).then((data) => {
//         window.wx.chooseWXPay({
//           timestamp,
//           nonceStr,
//           package: packageId,
//           signType,
//           paySign: data.signature,
//           success(res) {
//             if (res.errMsg === 'chooseWXPay:ok') {
//               resolve(true)
//             } else {
//               reject(false)
//             }
//           },
//           fail() {
//             reject(false)
//           },
//           cancel() {
//             reject(false)
//           }
//         })
//       })
//     })
//   })
// }

// 分享
// export const initShareInfo = (title, link, imgUrl, desc) => {
//   initWx()
//     .then(res => {
//     // 自定义“分享给朋友”及“分享到QQ”按钮
//     console.log(title,link,imgUrl.desc)
//     wx.updateAppMessageShareData({
//       title:'芭莎贝雅商城1',
//       link:'https://mall-wechat.malrro.com',
//       imgUrl:'https://timgsa.oss-cn-beijing.aliyuncs.com/micro/mallwxchat/banner2.png',
//       desc:'描述，，，，，，，，',
//       success: function (res) {
//         // 用户确认分享后执行的回调函数
//         Toast.success('分享成功')
//       },
//       cancel: function () {
//         Toast.fail('取消分享')
//       }
//     })
//     // 自定义“分享到朋友圈”及“分享到QQ空间”按钮
//     wx.updateTimelineShareData({
//       title:'芭莎贝雅商城1',
//       link:'https://mall-wechat.malrro.com',
//       imgUrl:'https://timgsa.oss-cn-beijing.aliyuncs.com/micro/mallwxchat/banner2.png',
//       desc:'描述，，，，，，，，',
//       success: function (res) {
//         // 用户确认分享后执行的回调函数
//         Toast.success('分享成功')
//       },
//       cancel: function () {
//         Toast.fail('取消分享')
//       }
//     })
//     // 分享到腾讯微博
//     wx.onMenuShareWeibo({
//       title,
//       link,
//       imgUrl,
//       desc,
//       success: function () {
//         // 用户确认分享后执行的回调函数
//       },
//       cancel: function () {
//         // 用户取消分享后执行的回调函数
//       }
//     });
//   })
//     .catch(err => {
//
//     })
// }

export function wechatShare(shareDate) {
  return new Promise(async function(resolve, reject) {
    try{
      let isWechat=navigator.userAgent.indexOf('MicroMessenger')>-1 //判断为微信浏览器
      if(!isWechat){
        return resolve('not weichat')
      }
      var defaultData = {
        title: `芭莎贝雅`,
        content: `内容`,
        link: `${window.location.href}`,
        logo: `${require('./assets/img/logo.png')}`, //分享出来的图片的
        success: function (res) {
        },
      }
      let data = { ...defaultData, ...shareDate }
      let ret = await act()
      wx.config(({
        // debug:1,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'],
      }, ret))
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: data.content,
          desc: '',
          link: data.link,
          imgUrl: data.logo,
          success: data.success,
          cancel: function () {},
        })
        wx.onMenuShareAppMessage({
          title: data.title,
          desc: data.content,
          link: data.link,
          imgUrl: data.logo,
          dataUrl: '',
          success: data.success,
          cancel: function () {},
        })
        wx.onMenuShareQQ({
          title: data.title,
          desc: data.content,
          link: data.link,
          imgUrl: data.logo,
          dataUrl: '',
          success: data.success,
          cancel: function () {},
        })
      })
    }catch(error){
      reject( error );
    }
  })

}








