module.exports  = {
  configureWebpack:{
    devServer:{
      before(app){
        app.get("/api/goods",(req,res)=>{
          res.json({
            list:[
              {
                name: 'web开发',
                price: '100'
              },
              {
                name: 'java开发',
                price: '200'
              },
              {
                name: 'python开发',
                price: '300'
              }
            ]
          })
        })
      }
    }
  }
}