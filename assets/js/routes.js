const routes = {
  childRoutes:[
    {
      path: '/page',
      component:require('./containers/AppModule/index.jsx').default,
      indexRoute:{
        getComponents(partialNextState,cb){
          require.ensure([],(require)=>{
            cb(null,{
              headerLayout:require('./containers/AppModule/header.jsx').default,
              mainLayout:require('./containers/IndexModule/index.jsx').default
            })
          })
        }
      },
      getChildRoutes(partialNextState, cb) {
        require.ensure([],(require)=>{
          cb(null,[
            {
              path:'two',
              getComponents(partialNextState,cb){
                require.ensure([],(require)=>{
                  cb(null,{
                    mainLayout:require('./containers/CountModule/index.jsx').default
                  })
                })
              },
              getChildRoutes(partialNextState,cb){
                require.ensure([],(require)=>{
                  cb(null,[
                    {
                      path:'user',
                      component:require('./containers/CountModule/child.jsx').default
                    }
                  ])
                })
              }
            }
          ])
        })
      }
    } 
  ]
}
module.exports = routes;