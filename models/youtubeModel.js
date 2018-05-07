const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const youtubeStatsSchema = new Schema({
    viewcount: { type: Number, required: true },
    likeCount: { type: Number },
    dislikeCount: { type: Number },
    commentCount: { type: Number }
}, {
    timestamps: true
});

const YoutubeStats = mongoose.model("YoutubeStats", commentSchema);

module.exports = Comment;