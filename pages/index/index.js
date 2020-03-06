const httputil = require("../../base/js/httputil.js")
Page({
  onShareAppMessage: function() {
    return {
      title: '工大快查',
      imageUrl: '/images/welcome.jpg'
    }
  },
  data: {
    imgUrls: [
      // '/images/school4.jpg',
      // '/images/school6.jpg',
      '/images/school3.jpg',
      // '/images/school1.jpg',
    ],
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    booklist: []
  },
  onLoad(e) {
    this.setData({
      msgList: [{
          url: "url",
          title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代"
        },
        {
          url: "url",
          title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱"
        },
        {
          url: "url",
          title: "公告：你想和一群有志青年一起过生日嘛？"
        }
      ]
    });
    var that = this;
    var url = "Wx_bookController/query.do?";
    var vau = {}
    httputil.send_post(url, vau, function(e) {
      var list = e.data;
      if (list.length > 0) {
        that.setData({
          booklist: list,
        })
      }
    })
    // 查询此人是否存在购物车
    var that = this;
    var url6 = "Wx_cartController/query.do?";
    var vau6 = {
      id: wx.getStorageSync('sno')
    }
    httputil.send_post(url6, vau6, function(e) {
      if (e.data.length <= 0) {
        wx.setStorageSync('iscart', false)
      }else{
        wx.setStorageSync('iscart', true)
      }
    })







    
  },
  ccutlife: function() {
    wx.navigateTo({
      url: '../ccutlife/ccutlife',
    })
  },
  netcharge: function() {
    wx.navigateTo({
      url: '../netcharge/netcharge',
    })
  },
  cardcharge: function() {
    wx.navigateTo({
      url: '../cardcharge/cardcharge',
    })
  },
  timetable: function() {
    wx.navigateTo({
      url: '../timetable/timetable',
    })
  },
  bookdetail: function(e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '../bookdetail/bookdetail?data=' + [id],
    })
  },
  onMyEvent: function(e) {
    this.setData({
      component: e.detail
    })
  },
  call_phone:function(){
    wx.makePhoneCall({
      phoneNumber: "0433-6648109",
      success: function () {
        console.log("拨打电话成功")
      }
    })
  }
})