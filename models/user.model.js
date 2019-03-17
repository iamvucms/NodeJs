const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		minlength:[3,"Too litle characters"],
		maxlength:[20,"Too many characters"],
		unique:true
	},
	phone:{
		type:String,
		required:true

	},
	email:String,
	password:String,
	versionKey:false
});

const User = mongoose.model('User',userSchema,'users');

module.exports = User;