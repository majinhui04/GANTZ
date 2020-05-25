const app = getApp();
let { globalData } = app;
let { backgroundAudioManager } = globalData;
// miniprogram/pages/voice/voice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    paging:{
      next: '/v1/voice/list'
    },
    list:[],
    post:{
      firstParagraph:'忘掉爱过的他\n当初的喜帖金箔印着那位他',
      secondParagraph: '裱起婚纱照那道墙\n及一切美丽旧年华\n明日同步拆下'
    }
  },
  handlePause(){
    backgroundAudioManager.pause()
    this.setData({
      isPlay: false
    })
  },
  handleOnPlay() {
    backgroundAudioManager.play();
    this.setData({
      isPlay: true
    })
  },
  handleNext(){
    let {list,paging} = this.data;
    let post = null;
    console.log(22, list)
    if (list.length) {
      post = list.pop();
      console.log(111, post)
      this.setData({
        post
      });
      this.handlePlay({
        coverImgUrl: post.headUrl,
        src: post.voiceUrl,
        singer: post.singer || 'GANTZ',
        title: post.songName || 'GANTZ'
      });
    }else {
      this.syncData(paging.next).then(()=>{
        this.handleNext();
      })
    }
  },
  syncData(url){
    return app.request({
      url,
      data:{
        limit:5
      }
    }).then(res => {
      this.setData({
        paging: res.paging,
        list:res.data
      })
      //return res.data;
    }).catch(err => {
      return Promise.reject(err)
    });
  },
  handlePlay(options){
    let { title = '', epname = 'GANTZ', singer = '', coverImgUrl = '',src=''} = options;
    let { globalData } = app;
    let { backgroundAudioManager } = globalData;
    console.log(app)
    backgroundAudioManager.title = title;
    backgroundAudioManager.epname = epname;
    backgroundAudioManager.singer = singer;
    backgroundAudioManager.coverImgUrl = coverImgUrl;
    backgroundAudioManager.src = src;
    backgroundAudioManager.play();
  },
  bindVoice(){
    let { globalData } = app;
    let { backgroundAudioManager } = globalData;
    backgroundAudioManager.onPlay(() => {
      this.setData({
        isPlay: true
      })
      console.log('播放中')
    });
    backgroundAudioManager.onPause(() => {
      this.setData({
        isPlay: false
      });
      console.log('暂停')
    });
    backgroundAudioManager.onStop(() => {
      this.setData({
        isPlay: false
      })
      console.log('停止')
    });
    backgroundAudioManager.onEnded(() => {
      this.setData({
        isPlay: false
      })
      console.log('结束')
      this.handleNext();
    });
    backgroundAudioManager.onError(() => {
      console.log('出错了')
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {paging} = this.data;
    this.bindVoice();
    this.syncData(paging.next).then((res)=>{
      this.handleNext()
    }).catch(err=>{
      console.error(err)
    });
   
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