var gulp = require('gulp');
var opine = require('gulp-opine');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-prettify');
var module = opine.module('templates');

var sources = module.getSources();
var base = opine.getConfig('base.source', 'frontend');
var dest = module.getDest();
var path = module.getConfig('path', base + '/templates');
var watchPath = opine.getConfig('templates.watchPath', path + '/**/*');

var debug = module.getConfig('debug', true);

module.addBuild();
module.addWatch(watchPath);

module.task(function() {
    return gulp
        .src(sources)
        .pipe(nunjucksRender({
            path: path
        }))
        .pipe(prettify({indent_size: 4}))
        .pipe(gulp.dest(dest))
        .pipe(module.size());
});
