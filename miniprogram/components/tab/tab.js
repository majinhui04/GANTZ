// components/tab/tab.js
Component({
  lifetimes: {
      attached: function () {
        console.log(34561,this.data.source)
        this.triggerEvent('selected', {
          data: {
            index: 0
          }
        }, {});
          
          
      },
      detached: function () {
      },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    layout:{
      type:String,
      value:''
    },
    source: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setActive(index){
      this.setData({
        current:index
      });
    },
    handleChange(e){
      let {index} = e.currentTarget.dataset;
      this.setData({
        current:index
      });
      this.triggerEvent('selected', {
        data: {
          index: index
        }
      }, {});
    }
  }
})
