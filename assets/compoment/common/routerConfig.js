var rootRoute = {
	childRoutes:[
	{
    path: '/page/user/:userID',
    getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./compoments/app.jsx'))
    })
  }
  },
  {
    path: '/page/two',
    component: require('./compoments/two.jsx'),
  },
  ]
}
module.exports = rootRoute;