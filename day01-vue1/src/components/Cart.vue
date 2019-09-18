<template>
  <div>
    <table border="1">
      <tr>
        <th>状态</th>
        <th>课程名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>价格</th>
      </tr>
      <tr v-for="(item,i) in cartDatas" :key="item.name" :class="{active:item.active}">
        <td>
          <input type="checkbox" v-model="item.active" />
        </td>
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
        <td>
          <button @click="reduce(i)">-</button>
          {{item.count}}
          <button @click="add(i)">+</button>
        </td>
        <td>{{item.count * item.price}}</td>
      </tr>
      <tr>
        <td colspan="3">{{activeValue}}/{{num}}</td>
        <td colspan="2">{{total}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import util from "../util"
export default {
  name: 'Cart',
  props: {
    cartData:{
      type:Array,
      required:true
    }
  },
  data() {
    return {
      cartState:false,
      cartDatas:this.cartData
    }
  },
  watch:{
    cartDatas(){
      this.cartDatas = this.cartData
      util.setLoacalStorage("cart",JSON.stringify(this.cartDatas))
    }
  }
  ,
  computed: {
    activeValue() {
      return this.cartData.filter((v) => v.active).length
      //filter 返回的是一个新书组，原数组不回破坏掉
      // return this.cartData.filter((v) => v).lenght
    },
    num() {
      let num = 0;
      return this.cartData.length
    },
    total() {
      let total = 0;
      this.cartData.forEach((item) => {
        if (item.active) {
          total += item.price * item.count
        }
      })
      return total
    }
  },
  created(){//数据持久化，利用本地存储的
   this.cartDatas = util.getLocalStorage("cart")
  },
 
  methods: {
    add(i) {
      this.cartData[i].count += 1
    },
    reduce(i) {
      if (this.cartData[i].count > 1) {
        this.cartData[i].count -= 1
      } else {
        this.remove(i)
      }
    },
    //window.confirm()
    /*
    confirm()方法用于显示一个带有指定消息和确认及取消按钮的对话框,如果访问者点击"确定"，此方法返回true，否则返回false。
    */
    remove(i) {
      if (window.confirm(`是不是要删除${this.cartData[i].name}课程？`)) {
        this.cartData.splice(i, 1)
      }
    }
  },
}
</script>

<style  scoped type='text/css'>
tr.active {
  color: red;
  font-weight: bold;
}
</style>