// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.cloud.init({
      env: 'mmtouxiang-2ghtx8zfe35b4a75',
      traceUser: true
    });
    wx.cloud.callContainer({
      config: {
        env: 'demo-7gr0asireff3edae',
      },
      path: `/`, 
      method: 'get',
      header: {
        'X-WX-SERVICE': 'mmtouxiang'
      }
    })
    
  },
})