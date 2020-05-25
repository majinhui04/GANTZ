/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://localhost:9000'
var host = 'http://192.168.0.109:9000'
var host = 'https://barebear.cn'

//var host = 'http://192.168.199.113:9999';
// 小程序的appId
var appId = 'wx039cb713a418a640';
var isMock = false;
var isMusic = true;
var avatarUrl = 'https://brain.des-club.com/static/img/avatar.jpg';
var defaultUrl = 'https://brain.des-club.com/static/img/avatar.jpg';

var userInfo = {
    avatarUrl: avatarUrl,
    nickName: '匿名',
    gender: 1,
    city: '无人市',
    country: '火星',
    province: '无人区'
};
var shareImgUrl = 'https://brain.des-club.com/static/img/share.jpg';
var config = {
    shareImgUrl,
    defaultUrl,
    // 下面的地址配合云端 Demo 工作
    globalData: {
        //微信支付的key
        key: 'dpjQdrUjY96eqMY4LMSJRPLh2AXGjvbE',
        appId,
        host,
        prefix: '',
        // 上传图片接口
        VoiceUploadUrl: `${host}/v1/voice/upload`
    }
};


module.exports = config;