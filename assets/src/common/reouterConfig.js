var rootRoute = {
	childRoutes:[
	{
    path: 'page/user/:userID',
    component:require('../compoments/IndexModule/index.jsx').default
  },
  {
    path: 'page/two',
    component: require('../compoments/TwoModule/index.jsx').default
  }
  ]
}
module.exports = rootRoute;