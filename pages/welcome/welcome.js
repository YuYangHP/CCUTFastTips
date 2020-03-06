var vae = {}
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    wx.reLaunch({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "../login/login"
    })
    return;
  }
  var time = setTimeout(function () {
    if (that.data.second != -1) {
      that.setData({
        second: second - 1
      });
      countdown(that);

    }
  }
    , 1000)
}
Page({
  data: {
    second: 3,
    imgalist: ['http://124.235.118.12:6789/android.png',
      'http://124.235.118.12:6789/ios.png'
    ]
    ,
    img: 'http://124.235.118.12:6789/downloadIOS.png'
  },

  onLoad: function () {
    countdown(this);
  },
  back: function () {
    this.setData({
      second: -1
    });
    countdown(this);
    wx.reLaunch({
      url: '../login/login',
    })
  },
  /** 
	 * 预览图片
	 */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  }
});

