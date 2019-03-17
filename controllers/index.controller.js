var User = require('../models/user.model')
module.exports.index = (req,res)=>{
	res.render('index',{title:'VPixels'})
	console.log(req.body)
}
module.exports.getRegForm = (req,res)=>{
	res.render('form')
}
module.exports.postRegForm = async (req,res)=>{
	doc = new User(req.body)
	errList =[]

	await doc.save((err,rss)=>{
		if(!err){
			console.log("Saved")
		}else{
			for(let x in err.errors){
				console.log(err.errors[x].path+":"+err.errors[x].message)
			}
		}
	})
	res.redirect('/Register')
}
module.exports.getUser = async (req,res)=>{
	data = await User.find().then((data)=>data)
	console.log(data)
}
