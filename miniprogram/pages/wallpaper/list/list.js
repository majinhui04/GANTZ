// miniprogram/pages/wallpaper/list/list.js
const app = getApp();
Page({
  ...app.globalFn,

  /**
   * 页面的初始数据
   */
  data: {
    content:[]
  },
  //回到顶部
  goTop: function (e) { 
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
  handlePrev(e){
    let {number,totalPages} = this.data;
    if(number==0) {
      app.utils.alert('已经是第一页了')
    }else {
      this.syncData({
        data:{
          page:number-1,
          size:45
        }
      })
    }
  },
  handleNext(e){
    let {number,totalPages} = this.data;
    if((number+1)==totalPages) {
      app.utils.alert('已经是最后一页了')
    }else {
      this.syncData({
        data:{
          page:number+1,
          size:45
        }
      })
    }
  },
  syncData(options={}){
    let {data = {page:0,size:45},meta={loading:true}} = options;
    let url = this.data.url;
  
    this.goTop();
    app.request({
      url,
      ...options,
      data,
      meta
    }).then(res=>{
      let {content,totalElements,first,last,totalPages,size,number} = res.data;
      let urls = []
      content.forEach(item=>{
        item.$url = item.url.replace('w/500','w/1080')
        urls.push(item.$url)
      })
      this.setData({
        urls,
        content,
        totalElements,
        first,
        last,
        totalPages,
        size,
        number
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url:decodeURIComponent(options.api)
    })
    this.syncData(options);
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