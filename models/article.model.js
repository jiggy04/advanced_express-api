const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    content:{
        type: String,
        required: true,
        minLength: 20
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [String],
    comments: {
        body: {
            type: String
        }, 
        author: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    socialLinks: {
        facebook: String,
        X: String,
        instagram: String,
        LinkedIn: String
    }

},{timestamps: true});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;