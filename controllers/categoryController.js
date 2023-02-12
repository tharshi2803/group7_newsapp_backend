require('dotenv').config();
const Category = require('../models/Category');

const addCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).send({
            message: 'Category Added Successfully!',
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ _id: -1 });
        res.send(categories);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const deleteCategory = (req, res) => {
    Category.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).send({
                message: err.message,
            });
        } else {
            res.status(200).send({
                message: 'Category Deleted Successfully!',
            });
        }
    });
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            category.name = req.body.name;
            await category.save();
            res.send({ message: 'Category Updated Successfully!' });
        }
    } catch (err) {
        res.status(404).send({ message: 'Category not found!' });
    }
};

module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
};