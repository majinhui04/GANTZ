const app = getApp();
const {
    API
} = app;
Page({
    ...app.globalFn,
    data: {
        active: 0
    },
    onTabsItemTap: function (event) {
        let index = event.currentTarget.dataset.index;
        this.setData({
            active: index
        });
        console.log(12345, index)
        this.selectComponent(`#moments${index}`).syncData();
    },
    onLoad() {
        console.log(app.globalFn)
        console.log('API', API);
        this.selectComponent('#moments0').syncData();
        // this.updateData();
    },
    onShow() {

    }

});