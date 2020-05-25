var config = require('./config');
var util = require('./utils/util.js');
var baseUrl = config.globalData.host + config.globalData.prefix;
/**
 * 通用json请求
 * @param {string} options.meta.prefixUrl 假如传入了前缀(可以为空)则不使用baseUrl
 * @param {boolean,string} options.meta.loading 是否自动显示loading
 * @param {boolean} options.meta.error 是否自动显示错误信息
 * @returns {json} output value
 */
function request(options = {}) {
    return new Promise(function (resolve, reject) {
        let token = wx.getStorageSync('token') || '';
        let {
            data,
            url = '',
            method = 'GET',
            meta = {},
            header = {},
        } = options;
        if (url.indexOf('http') === -1) {
            url = baseUrl + url;
        }

        if (meta.loading) {
            wx.showLoading({
                title: '正在加载数据中.....',
            })
        }

        //data.flush =true 表示强制刷新获取
        wx.request({
            data,
            url,
            method,
            header: {
                'token':token,
                //设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/json',
                // 'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
              ...header
            },
            success: (res) => {
                let body = res.data;
              console.log(11111, body.message,body.code, url, body)
                //FunDebug.log('获取access_token', data);
                // 出错
              if (body.code===0 || body.code===200) {
                wx.hideLoading()
                resolve(body);
                
                }
                else {
                  wx.showToast({
                    title: body.message,
                    icon: "none"
                  })
                  reject(body);
                
                }
                
            },

            fail(err) {
                wx.hideLoading()
                wx.showToast({
                    title: '数据加载失败',
                    icon: "none"
                })
                reject(err);
            },
          complete: function (res) { }
        });

    })

}

var API = {
  updateUserAvatar(options = {}){
    return request({
      meta:{
        loading:true
      },
      url: '/v1/user/avatar/update',
      method:'post',
      ...options
    }).then(res => {

      return res;

    }).catch(err => {
      console.log(err)
      return Promise.reject(err);
    })
  },
  getAvatarList(options = {}){
    return request({
      url: '/v1/avatar/list',
      ...options
    }).then(res => {
      
      return res;
      
    }).catch(err => {
      console.log(err)
      return Promise.reject(err);
    })
  },
  getUserInfo(options={}){
    return request({
      url: '/v1/user/getInfo',
      ...options
    }).then(res => {
      let {data}=res;
      if(!data.avatarUrl) {
        data.avatarUrl = '/assets/img/icon/default_head.png';
      }
      return res;
     
    }).catch(err => {
      console.log(err)
      return Promise.reject(err);
    })
  },
  // 获取随机壁纸 第三方
  wallpaperRandomFetch(options={}){
    let url = 'https://ztwp.ninefrost.com/api/wallpaper/list?type=random&page=0&size=45';
    return request({
      url,
      ...options
    })

  },
  // 微信自动登录注册
  wxLogin(options = {}){
    options.url = '/v1/wx-login';
    options.method = 'POST';
    return new Promise((resolve,reject)=>{

      // 调用登录云函数获取openid
      wx.cloud.callFunction({
        name: 'login', //云函数文件夹名字
        success: function (res) {
          let result = res.result;
          let requestID = res.requestID;
          let { appid, openid } = result;

          console.log(2, res)
          options.data = {
            requestID,
            appid,
            openid
          }
          request(options).then(res => {
            const token = res.data;
            wx.setStorageSync('token', token)
            resolve(res);
          }).catch(err=>{
            util.alert(err.message);
            reject(err)
          })
        },
        fail: function (err) {
          util.alert(err.message);
          console.log(err);
          reject(err)
        }
      })
    })
    
    
   
    },
    request: request,
    
    
    
    
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