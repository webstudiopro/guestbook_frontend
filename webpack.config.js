const path = require('path');

module.exports = {
    entry: './src/jsx/index.jsx',
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'guestbook.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],
        query: {
            presets:[ 'es2015', 'react', 'stage-2' ]
        }
    }
};