// miniprogram/pages/voice-swiper/voice-swiper.js
const app = getApp();
Page({
    ...app.globalFn,
    /**
     * 页面的初始数据
     */
    data: {
      duration: 500,
      current:0,
      index:0,
      currentTarget:null,
        lyricActive: 0,
        dataList: [],
        post: {
            "user": {
                "uid": 0,
                "name": "匿名",
                "avatarUrl": ""
            },
            "voice": "http://qiniuimage.neoclub.cn/miaohong/voice/prod/7300631/26805803-d3ec-4bbf-b565-8b144c060a0b.aac",
            "voiceLen": 9.345,
            "songDetail": {
                "singerName": "解忧邵帅",
                "songName": "写给黄淮",
                "firstParagraph": "你是我辗转反侧的梦\n我是你如梦山河的故人",
                "secondParagraph": "就让这牵肠挂肚的酒\n硫酸一样刺激在你我的心头"
            }
        },
        paging:{
          next: '/v1/post/fetchVoicePost?limit=10'
        },
        voice: null,
        time: 0,
        duration: '00:00',
        timer: null,
        recorderManager: null,
        status: 0 // 1 暂停
    },
  handleOnPlay(e){
    const data = e.detail.data;
    const target = data.target;
    if (this.data.currentTarget) {
      this.data.currentTarget.stop();
    };
    this.data.currentTarget = target;

  },
  handleChangeItem(e){
    console.log('e',e);
    const detail = e.detail;
    const currentItemId = detail.currentItemId;
    const current = detail.current || 0;
    const id = '#card' + currentItemId;
    console.log(11111,current,id)
    const $card = this.selectComponent(id);
    if(this.data.currentTarget) {
      this.data.currentTarget.stop();
    }
    this.data.currentTarget = $card;
    $card.play();
    this.setData({
      index: current
    })
    if ((current+1)%10==0){
      // this.setData({
      //   current:0
      // })
      this.syncData().then(posts=>{
        console.log(234, posts)
      }).catch(err=>{
        console.log(1,err)
      });
     
    }

  },
    syncData() {
      let {paging} = this.data;
        return app.request({
          url: paging.next,
            meta: {
                loading: true
            }
        }).then(res => {
            let posts = res.data.data || [];
          let paging = res.data.paging;
          let dataList = this.data.dataList || []
            this.setData({
              paging,
              dataList: dataList.concat(posts)
            });
          return posts;
          
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let me = this;
        this.syncData().then((posts)=>{
          me.handleChangeItem({
            detail: {
              currentItemId: posts[0].postId
            }
          });
        }).catch(err=>{
          console.log(err)
        })
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
      
      if(this.data.currentTarget) {
        this.data.currentTarget.stop();
      }
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
      let {dataList,index} = this.data;
      let target = dataList[index];
      let postId = target.postId;
      console.log(target);
      let ret = {
        title: target.songDetail.songName + postId,
        path: `/pages/voice-chorus/voice-chorus?postId=${postId}`
      }
      return ret
    }
})