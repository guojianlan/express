var webpack = require('webpack')
var path =require('path')
var projectRoot = path.join(__dirname,'../');

module.exports = {
	entry:{
		app:['./webpackConfig/dev-client.js',path.join(__dirname,'../assets/js/main.js')]
	},
	output:{
		path:path.join(__dirname, '../dist'),
		publicPath:'/',
	 	filename: '[name].js'
	},
  devtool: '#source-map',
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module:{
  	loaders:[
  		{
  			test: /\.vue$/,
  			loader:'vue'
  		},
  		{
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
    		test: /\.scss$/,
    		loader: 'vue-style-loader!css-loader!sass-loader'
    	}
  	]
  },
  vue:{
  	loaders:{
  		scss:'vue-style-loader!css-loader!sass-loader'
  	},
	 	postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}