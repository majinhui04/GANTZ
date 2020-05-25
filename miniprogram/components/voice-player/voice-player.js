// components/voice-player/voice-player.js
Component({
  lifetimes: {
    attached: function () {
      this.bindUI();
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    url:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    play(options){
      let oldTarget = this.target || null;
      this.target = null;
      // if (oldTarget) {
      //   oldTarget.pause();
      //   this.data.audioContext.stop();
      // }
      // if(this.target) {
      //   this.target.pause();
      //   this.data.audioContext.stop();
      // }
      let { target, url } = options;
      this.data.audioContext.src = url || this.data.url;
      this.target = target;
      console.log(44, options)
      this.data.audioContext.play();
    },
    pause(){
      this.data.audioContext.pause();
    },
    bindUI(url) {
      let audioContext = wx.createInnerAudioContext();
      audioContext.autoplay = false;
      audioContext.loop = false; 
      // ios在静音状态下能够正常播放音效
      // wx.setInnerAudioOption({ 
      //   obeyMuteSwitch: false,   // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
      //   success: function (e) {
      //     console.log(e)
      //     console.log('play success')
      //   },
      //   fail: function (e) {
      //     console.log(e)
      //     console.log('play fail')
      //   }
      // }) 
      audioContext.onPlay(() => {
        this.target && this.target.play();
        this.triggerEvent('play', {
          data: {}
        }, {})
        console.log('播放中')
      });
      audioContext.onPause(() => {
        this.target && this.target.pause();
        this.triggerEvent('pause', {
          data: {}
        }, {})

        console.log('暂停')
      });
      audioContext.onStop(() => {
        this.target && this.target.pause();
        this.triggerEvent('stop', {
          data: {}
        }, {})
        console.log('停止')
      });
      audioContext.onEnded(() => {
        this.target && this.target.pause();
        this.triggerEvent('end', {
          data: {}
        }, {})
        console.log('结束')
      });
      audioContext.onError((e) => {
        this.target && this.target.pause();
        this.triggerEvent('error', {
          data: {}
        }, {})
        console.log('出错了', e)
      });
      // audioContext.src = url;
      this.setData({
        audioContext
      });
    }
  }
})
