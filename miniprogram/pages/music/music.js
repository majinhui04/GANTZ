// miniprogram/pages/music/music.js
const app = getApp();
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
    handleLoadData() {
        return app.request({
            url: `/poem/one`,
            meta: {
                loading: true
            }
        }).then(res => {
            let data = res.data || {};
            let str_readpeam = data.str_readpeam[0] || {};
            let speaker = str_readpeam.name;
          wx.showLoading({
            title: '载入音频中...'
          })
            this.setData({
              canPlay:false,
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

          this.data.audioContext.src = data.str_audio_url.replace('http://', 'https://');

        }).catch(err => {

        })
    },
    handleInitAudio() {
        let audioContext = wx.createInnerAudioContext();
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
           //  console.log('进度更新了总进度为：' + audioContext.duration + '当前进度为：' + audioContext.currentTime);
        })
        audioContext.onCanplay(() => {
          wx.hideLoading();
          this.setData({
            canPlay:true
          })
            // 必须。可以当做是初始化时长
            audioContext.duration;
            // 必须。不然也获取不到时长
            setTimeout(() => {
                let duration = parseInt(audioContext.duration);
                let minute = Math.floor(duration / 60);
                let second = duration % 60;
                console.log(audioContext.duration); // 401.475918
                this.setData({
                  duration: `${minute < 10 ? '0' + minute : minute}:${second < 10?'0'+second: second}`
                })
            }, 1000)
        })
        this.setData({
            audioContext
        });
    },
    //点击播放,(如果要一进来就播放放到onload即可)
    play: function () {
        this.data.audioContext.play();
    },
    //点击 停止
    stop: function () {
        this.data.audioContext.pause();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.handleInitAudio();
        this.handleLoadData().then(() => {
            this.play();
        });


        //this.play()
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