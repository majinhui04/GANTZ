// miniprogram/pages/square;/square.js
const app = getApp();
Page({
  ...app.globalFn,
  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    tabs:[{
      name:'发现',
      filter:{
        type:{
          $in:[11,12]
        }
      }
    },
    {
      name:'声控',
      filter:{
        type:{
          $in:[2,3,9]
        }
      }
    }],
    showShareModel:false,
    shareData:null,
    loading:false
  },
  handleChangeItem(e){
    const {current} = this.data;
    const index = e.detail.current;
    console.log(e)
    this.selectComponent(`#discover${current}`).stop();
    this.setData({
      current:index
    })
    this.selectComponent(`#discover${index}`).initUI();
    this.selectComponent('#tabs').setActive(index);
  },
  // tabs
  bindselected(e){
    let {index} = e.detail.data;
    let {current} = this.data;
    this.selectComponent(`#discover${current}`).stop();
    this.setData({
      current:index
    })
    this.selectComponent(`#discover${index}`).initUI();
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
    let {current} = this.data;
    this.selectComponent(`#discover${current}`).stop();
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
    let {current} = this.data;
    this.selectComponent(`#discover${current}`).syncData(true).then(()=>{
      wx.stopPullDownRefresh();
    }).catch(()=>{
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let {loading,current} = this.data;
    // console.log(111, loading,current)
    // if (!loading) {
    //   this.setData({
    //     loading: true
    //   })
    //   this.selectComponent(`#discover${current}`).syncData().then(() => {

    //     this.setData({
    //       loading: false
    //     })
    //   }).catch(err=>{
    //     this.setData({
    //       loading: false
    //     })
    //   });
    // }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return this.data.shareData;
  }
})