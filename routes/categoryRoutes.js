const express = require('express');
const router = express.Router();
const {
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
} = require('../controllers/categoryController');

//add a category
router.post('/', addCategory);

//get all categories
router.get('/', getAllCategories);

//update a category
router.put('/:id', updateCategory);

//delete a category
router.delete('/:id', deleteCategory);

module.exports = router;
