// miniprogram/pages/my-avatar/my-avatar.js
const app = getApp();
Page({
  ...app.globalFn,
  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },
  handleSubmit(e){
    const {index} = e.currentTarget.dataset;
    const img = this.data.dataList[index];
    console.log(index,img)
    app.API.updateUserAvatar({data:{
      avatarUrl:img
    }}).then(res=>{
      wx.navigateBack({
        
      })
    })
  },
  syncData(){
    app.API.getAvatarList().then(res=>{
      this.setData({
        dataList:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(3)
    this.syncData();
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