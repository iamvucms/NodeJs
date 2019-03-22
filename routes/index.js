var express = require('express');
var router = express.Router();
var passport = require('../app').passport
var indexController = require('../controllers/index.controller')
/* GET home page. */
router.get('/', indexController.index);
router.get('/Register(\/\?errors=[^\s]+)?',indexController.getRegForm)
router.post('/',indexController.postRegForm)
router.get('/userss',indexController.getUser)
router.post('/users/delete',indexController.deleteUser)


//Home Router Area
router.get('/home',(req,res,next)=>{
          if(req.isAuthenticated()){
                    res.send("OKE")
          }else{
                    res.redirect("/users/login")
          }
})
module.exports = router;
