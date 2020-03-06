// pages/comment/comment.js
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
    var that = this;
    var lss = that.data.carts
    var url = "Wx_cartselectedController/queryorder.do?";
    var vau = {
      cart_id: wx.getStorageSync('sno'),
      cartstatus: 1
    }
    httputil.send_post(url, vau, function(e) {
      console.log(e)
      let list = e.data
      that.setData({
        orderlist: list,
      })
    })
  },
  confirm: function(e) {
    let id = e.currentTarget.dataset.id;
    var that = this;
    var url = "Wx_cartselectedController/update.do?";
    var vau = {
      id: id,
      cartstatus: 2,
    }
    httputil.send_post(url, vau, function(e) {
      // console.log(e)
      that.onLoad();
    })
  },
})