<template>
  <div>get</div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'axios-get',
  data() {
    return {

    }
  },
  created() {
    // 这是第一种写法
    Axios.get("/api/axios1", {
      params: {
        id: 11
      }
    }).then((res) => {
      console.log(res.data)
    })
    // 这是第二种求求方法
    Axios({
      method: "get",
      url: "/api/axios2",
      params: {
        id: 12
      }
    }).then(res => {
      console.log(res.data)
    })
    //post 请求
    //1. format-data请求（上传图片和上传文件）
    let data = { "哈哈": 13 }
    let format = new FormData();
    for(let key in data){
      format[key] = data[key]
    }

    Axios({
      method: "post",
      url: '/api/post',
      params: {
        name: 'kk'
      },
      data:format
    }).then(res => {
      console.log(res.data)
    })
    
    //2. applacation/json (json数据，我们最常用)
    Axios({
      method: "post",
      url: '/api/post',
      params: {
        id: 13
      },
      data
    }).then(res => {
      console.log(res.data)
    })
    // Axios.post('/api/post',data,{
    //   params:{
    //     id:14
    //   }
    // }).then((res)=>{
    //   console.log(res.data)
    // })

    //delete(url,config)
    //1. 以传参的方式删除
    Axios.delete("/api/delete",{
      params:{
        id:11
      }
    })
    //2. 以请求的方式删除
    Axios({
      method:"delete",
      url:"/api/delete",
      data:{
        "name":"haha"
      }
    })
  }




}
</script>

<style lang='less' scoped type='text/css'>
</style>