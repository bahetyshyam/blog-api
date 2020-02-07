require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './services/routes';
import mongoose from 'mongoose';
import authRoute from './routes/auth';
import blogsRoute from './routes/blogs';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());

//Connect to db
mongoose.connect('mongodb+srv://bahetyshyam:bahetyshyam@cluster0-thubj.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to db");
    });


//Route Middleware
app.use('/api/users', authRoute);
app.use('/api/blogs', blogsRoute);
app.get('/blogs', routes.getBlogs);
app.post('/blogs', routes.postBlogs);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
