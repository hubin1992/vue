<template>
  <div></div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "intersptors",
  data() {
    return {
    }
  },
  created() {
    //拦截器，就是在发送给后台请求和后台返回数据之前加了一个检查站

    //请求拦截
    Axios.interceptors.request.use((config) => {
      //例如我们在这里检查token的过期时间，或者直接携带token
      headers.token = 'xxxxx'
      return config
    }, (err) => {
      //这里写对错误处理
      $('.box').show()
      return Promise.reject(err)
    })
    //对应在这里面使用
    var axios1 = Axios.create({})
    axios1.get("/aaa", config)


    //响应拦截
    let intersptors = Axios.intersptors.response.use((res) => {
      //返回数据的操作
      return res
    }, err => {
      //对返回的数据进行树立
      return Promise.reject(err)
    })
    //对应在这个地方用
    axios1.get("/aaa").then((res) => {
      //res就是我们拦截处理后的数据
      console.log(res)
    })
    //取消拦截（几乎用不到）
    Axios.intersptors.response.usr(intersptors)
  }



}
</script>

<style scoped type='text/css'>
</style>