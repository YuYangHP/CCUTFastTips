const httputil = require("../../base/js/httputil.js")
Page({

  data: {

  },
  onLoad: function(options) {
    var that = this;
    //插入用户信息
    var url = "Wx_userController/query.do?";
    var vau = {
      id: wx.getStorageSync('sno'),
    }
    httputil.send_post(url, vau, function (e) {
      that.setData({
        name:e.data[0].membername,
        phone:e.data[0].phone,
        address:e.data[0].address
      })
    })
  },
  inputCar1: function(e) {
    this.setData({
      txt1: e.detail.value
    })
  },
  inputCar2: function(e) {
    this.setData({
      txt2: e.detail.value
    })
  },
  inputCar3: function(e) {
    this.setData({
      txt3: e.detail.value
    })
  },
  formSubmit: function() {
    var that = this;
    //插入用户信息
    var url = "Wx_userController/updateUser.do?";
    var vau = {
      id: wx.getStorageSync('sno'),
      membername: that.data.txt1,
      phone: that.data.txt2,
      address: that.data.txt3,
    }
    httputil.send_post(url, vau, function(e) {
    })
    //新建购物车
    if (wx.getStorageSync('iscart') == false) {
      //插入操作
      var url2 = "Wx_cartController/add.do?";
      var vae = {
        id: wx.getStorageSync('sno'),
        cartstatus: 0
      }
      httputil.send_post(url2, vae, function(e) {
        wx.showToast({
          title: '成功添加到购物车',
        })
      });
    }
    if (wx.getStorageSync('iscart') == true) {
      //修改操作
      var url3 = "Wx_cartController/update.do?";
      var vau3 = {
        id: wx.getStorageSync('sno'),
      }
      httputil.send_post(url3, vau3, function(e) {
        wx.showToast({
          title: '成功添加到购物车',
        })
      });
    }
    wx.setStorageSync('iscart', false)
    //订单表
    var url4 = "Wx_orderController/add.do?";
    var vau4 = {
      cart: wx.getStorageSync('sno'),
    }
    httputil.send_post(url4, vau4, function(e) {

    });
    //更改购物车状态
    var url5 = "Wx_cartController/update.do?";
    var vau5 = {
      id: wx.getStorageSync('sno'),
      cartstatus: 1
    }
    httputil.send_post(url5, vau5, function(e) {});

    //更改选中状态
    var url6 = "Wx_cartselectedController/update.do?";
    var listy = wx.getStorageSync('cart');
    for (let i = 0; i < listy.length; i++) {
      var vau6 = {
        id: listy[i].id,
        cartstatus: 1
      }
      httputil.send_post(url6, vau6, function(e) {});
    }
    wx.switchTab({
      url: '../myZoe/myZoe',
    })

  }
})