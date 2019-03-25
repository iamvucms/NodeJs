const User = require('../models/user.model')
const Post = require('../models/post.model')
const mongose = require('mongoose')

module.exports.getHome = async (req,res)=>{
          if(!req.isAuthenticated()){
                    res.redirect("/users/login")
          }else{
                    let data = await Post.find({},(err,rss)=>{
                              console.log(rss)
                    })
                    
                    res.render("home/index",{title:"Home",userinfo:req.user})
          }
          
}
module.exports.post = async (req,res)=>{
          //error
          console.log(req.user)
          var doc = new Post({
                    user : req.user._id,
                    content:{
                              msg:req.body.msg,
                              img:req.file.path
                    }
          });
          let data = await doc.save((err,rss)=>{
                     if(err) throw err;
                     req.user.posts.push(doc)
                     req.user.save((err,rss)=>{console.log(rss)})
          })
          console.log(data)
          res.redirect('/home')
}