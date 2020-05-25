// miniprogram/pages/login/login.js
const app = getApp();
const { hexMD5} = require('../../utils/md5.js');
console.log(1, hexMD5)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    form:{
      username:'',
      password:''
    }
  },
  handleUploadImg(){
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths + '----');
        var filePath = tempFilePaths[0];
        console.log(filePath);
        wx.uploadFile({
          url: 'http://localhost:9000/api/v2/upload',
          filePath,
          name: 'file',
          success(res){
              console.log(res)
          },
          fail(err){
            console.log(1,err)
          },
          error(err){
            console.log(2,err)
          }
        })
        
      }
    });
  },
  handleUserInfo() {
    let token = this.data.token;
    let { username, password } = this.data.form;
    password = (hexMD5(password + 'GANTZ')).toUpperCase();
    console.log('token',token);
    app.request({
      header:{
        token
      },
      url: '/v2/userInfo',
      method: 'GET'
    }).then(res => {
      console.log('ok',res)
    }).catch(err => {
      console.error(err);
    })

  },
  handleRegister(){
    let { username, password } = this.data.form;
    password = (hexMD5(password + 'GANTZ')).toUpperCase();
    console.log(this.data.form);
    app.request({
      url: '/v1/register',
      method: 'POST',
      data: {
        username,
        password
      }
    }).then(res => {
      this.setData({
        token:res.data
      })
      console.log('ok')
    }).catch(err => {
      console.error(err);
    })

  },
  handleSubmit(){
    let { username, password } = this.data.form;
    password = (hexMD5(password + 'GANTZ')).toUpperCase();
    console.log(this.data.form);
    app.request({
      url:'/v1/login',
      method:'POST',
      data:{
        username,
        password
      }
    }).then(res=>{
      console.log('ok')
    }).catch(err=>{
      console.error(err);
    })

  },
  handleUsername: function (e) {
    var key = 'form.username';
    this.setData({
      [key]: e.detail.value,
    })
    console.log(this.data.form);
  },
  handlePassword: function (e) {
    var key = 'form.password';
    this.setData({
      [key]: e.detail.value,
    })
    console.log(this.data.form);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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