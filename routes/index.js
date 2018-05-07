const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//route google analytics
router.get('/analytics', (req, res, next) => {
  res.render('analytics');
});

//route google adwords
router.get('/adwords', (req, res, next) => {
  res.render('adwords');
});

//route youtube
router.get('/youtube', (req, res, next) => {
  res.render('youtube');
});

//route facebook
router.get('/facebook', (req, res, next) => {
  res.render('facebook');
});

//route twitch
router.get('/twitch', (req, res, next) => {
  res.render('twitch');
});

//route tools
router.get('/tools', (req, res, next) => {
  res.render('tools');
});

module.exports = router;
