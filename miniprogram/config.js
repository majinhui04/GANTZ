/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://localhost:9000'
// var host = 'https://barebear.cn'

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
    service: {
        //微信支付的key
        key: 'dpjQdrUjY96eqMY4LMSJRPLh2AXGjvbE',
        appId,
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/openapi/user/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/api/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/api/match`,

        // 上传图片接口
        uploadUrl: `${host}/api/upload`
    }
};


module.exports = config;