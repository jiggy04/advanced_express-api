const articleModel = require('../models/article.model');

const isOwner = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({message: 'Article not found'});
        }
        if (article.author.toString() !== req.user.userId) {
            return res.status(403).json({message: 'Access denied'});
        }

        req.article = article
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = isOwner