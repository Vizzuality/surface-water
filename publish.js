'use strict';

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const ghpages = require('gh-pages');
const path = require('path');
const minifyHtml = require('./minify-html.js');


const compiler = webpack(webpackConfig);

compiler.run(function(err, stats) {
  if(err) {
    console.log(err);
  } else {
    minifyHtml();
    ghpages.publish(path.join(__dirname, 'dist'), function(err) {
      console.log(err);
    });
  }
});
