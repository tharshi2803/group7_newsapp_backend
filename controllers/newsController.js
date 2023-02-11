const News = require('../models/News');
const ImageToBase64 = require('image-to-base64');

const addNews = async (req, res, next) => {
    try {
        const { title, content, author, category, addToSlider } = req.body;

        const base64Data = await ImageToBase64(req.files.newsImage.path);

        const news = await News.create({
            title, author, content, category, addToSlider, newsImage: `data:${req.files.newsImage.type};base64,${base64Data}`, addedAt: Date.now()
        });

        if (news) {
            res.status(201).json({
                message: 'Successfully Added News',
                data: news
            })
        } else {
            res.status(400).json({
                message: 'Invalid News Data'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Internal error occured.',
        });
    }
};


const getAllNews = async (req, res, next) => {
    try {
        const size = req.params.pageSize;
        const pageNo = req.params.pageNo;

        var query = {};

        if (pageNo < 0 || pageNo === 0) {
            return res.status(401).json({
                message: 'Invalid page number, should start with 1'
            });
        }

        query.skip = size * (pageNo - 1);
        query.limit = size;

        const newsCount = await News.find({});

        const news = await News.find({})
            .sort('-addedAt')
            .populate({ path: 'category', select: ['_id', 'name'] })
            .limit(Number(query.limit))
            .skip(Number(query.skip));

        res.json({
            count: newsCount.length,
            data: news
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal error occured.'
        });
    }
}

const getNewsById = async (req, res, next) => {
    try {

        const news = await News.findById(req.params.newsId)
            .populate({ path: 'category', select: ['_id', 'name'] });

        res.json({
            data: news
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal error occured.'
        });
    }
};

const getSliderNews = async (req, res, next) => {
    try {
        const news = await News.find({ addToSlider: true })
            .populate({ path: 'category', select: ['_id', 'name'] });
        res.json({
            count: news.length,
            data: news
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal error occured.'
        });
    }
};

const getNewsByCategory = async (req, res, next) => {
    try {
        const news = await News.find({ category: req.params.catId })
            .populate({ path: 'category', select: ['_id', 'name'] });
        res.json({
            count: news.length,
            data: news
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error occured.'
        });
    }
};

const deleteNewsById = async (req, res, next) => {
    try {

        const news = await News.findByIdAndDelete(req.params.id);

        res.status(201).json({
            message: 'Successfully Deleted',
        });

        if (!news) {
            return res.status(401).json({
                message: 'News not found'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Internal error occured.'
        });
    }
};

const editNews = async (req, res, next) => {
    try {
        const news = await News.findById(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            message: 'Successfully Updated the News',
        });

        if (!news) {
            return res.status(401).json({
                success: false,
                message: 'News not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error occured.'
        });
    }
};


module.exports = {
    addNews,
    getAllNews,
    getNewsById,
    getSliderNews,
    getNewsByCategory,
    deleteNewsById,
    editNews
}