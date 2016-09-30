var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Connexion' });
});

router.get('/quizz', function(req, res, next) {
  res.render('admin/quizz', { title: 'Quizz Management' });
});


module.exports = router;
