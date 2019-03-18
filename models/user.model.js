const mongoose = require('mongoose');
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
				return /^[0][0-9]{9}$/i.test(input)
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
		required:true

	},
	password:{
		type:String,
		validate:{
			validator:(input)=>{
				return /[]/i.test(input);
			},
			message:props=>`${props.value} is not aceepted. Password need more then 6 characters and both of lower characters and upper characters`
		},
		required:true

	},
	versionKey:false
});

const User = mongoose.model('User',userSchema,'users');

module.exports = User;