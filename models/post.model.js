const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const postSchema = new mongoose.Schema({
          user: {type:Schema.Types.ObjectId, ref: 'User' },
          content:{
                    msg:String,
                    img:{
                              type:String,
                              default:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png'
                    }
                    
          },
          likes:[{type:Schema.Types.ObjectId,ref:'User'}],
          create_at:{type:Date,default:Date.now}
})
const Post = mongoose.model('Post',postSchema,'posts');
module.exports = Post
