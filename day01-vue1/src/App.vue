<template>
  <!-- <div id="app" v-if="mark">{{msg}}</div> -->
  <div id="app" v-show="mark">
    {{msg}}
    <ul>
      <li v-for=" (key,i) in goods" :key="key.name">
        {{key.name}} ¥{{key.price}}
        <!-- 我们需要知道是那个加入了购物车 -->
        <button @click="addCart(i)">添加到购物车</button>
      </li>
    </ul>

    <hr />
    <Cart :cartData="cartData"></Cart>
  </div>
</template>

<script>
import axios from 'axios'
import Cart from './components/Cart'
import util from "./util.js"
export default {
  name: "app",
  components: {
    Cart: Cart
  },
  data() {
    return {
      msg: "开课吧",
      mark: true,
      // 我们需要四个数据，1：名称,2:价格,3:状态,4:数量
      cartData: [],
      goods: [],
    }
  },
  async created() {
    //但是await会阻塞，所以根据需求来做，可以考虑promise
    const res = await axios.get("/api/goods")
    this.goods = res.data.list
  },
  methods: {
    //思路：我们首先要判断购物车中是否有，如果有数量加1，如果没有直接添加数据
    addCart(index) {
      let good = this.goods[index]
      //遍历循环然后找到与之匹配的
      let res = this.cartData.find(e => e.name == good.name)

      if (res) {
        res.count += 1
      } else {
        this.cartData.push({
          ...good,
          active: true,
          count: 1
        })
      }
      //数据持久化
      util.setLoacalStorage("cart",JSON.stringify(this.cartData))
    }
  }

  // created(){
  //   setTimeout(()=>{
  //     this.mark = false
  //   },2000)
  // }
}
</script>

<style  scoped type='text/css'>
li {
  list-style: none;
}
</style>