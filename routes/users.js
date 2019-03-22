var express = require('express');
var router = express.Router();
var passport = require('passport')
var indexController = require('../controllers/index.controller')
/* GET users listing. */
router.get('/', function(req, res, next) {
          res.send('respond with a resource');
});
router.get('/login',indexController.getLogin);
// router.post('/login',indexController.postLogin);
router.post('/login',(req,res,next)=>{
          if(!req.isAuthenticated()){
                    passport.authenticate('local',{
                              failureRedirect:'/users/login',
                              successRedirect:'/home'
                    })(req,res,next)
          }else{
                    res.redirect("/home")
          }
})
module.exports = router;
