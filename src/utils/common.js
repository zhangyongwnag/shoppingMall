import m from './md5.min'
import * as config from './config'
import cli from '@/api/request'

function _toast (text, delay) {
  var div = document.createElement('div')
  div.style.fontFamily = 'Microsoft YaHei'
  div.style.position = 'fixed'
  div.style.maxWidth = '80%'
  div.style.color = 'white'
  div.style.boxSizing = 'border-box'
  div.style.background = 'rgba(0,0,0,0.76)'
  div.style.padding = '0.8em 1.618em'
  div.style.top = '50%'
  div.style.left = '50%'
  div.style.zIndex = 999999999
  div.style.borderRadius = '5px'
  div.style.opacity = '0'
  div.innerText = text
  document.body.appendChild(div)
  div.style.marginLeft = (-div.offsetWidth / 2) + 'px'
  div.style.marginTop = (-div.offsetHeight / 2) + 'px'
  setTimeout(function () {
    div.style.marginLeft = (-div.offsetWidth / 2) + 'px'
    div.style.marginTop = (-div.offsetHeight) + 'px'
    div.style.transition = 'all 0.3s'
    div.style.opacity = '1'
    setTimeout(function () {
      div.style.opacity = '0'
      div.style.marginTop = (-div.offsetHeight / 2) + 'px'
      setTimeout(function () {
        document.body.removeChild(div)
      }, 300)
    }, parseInt(delay) || 1618)
  }, 0)
}

export function toast (msg) {
  _toast(msg, 2500)
}

export function httpCli (url, data, callback) {
  data.url = url
  httpPost(data, callback)
}

export function httpPost (opt, callback) {
  let commonParam = encodeURIComponent(JSON.stringify(testparam()))
  var url = opt.url
  delete opt.url
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        callback(this.response)
      } else {
        callback({code: this.status, msg: 'code not in (200, 300)'})
      }
    }
  }
  xmlhttp.responseType = 'json'
  xmlhttp.open('POST', url, true)
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xmlhttp.setRequestHeader('tracecode', commonParam)
  // opt = encryptparam(opt);
  var body = ''
  for (var key in opt) {
    body += key + '=' + encodeURIComponent(opt[key]) + '&'
  }
  body = body.substring(0, body.length - 1)
  xmlhttp.send(body)
  xmlhttp.onerror = function () {
    toast('请求失败，请检查网络设置')
  }
}

function encryptparam (obj) {
  var keys = []
  typeof (obj) == 'object' ? '' : obj = {}

  obj.appid = ''//appid
  obj.ver = 1
  obj.dv = 1
  for (var key in obj) {
    keys.push(key)
  }
  keys = keys.sort()
  var sortData = {}

  var strSign = ''
  if (keys.length > 0) {
    for (var k in keys) {
      if (keys[k] == 'sign') {
        continue
      }
      if (typeof (keys[k]) == 'undefined') {
        continue
      }
      strSign += '&' + keys[k] + '=' + encodeURIComponent(obj[keys[k]])
    }
  }
  var appkey = ''//appkey
  strSign = strSign.substr(1)
  obj['sign'] = m.md5(strSign + appkey).toLowerCase()
  return obj
}

export function testparam () {
  let userAgent = global.navigator.userAgent//浏览器环境
  let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
  let wechatVersion = ''
  if (wechatInfo) {
    wechatVersion = wechatInfo[1] // 获取微信版本号
  }
  let userToken = ''//用户token
  if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).memberToken) {
    userToken = JSON.parse(localStorage.getItem('userInfo')).memberToken
  }
  let os = detectOS()//操作系统版本
  let app = 'm-u'//app
  let dpi = window.screen.width + 'x' + window.screen.height//分辨率
  let guid = uuid()//guid
  let obj = {
    ua: userAgent,
    cv: wechatVersion,
    token: userToken,
    os: os,
    app: app,
    ws: dpi,
    pkey: guid,
    sc: ''
  }
  // if (document.cookie.indexOf('sc') != -1) {
  if (getCookie('sc')){
    obj.sc = getCookie('sc').substring(1,getCookie('sc').length)
  }
    // getCookie('sc') != '/bazaar' ? obj.sc = getCookie('sc') : delete obj.s
  // }
  return obj
}

//获取操作系统版本
function detectOS () {
  Array.prototype.contains = function (needle) {
    for (i in this) {
      if (this[i].indexOf(needle) > 0)
        return i
    }
    return -1
  }

  var device_type = navigator.userAgent//获取userAgent信息  
  var md = new MobileDetect(device_type)//初始化mobile-detect  
  var os = md.os()//获取系统  
  var model = ''
  if (os == 'iOS') {//ios系统的处理  
    os = md.os() + md.version('iPhone')
    model = md.mobile()
  } else if (os == 'AndroidOS') {//Android系统的处理  
    os = md.os() + md.version('Android')
    var sss = device_type.split(';')
    var i = sss.contains('Build/')
    if (i > -1) {
      model = sss[i].substring(0, sss[i].indexOf('Build/'))
    }
  }
  return (os + '---' + model)//打印系统版本和手机型号  
}

//获取guid
function uuid () {
  if (localStorage.getItem('uuid')){
    return localStorage.getItem('uuid')
  }else {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    localStorage.setItem('uuid',uuid)
    return uuid
  }
}

// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// (new Date()).Format("yyyy-MM-dd")      ==> 2006-07-02
// (new Date()).Format("yyyy年MM月dd日 上午hh:mm")      ==> 2006年07月-02日 上午08:09
// (new Date()).Format("yyyyMMdd")      ==> 20060702
// (new Date()).Format("yyyyMMddhhmmss")      ==> 20060702080904
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,                 //月份
    'd+': this.getDate(),                    //日
    'h+': this.getHours(),                   //小时
    'm+': this.getMinutes(),                 //分
    's+': this.getSeconds(),                 //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds()             //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

export function dateResult (result, fmt) {
  return new Date(result).format(fmt)
}

//身份证ID判断
function Isyx (yx) {
  var reyx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return (reyx.test(yx))
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard (a_idCard) {
  var sum = 0 // 声明加权求和变量
  if (a_idCard[17].toLowerCase() == 'x') {
    a_idCard[17] = 10// 将最后位为x的验证码替换为10方便后续操作
  }
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * a_idCard[i]// 加权求和
  }
  let valCodePosition = sum % 11// 得到验证码所位置
  if (a_idCard[17] == ValideCode[valCodePosition]) {
    return true
  } else {
    return false
  }
}

/**
 * 通过身份证判断是男是女
 * @param idCard 15/18位身份证号码
 * @return 'female'-女、'male'-男
 */
function maleOrFemalByIdCard (idCard) {
  idCard = trim(idCard.replace(/ /g, ''))// 对身份证号码做处理。包括字符间有空格。
  if (idCard.length == 15) {
    if (idCard.substring(14, 15) % 2 == 0) {
      return 'female'
    } else {
      return 'male'
    }
  } else if (idCard.length == 18) {
    if (idCard.substring(14, 17) % 2 == 0) {
      return 'female'
    } else {
      return 'male'
    }
  } else {
    return null
  }
}

function isValidityBrithBy18IdCard (idCard18) {
  var year = idCard18.substring(6, 10)
  var month = idCard18.substring(10, 12)
  var day = idCard18.substring(12, 14)
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
  // 这里用getFullYear()获取年份，避免千年虫问题
  if (temp_date.getFullYear() != parseFloat(year)
    || temp_date.getMonth() != parseFloat(month) - 1
    || temp_date.getDate() != parseFloat(day)) {
    return false
  } else {
    return true
  }
}

function isValidityBrithBy15IdCard (idCard15) {
  var year = idCard15.substring(6, 8)
  var month = idCard15.substring(8, 10)
  var day = idCard15.substring(10, 12)
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if (temp_date.getYear() != parseFloat(year)
    || temp_date.getMonth() != parseFloat(month) - 1
    || temp_date.getDate() != parseFloat(day)) {
    return false
  } else {
    return true
  }
}

var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]// 加权因子
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]// 身份证验证位值.10代表X
export function IdCardValidate (idCard) {
  idCard = trim(idCard.replace(/ /g, ''))
  if (idCard.length == 15) {
    return isValidityBrithBy15IdCard(idCard)
  } else if (idCard.length == 18) {
    var a_idCard = idCard.split('')// 得到身份证数组
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export function isphone (inputString) {
  var partten = /^1[3,5,8,2,4,6,7,9]\d{9}$/
  var fl = false
  if (partten.test(inputString)) {
    //alert('是手机号码');
    return true
  }
  else {
    return false
    //alert('不是手机号码');
  }
}

//去掉字符串头尾空格
function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

function isEmail (str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return reg.test(str)
}

export function is_weixn () {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

function getParam (key) {
  let results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(window.location.href)
  if (results) {
    return results[1]
  } else {
    return ''
  }
}

export function getOpenId () {
  return new Promise((resolve, reject) => {
    if (!sessionStorage.getItem('openId') || sessionStorage.getItem('openId') == 'undefined' || sessionStorage.getItem('openId') == 'null') {
      if (window.location.href.indexOf('code') != -1) {
        let data = {
          code: getParam('code')
        }
        cli({
          url: config.URL_WX_OPENID,
          data: data
        })
          .then(res => {
            if (res.errorCode == 100) {
              res.data.openid ? sessionStorage.setItem('openId', res.data.openid) : toast(res.data.errorMsg)
              console.log(sessionStorage.getItem('openId'))
              resolve(res.data)
            }
          })
          .catch(err => {

          })
      }
    }
  })
}

export function getUser () {
  return new Promise((resolve, reject) => {
    let data = {
      openid: sessionStorage.getItem('openId')
    }
    cli({
      url: config.URL_WX_USER,
      data: data
    })
      .then(res => {
        if (res.errorCode == 100) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

//设置cookie
export function setCookie (name, value, days) {
  let d = new Date()
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toUTCString()
  document.cookie = name + '=' + value + '; path=/;' + expires
}
export function getCookie (name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')

  if (arr = document.cookie.match(reg))

    return unescape(arr[2])
  else
    return null
}

export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null)
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}

