const httputil = require("../../base/js/httputil.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist: {}
  },
  onLoad: function(options) {
    //此时A页面传递的参数由options接收，A页面传递参数时的参数名叫data,所以B页面想拿到A页面传递的参数使用对象方式取
    let data1 = options.data;
    var that = this;
    var url = "Wx_bookController/query.do?";
    var vau = {
      id: data1
    }
    httputil.send_post(url, vau, function(e) {
      console.log(e)
      var list = e.data;
      if (list.length > 0) {
        that.setData({
          booklist: list[0],
        })
      }
    })
    // let dataArr = options.data.split(','); //使用split方法将字符串分割为数组
    // console.log(dataArr); //此时得到的结果是 [1,2] 变成一个数组
    // console.log(dataArr[0]); //输出结果  1
    // console.log(dataArr[1]); //输出结果  2
  },
  onMyEvent: function(e) {
    this.setData({
      component: e.detail
    })
  },
  insertcart: function() {
    var that = this;
    var url0 = "Wx_cartselectedController/add.do?";
    var vau0 = {
      cart_id: wx.getStorageSync('sno'),
      book_id: that.data.booklist.id,
      member: 1,
      price: that.data.booklist.price,
      money: that.data.booklist.price,
      cartstatus:0
    }
    httputil.send_post(url0, vau0, function(e) {
      wx.showToast({
        title: '成功添加到购物车',
      })
    })
  }
})