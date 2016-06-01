'use strict';

var fs = require('fs');
var glob = require('glob');
var minify = require('html-minifier').minify;

(function(){
  var dist = 'dist';
  var minifyOptions = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    html5: true,
    removeComments: true,
    removeRedundantAttributes: true
  };

  module.exports = function() {
    glob(dist + '/*.html', {}, function(err, files) {
      files.forEach(function(file) {
        fs.readFile(file, 'utf8', function(err, content) {
          var minifiedContent = minify(content, minifyOptions);
          fs.writeFile(file, minifiedContent, 'utf8', function(err) {
            if(err) console.log('Couldn\'t minify ' + file + '\n' + err);
          });
        });
      });
    });
  };

  if(!module.parent) {
    module.exports();
  }
})();
