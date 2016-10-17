var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Connexion' });
});

router.get('/add-quizz', function(req, res, next) {
  res.render('admin/quizz', { title: 'Quizz Management' });
});

router.get('/wait-quizz', function(req, res, next) {
  res.render('admin/quizz', { title: 'Quizz Management' });
});

router.get('/todo-quizz', function(req, res, next) {
  res.render('admin/quizz', { title: 'Quizz Management' });
});

router.get('/done-quizz', function(req, res, next) {
  res.render('admin/quizz', { title: 'Quizz Management' });
});


module.exports = router;
