const express = require('express');
const router = express.Router();
const {
    addNews,
    getAllNews,
    getNewsById,
    getSliderNews,
    getNewsByCategory,
    deleteNewsById,
    editNews
} = require('../controllers/newsController');

//add a news
router.post('/', addNews);

//get all news regaring the page no and page size
router.get('/:pageNo/:pageSize', getAllNews);

//get all news
router.get('/', getAllNews);

//get a news
router.get('/:newsId', getNewsById);

//get slidernews
router.get('/getAllNews/slider', getSliderNews);

//get a news by category
router.get('/getByCategory/:catId', getNewsByCategory);

//delete a news
router.delete('/:id', deleteNewsById);

//update a news
router.put('/:id', editNews);

module.exports = router;
