module.exports={
    selectOption:function(status,options){
        //option.fn(this) gives you a rendered template from inside the block
        //and this replace function will replace the first occurence of the matched string with the specified string for the values or strings who match with RegExp('value=\"'+status+'\"') with
        //the value passed to it which is '$&selected="selected"'
        return options.fn(this).replace(new RegExp('value=\"'+status+'\"'),'$&selected="selected"');
    },
     isUserAuthenticated:(req,res,next)=>{
        //this isUserAuthentiction is a method of passport package
            if(req.isAuthenticated()){
                console.log(true);
                res.redirect('/admin');
            }else{
                res.redirect('/login');
            }
     }
}
