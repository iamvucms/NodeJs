var User = require('../models/user.model')
module.exports.index = (req,res)=>{
	res.render('index',{title:'VPixels'})
	console.log(req.body)
}
module.exports.getRegForm = async (req,res)=>{
	var data =await User.find().then((data)=>data);

	if(req.query["errors"]){
		console.log({users:data,error_messages:JSON.parse(req.query["errors"])})
		res.status(200).render('form',{users:data,error_messages:JSON.parse(req.query["errors"])})
	}else res.render('form',{users:data})
	
	
}
module.exports.postRegForm = async (req,res)=>{
	doc = new User(req.body)
	await doc.save((err,rss)=>{
		if(!err){
			console.log("Saved")
		}else{
			res.redirect('/Register?errors='+JSON.stringify(err.errors))
		}
	})
	res.redirect('/Register')
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
