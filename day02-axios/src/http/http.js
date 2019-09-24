/* eslint-disable no-unused-vars */
import concatApi from "./concatAPI"
import axios from 'axios'
import { Toast } from 'vant';
const Http = {}
let instance = axios.create({
  baseURL: "http://localhost:9000/api",
});
//有几个请求创建几个方法
for (var key in concatApi) {
  let api = concatApi[key];//api 里面包含了url和方法
  Http[key] = async function (parmas, config = {}, isFrom = false) {//传递数据{data} ,配置{id,header,data} ,post请求是否为formdata
    //我们要对post请求的是否为isFrom先做一个处理
    let newForm = {};//数据处理，如果是转换为formdata，如果不是那就是form
    if (parmas && isFrom) {
      for (let i in parmas) {//创建一个formdata的实例，把普通数据转换为fordata数据
        newForm = new FormData()
        newForm[i] = parmas[i]
      }
    } else {
      newForm = parmas
    }
    let result = null //用来存储我们返回的数据的
    //进行不同请求的判断
    if (api.method == "put" || api.method == "patch" || api.method == "post") {
      try {
        result = await instance[api.method](api.url, newForm, config)
      } catch (e) {
        result = e
      }
    } else if (api.method == "delete" || api.method == "get") {
      // 这样是以参数的方式
      config.params = newForm
      //params:{
      // id:2
      //}
      try {
        result = await instance[api.method](api.url, config)
      } catch (e) {
        result = e
      }
    }

    return result
  }
}

//加入拦截器
//请求拦截
instance.interceptors.request.use((parmas) => {
  Toast.loading({
    duration: 0,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
  });
  return parmas
}, (err) => {
  Toast.clear()
  Toast("请求错误")
  Promise.reject(err)
})
//响应拦截
instance.interceptors.response.use((parmas) => {
  Toast.clear()
  return parmas
}, (err) => {
  Toast("响应错误")
  Promise.reject(err)
})

export default Http