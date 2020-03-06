const httputil = require("../../base/js/httputil.js")
Page({
  data: {
    currentTab: 0,
    list: {},
    list2: {},
    img: '/images/sc.png'
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  onLoad: function() {
    var that = this;
    var url = "/Wx_ccutlifeController/querylife.do?";
    var vau = {}
    httputil.send_post(url, vau, function(e) {
      console.log(e)
      var orderList = e.data;
      if (orderList.length > 0) {
        that.setData({
          list: orderList,
        })
      }
      var ls = that.data.list;
      for (var index1 in ls) {
        var img = "list[" + index1 + "].img";
        that.setData({
          [img]: "/images/sc.png",
        })
      }
      for (var index2 in ls) {
        var img2 = "list[" + index2 + "].img2"
        that.setData({
          [img2]: "/images/pl.png"
        })
      }
 
    })
    var vae = {
      islost: 1
    }
    //失物招领板块
    httputil.send_post(url, vae, function(e) {
      console.log(e)
      var orderList = e.data;
      if (orderList.length > 0) {
        that.setData({
          list2: orderList,
        })
        var ls = that.data.list2;
        for (var index1 in ls) {
          var img = "list2[" + index1 + "].img";
          that.setData({
            [img]: "/images/sc.png",
          })
        }
        for (var index2 in ls) {
          var img2 = "list2[" + index2 + "].img2"
          that.setData({
            [img2]: "/images/pl.png"
          })
        }
      }
    })
  },
  img: function(e) {
    console.log("id" + e.currentTarget.dataset.id)
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
      httputil.send_post(url, vae, function(e) {})
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
      httputil.send_post(url, vae, function(e) {
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
  img2: function(e) {
    console.log("id" + e.currentTarget.dataset.id)
    var that = this;
    let index = e.currentTarget.id;
    if (that.data.list2[index].img == '/images/sc2.png') {
      //取消赞
      let img = 'list2[' + index + '].img';
      this.setData({
        [img]: '/images/sc.png'
      })
      var url = "/Wx_discussController/delete.do?";
      var vae = {
        id: e.currentTarget.dataset.id
      }
      httputil.send_post(url, vae, function(e) {})
    } else {
      //点赞
      let img = 'list2[' + index + '].img';
      this.setData({
        [img]: '/images/sc2.png'
      })
      var url = "/Wx_discussController/add.do?";
      var vae = {
        class_id: that.data.list2[index].id,
        discuss_id: wx.getStorageSync('sno'),
        love: 1
      }
      httputil.send_post(url, vae, function(e) {
        var ls = that.data.list2;
        for (var index1 in ls) {
          var dis_id = "list2[" + index1 + "].dis_id";
          that.setData({
            [dis_id]: e.data,
          })
        }
      });
    }
  },
  comment: function(e) {
    var that = this;
    let id = e.currentTarget.id;
    wx.setStorageSync('comment_id', id);
    wx.navigateTo({
      url: '../details/details',
    })
  },
  inputstyle: function(e) {
    this.setData({
      input: e.detail.value
    })
  },
  inputstyle2: function(e) {
    this.setData({
      input2: e.detail.value
    })
  },
  send: function() {
    var that = this;
    var url = "/Wx_ccutlifeController/querylife.do?";
    var vau = {
      content: that.data.input,
      // islost: 0
    }
    httputil.send_post(url, vau, function(e) {
      console.log(e.data)
      that.setData({
        list: e.data
      })
      var ls = that.data.list;
      for (var index1 in ls) {
        var img = "list[" + index1 + "].img";
        that.setData({
          [img]: "/images/sc.png",
        })
      }
      for (var index2 in ls) {
        var img2 = "list[" + index2 + "].img2"
        that.setData({
          [img2]: "/images/pl.png"
        })
      }
    })
  },
  send2: function() {
    var that = this;
    var url = "/Wx_ccutlifeController/querylife.do?";
    var vau = {
      content: that.data.input2,
      islost: 1
    }
    httputil.send_post(url, vau, function(e) {
      console.log(e.data)
      that.setData({
        list2: e.data
      })
      var ls = that.data.list2;
      for (var index1 in ls) {
        var img = "list2[" + index1 + "].img";
        that.setData({
          [img]: "/images/sc.png",
        })
      }
      for (var index2 in ls) {
        var img2 = "list2[" + index2 + "].img2"
        that.setData({
          [img2]: "/images/pl.png"
        })
      }
    })
  }
})