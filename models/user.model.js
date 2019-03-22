const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		minlength:[3,"Too litle characters"],
		maxlength:[100,"Too many characters"],
		
	},
	phone:{
		type:String,
		required:true,
		validate:{
			validator: (input)=>{
				return /^[0][0-9]{9}$/g.test(input)
			},
			message: props => `${props.value} is not a phone number`
		}
	},
	email:{
		type:String,
		validate: { 
			validator: (input)=>{
			return /^[\S]{3,}@[a-zA-Z0-9-]{3,}\.[a-z-A-Z]{2,}$/i.test(input);
			},
			message: props => `${props.value} is not a email`
		},
		required:true,
		index:true,
		unique:true

	},
	password:{
		type:String,
		// validate:{
		// 	validator:(input)=>{
		// 		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*])[^\s]{9,}$/g.test(input);
		// 	},	
		// 	message:props=>`Password need more then 8 characters and both of lower characters,upper characters, number and special characters without space`
		// },
		required:true

	},
	versionKey:false
});
userSchema.methods.generateHash = (pwd)=>{
          return bcrypt.hashSync(pwd,bcrypt.genSaltSync(8),null);
}
userSchema.methods.validatePassword = (pwd,hash)=>{        
          
          return bcrypt.compareSync(pwd,hash);
}
const User = mongoose.model('User',userSchema,'users');

module.exports = User;