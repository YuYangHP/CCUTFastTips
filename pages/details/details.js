const httputil = require("../../base/js/httputil.js")
Page({
  data: {
    list: [],
    txt: '',
    commentlist: []
  },
  onLoad: function(options) {
    var that = this;
    var url = "Wx_ccutlifeController/querylife.do?";
    var vau = {
      id: wx.getStorageSync('comment_id')
    }
    httputil.send_post(url, vau, function(e) {
      var orderList = e.data;
      if (orderList.length > 0) {
        that.setData({
          list: orderList,
        })
      }
    })
    var url2 = "Wx_discussController/queryCount.do?";
    var vae = {
      class_id: wx.getStorageSync('comment_id')
    }
    httputil.send_post(url2, vae, function(e) {
      that.setData({
        count: e.data
      })
    })
    var url3 = "Wx_discussController/querynick.do?";
    var vae2 = {
      class_id: wx.getStorageSync('comment_id')
    }
    httputil.send_post(url3, vae2, function(e) {
      var comment = e.data;
      if (comment.length > 0) {
        that.setData({
          commentlist: comment,
        })
      }
    })
  },
  limit: function(e) {
    var value = e.detail.value;
    this.setData({
      txt: e.detail.value
    })
  },
  submit: function() {
    var that = this;
    var id = that.data.list[0].id;
    var url = "/Wx_discussController/add.do?";
    var vau = {
      class_id: id,
      discuss: that.data.txt,
      discuss_id: wx.getStorageSync('sno')
    }
    httputil.send_post(url, vau, function(e) {

    })
    var url2 = "Wx_discussController/queryCount.do?";
    var vae = {
      class_id: wx.getStorageSync('comment_id')
    }
    httputil.send_post(url2, vae, function (e) {
      that.setData({
        count: e.data
      })
    })
    var url3 = "Wx_discussController/querynick.do?";
    var vae2 = {
      class_id: wx.getStorageSync('comment_id')
    }
    httputil.send_post(url3, vae2, function (e) {
      var comment = e.data;
      if (comment.length > 0) {
        that.setData({
          commentlist: comment,
        })
      }
 
 bindd    })
  }
})