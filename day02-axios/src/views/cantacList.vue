<template>
  <div>
    <van-popup v-model="showList" position="bottom">
      <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />
    </van-popup>
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :is-edit="isEdit"
        :contact-info="editingContact"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
// Toast 这个是个方法，不是组件所以不需要注册
import { ContactList, Popup, ContactEdit, Toast } from 'vant';
import axios from 'axios'
export default {
  name: 'cantacList',
  components: {
    [ContactList.name]: ContactList,
    [Popup.name]: Popup,
    [ContactEdit.name]: ContactEdit,

  },
  data() {
    return {
      list: [],
      //  挂在一个axios的实例
      instance: null,
      //  是否展示当前列表
      showList: true,
      //  是否展示编辑页面
      showEdit: false,
      //  我们当前要编辑或者增加的数据
      editingContact: {},
      //  用来判断是编辑还是增加，我们默认的是增加
      isEdit: false,

    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 添加联系人
    onAdd() {
      this.showList = false;
      this.showEdit = true;
      this.editingContact = {}
    },
    // 编辑联系人
    // 我们要判断是编辑还是增加
    onEdit(info) {
      this.showEdit = true;
      this.isEdit = true;
      //必须有参数，不然的话，编辑页面会没有数据
      this.editingContact = info
    },
    //保存联系人
    async  onSave(info) {
      if (this.isEdit) {
        let res = await this.$Http.editConcatList(info)
        if (res.data.code == 200) {
          this.getList()
          this.showList = true;
          this.showEdit = false;
        }
        //编辑保存
        // this.instance.put("/contact/edit",info).then(res=>{
        //   if(res.data.code == 200){
        //     Toast("更新成功")
        //     this.getList()
        //     this.showList = true;
        //     this.showEdit = false;
        //   }
        // }).catch(e=>{
        //   console.log(e)
        //   Toast("更新失败")
        // })

      } else {
        //增加保存
        let res = await this.$Http.postConcatListJson(info)
        if (res.data.code == 200) {
            //我们需要重新获取一下数据
            this.getList()
            this.showList = true;
            this.showEdit = false;
          }
        // this.instance.post("/contact/new/json", info).then((res) => {
        //   if (res.data.code == 200) {
        //     //我们需要重新获取一下数据
        //     Toast("增加成功")
        //     this.getList()
        //     this.showList = true;
        //     this.showEdit = false;
        //   }
        // }).catch(e => {
        //   Toast("增加失败")
        //   console.log(e)
        // })
      }
    },
    //删除联系人
   async onDelete(info) {
    let res =  await this.$Http.deleteConcatList({id:info.id})
    if (res.data.code == 200) {
          this.showList = true;
          this.showEdit = false;
          this.getList()
        }
      // this.instance.delete("/contact", {
      //   params: {
      //     id: info.id
      //   }
      // }).then(res => {
      //   if (res.data.code == 200) {
      //     Toast("删除成功")
      //     this.showList = true;
      //     this.showEdit = false;
      //     this.getList()
      //   }
      // })
    },

    //获取数据
    async getList() {
      //创建一个实例
      let res = await this.$Http.getConcatList()
      this.list = res.data.data
      //发送请求并且获取列表
      // this.instance.get("/contactList").then((res) => {

      // }).catch(e => {
      //   console.log(e)
      //   Toast('请求失败,请稍后再试')
      // })
    }
  }
}
</script>

<style scoped type='text/css'>
.van-popup--bottom {
  height: 100%;
}
</style>