const app = getApp();
const qs = require('qs');
console.log('qs', qs);

// components/moments.js
Component({
    lifetimes: {
        attached: function () {
            let paging = this.data.paging;
            let query = paging.query;
            let classify = this.data.classify;
            query.filter = {
                classify
            }
            paging.next = paging.next + '?' + qs.stringify(query);

            // if(this.data.active) {
            //     this.syncData();
            // }
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
        paging: {
            is_end: false,
            next: '/posts',
            query: {
                limit: 5
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
        ...app.globalFn,
        loadLazyImgChange(e) {
            // 只需查看本事件触发即可知道image 的加载情况（图片数量可以尽可能的多，触发成功过后就能知道）
            // 小程序提前加载当前屏幕和下一屏的图片,所以滚动的时候会触发。
            console.log(e)
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
                this.syncData(true);
            }
        },
        syncData(isForce = false) {
            let paging = this.data.paging;
            let url = paging.next;
            if (!url) {
                return;
            }
            if (!isForce && this.data.dataList.length) {
                console.log('不刷新')
                return;
            }
            app.request({
                    url,
                })
                .then((res) => {
                    let {
                        data = [], paging
                    } = res;
                    let c = 0
                    for (const iterator of data) {
                        let post = iterator.post || {};
                        let topic = iterator.topic || {};
                        let updated_time = topic.updated_time * 1000;
                        let image = post.image || [];
                        let list = image.slice(0, 9);
                        iterator.$date = (new Date(updated_time)).Format('yyyy-MM-dd hh:mm:ss');
                        iterator.$preview_image = list.map((item) => {
                            let url = item.replace('_r.jpg', '_xl.jpg');

                            return {
                                url: url,
                                origin: item,
                            };
                        });
                        iterator.$image = image;
                        c = c + list.length;
                    }
                    let dataList = this.data.dataList;
                    this.setData({
                        paging,
                        dataList: dataList.concat(data),
                    });
                    console.log(c, res);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
});