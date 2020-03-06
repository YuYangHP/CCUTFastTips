// pages/myZoe/myZoe.js
const httputil = require("../../base/js/httputil.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  published: function() {
    wx.navigateTo({
      url: '../published/published',
    })
  },
  comment: function() {
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  earn: function() {
    var url = "/Wx_rechargeController/queryMoney.do?";
    var url2 = "/Wx_expenseController/queryMoney.do?";
    var cardexpensemoney = 0;
    var networkmonetary = 0;
    var vau = {
      sno: wx.getStorageSync('sno'),
    }
    httputil.send_post(url, vau, function(e) {
      httputil.send_post(url2, vau, function(e1) {
        cardexpensemoney = e1.data.cardmonetary;
        networkmonetary = e1.data.networkmonetary;
        var earncardmoney = e.data.cardmoney - cardexpensemoney - networkmonetary;
        var earnnetmoney = e.data.networkmoney - networkmonetary;
        wx.showModal({
          title: '校园卡余额',
          content: '您的余额为' + earncardmoney + '元',
        })
      });
    });
  },
  record: function() {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  onMyEvent: function(e) {
    this.setData({
      component: e.detail
    })
  },
})