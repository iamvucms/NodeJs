var User = require('../models/user.model')
module.exports.index = (req,res)=>{
	res.render('index',{title:'VPixels'})
	console.log(req.body)
}
module.exports.getRegForm = async (req,res)=>{
	var data =await User.find().then((data)=>data);

	if(req.query["errors"] !=='undefined'){
		console.log({users:data,error_messages:JSON.parse(req.query["errors"])})
		res.status(200).render('form',{users:data,error_messages:JSON.parse(req.query["errors"])})
          }else res.render('form',{users:data})
           res.end();
	
	
}
module.exports.postRegForm = async (req,res)=>{
	doc = new User(req.body)
	await doc.save((err,rss)=>{
                    console.log(err["errmsg"])
		if(!err){
                              console.log("Saved")
                              res.redirect('/Register')
		}else{
			res.redirect('/Register?errors='+JSON.stringify(err.errors))
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
