<template>
  <div>all</div>
</template>

<script>
import Axios from 'axios'
  export default {
    data () {
      return {
      }
    },
    created(){
      Axios.all([
        Axios.get('/api/axios1'),
        Axios.get("/api/axios2")
      ]).then(Axios.spread((res1,res2)=>{
        console.log(res1,res2)
      }))
    }
  }
</script>

<style  scoped type='text/css'>

</style>