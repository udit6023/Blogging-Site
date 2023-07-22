const express=require('express');
const router=express.Router();
const {isUserAuthenticated}=require('../config/customFunctions');
const adminController=require('../controllers/adminController');

//so this .all() will work for all the requests like post,get,put, so we don't need ti define the method as soon as it matches with the url it executes the method
router.all('/*', (req, res, next) => {

  req.app.locals.layout = 'admin';

  next();
});

router.route('/').get(adminController.index);
router.route('/posts').get(adminController.getPosts);

router.route('/posts/create').get(adminController.getAllCategories).post(adminController.submitPosts);

router.route('/posts/edit/:id').get(adminController.editPost).put(adminController.updateEditPost);

router.route('/posts/delete/:id').delete(adminController.deletePost);

//admin category route
router.route('/category').get(adminController.getCategories);

router.route('/category/create').post(adminController.createCategories);

router.route('/category/edit/:id').get(adminController.editCategories).post(adminController.editCategoriesPostRoute);

module.exports=router;