const httputil = require("../../base/js/httputil.js")
var app = getApp();
var code = null;
Page({
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    showModalStatus: true,
    inputtext: "",
    inputtext2: "",
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 60,
    nickName: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(wx.getStorageSync("islogin") == "true")
    if (wx.getStorageSync("islogin") == "true") {
      wx.switchTab({
        url: '../index/index',
      })
    }
  },
  mobileInputEvent: function(e) {
    if (e.detail.value == null) {}
    this.setData({
      inputtext: e.detail.value
    })
  },
  mobileInputEvent2: function(e) {
    this.setData({
      inputtext2: e.detail.value
    })
  },
  powerDrawer: function(e) {
    var that = this;
    var num = this.data.inputtext2;
    var url = "Wx_userController/ListBook.do?";
    wx.getUserInfo({
      success: function (res) {
        wx.setStorageSync('nick', res.userInfo.nickName)
        var vau = {
          account: that.data.inputtext,
          password: that.data.inputtext2,
          nick: wx.getStorageSync('nick')
        }
        httputil.send_post(url, vau, function (e) {
          if (e.data.length <= 0) {
            wx.showToast({
              title: '账号或密码错误',
            })
          } else {
            wx.setStorageSync('islogin', 'true');
            wx.setStorageSync('sno', e.data[0].account);
            var ps = e.data[0].password
            console.log(e.data[0].password)
            if (ps == that.data.inputtext2) {
              wx.switchTab({
                url: '../index/index',
              })
            }
            return;
          }
        });
      },
      fail: function () {
        wx.showToast({
          title: '请重新获取',
        })
        return;
      }
    })




  },
  touchstart1: function() {
    this.setData({
      inputtext: ""
    })
  },
  touchstart2: function() {
    this.setData({
      inputtext2: ""
    })
  }
})