// index.ts


// 获取应用实例
const app = getApp<IAppOption>()
Page({
  data : {
    imageUrl: '',
    imageW: {
      width: '',
      height: ''
    }
  },
  onLoad: function(option) {
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    let w = (windowWidth - 120)
    this.setData({
      imageUrl: option.url,
      imageW: {
        width: w + 'px',
        height: w + 'px'
      }
    })
    // console.log(option.url)
  },
  onShareAppMessage: function(obj) {
    console.log(obj);
  },
  onShareTimeline: function() {
    console.log();
  },
  saveImage: function() {

    //获取当前用户的拿到的权限列表
    wx.getSetting({
      withSubscriptions: false,
      success: (res)=> {
        const { authSetting } = res
        //判断当前用户是否有保存到相册权限
        if (authSetting['scope.writePhotosAlbum']) {
          this.downloadAndSaveImage()
        } else {
          //没有权限，请求权限
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
              // 拿到相册权限
              this.downloadAndSaveImage()
            },
            fail: (res) => {
              wx.showModal({
                title: '提示',
                content: '无法访问您的相册，是否前往设置？',
                success: ()=> {
                  wx.openSetting({
                    success: (res) => {
                      console.log(res);
                      if (res.authSetting['scope.writePhotosAlbum']) {
                        this.downloadAndSaveImage()
                      }
                    }
                  })
                }
              })
            },
            complete: () => {}
          })
        }
      },
       fail: ()=> {
         wx.showToast({
           title: '无法保存，获取相册权限失败！',
           icon: 'error'
         })
       },
       complete:() => {
       }
    })
  },

  /**
   * 下载并保存图片到相册
   */
  downloadAndSaveImage: async function() {
    
    let fileId = decodeURIComponent(this.data.imageUrl).replace('https://', 'cloud://demo-7gr0asireff3edae.').replace('.tcb.qcloud.la', '');
    console.log(fileId)
    wx.cloud.downloadFile({
      fileID: fileId,
      success: (res) => {
        console.log(res)
        let filePath = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: filePath,
          success: (res) => {},
          fail: (res)=> {
            wx.showToast({
              title: '无法保存，获取相册权限失败！',
              icon: 'error'
            })
          },
          complete: (res)=> {
            // console.log('保存完成');
          }
        })

      },
      fail: (res) => {
        console.log(res)
      }
    })
    
    
  }
})
