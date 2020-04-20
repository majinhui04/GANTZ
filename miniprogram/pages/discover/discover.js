const app = getApp();
const {
    API
} = app;
Page({
    ...app.globalFn,
    data: {
        active: 0
    },
    onChange(data) {
        const {
            detail
        } = data;
        const {
            name
        } = detail;
        console.log(333, detail)
        this.selectComponent(`#moments${name}`).syncData();
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