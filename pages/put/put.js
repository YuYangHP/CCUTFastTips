const httputil = require("../../base/js/httputil.js")
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "../ccutlife/ccutlife"
    })
    return;
  }
  var time = setTimeout(function() {
    if (that.data.second != -1) {
      that.setData({
        second: second - 1
      });
      countdown(that);
    }
  }, 1000)
}
Page({
  data: {
    second: 1,
    // 字数限制
    current: 0,
    txtContent:'',
    max: 300,
    items: [{
      name: '1',
      value: '发布到失物招领板块',
      checked: false
    }],
  },
  onLoad: function(options) {

  },
  // 文本框字数限制
  limit: function(e) {
    var value = e.detail.value;
    var length = parseInt(value.length);
    if (length > this.data.noteMaxLen) {
      return;
    }
    this.setData({
      current: length
    });
    this.setData({
      txt: e.detail.value
    })
  },
  back: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  put: function() {
    var that = this;
    var url = "/Wx_ccutlifeController/addlife.do?";
    if (that.data.items[0].checked == false) {
      var vau = {
        content: that.data.txt,
        user_id: wx.getStorageSync('sno'),
      }
    } else {
      var vau = {
        content: that.data.txt,
        user_id: wx.getStorageSync('sno'),
        islost: 1
      }
    }
    this.setData({
      txtContent: ''
    });
    httputil.send_post(url, vau, function(e) {
      wx.showToast({
        title: '发布成功',
      })
      countdown(that);
    })
  },
  bindtap1: function(e) {
    var items = this.data.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].name == this.data.aa) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].checked && j != i) {
            items[j].checked = false;
          }
        }
        items[i].checked = !(items[i].checked);
      }
    }
    this.setData({
      items: items
    });
  },
  radioChange: function(e) {
    this.data.aa = e.detail.value;
  }
})