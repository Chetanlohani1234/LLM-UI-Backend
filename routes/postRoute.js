const postController = require('../controllers/postControllers')
const express = require('express')
const app = express();

const multer = require('multer');


 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });




module.exports=(app)=>{

 app.post('/api/create-post',upload.single('image'),postController.createPost);

app.get('/api/get-posts',postController.getPosts);

app.get('/api/get-postsById/:id',postController.getPostsById);

app.delete('/api/delete-post/:id',postController.deletePost);

app.put('/api/update-post/:id',upload.single('image'),postController.updatePost);

}