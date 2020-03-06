const httputil = require("../../base/js/httputil.js")

Page({
  data: {
    list: []
  },
  onLoad: function() {
    var that = this;
    var url = '/Wx_rechargeController/query.do?';
    var vae = {
      sno: wx.getStorageSync('sno')
    }
    httputil.send_post(url, vae, function(data) {
      var orderList = data.data;
      if (orderList.length > 0) {
        that.setData({
          list: orderList,
        })
      }
    });

  },
})