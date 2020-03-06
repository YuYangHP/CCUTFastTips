let BASE_Server = "http://192.168.2.127:80/BookMybatis/"
// let BASE_Server = "http://192.168.2.127:80/BookMybatis_war_exploded/"
// let BASE_Server = "http://10.63.1.57:8080/BookMybatis/"
function send_post(url, data, successfun) {
  wx.request({
    url: BASE_Server + url, //仅为示例，并非真实的接口地址
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success(res) {
      // console.log(res)
      successfun(res)
    }
  })
}
module.exports = {
  BASE_Server: BASE_Server,
  send_post: send_post
}