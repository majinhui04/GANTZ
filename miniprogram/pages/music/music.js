// miniprogram/pages/music/music.js
const app = getApp();
let { globalData } = app;
let { backgroundAudioManager } = globalData;
Page({
    ...app.globalFn,
    /**
     * 页面的初始数据
     */
    data: {
      canPlay:false,
        audioContext: null,
        isPlay: false,
        duration: '',
        audio:null,
        target: {
            content: '',
            authorName: '-',
            title: '-',
            cover: ''
        }

    },
    handleNext() {
        this.stop();
        this.handleLoadData().then(() => {
            this.play();
        });
    },
  bindVoice() {
    
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
      // this.setData({
      //   isPlay: false
      // })
      this.setData({
        isPlay: false,
        starttime: '00:00',
        isOpen: false,
        offset: 0
      })
      console.log('结束')
      this.handleNext();
    });
    backgroundAudioManager.onError(() => {
      console.log('出错了')
    });
    backgroundAudioManager.onTimeUpdate(() => {
      let offset = backgroundAudioManager.currentTime;
      let currentTime = parseInt(offset);
      let duration = backgroundAudioManager.duration;
      let min = "0" + parseInt(currentTime / 60);
      let max = parseInt(backgroundAudioManager.duration);
      let sec = currentTime % 60;
      if (sec < 10) {
        sec = "0" + sec;
      };
      let starttime = min + ':' + sec;
      this.setData({
        offset: currentTime,
        starttime: starttime,
        max: max,
        is_updateTime: true,
      });
      // console.log(1, {
      //   offset: currentTime,
      //   starttime: starttime,
      //   max: max,
      //   is_updateTime: true,
      // })
    });
   
  },
    handleLoadData() {
      this.setData({
        audioContext:null
      });
        return app.request({
          url: `/api/v1/poem/one`,
            meta: {
                loading: true
            }
        }).then(res => {
            let data = res.data || {};
            let str_readpeam = data.str_readpeam[0] || {};
            let speaker = str_readpeam.name;
          // wx.showLoading({
          //   title: '载入音频中...'
          // })
            this.setData({
              canPlay:false,
              audio:{
                coverImgUrl: data.str_img_url.replace('http://', 'https://'),
                singer: speaker,
                title: data.str_peam_title,
                src:data.str_audio_url.replace('http://', 'https://')
              },
                target: {
                    speaker,
                    content: data.str_peam_content.replace(/<br \/>/ig, '\n'),
                    authorName: data.str_autor_info,
                    title: data.str_peam_title,
                    cover: data.str_img_url.replace('http://','https://')

                }
            })
            console.log('title', data.str_peam_title)
            // "http:\/\/thepoemforyou.oss-cn-beijing.aliyuncs.com\/audio\/20170319\/video\/2d1f8a6889f74cffb287c2cda2245a5e.mp3"
          //this.handleInitAudio(data.str_audio_url.replace('http://', 'https://'));
          //this.data.audioContext.src = data.str_audio_url.replace('http://', 'https://');

        }).catch(err => {

        })
    },
    handleInitAudio(url) {
        let audioContext = wx.createInnerAudioContext();
        let init = true;
        audioContext.onPlay(() => {
          wx.hideLoading();
            this.setData({
                isPlay: true
            })
            console.log('播放中')
        });
        audioContext.onPause(() => {
            this.setData({
                isPlay: false
            });
            
            console.log('暂停')
        });
        audioContext.onStop(() => {
            this.setData({
                isPlay: false
            })
            console.log('停止')
        });
        audioContext.onEnded(() => {
            this.setData({
                isPlay: false
            })
            console.log('结束')
            this.handleNext();
        });
        audioContext.onError(() => {
            console.log('出错了')
        });
        audioContext.onTimeUpdate(() => {

           console.log('进度更新了总进度为：' + audioContext.duration + '当前进度为：' + audioContext.currentTime);
          audioContext.duration;
          // 必须。不然也获取不到时长
          if(init) {
            init = false;
            this.setDuration(audioContext.duration);
          }
          
        })
        audioContext.onCanplay(() => {
          audioContext.duration;
         
          this.setData({
            canPlay:true
          });
          //console.log('111进度更新了总进度为：' + audioContext.duration + '当前进度为：' + audioContext.currentTime);
            // 必须。可以当做是初始化时长
           
            // 必须。不然也获取不到时长
          //this.setDuration(audioContext.duration);
            
        });
      audioContext.src = url;
        this.setData({
            audioContext
        });
    },
  setDuration(value){
    
      let duration = parseInt(value);
      let minute = Math.floor(duration / 60);
      let second = duration % 60;
    
      this.setData({
        duration: `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
      })
   
  },
  handlePlay(){
    let {audio} = this.data;
    let { title, epname = 'GANTZ', singer = 'GANTZ', coverImgUrl = '', src } = audio;
    backgroundAudioManager.stop();
    backgroundAudioManager.title = title;
    backgroundAudioManager.epname = epname;
    backgroundAudioManager.singer = singer;
    backgroundAudioManager.coverImgUrl = coverImgUrl;
    backgroundAudioManager.src = src;
    console.log(111, src)
    
    this.bindVoice();
  },
    //点击播放,(如果要一进来就播放放到onload即可)
  play: function () {
    console.log(4567, backgroundAudioManager, backgroundAudioManager.src)
    this.handlePlay();
      backgroundAudioManager.play();
    },
    //点击 停止
    stop: function () {
      backgroundAudioManager.stop();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        this.handleLoadData().then(() => {
            let {audio} = this.data;
          this.handlePlay(audio);

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