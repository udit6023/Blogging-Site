const Post=require('../modals/PostModal');
const Category=require('../modals/CategoryModal');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

module.exports= {
    createPost: (req, res) => {
        res.render("admin/posts/create");
    },

    //getting post to be edited
    editPost: (req, res) => {
        //requesting id of the post tht we are editing
        const _id = req.params.id;
        Post.findById(_id).lean()
            .then(posts => {
                Category.find().lean().then(cats=>{
                    res.render("admin/posts/edit",{posts: posts,categories:cats});
                })

        });
    },

    getPosts: (req, res) => {
        //this find is a part of mongoose package which will return all the data from the database.
        //this populate() is for the category part since we are not able to access the title of the category, so we are populating it further

        Post.find().lean().populate('category')
            .then(posts => {
            res.render('admin/posts/index', {posts: posts});
        });

    },


    index: (req, res) => {
        res.render('admin/index');
    },


    submitPosts: (req, res) => {


        const commentsAllowed = req.body.allowComments ? true : false;

        // console.log(commentsAllowed);

        let filename="";
        //console.log(req.files);
        if(!req.files!=null){
            let file=req.files.uploadedFile;
            filename=file.name;
            let uploadDir='./public/uploads/';
            //move the file to specified location
            file.mv(uploadDir+filename,(error)=>{
                if(error){
                    throw error;
                }
            }); 
        }

        //and soon as these fields are populated and clicked on the create post button simultaneously it will populate the database through mongoose.model('post',postSchema) in PostModel.js
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentsAllowed,
            category:req.body.category,
            file:`/uploads/${filename}`

        });

        newPost.save().then(post => {
            console.log(post);
            req.flash('Success-message', "post created succesfully")
            res.redirect('/admin/posts');

        });
    },
    updateEditPost:(req,res)=>{
        const commentsAllowed = req.body.allowComments?true:false;


        const id = req.params.id;

        Post.findById(id)
            .then(post => {

                post.title = req.body.title;
                post.status = req.body.status;
                post.allowComments = commentsAllowed;
                post.description = req.body.description;
                post.category = req.body.category;


                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');

                });
            });
    },

    deletePost:(req,res)=>{
        Post.findByIdAndDelete(req.params.id).lean().then(deletedPost=>{
           req.flash('Success-message',`Post with ${deletedPost.title||{}} has been deleted`);
           res.redirect('/admin/posts');
        });
    },


    //getting all the categories at create post page
    getAllCategories:(req,res)=>{
        Category.find().lean().then(cats=>{
            res.render('admin/posts/create',{categories:cats});
        })
    },

    //all category methods
    getCategories: (req, res) => {
        //this find is a part of mongoose package which will return all the data from the database.
        Category.find().lean().then(cat => {
            res.render('admin/category/index', {categories: cat});
        });

    },

    createCategories:(req,res)=>{
        //req.body.name is the key we defined for the value categrory data part in admin-footer handlebars.
        var categoryName=req.body.name;
         if(categoryName){
             const newCategory=new Category({
                 title:categoryName
             });
             newCategory.save().then(category=>{
                res.status(200).json(category);
             });
         }
        console.log(categoryName);
    },


    editCategories: async (req, res) => {
        const catId = req.params.id;

        const cats = await Category.find();


        Category.findById(catId).then(cat => {

            res.render('admin/category/edit', {category: cat, categories: cats});



        });
        if(err){
            console.log(err);
        }
    },


    editCategoriesPostRoute: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.name;

        if (newTitle) {
            Category.findById(catId).then(category => {

                category.title = newTitle;

                category.save().then(updated => {
                    res.status(200).json({url: '/admin/category'});
                });

            });
        }
    }



};