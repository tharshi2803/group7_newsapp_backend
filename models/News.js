const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
    {
        author: {
            type: String,
        },
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        url: {
            type: String,
        },
        newsImage: {
            type: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        views: {
            type: Number,
            default: 0
        },
        addToSlider: {
            type: Boolean,
            default: false
        },
        comments: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: String

        }],
        addedAt: {
            type: Date
        }
    }
)

const News = mongoose.models.News || mongoose.model('News', newsSchema);

module.exports = News;  