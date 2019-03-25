var express = require('express');
var router = express.Router();
var passport = require('../app').passport
var indexController = require('../controllers/index.controller')
var homeController = require('../controllers/home.controller')
var multer  = require('multer')
var upload = multer({dest:'./public/uploads'})
/* GET home page. */
//Home Router Area
// router.get("/*",(req,res)=>{
//           if(!req.isAuthenticated()){
//                     res.redirect("/users/login")
//           }
// })
router.get('/',homeController.getHome)
router.get('/logout.html',(req,res)=>{
          req.logout();
          res.redirect('/users/login');
})
router.get('profile/:id',(req,res)=>{
          console.log(req.query)
})
router.post('/post',upload.single('img'),homeController.post)
module.exports = router;
