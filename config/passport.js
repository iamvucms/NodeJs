const User = require('../models/user.model')
const LocalStrategy = require('passport-local').Strategy
module.exports = (passport)=>{
          
          passport.use(new LocalStrategy({
                    usernameField:'email',
                    passwordField:'password',
                    passReqToCallback:true
          },async (req,email,password,done)=>{
                    console.log(req.body)
                    let data  = await User.findOne({email:email},(err,rss)=>{
                              console.log(rss)
                              if(err) throw err
                              if(rss==null){
                                        return done(null,false)
                              }else{
                                        if(!rss.validatePassword(password,rss.password)){
                                                  return done(null,false)
                                        }else{    
                                                  return done(null,rss)
                                         }         
                               }
                    })
          }))
                    

          passport.serializeUser((user,done)=>{
                    done(null,user.email)
          })
          passport.deserializeUser(async(email,done)=>{
                    let data = await User.findOne({email:email},(err,rss)=>{
                              if(err) throw err
                              if(rss==null) return done(null,false)
                              else return done(null,rss)    
                    })
          })
}