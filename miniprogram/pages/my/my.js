// miniprogram/pages/my/my.js
const app = getApp();
Page({
  ...app.globalFn,
  /**
   * 页面的初始数据
   */
  data: {
    user:null
  },
  syncData(){
    app.API.getUserInfo().then(res => {
      this.setData({
        user: res.data
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  handleLogin(){
    app.API.wxLogin().then(res=>{
      this.syncData();
    })
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
    this.syncData()
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

  }
})