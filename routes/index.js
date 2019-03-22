var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.controller')
/* GET home page. */
router.get('/', indexController.index);
router.get('/Register(\/\?errors=[^\s]+)?',indexController.getRegForm)
router.post('/',indexController.postRegForm)
router.get('/userss',indexController.getUser)
router.post('/users/delete',indexController.deleteUser)

module.exports = router;
