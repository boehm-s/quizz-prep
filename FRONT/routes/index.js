var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Connexion' });
});


router.get('/test', function(req, res, next) {
  res.render('index', { title: 'Test Page' });
});

router.get('/quizz', function(req, res, next) {
  res.render('quizz', { title: 'Quizz' });
});


module.exports = router;
