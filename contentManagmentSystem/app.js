//and express to create the server
const express=require('express');
//mongoose package to interact with our mongo database
const mongoose=require('mongoose');

const path=require('path');

//importing handlebars in order create the view engine
const hbs=require('express-handlebars');

//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
const app=express();

//importing our mongodb url from config directory
const {mongoDbUrl, PORT, globalVariables}=require('./config/configuration');

//in order to trigger notification we use flash package which will flash the message that is passed to it
const flash=require('connect-flash');
//this module will create a session everytime a message is flashed so that the user can be redirected to that page
const session=require('express-session');

//this package will provide us with more verbs like delete,put etc.
const methodOverride=require('method-override');

const {selectOption}=require('./config/customFunctions');

//to upload files to the database and fetch it
// const multer = require("multer");
const fileUpload=require('express-fileupload');

//in order to authenticate and save the user credentiqls
const passport=require('passport');

//configure mongoose to connect to mongodb
mongoose.connect(mongoDbUrl).then(() => {
   console.log("Connected to Database");
}).catch((err) => {
   console.log("Not Connected to Database ERROR! ", err);
});

//configure express
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//creating a route
//__dirname will pass the path of the root directory which we are in.
//and path.join func will join the two passed directories.
app.use(express.static(path.join(__dirname,'public')));

//flash and session
app.use(session({
   secret:'anysecret',
   saveUninitialized:true,
   resave:true
}));

app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use(globalVariables);
app.use(fileUpload());
//file upload middleware
// app.use(multer);



//setup view engine to use handlebars
app.engine('handlebars',hbs.engine({defaultLayout:'default',helpers:{select:selectOption}}));
app.set('view engine','handlebars');


//method override middleware
app.use(methodOverride('newMethod'));

//configure routes
const defaultRoutes=require('./routes/defaultRoutes');
const adminRoutes=require('./routes/adminRoutes');

app.use('/',defaultRoutes);
app.use('/admin',adminRoutes);

app.listen(PORT,()=>{
   console.log(`Server is listening to port ${PORT}`);
});