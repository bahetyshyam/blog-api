import express from 'express';
const router = express.Router();
import Blog from '../model/Blog';
import verify from './verifyToken';
import {blogsValidation} from '../validation';

//Get all blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
})
 
//Get post by id
router.get('/:blogId', async (req, res) => {
    const blogs = await Blog.findById(req.params.blogId, (err) => {
        if(err) {
            res.status(400).send(err);
        }
    })
    res.send(blogs);
})

//Post a blog
router.post('/', verify, async (req, res) => {
    //Blogs Validation
    const {error} = blogsValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);  
    }

    //check if title already exists
    const titleExists = Blog.findOne({title: req.title});
    if(titleExists) {
        res.status(400).send('This title already exists');
    }

    //Save the blog to the db
    const blog = new Blog({
        title: req.body.title, 
        description: req.body.description,
        postedBy: req.user._id
    })

    try{
        const savedBlog = await blog.save();
        res.send(savedBlog);
    }catch(err){
        res.status(400).send(err);
    }
});



export default router;
