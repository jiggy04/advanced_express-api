// Article controller to handle CRUD operations for articles

const mongoose = require ('mongoose')
const ArticleModel = require('../models/article.model')  //import the Article model to interact with the articles collection in the database

//Create validation rules
const postArticle = async (req, res, next) => {
    try {

        const {title, content} = req.body

        const newArticle = await ArticleModel.create({
            title,
            content,
            author: req.user._id
        })  //create a new article instance using the validated data

        return res.status(201).json({ message: 'Article created successfully', data: newArticle })

    } catch (error) {
        console.error(error);
        next(error);
    }

}

const getAllArticle = async (req, res, next) => {
    try {
        const { search = '', limit = 10, page = 1 } = req.query;

    const pageNum = Math.max(parseInt(page,10) ||1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const filter = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ]
        }
        :{}
        const total = await articleModel.countDocuments(filter);


        const articles = await ArticleModel.find(filter)
        .populate('author', 'name email')
        .sort({ createdAt: -1 }).skip(skip).limit(limitNum);  //fetch all articles from the database

    return res.status(200).json({
        success: true,
        message: 'Articles Fetched',
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total/limitNum),
        data: articles
    }) 



    }catch (error) {
        console.error(error);
        next(error)
    }
}    


const getArticleById = async (req, res, next) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: true,
                message: 'Invalid article ID'

            });

        }


        const article = await ArticleModel.findById(id)
        .populate('author', 'name email');  //  
        
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        return res.status(200).json({ success: true, message: 'Article found', data: article });

    } catch (error) {
        console.error(error);
        next(error)
    }
}

const updateArticleById = async (req, res, next) => {

    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: true,
                message: 'Invalid article ID'

            });

        }

        const updatedArticle = await ArticleModel.findById(id); 

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not Found' });
        }

        // only the owner can update
        if (updatedArticle.author.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this article'
            });
        }

        const {title, content} = req.body

        if (title !== undefined) updatedArticle.title = title;
        if (content !== undefined) article.content = content;

        await article.save();


        return res.status(200).json({ 
            success: true, 
            message: 'Article updated successfully', 
            data: updatedArticle });

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