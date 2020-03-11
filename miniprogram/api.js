var config = require('./config');
var util = require('./utils/util.js');
var baseUrl = config.service.host + '/openapi';
/**
 * 通用json请求
 * @param {string} options.meta.prefixUrl 假如传入了前缀(可以为空)则不使用baseUrl
 * @param {boolean,string} options.meta.loading 是否自动显示loading
 * @param {boolean} options.meta.error 是否自动显示错误信息
 * @returns {json} output value
 */
function request(options) {
    return new Promise(function (resolve, reject) {
        var opt = options || {},
            data = opt.data || {};
        let uri = opt.url;
        let method = opt.method || 'GET';
        let url = baseUrl + uri;
        let meta = opt.meta || {};


        //data.flush =true 表示强制刷新获取
        wx.request({
            data: data,
            url: url,
            method,
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            success: (res) => {
                let data = res.data;
                console.log(url, data)
                //FunDebug.log('获取access_token', data);
                resolve(data);
            },
            fail(err) {
                reject(err);
            }
        });

    })

}

var API = {

    request: request,
    getShanbei(options = {}) {
        options.url = '/shanbei';
        return request(options).then(res => {
            let data = res.data;
            if (data && data.length == 0) {
                res.data = {
                    list: [],
                    season: null
                };
            }
            return res;
        })
    },
    getSeasonRanking(options) {
        let opts = options || {};
        opts.url = '/season/ranking';
        return request(opts).then(res => {
            let userinfo = res.data.me || {};

            if (!userinfo.avatarUrl) {
                wx.setStorageSync('hasUserInfo', 0);
                userinfo.avatarUrl = config.userInfo.avatarUrl;
            }
            if (!userinfo.nickName) {
                userinfo.nickName = config.userInfo.nickName;
            }
            res.data.me = userinfo;
            return res;
        })
    },
    getUserInfo(options) {
        let opts = options || {};
        opts.url = '/user/info';
        return request(opts).then(res => {
            let userinfo = res.data || {};

            if (!userinfo.avatarUrl) {
                wx.setStorageSync('hasUserInfo', 0);
                userinfo.avatarUrl = config.userInfo.avatarUrl;
            }
            if (!userinfo.nickName) {
                userinfo.nickName = config.userInfo.nickName;
            }
            wx.setStorageSync('user_info_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A', userinfo);

            return res;
        })
    },
    login(options) {
        return new Promise(function (resolve, reject) {
            let opt = options || {},
                data = opt.data || {};
            let meta = opt.meta || {};
            let $loading = meta.$loading || opt.$loading;

            if ($loading) {
                util.showBusy(typeof $loading === 'string' ? $loading : '正在加载')
            }
            qcloud.login({
                success(userinfo) {
                    if (!userinfo.avatarUrl) {
                        userinfo.avatarUrl = config.userInfo.avatarUrl;
                    }
                    if (!userinfo.nickName) {
                        userinfo.nickName = config.userInfo.nickName;
                    }
                    resolve(userinfo);
                    $loading && wx.hideToast();
                },
                fail(err) {
                    reject(err);
                    $loading && wx.hideToast();
                    util.alert('网络走神了')
                }
            });

        });
    },
    loginWithCode(options) {
        return new Promise(function (resolve, reject) {
            let opt = options || {},
                data = opt.data || {};
            let meta = opt.meta || {};

            if (meta.$loading) {
                util.showBusy(typeof meta.$loading === 'string' ? meta.$loading : '正在加载')
            }
            qcloud.loginWithCode({
                success(userinfo) {
                    if (!userinfo.avatarUrl) {
                        userinfo.avatarUrl = config.userInfo.avatarUrl;
                    }
                    if (!userinfo.nickName) {
                        userinfo.nickName = config.userInfo.nickName;
                    }
                    resolve(userinfo);
                    meta.$loading && wx.hideToast();
                },
                fail(err) {
                    console.log('[loginWithCode error] ', err)
                    meta.$loading && wx.hideToast();
                    util.alert('网络走神了')
                    reject(err);

                }
            });

        });

    }


};

module.exports = API;