// miniprogram/pages/post/post.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recorderManager:null,
    status:0
  },
  handleStart(){
    let {recorderManager} = this.data;
    this.setData({
      status:1
    });
    console.log(11,this.data.status);
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options);
  },
  handleStop() {
    let { recorderManager } = this.data;
    this.setData({
      status: 0
    });
    recorderManager.onStop((res) => {
      const { tempFilePath } = res;
      console.log('tempFilePath', tempFilePath)
      //上传录制的音频
      // wx.uploadFile({
      //   url: 'https://cookbook.cityshop.com.cn/index.php?r=product/tune',
      //   filePath: tempFilePath,
      //   name: 'viceo',
      //   success: function (res) {
      //     wx.hideToast();
      //     //如果为空
      //     if (res.statusCode != 500) {
      //       that.wxSearchAddHisKey(res.data);
      //     }
      //     if (speakTime >= 350) {
      //       wx.navigateTo({
      //         url: '../result/result?searchValue=' + res.data
      //       })
      //     }
      //   }
      // })
    });
    //触发录音停止
    recorderManager.stop();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let recorderManager = wx.getRecorderManager();
    this.setData({
      recorderManager
    });

    let audioContext = wx.createInnerAudioContext();
    
    //audioContext.src = 'http://thepoemforyou.oss-cn-beijing.aliyuncs.com/audio/20200408/video/95564bf4b8a54d63a2f81da7c01aaf3f.mp3';
    
   audioContext.src = 'http://qiniuimage.neoclub.cn/miaohong/audio/prod/8426773/442/ios1588730144.aac';
    audioContext.play();
    console.log(111)
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