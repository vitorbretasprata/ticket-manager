const webpack = require('webpack');
require('dotenv').config();
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,    
    stats: { colors: true}
}).listen(3000, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Listening on port 3000...")
})