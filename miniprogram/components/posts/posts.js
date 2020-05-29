// components/posts/posts.js
const app = getApp();
const qs = require('../../libs/qs/index.js');

// components/moments.js
Component({
    lifetimes: {

        attached: function () {
            let paging = this.data.paging;
            let query = paging.query;

            query.filter = {

            }
            paging.next = paging.next + '?' + qs.stringify(query);

            // this.syncData();
            // 在组件实例进入页面节点树时执行
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    // 以下是
    /**
     * 组件的属性列表
     */
    properties: {
        filter:{
            type: Object,
            value:{}
        },
        classify: {
            type: String,
            value: '',
        },
        active: {
            type: Boolean,
            value: false,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        first:true,
        currentTarget: null,
        paging: {
            is_end: false,
            next: '/v1/post/fetchThemePost',
            query: {
                limit: 20
            }
        },
        dataList: [],
        lowerThreshold: 50,
        enableScroll: !0,
        scrollTop: 0,
    },
    created() {
        // 这里的属性值还是默认属性
    },
    /**
     * 组件的方法列表
     */
    methods: {
        utils: app.utils,
        ...app.globalFn,
        loadLazyImgChange(e) {
            // 只需查看本事件触发即可知道image 的加载情况（图片数量可以尽可能的多，触发成功过后就能知道）
            // 小程序提前加载当前屏幕和下一屏的图片,所以滚动的时候会触发。
            // console.log(e)
        },
        stop() {
            if (this.data.currentTarget) {
                this.data.currentTarget.stop();
            }
        },
        share(e) {
            console.log(e)
            let {
                id
            } = e.currentTarget.dataset;
            let {
                dataList
            } = this.data;
            console.log(id);
            let post = dataList.filter(item => {
                return item.postId == id
            })[0];
            let postId = post.postId;
            let title = post.songDetail ? post.songDetail.songName : '来这里唱一句吧'
            let ret = {
                title: title,
                path: `/pages/voice-chorus/voice-chorus?postId=${postId}`
            }
            console.log(ret)
            this.triggerEvent('share', {
                data: ret
            });
            return ret;

        },
        handleOnPlay(e) {
            const data = e.detail.data;
            const target = data.target;
            if (this.data.currentTarget) {
                this.data.currentTarget.stop();
            };
            this.data.currentTarget = target;

        },
        handleDetail(e) {
            var current = e.currentTarget;

            var _id = current.dataset.id;
            wx.navigateTo({
                url: `/pages/detail/detail?_id=${_id}`,
            });
        },
        loadMoreItems() {

            const is_end = this.data.paging.is_end;
            if (is_end) {
                wx.showToast({
                    title: '没有更多了',
                    icon: 'none',
                });
            } else {
                this.syncData();
            }
        },
        initUI(isReload = false){
            let {first} = this.data;
            if(first) {
                return this.syncData(isReload);
            }else {
                return Promise.resolve();
            }
        },
        syncData(isReload = false) {
            let {filter={}} = this.data;
            let data = {};
            let paging = this.data.paging;
            let url = paging.next;
            if (!url) {
                return;
            }
            if (isReload) {
                url = '/v1/post/fetchThemePost';
                this.setData({
                    first:true
                })
            }
            if(this.data.first) {
                data = {
                    filter
                }
            }
            
            return app.request({
                    data,
                    // meta: {
                    //     loading: true
                    // },
                    url,
                })
                .then((res) => {
                    let data = res.data;
                    let posts = data.data;
                    let paging = data.paging;

                    let dataList = this.data.dataList;
                    posts.forEach(item => {
                        item.timestamp = app.utils.timeago(item.timestamp * 1000);
                        item.voiceLen = app.utils.realFormatSecond(item.voiceLen);
                    })
                    this.setData({
                        first:false
                    });
                    console.log(3456,posts)
                    if(posts && posts.length) {
                        this.setData({
                            paging,
                            dataList: isReload ? posts : dataList.concat(posts)
                        });
                    } else {
                        app.utils.alert('已经见底了');
                    }
                    

                })
                .catch((err) => {
                    console.error(err);
                    return Promise.reject(err)
                });
        },
    },
});