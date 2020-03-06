function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    wx.switchTab({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "../index/index"
    })
    return;
  }
  var time = setTimeout(function () {
    if (that.data.second != -1) {
      that.setData({
        second: second - 1
      });
      countdown(that);
    }
  }, 1000)
}
const httputil = require("../../base/js/httputil.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    second: 1,
    inputtext: "",
    inputtext2: "",
    inputtext3: "",
    txt:wx.getStorageSync('sno')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  mobileInputEvent: function (e) {
    if (e.detail.value == null) { }
    this.setData({
      inputtext: e.detail.value
    })
  },
  mobileInputEvent2: function (e) {
    this.setData({
      inputtext2: e.detail.value
    })
  },
  mobileInputEvent3: function (e) {
    if (e.detail.value == null) { }
    this.setData({
      inputtext3: e.detail.value
    })
  },
  formSubmit: function () {
    var that = this;
    var num = this.data.inputtext2;
    var url = "/Wx_userController/ListBook.do?";
    var vau = {
      account: that.data.inputtext,
      password: that.data.inputtext2,
    }
    console.log(vau)
    httputil.send_post(url, vau, function (e) {
      if (e.data.length <= 0) {
        wx.showToast({
          title: '账号或密码错误',
        })
      } else {
        var vae = {
          sno: wx.getStorageSync('sno'),
          networkmoney: that.data.inputtext3
        }
        var url2 = "/Wx_rechargeController/addMoney.do?";
        console.log(vae)
        httputil.send_post(url2, vae, function (e) {
          wx.showToast({
            title: '充值成功'
          })
          countdown(that);
        })
      }
    });

  }
})