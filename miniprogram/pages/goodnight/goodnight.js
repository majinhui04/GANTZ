// miniprogram/pages/goodnight/goodnight.js
const app = getApp();
let { globalData } = app;
let { backgroundAudioManager } = globalData;

Page({
  ...app.globalFn,
  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    currentTarget:null,
    dataList:[{
      isPlay:false,
      type:'助眠白噪音',
      title:'东京浅草寺的阴雨',
src:'https://assets.goodnight.whatyouneed.cc/whitenoise_voice/Ambience_forest_rain_light_loop.mp3'
    },{
        isPlay: false,
        type: '助眠白噪音',
        title: '黎明时默奇森山的林间鸟语',
        src: 'https://assets.goodnight.whatyouneed.cc/whitenoise_voice/Alpine_Tussock_Grassland_Atmosphere_Sounds_of_wind_blowing_a.mp3'
    },{
        isPlay: false,
        type: '助眠白噪音',
        title: '下午三点巴塞罗那的沙滩边',
        src: 'https://assets.goodnight.whatyouneed.cc/whitenoise_voice/Ambience_Beach_Waves_People_Loop.mp3'
    },
      {
        isPlay: false,
        type: '助眠白噪音',
        title: '秋天坦桑尼亚麦田的风',
        src: 'https://assets.goodnight.whatyouneed.cc/whitenoise_voice/Agricultural_Land_Atmosphere_across_highland_wheat_field_Sho.mp3'
      },
      {
        isPlay: false,
        type: '助眠白噪音',
        title: '傍晚墨尔本街道的雨夜',
        src: 'https://assets.goodnight.whatyouneed.cc/whitenoise_voice/Ambience_Melbourne_City_Heavy_Rain.mp3'
      }]
  },
  handleTogglePlay(e){
    const { index } = e.currentTarget.dataset;
    const { dataList } = this.data;
    const audio = this.data.dataList[index];
   console.log('index',index)
    this.setData({
      currentTarget:{
        index,
        ...audio
      }
    })
    
    if(audio.isPlay) {
      this.stop();
     
    }else {
      this.play();
      
    }
    
    
    console.log(e)
  },
  syncAudioUI(play){
    const { dataList, currentTarget } = this.data;
    const {index} = currentTarget;
    const audio = dataList[index];
    console.log('11index', index)
    dataList.forEach(item => {
      item.isPlay = false;
    })
    if (play) {
      audio.isPlay = true;
    }
    this.setData({
      dataList: dataList
    })
  },
  play(){
    console.log(2345)
    const {currentTarget} = this.data;
    let { title, epname = 'GANTZ', singer = 'GANTZ', coverImgUrl = 'https://pic2.zhimg.com/v2-9513377e7a35bdfe6fa450879c1d7d23_xl.jpg', src } = currentTarget;
    // this.setData({
    //   'currentTarget.isPlay': true
    // })
    this.syncAudioUI(true);
    backgroundAudioManager.stop();
    console.log(title)
    backgroundAudioManager.title = title;
    backgroundAudioManager.epname = epname;
    backgroundAudioManager.singer = singer;
    backgroundAudioManager.coverImgUrl = coverImgUrl;
    backgroundAudioManager.src = src;
    backgroundAudioManager.play();
  },
  stop(){
    const { currentTarget } = this.data;
    // this.setData({
    //   'currentTarget.isPlay':false
    // })
    this.syncAudioUI(false);
    backgroundAudioManager.stop();
  },
  bindVoice(){
   
    
    backgroundAudioManager.onEnded(() => {
      console.log('重新播放');
      this.play();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bindVoice()
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
    backgroundAudioManager.stop();
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