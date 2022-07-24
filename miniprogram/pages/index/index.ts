// index.ts

import { getHeaders } from "../../utils/util"

// 获取应用实例
const app = getApp<IAppOption>()
Page({
  data: {
    tabs: [
      {
        index: 0,
        title: '情头',
        type: '情头',
         itemSize: {}, //图片尺寸
        rowCount: 2,
        page: 1,
        pagesize: 10,
        noImage: false,
        requested: false,
      },
      {
        index: 1,
        title: '二次元',
        type: '二次元',
        itemSize: {}, //图片尺寸
        rowCount: 3,
        page: 1,
        pagesize: 18,
        noImage: false,
        requested: false
      }
    ]
  },
  ctxs: {},
  tabIndex: 0,
  height: "", //列表高度

  

  onLoad: function () {
    console.log('page-onLoad')
    const [...newTabs] =  this.data.tabs
    newTabs.forEach((tab)=>{
      const { rowCount } = tab
      let w = this.getImageWidth(rowCount)
      tab.itemSize = {
        width: w,
        height: w
      }
    })
    let h = this.getSwiperHeig()
    this.setData({
      tabs: newTabs,
      height: h
    })
    
  },
  onReady: function () {
   
  },
  onShareAppMessage: function (obj) {
    console.log(obj);
  },
  onShareTimeline: function () {
    console.log();
  },
  getImageWidth: function (rowCount: any) {
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    // console.log(windowHeight);
    //计算每个图片的宽高
    let w = (windowWidth - (rowCount + 1) * 8) / rowCount;
    return w
  },
  // 计算滚动高度
  getSwiperHeig: function () {
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    const swiperH = windowHeight - 36 + "px";
    return swiperH
  },

  onChange: function (e: any) {
    let index = e.detail.index
    // 更新下标
    this.tabIndex = index
    if (!this.data.tabs[index].requested) {
      this.requestData(index)
    }
    
  },
  getNextPage: function(ctx: any) {
    // console.log('getnextpage')
    this.requestData(this.tabIndex)
    console.log(ctx.detail)

  },
  savectx: function(e: any) {
    console.log(e.detail)
    let index = e.target.dataset.set.index
    this.ctxs[index] = e.detail
    if (index == this.tabIndex) {
      this.requestData(index)
    }
  },

  requestData: function (index: number) {
    let tab = this.data.tabs[index]
    const {rowCount, noImage } = tab
    if (noImage) {
      console.log('图片加载完了');
      return
    }
    getHeaders(tab.page, tab.pagesize, tab.type).then((result) => {
      const { statusCode, data } = result
      if (statusCode == 200) {
        let arr: any = []
        let res: any = []
        data.forEach((element: any, index: any) => {
          if (index % rowCount == 0 && arr.length == rowCount) {
            res.push([...arr].reverse())

            arr.splice(0, arr.length);
          }
          arr.push(element)
        });
        if (arr.length == rowCount) {
          res.push([...arr].reverse())
        }
        
        this.data.tabs[index].page += 1
        if (data.length < tab.pagesize) {
          this.data.tabs[index].noImage = true
        }
        this.data.tabs[index].requested = true
        console.log(res);
        //添加数据
        // debugger
        this.ctxs[index].append(res, (res)=>{
          // debugger
        });
        
      }
    })
    
  },

  browseImage: function (e: any) {
    // console.log(e.target.id)
    wx.navigateTo({
      url: `../browse/browse?url=${e.target.id}`
    })
  }

})
