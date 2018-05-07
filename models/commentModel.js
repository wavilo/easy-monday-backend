const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {type: [string], required: true},
    week: { type: Number, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;