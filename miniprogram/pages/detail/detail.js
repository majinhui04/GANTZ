const app = getApp();
Page({
    ...app.globalFn,
    /**
     * 页面的初始数据
     */
    data: {
        urls: [],
        dataList: []
    },
    handleLoadData(query = {}) {
        const {
            _id
        } = query
        app.request({
            url: `/posts/findOne?_id=${_id}`,
            meta: {
                loading: true
            }
        }).then(res => {
            let {
                data = {}
            } = res;
            let post = data.post || {};
            let image = post.image || [];
            let $preview_image = image.map(item => {
                let url = item.replace('_r.jpg', '_xl.jpg')
                return {
                    url: url,
                    origin: item
                }
            })
            this.setData({
                urls: image,
                dataList: $preview_image
            })

        }).catch(err => {
            console.error(err)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('optinos', options);
        this.handleLoadData(options)
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