const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        }
    }
);
//this will form the model in the database with the heading user and data passed is UserSchema.
module.exports=mongoose.model('user',UserSchema);