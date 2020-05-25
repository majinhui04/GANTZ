// miniprogram/pages/works/qinghua/qinghua.js
const app = getApp();
Page({
    ...app.globalFn,
    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        paging: {
            is_end: false,
            next: '/v1/qinghua/list?limit=20',
        },
        dataList: []
    },
    syncData(isReload = false) {
        let paging = this.data.paging;
        let url = paging.next;
        if (isReload) {
            url = '/v1/qinghua/list';
        }
        let dataList = this.data.dataList;
        return app.request({
            url,
            meta: {
                loading: true
            }
        }).then(res => {
            let data = res.data;
            let paging = data.paging;
            let list = data.data;
            this.setData({
                paging,
                dataList: isReload ? list : dataList.concat(list)
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.syncData();
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
        let loading = this.data.loading;

        if (!loading) {
            this.setData({
                loading: true
            })
            this.syncData().then(() => {
                this.setData({
                    loading: false
                })
            }).catch(err => {
                this.setData({
                    loading: false
                })
            });
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})