const Post=require('../modals/PostModal');
const Category=require('../modals/CategoryModal');
const User=require('../modals/UserModal');
const bcrypt = require("bcrypt")
module.exports={
  index: async (req,res)=>{

      const posts=await Post.find().lean();
      const categories=await Category.find().lean();

      res.render('default/index',{posts:posts,categories:categories});
  },
  login:(req,res)=>{
      res.render('default/login');
  },
  loginPost:(req,res)=>{
      res.send("Congratulations you've succesfully logged in the cms blog")
  },
   registerGet:(req,res)=>{
    res.render('default/register');
   },
    registerPost:(req,res)=>{
       // res.send('Successfully Registered');
       let err=[];
       if(req.body.firstName==null){
        err.push({message:'First name is mandatory'});
       }
       if(req.body.lastName==null){
        err.push({message:'Last name is mandatory'});
       }
       if(req.body.email==null){
        err.push({message:'email is mandatory'});
       }
       if(req.body.password!=req.body.passwordConfirm){
        err.push({message:'wrong password'});
       }


       if(err.length>0){
        res.render('default/register',{

            err:err,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email
        });
       }
       else{
        User.findOne({email: req.body.email}).then(user=>{
            if(user){
                req.flash('error-message','Email already exists,try to login');
                res.redirect('/login');
            }else{
                const newUser=new User(req.body);
                //so this bcrypt package is used to generate a random password for better encryption so nobody can fetch the password from the database
                //so it consists a "hash" which uses a hasing algorithm for the new password and "salt" adds a raw string into hashed password 
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        newUser.password=hash;
                        newUser.save().then(user=>{
                            res.redirect('/login');
                            req.flash('success-message','You are now registered');
                        });
                    });
                });


            }
        });
       }
    
    },

    singlePost:(req,res)=>{
        const id=req.params.id;
        Post.findById(id).lean().then(posts=>{
            if(posts==null){
                res.status(404).json({message:'No post Found'});
            }else{
                res.render('default/singlePost',{posts:posts});
            }
        })
    }
};