var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.controller')
/* GET users listing. */
router.get('/', function(req, res, next) {
          res.send('respond with a resource');
});
router.get('/login',indexController.getLogin);
router.post('/login',indexController.postLogin);
module.exports = router;
