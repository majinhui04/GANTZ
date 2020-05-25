// components/sg-voice/sg-voice.js
Component({
  lifetimes: {
    attached: function () {
      this.bindUI();
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: 'http://qiniuimage.neoclub.cn/miaohong/audio/prod/24344010/442/ios1589187225.aac'
    },
    duration: {
      type: String,
      value: '00:00'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTogglePlay(){
      if(this.data.isPlay) {
        this.stop();
      }else {
        this.play();
      }
    },
    play: function () {
      this.setData({
        isPlay:true
      })
      this.triggerEvent('play', {
        data: {
          target: this
        }
      }, {});
      this.data.audioContext.play();
    },
    //点击 停止
    pause: function () {
      this.setData({
        isPlay: false
      })
      this.data.audioContext.pause();
    },
    stop(){
      this.setData({
        isPlay: false
      })
      this.data.audioContext.stop();
    },
    bindUI() {
      console.log(1, this.data.duration)
      let audioContext = wx.createInnerAudioContext();
      audioContext.onPlay(() => {
        this.setData({
          'isPlay': true
        })
        console.log('播放中')
      });
      audioContext.onPause(() => {
        this.setData({
          'isPlay': false
        });

        console.log('暂停')
      });
      audioContext.onStop(() => {
        this.setData({
          'isPlay': false
        })
        console.log('停止')
      });
      audioContext.onEnded(() => {
        this.setData({
          'isPlay': false
        })
        console.log('结束')
      });
      audioContext.onError(() => {
        console.log('出错了')
      });
      audioContext.src = this.data.url;
      this.setData({
        audioContext
      });
    }
  }
})
