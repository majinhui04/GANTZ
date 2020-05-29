// app.js
const ald = require('./utils/ald-stat.js');
const API = require('./api');
const config = require('./config.js');
const utils = require('./utils/util.js')
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//app.js
App({
    
    recorderManager: wx.getRecorderManager(),
    utils,
    API,
    request: API.request,
    onLaunch: function () {
      
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
        API.syncSetting();
            wx.cloud.init({
                traceUser: true,
            });
          API.wxLogin();
          
        }

    },
    globalFn: {
        syncSetting(){
            let setting = wx.getStorageSync('setting');
            setting = JSON.parse(setting)
            this.setData({
                setting:setting
            })
        },
        validateVoice(data) {
            return new Promise((resolve, reject) => {
                let {
                    duration
                } = data;
                let voice = [5, 60];
                if (duration < voice[0] * 1000 || duration > voice[1] * 1000) {
                    reject({
                        message: `时长应在${voice[0]}至${voice[1]}s`
                    })
                } else {
                    resolve(true);
                }
            })

        },
        cloudUploadVoice(res, options = {}) {
            return new Promise((resolve, reject) => {
                const {
                    tempFilePath
                } = res;

                console.log('tempFilePath', tempFilePath)
                //上传录制的音频
                wx.cloud.uploadFile({
                    cloudPath: "voice/" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000),
                    filePath: tempFilePath,
                    name: 'file',
                    success(res) {
                        console.log(res)
                        resolve(res)
                    },
                    fail(err) {
                        console.error(err);
                        reject(err);
                    }
                })
            });
        },
        uploadVoice(res, options = {}) {
            return new Promise((resolve, reject) => {
                const {
                    fileSize,
                    duration,
                    tempFilePath
                } = res;
                if (duration >= 60 * 1000) {
                    throw {
                        message: '时长不超过60s'
                    }
                }
                console.log('tempFilePath', tempFilePath)
                //上传录制的音频
                wx.uploadFile({
                    url: config.globalData.VoiceUploadUrl,
                    filePath: tempFilePath,
                    name: 'file',
                    success(res) {
                        let data = JSON.parse(res.data);
                        let url = data.data;
                        resolve(url)
                    },
                    fail(err) {
                        console.error(err)
                        reject(err);
                    }
                })
            });
        },
        redirect(e) {
            let dataset = e.currentTarget.dataset;
            let {api,path,url} = dataset;
           
            let uri = path || url;
            if(api) {
                uri = uri + '?api=' + encodeURIComponent(api)
            }
            console.log('dataset', uri)
            wx.navigateTo({
                url: uri
            })

        },
        previewImage(e) {
            var {dataset} = e.currentTarget;
            var {urls,src} = dataset
            var current = src;
            console.log(src)
            if(src.indexOf('w/500')>-1) {
                current = src.replace('w/500','w/1080');
                urls = [current];
            } 
            if(dataset.urls) {
                urls = dataset.urls;
            }else {
                urls = [current];
            }
            
            wx.previewImage({
                current: current,
                urls: urls
            })
        }
    },
    globalData: {
        rule_voice: [5, 60],
        backgroundAudioManager: wx.getBackgroundAudioManager(),
        ...config.globalData
    }
})