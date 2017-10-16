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
              path:'register',
              getComponents(partialNextState,cb){
                require.ensure([],(require)=>{
                  cb(null,{
                    headerLayout:require('./containers/AppModule/header.jsx').default,
                    mainLayout:require('./containers/RegisterModule/index.jsx').default
                  })
                })
              }
            },
            {

            }
          ])
        })
      }
    } 
  ]
}
module.exports = routes;