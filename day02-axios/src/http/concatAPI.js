/* eslint-disable no-unused-vars */
const CONCATLIST = {
  // 获取联系人
  getConcatList:{
    method:"get",
    url:"/contactList"
  },
  //增加联系人 提交format-data
  postConcatListFor:{
    method:"post",
    url:"/contact/new/form"
  },
  //增加联系人  json格式
  postConcatListJson:{
    method:"post",
    url:"/contact/new/json"
  },

  // 更新联系人
  editConcatList:{
    method:"put",
    url:"/contact/edit"
  },
  // 删除联系人
  deleteConcatList:{
    method:"delete",
    url:"/contact"
  }
  
}

export default CONCATLIST