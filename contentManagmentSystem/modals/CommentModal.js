const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CommentSchema=new Schema(
    {
        body:{
            type:String,
            required:true,
        },
        //to check who commented on the post
        user:{
            type:Schema.Types.ObjectId,
            ref:'user'
        },
        date:{
            type:Date,
            default:Date.now(),
        },
        commentIsApproved:{
            type:Boolean,
            default:false,
        }

    }
);
//this will form the model in the database with the heading user and data passed is UserSchema.
module.exports=mongoose.model('comment',CommentSchema);