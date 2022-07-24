export const getHeaders = (page: Number, pagesize: Number, type: String) => {
  let type1 = encodeURIComponent(type)
  return wx.cloud.callContainer({
    config: {
      env: 'demo-7gr0asireff3edae',
    },
    path: `/select?page=${page}&pagesize=${pagesize}&type="${type1}"`, 
    method: 'get',
    header: {
      'X-WX-SERVICE': 'mmtouxiang',
      "content-type": "application/json"
    }
  })
}