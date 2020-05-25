// miniprogram/pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //页面上拉触底事件的处理函数
  onReachBottom(e) {
    console.log("底部")// 滚动到页面执行 该 方法 
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    })
    /*
      这里执行你需要的请求数据追加到循环数组就好了
    */
  },
  onPageScroll(e) {
    console.log(e) //滚动条 滚动的位置（e.scrollTop）从头部开始计算
  },
})