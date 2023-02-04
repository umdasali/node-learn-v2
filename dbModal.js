import mongoose from "mongoose";

const tiktokSchema = mongoose.Schema({
    url: String,
    channel: String,
    song: String,
    likes: String,
    messages: String,
    desc: String,
    shares: String,
})

// collection inside the database
export default mongoose.model('tiktokVideo', tiktokSchema)