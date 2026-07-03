// Article routes to handle CRUD operations for articles

const express = require('express');
const router = express.Router();
const {createArticleValidation, updateArticleValidation} = require('../validation/post.validation')

const {postArticle, getAllArticle, getArticleById, updateArticleById, deleteArticleById} = require('../controllers/article.controller');
const requireAuth = require('../middlewares/requireAuth');
const isOwner = require ('../middlewares/owner.auth');

router.use(requireAuth)

router.post('/articles', createArticleValidation, postArticle)

router.get('/articles', getAllArticle)

router.get('/articles/:id', getArticleById)

router.put('/articles/:id', updateArticleValidation, isOwner, updateArticleById)
router.delete('/articles/:id', isOwner, deleteArticleById)


module.exports = router;