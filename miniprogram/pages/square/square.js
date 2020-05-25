// miniprogram/pages/square;/square.js
const app = getApp();
Page({
  ...app.globalFn,
  /**
   * 页面的初始数据
   */
  data: {
    showShareModel:false,
    shareData:null,
    loading:false
  },
  hideShareModel(){
    this.setData({
      showShareModel: false
     
    })
  },
  bindshare(e){
    const ret = e.detail.data;
    this.setData({
      showShareModel:true,
      shareData:ret
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectComponent('#discover').syncData();
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
    this.selectComponent('#discover').stop();
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
    console.log('onPullDownRefresh');
    
    this.selectComponent('#discover').syncData(true).then(()=>{
      wx.stopPullDownRefresh();
    }).catch(()=>{
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let loading = this.data.loading;
    console.log(111, loading)
    if (!loading) {
      this.setData({
        loading: true
      })
      this.selectComponent('#discover').syncData().then(() => {

        this.setData({
          loading: false
        })
      }).catch(err=>{
        this.setData({
          loading: false
        })
      });
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return this.data.shareData;
  }
})