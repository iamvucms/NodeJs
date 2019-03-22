const User = require('../models/user.model')
module.exports.index = (req,res)=>{
	res.render('index',{title:'VPixels'})
	console.log(req.body)
}
module.exports.getRegForm = async (req,res)=>{
	var data =await User.find().then((data)=>data);
         
	if(req.query["errors"]!='undefined' && req.query["errors"]){
		console.log({users:data,error_messages:JSON.parse(req.query["errors"])})
		res.status(200).render('form',{users:data,error_messages:JSON.parse(req.query["errors"])})
          }else res.render('form',{users:data})
           
	
	
}
module.exports.postRegForm = async (req,res)=>{
        
          doc = new User(req.body)
          doc.password =  doc.generateHash(req.body.password)
	await doc.save((err,rss)=>{
                   
		if(!err){
                              console.log("Saved")
                              res.redirect('/Register')
		}else{
                              if(err["code"]==11000){
                                        console.log("hello")
                                        res.redirect('/Register?errors='+JSON.stringify(
                                                  [{
                                                            path:'Email',
                                                            message:'Email is already used'
                                                  }]
                                        ))
                              }else  res.redirect('/Register?errors='+JSON.stringify(err.errors))
                            
			
		}
	})
	
}
module.exports.getUser = async (req,res)=>{
	data = await User.find().then((data)=>data)
	console.log(data)
}
module.exports.deleteUser = async (req,res)=>{
	await User.findOneAndDelete({email:req.body.email},(err,data)=>{
		if(data!==null){
			res.status(200).send("Deleted Successfully!");
		}else{
			res.status(200).send("Error! No match with our resource");
		}
	})
	
}
module.exports.getLogin  = (req,res)=>{
          res.render("login",{errors:req.flash("errors")})
}
module.exports.postLogin  = async (req,res)=>{
          let errors = []
          let data  = await User.findOne({email:req.body.email.trim()},(err,rss)=>{
                    if(err){
                              console.log(err)
                    }else{
                              if(rss===null){
                    
                                        errors.push("Email doesn't match with our resource");
                              }else{
                                        if(!rss.validatePassword(req.body.password.trim())){
                                                  errors.push("Password isn't correct")
                                        }else{    
                                                  return redirect('/');
                                        }
                              }
                    }
          })
          console.log(data)
         
          req.flash('errors',errors)
          return res.redirect('/users/login');
          
}
