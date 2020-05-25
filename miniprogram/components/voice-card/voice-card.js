// components/voice-card/voice-card.js
Component({
  //  externalClasses: ['share-voice-card', 'share-voice-lyric', 'share-voice-card-content'],
    lifetimes: {
      // pageLifetimes: {
      //   show: function () {
      //     // 页面被展示
      //     console.log("页面被展示")
      //   },
      //   hide: function () {
      //     this.stop();
      //     // 页面被隐藏
      //     console.log("页面被隐藏")
      //   },
      //   resize: function (size) {
      //     // 页面尺寸变化
      //     console.log("页面尺寸变化")
      //   }
      // },
        attached: function () {
            let type_enum = {
              2:'自由发挥',
              3:'唱一句',
              9:'合唱'
            };
            let body = this.data.body;
            let type = body.type;
          let my_type = type_enum[type];
            let songDetail = body.songDetail || {};
            let voice = body.voice || '';
            let postId = body.postId || 0;
            let color = this.data.colors[postId % 5];
            
            
            
            // 合唱
            if(type===9) {
              let chorusDetail = body.chorusDetail;
              let firstUrl = chorusDetail.firstUrl;
              voice = firstUrl;
             
            }
          let post = {
            color,
            voice,
            ...songDetail
          };
          this.setData({
            voice,
            my_type,
            post
          });
          this.bindUI(voice);
          if(this.data.auto) {
            this.play();
          }
            
            // 在组件实例进入页面节点树时执行
        },
        detached: function () {
          console.log(2345)
            // 在组件实例被从页面节点树移除时执行
          this.data.audioContext.stop();
          this.data.audioContext.destroy();
        },
    },
    /**
     * 组件的属性列表
     */
    properties: {
        auto:{
          type: Boolean,
          value: false
        },
        lyrica_active: {
            type: Number,
            value: 0 // 0 第一段 1 第二段 2 全部
        },
        layout:{
          type:String,
          value:'square'
        },
        body: {
            type: Object,
            value: null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
      voice:'',
      isEnd:false,
      my_type:'',
        color: '#E84992',
        colors: ["#E84992", "#0F85CC", "#9249E8", "#5B49E8", "#14C6A0"],
        isPlay: false,
        post: {

        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleTogglePlay() {
            if (this.data.isPlay) {
                this.stop();
            } else {
                this.play();
            }
        },
        playSecond(){
          let chorusDetail = this.data.body.chorusDetail;
          let secondUrl = chorusDetail.secondUrl;
          this.data.audioContext.src = secondUrl
          this.setData({
            isEnd:true,
            isPlay: true
          });
          
          this.triggerEvent('play', {
            data: {
              target: this,
              url: secondUrl
            }
          }, {});
          this.data.audioContext.play();
        },
        play() {
          const voice = this.chorusDetail ? this.chorusDetail.firstUrl : this.data.voice;
          this.data.audioContext.src = voice;
            this.setData({
                isEnd:false,
                isPlay: true
            });
            this.triggerEvent('play', {
                data: {
                    target: this,
                    url: this.data.body.voice
                }
            }, {});
            this.data.audioContext.play();
        },
        //点击 停止
        stop() {

            this.setData({
             
                isPlay: false
            });

            this.data.audioContext.stop();
        },
        bindUI(url) {
            let audioContext = wx.createInnerAudioContext();
            audioContext.autoplay = false;
            audioContext.loop = false;
            audioContext.onPlay(() => {
                this.setData({
                    'isPlay': true
                })
                console.log('播放中')
            });
            
            audioContext.onStop(() => {
              if (this.data.body.type === 9) {

              }else {
                this.setData({
                  'isPlay': false
                })
              }
                
                console.log('停止')
            });
            audioContext.onEnded(() => {
              console.log(234, this.data.isEnd)
              if (this.data.body.type === 9 && !this.data.isEnd ) {
                this.playSecond();
              }else {
                this.setData({
                  'isPlay': false
                })
              }
                console.log('结束')
            });
            audioContext.onError(() => {
                console.log('出错了')
            });
            // audioContext.src = url;
            this.setData({
                audioContext
            });
        }

    }
})