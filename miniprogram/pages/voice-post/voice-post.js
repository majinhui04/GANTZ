// miniprogram/pages/voice-post/voice-post.js
const app = getApp();
Page({
    ...app.globalFn,
    /**
     * 页面的初始数据
     */
    data: {
        text: '',
        rule_voice: app.globalData.rule_voice,
        currentTab: 0,
        song: null,
        type: 3, // 3 歌词 2 自由
        voice: null,
        duration: '00:00',
        timer: null,
        recorderManager: null,
        status: 0 // 1 暂停
    },
    // 获取随机文案
    handleRefresh() {
        const {
            type
        } = this.data;
        app.request({
            url: `/v1/voice/randomText?type=${type}`,
            meta: {
                loading: true
            }
        }).then(res => {
            let data = res.data;
            let text = type == 2 ? data.secondParagraph : data.firstParagraph;
            this.setData({
                text,
                song: data
            })
            console.log(res);

        }).catch(err => {
            console.error(err)
        })
    },
    // 切换tab
    handleChangeTab(e) {
        const currentTarget = e.currentTarget;
        let {
            type,
            name
        } = currentTarget.dataset;

        type = parseInt(type);
        name = parseInt(name);

        this.setData({
            song: null,
            type,
            currentTab: name
        });
        // 
        this.handleCancel();
        this.handleRefresh();

        console.log(type)
    },
    handleCancel() {
        try {
          this.selectComponent('#preVoice').stop();
        }catch(err) {
          
        }
        this.setData({
            status: 0,
            duration: '00:00',
            voice: null
        })
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
            status: 1
        });
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
            song
        } = this.data;
        let songDetail = null;
        let res = voice.res;
        this.uploadVoice(res).then(url => {
            let data = {
                voice: url,
                voiceLen: voice.duration/1000,
                type, // 声音
            };
            if (type == 3) {
                songDetail = {
                    singerName: song.singerName,
                    songName: song.songName,
                    firstParagraph: song.firstParagraph,
                    secondParagraph: song.secondParagraph
                };
                data.songDetail = songDetail;
                data.songId = song.songId;
            }

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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
        this.syncSetting();
        let recorderManager = wx.getRecorderManager();
        this.setData({
            recorderManager
        });
        this.handleRefresh();

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

    }
})