var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Romika Bhatia',
    aboutInfo: 'someInfo'
  });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About',
    aboutInfo: 'someInfo'
  });
});

/* GET project page. */
router.get('/project', function(req, res, next) {
  res.render('project', {
    title: 'Project',
    aboutInfo: 'someInfo'
  });
});
/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {
    title: 'Contact',
    aboutInfo: 'someInfo'
  });
});
/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services', {
    title: 'Services',
    aboutInfo: 'someInfo'
  });
});

module.exports = router;