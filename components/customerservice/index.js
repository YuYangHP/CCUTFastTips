Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    top: {
      type: String,
      value: '40%',
    },
    left: {
      type: String,
      value: '89%',
    },
    // anima:{
    //   type: Object,
    // }
  },
  data: {
    // 这里是一些组件内部数据
    // top: '80%',
    // left: '89%',
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      var res = wx.getSystemInfoSync();
      this.animation = wx.createAnimation()
      this.setData({
        systemInfo: res,
      })
    },
    moved: function() {},
    detached: function() {},
  },
  methods: {
    // 这里是一个自定义方法
    //拖动不超过规定范围
    /**
     * 计算拖动的位置
     */
    setTouchMove: function(e) {
      this.animation.translateX(0).step({
        duration: 0
      })
      this.setData({
        anima: this.animation.export()
      })
      var top = e.touches[0].clientY;
      var left = e.touches[0].clientX;
      var systemInfo = this.data.systemInfo;
      var maxTop = systemInfo.windowHeight * 0.90;
      var maxLeft = systemInfo.windowWidth * 0.89;
      if (top < 0) {
        top = 0;
      }
      if (top > maxTop) {
        top = maxTop;
      }
      if (left < 0) {
        left = 0;
      }
      if (left > maxLeft) {
        left = maxLeft;
      }
      this.triggerEvent('myevent', {
        top: top + "px",
        left: left + "px",
        anima: "",
      });
    },
    setCoordinates: function() {
      this.animation = wx.createAnimation({
        duration: 300
      })
      var left = Number(this.data.left.replace("px", ""));
      var translation = 0;
      if (left >= ((this.data.systemInfo.windowWidth - 35) / 2)) {
        translation = this.data.systemInfo.windowWidth * 0.89 - left;
        left = this.data.systemInfo.windowWidth * 0.89;
      } else {
        translation = -left;
        left = 0;
      }
      this.animation.translateX(translation).step({
        duration: 300
      })
      this.setData({
        anima: this.animation.export()
      })
    },
    /**
     * 拨打客服电话
     */
    makephone: function() {
      wx.navigateTo({
        url: '../shoppingcart/shoppingcart',
      })
    }
  }
})