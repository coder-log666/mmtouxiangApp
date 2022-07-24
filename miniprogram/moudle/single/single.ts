const createRecycleContext = require('miniprogram-recycle-view')

Component({
  properties: {
    headers: Array,
    itemSize: Object,
    height: String,
    index: Number
  },
  data: {
    // 这里是一些组件内部数据
    ctx: null
  },

  methods: {
    browseImage: function (e: any) {
      console.log(e.target.id)
      wx.navigateTo({
        url: `../../pages/browse/browse?url=${e.target.id}`
      })
    },
    scrolltolower: function () {
      // console.log('底部了');
      this.triggerEvent('getNextPage', this.data.ctx);
    },

  },
  lifetimes: {
    created: function () {
      // console.log("created")
      // console.log(this.properties)
    },
    attached: function () {
      // console.log("attached")
      // console.log(this.properties)
    },
    ready: function () {
      // console.log('ready')
      // console.log(this.data)
      
      if (this.properties.itemSize && Object.keys(this.properties.itemSize).length>0) {
        var ctx = createRecycleContext({
          id: `recycleId_${this.properties.index}`,
          dataKey: 'headers',
          page: this,
          itemSize: this.properties.itemSize
        })
        this.triggerEvent('savectx', ctx);

      }
    },

  },
  pageLifetimes: {
    show: function () {
      console.log('show');
      console.log(this.properties)
    },
    resize: function () {
      console.log('resize');
      console.log(this.properties)
    }
  }

})
