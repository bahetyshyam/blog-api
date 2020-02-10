import mongoose from 'mongoose';

const blogsSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true
    },
    date : {
        type : Date,
        default : Date.now
    },
    postedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Blog', blogsSchema);