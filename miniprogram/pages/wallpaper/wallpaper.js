// miniprogram/pages/wallpaper/wallpaper.js
const app = getApp();
Page({
  ...app.globalFn,

  /**
   * 页面的初始数据
   */
  data: {
    urls:[],
    dataList:[{},{},{},{}]
  },
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  handleRandom(){
    this.goTop();
    this.onLoad();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    app.API.wallpaperRandomFetch({meta:{loading:true}}).then(res=>{
      let content = res.data.content;
      let urls = [];
      content.forEach(item=>{
        item.$url = item.url.replace('w/500','w/1080')
        urls.push(item.$url)
      })
      this.setData({
        urls: urls,
        dataList: content
      })
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
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

  }
})