const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CategorySchema=new Schema(
    {
        title:{
            type:String,
            required:true,
        }

    }
);
//this will form the model in the database with the heading user and data passed is UserSchema.
module.exports=mongoose.model('category',CategorySchema);