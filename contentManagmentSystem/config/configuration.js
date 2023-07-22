//this method will export all the variables or methods that are initialized under the curly braces
module.exports={
    mongoDbUrl:'mongodb://localhost:27017/cms',
    PORT: process.env.PORT || 3000,

    globalVariables:(req,res,next)=>{
        res.locals.sucess_message=req.flash('Success-message');
        res.locals.error_message=req.flash('error-message');

        next();
    }
};