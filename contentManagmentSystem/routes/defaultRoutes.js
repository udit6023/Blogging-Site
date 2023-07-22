
const express=require('express');
const router=express.Router();
const defaultController=require('../controllers/defaultController');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const bcrypt=require('bcrypt');
const User=require('../modals/UserModal');
const { log } = require('handlebars');

//so this .all() will work for all the requests like post,get,put, so we don't need to define the method as soon as it matches with the url it executes the method
router.all('/*',(req,res,next)=>{
    res.app.locals.layout='default';

    next();
});

router.route('/').get(defaultController.index);

//this passport package is used for authentication in express/node.js an this mainly involves two ways just like any other authentication application works 
//1)local strategy means checking the data that the user entered to the data present in the database or somewhere else
//2))google,facebook,twitter authentication
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({email:email}).then(user=>{
        if(user==null){
            return done(null,false,req.flash('error-message','User not found with this email'));
        }
        //here hashing takes place so it doesnt decrypt the data.
        bcrypt.compare(password,user.password,(err,passwordMatched)=>{
            console.log(user.password);
            if(err){
                return err;
            }

            if(passwordMatched==null)
            {
                return done(null,false,req.flash('error-message','Invalid Username or Password'));
            }

            return done(null,user,req.flash('Success-message','Login Successful'));
        });
    });
}
));
//it passes the current parametrs to session so as it can save the state of the user
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//it removes the state of the user from the session
passport.deserializeUser( function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});

router.route('/login').get(defaultController.login).post(passport.authenticate('local',{
    successRedirect:'/admin',
    failureRedirect:'/login',
    failureFlash:true,
    successFlash:true,
    session:true
    
}),defaultController.loginPost);

router.route('/register').get(defaultController.registerGet).post(defaultController.registerPost);

router.route('/post/:id').get(defaultController.singlePost);

module.exports=router;