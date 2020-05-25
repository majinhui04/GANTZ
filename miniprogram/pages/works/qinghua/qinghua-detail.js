// miniprogram/pages/works/qinghua/qinghua-detail.js
const app = getApp();
Page({
    ...app.globalFn,
    /**
     * 页面的初始数据
     */
    data: {
        body: null
    },
    syncData(options) {
        const {
            chatId
        } = options;
        return app.request({
            url: '/v1/qinghua/get',
            data: {
                chatId
            },
            meta: {
                loading: true
            }
        }).then(res => {
            let list = res.data;
            console.log(1, list)
            this.setData({
                dataList: list
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(1, options)
        this.syncData(options)
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