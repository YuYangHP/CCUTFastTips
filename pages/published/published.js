const httputil = require("../../base/js/httputil.js")

Page({
  data: {
  },
  onLoad: function(options) {
    var that = this;
    var url = "/Wx_ccutlifeController/querylife.do?";
    var vau = {
      user_id: wx.getStorageSync('sno'),
    }
    httputil.send_post(url, vau, function(e) {
      var orderList = e.data;
      var ls = orderList;
      for (var index1 in ls) {
        ls[index1].img ='/images/sc.png';
        ls[index1].img2 = '/images/pl.png';
        ls[index1].img3 = '/images/delete.png';
      }
      that.setData({
        list:ls,
      })
      if (orderList.length > 0) {
        that.setData({
          list: orderList,
        })
      }
    })
  },
  del: function(e) {
    // console.log(e.currentTarget.id)
    console.log(e.currentTarget.dataset.id)
    var that = this;
    var url = "/Wx_ccutlifeController/deletelife.do?";
    var vau = {
      id: e.currentTarget.id,
    }
    that.data.list.splice(e.currentTarget.dataset.id, 1)
    httputil.send_post(url, vau, function(e) {
      var url2 = "/Wx_ccutlifeController/querylife.do?";
      var vau2 = {
        user_id: wx.getStorageSync('sno'),
      }
      httputil.send_post(url2, vau2, function(e) {
        that.onLoad();
        // var orderList = e.data;
        // if (orderList.length > 0) {
        //   that.setData({
        //     list: orderList,
        //   })
        // }
      })

    })
  },
    img: function (e) {
    var that = this;
    let index = e.currentTarget.id;
    if (that.data.list[index].img == '/images/sc2.png') {
      //取消赞
      let img = 'list[' + index + '].img';
      this.setData({
        [img]: '/images/sc.png'
      })
      var url = "/Wx_discussController/delete.do?";
      var vae = {
        id: e.currentTarget.dataset.id
      }
      httputil.send_post(url, vae, function (e) { })
    } else {
      //点赞
      let img = 'list[' + index + '].img';
      this.setData({
        [img]: '/images/sc2.png'
      })
      var url = "/Wx_discussController/add.do?";
      var vae = {
        class_id: that.data.list[index].id,
        discuss_id: wx.getStorageSync('sno'),
        love: 1
      }
      httputil.send_post(url, vae, function (e) {
        var ls = that.data.list;
        for (var index1 in ls) {
          var dis_id = "list[" + index1 + "].dis_id";
          that.setData({
            [dis_id]: e.data,
          })
        }
      });
    }
  },
  comment: function (e) {
    var that = this;
    let id = e.currentTarget.id;
    wx.setStorageSync('comment_id', id);
    wx.navigateTo({
      url: '../details/details',
    })
  },

})