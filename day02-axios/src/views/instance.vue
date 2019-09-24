<template>
  <div></div>
</template>

<script>
import Axios from 'axios'
  export default {
    data () {
      return {
      }
    },
    created(){
      //全局的实例配置
      Axios.defaults.baseURL = "http:localhost:9090"//所有的全局配置都是这样来做
      
      //我们常用的实例方法
      let instance = Axios.create({
        baseURL:"http://loaclhost:8080",
        timeout:1000,
        method:'get' ,//如果没有请求方式默认就是get
        headers:{//是即将被发送的自定义请求头
        },
        // `params` 是即将与请求一起发送的 URL 参数
        params:{},
        //定义请求数据的主体
        data:{},
      })
      
      instance.get("/api/get",{
        params:{
          baseURL:"http://localhost:7070"
        }
      }).then((res)=>{
        console.log(res)
      })
      //关于优先级
      //全局 < 实例 < instance.get
      
    }
  }
</script>

<style  scoped type='text/css'>

</style>