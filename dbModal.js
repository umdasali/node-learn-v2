import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    imageURL: String,
    title: String,
    description: String,
    blog_type: String,
    video_link: String,
}, {timestamps: true})

// collection inside the database
export default mongoose.model('blogs', blogSchema)