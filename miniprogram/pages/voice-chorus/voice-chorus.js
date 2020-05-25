// miniprogram/pages/voice-chorus/voice-chorus.js
const app = getApp();
Page({
    ...app.globalFn,
    /**
     * 页面的初始数据
     */
    data: {
      rule_voice: app.globalData.rule_voice,
        lyricActive: 0,
        post: null,
      type: 9, // 3 歌词 2 自由 9 合唱
        voice: null,
        time: 0,
        duration: '00:00',
        timer: null,
        recorderManager: null,
        status: 0 // 1 暂停
    },

    // 开始录音计时
  handleCounter() {
    let time = 0
    this.data.timer = setInterval(() => {
      time++;
      this.setData({
        duration: `00:${time < 10 ? '0' + time : time}`
      })
    }, 1000)
  },
    // 开始录音
    handleStart() {
        let {
            recorderManager
        } = this.data;
        this.setData({
            lyricActive: 1,
            status: 1
        });
        this.selectComponent('#card').stop();
        this.handleCounter();

        recorderManager.onStart(() => {
            console.log('recorder start')
        })
        const options = {
            duration: 60000, //指定录音的时长，单位 ms，最大为10分钟（600000），默认为1分钟（60000）
            sampleRate: 16000, //采样率
            numberOfChannels: 1, //录音通道数
            encodeBitRate: 96000, //编码码率
            format: 'mp3', //音频格式，有效值 aac/mp3
            frameSize: 50, //指定帧大小，单位 KB
        }
        recorderManager.start(options);
    },
    // 清空录音计时
  handleClearCounter() {
    clearInterval(this.data.timer);
    this.setData({
      duration: '00:00'
    })
  },
  
  // 录音停止
  handleStop() {
    let {
      recorderManager
    } = this.data;
    const duration2 = this.data.duration;
    this.handleClearCounter();
    recorderManager.onStop((res) => {
      const {
        duration,
        tempFilePath
      } = res;
      this.validateVoice(res).then(() => {
        this.setData({
          status: 2,
          voice: {
            time: duration2,
            res: res,
            url: tempFilePath,
            duration
          }
        })
      }).catch(err => {
        this.handleCancel()
        app.utils.alert(err.message);
      })


    });
    //触发录音停止
    recorderManager.stop();
  },
  // 提交录音
  handleSubmit() {
    let {
      voice,
      type,
      song,
      post
    } = this.data;
    let songDetail = null;
    let res = voice.res;
    this.uploadVoice(res).then(url => {
      let data = {
        chorusUser: post.user,
        chorusDetail: {
          firstUrl: post.voice,
          firstLen: post.voiceLen,
          secondUrl: url,
          voiceLen: voice.duration / 1000,
        },
        songId: post.songId,
        songDetail: post.songDetail,
        voice: url,
        voiceLen: voice.duration / 1000,
        type, // 声音
    
      };
      

      app.request({
        url: '/v1/post/save',
        method: 'post',
        data,
        meta: {
          loading: true
        }
      }).then(res => {
        console.log(res);
        app.utils.showSuccess('提交成功');
        setTimeout(() => {
          wx.navigateBack({

          })
        }, 500)

      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    });

  },
   
    // 重新录音
    handleCancel() {
      try {
        this.selectComponent('#preVoice').stop();
      } catch (err) {

      }
        this.setData({
            status: 0,
            duration: '00:00',
            voice: null
        })
    },
    onCardPlay(e) {
        const {
            target,
            url
        } = e.detail.data;

        // this.selectComponent('#player').play()
    },
    syncData(options) {
        let postId = options.postId || '';

        app.request({
            url: `/v1/post/get?postId=${postId}`,
            meta: {
                loading: true
            }
        }).then(res => {
            let data = res.data;
            console.log(data)
            this.setData({
                post: data
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let recorderManager = wx.getRecorderManager();
        this.setData({
            recorderManager
        });
        this.syncData(options);
        //this.selectComponent('#card').play();
        // this.selectComponent('#player').play("http://qiniuimage.neoclub.cn/miaohong/voice/prod/7300631/26805803-d3ec-4bbf-b565-8b144c060a0b.aac")
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
      this.selectComponent('#preVoice').stop();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      this.selectComponent('#preVoice').stop();
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
      let { post } = this.data;
      let title = post.songDetail ? post.songDetail.songName : '来这里说说话吧'
      let postId = post.postId;
      
      let ret = {
        title: title,
        path: `/pages/voice-chorus/voice-chorus?postId=${postId}`
      }
      return ret
    }
})