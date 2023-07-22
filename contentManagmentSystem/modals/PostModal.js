const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PostSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        status:{
          type:String,
            default:'public'
        },
        description:{
            type:String,
            required:true,
        },
        createdDate:{
            type:Date,
            default: Date.now()
        },
    //so here we created a new field 'user' which will take on the id of the new user and add it into the database and taking reference from the UserModal which will
        //make it add seperated posts for each user so diff users data will not overlap each other.
        user:{
            type:Schema.Types.ObjectId,
            ref:'user'
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:'category'
        },

        allowComments:{
            type:Boolean,
            default:false,
        },
        //for comments part it is going to be an array of objects,since there will be more than one comments
        comments:[
            {
            type:Schema.Types.ObjectId,
            ref:'comments'
        }
        ],

        file:{
            type:String,
            default:''
        }



    }
);
//this will form the model in the database with the heading post and data passed is PostSchema.
module.exports=mongoose.model('post',PostSchema);