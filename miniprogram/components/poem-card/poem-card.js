// components/poem-card/poem-card.js
const app = getApp();
Component({
  lifetimes:{
    attached(){

      const {body}= this.data;
      const {workDetail} = body;
      
      let card = {};
      if(workDetail) {
        card = {
          title:workDetail.title,
          content:workDetail.content
        }
      }
      if(workDetail && workDetail.image) {
        card.cover = workDetail.image.url;
      }
     
      this.setData({
        card
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    body: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    ...app.globalFn
  }
})
