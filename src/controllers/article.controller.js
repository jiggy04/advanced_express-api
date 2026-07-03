// Article controller to handle CRUD operations for articles

const Joi = require('joi')   //import Joi for data validation to ensure that the incoming request data meets the defined schema requirements
const ArticleModel = require('../models/article.model')  //import the Article model to interact with the articles collection in the database

//Create validation rules
const postArticle = async (req, res, next) => {
    try {


        const newArticle = new ArticleModel({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id
        })  //create a new article instance using the validated data

        await newArticle.save();  //save the new article to the database

        return res.status(201).json({ message: 'Article created successfully', data: newArticle })

    } catch (error) {
        console.error(error);
        next(error);
    }

}

const getAllArticle = async (req, res, next) => {
    const { search, limit = 10, page = 1 } = req.query;

    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const skip = (pageNum - 1) * limitNum;

    let filter = {};
    if (search) {
        filter = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ]
        }
    }
    console.log('Search:', search);
    console.log('filter:', filter);


    try {
        const articles = await ArticleModel.find(filter)
            .sort({ createdAt: -1 }).limit(limitNum).skip(skip);  //fetch all articles from the database

        return res.status(200).json({
            message: 'Articles Fetched',
            page: pageNum,
            limit: limitNum,
            data: articles
        })  //return the fetched articles in the response

    } catch (error) {
        console.error(error);
        next(error)

    }
}

const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id); //fetch a single article by its ID from the database
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        return res.status(200).json({ message: 'Article found', data: article });

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const updateArticleById = async (req, res, next) => {

    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(req.params.id, { ...req.body }, {
            new: true, runValidators: true
        }); //update an existing article by its ID in the database

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not Found' });
        }
        return res.status(200).json({ message: 'Article updated successfully', data: updatedArticle });

    } catch (error) {
        console.error(error);
        next(error);

    }
}

const deleteArticleById = async (req, res, next) => {
    try {
        const deletedArticle = await ArticleModel.findByIdAndDelete(req.params.id) //delete an article by its ID from the database
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not Found' });
        }
        return res.status(200).json({ message: 'Article deleted successfully', data: deletedArticle });

    } catch (error) {
        console.error(error);
        next(error);
    }
}


module.exports = {
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById
}