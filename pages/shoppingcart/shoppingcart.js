const httputil = require("../../base/js/httputil.js")
Page({
  data: {
    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: true, // 全选状态，默认全选
  },
  onLoad: function() {
    var that = this;
    var lss = that.data.carts
    var url = "Wx_cartselectedController/query.do?";
    var vau = {
      cart_id: wx.getStorageSync('sno'),
    }
    httputil.send_post(url, vau, function(e) {
      let cartlist = e.data
      for (let i = 0; i < cartlist.length; i++) {
        var vae = {
          id: cartlist[i].book_id
        }
        httputil.send_post('Wx_bookController/query.do?', vae, function(e) {
          for (let g = 0; g < e.data.length; g++) {
            lss.push(e.data[g])
          }
          for (let j = 0; j < lss.length; j++) {
            lss[i].id = cartlist[i].id
            lss[i].havenum = cartlist[i].num
            lss[j].selected = true;
          }
          that.setData({
            carts: lss,
          })
          that.getTotalPrice2(lss);
        })
      }
    })
  },
  onShow() {
    this.setData({
      hasList: true,
    });
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    var that = this;
    const index = e.currentTarget.dataset.index;
    let carts = that.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    var url = "Wx_cartselectedController/delete.do?";
    var vau = {
      id: e.currentTarget.dataset.id,
    }
    httputil.send_post(url, vau, function(e) {
      // this.onLoad();
    })
    this.getTotalPrice();
  },
  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },
  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].havenum;
    num = num + 1;
    carts[index].havenum = num;
    this.setData({
      carts: carts
    });
    console.log(this.data.carts)
    this.getTotalPrice();
  },
  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].havenum;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].havenum = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += carts[i].havenum * carts[i].price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  getTotalPrice2(carts) {
    // let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += carts[i].havenum * carts[i].price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  //结算
  toBuy: function() {
    wx.setStorageSync('cart', this.data.carts);
    wx.navigateTo({
      url: '../ccutpay/ccutpay',
    })
  }

})