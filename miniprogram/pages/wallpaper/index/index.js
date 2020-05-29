// miniprogram/pages/wallpaper/wallpaper-index/wallpaper-index.js
const app = getApp();
Page({
  ...app.globalFn,

  /**
   * 页面的初始数据
   */
  data: {
    mrjx_wallpapers:[], // 精选
    rwallpapers: [], // 猜你喜欢
    dwallpapers:[], // 近期下载
    nwallpapers:[], // 最新壁纸
    classifyList:[]
  },
  syncData(){
    app.API.wallpaperRecommend({meta:{loading:true}}).then(res=>{
      let {data} = res;
      let {choice,rwallpapers,dwallpapers,nwallpapers} = data;
      this.setData({
        nwallpapers,
        dwallpapers,
        rwallpapers,
        mrjx_wallpapers:choice.wallpapers
      })
      console.log(res)
    }).catch(err=>{
      console.log(err)
    });
    app.API.wallpaperDiscover().then(res=>{
      let {classifyList} = res.data;
      this.setData({
        classifyList:classifyList
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.syncData()
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