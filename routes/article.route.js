const express = require('express');
const router = express.Router();

const {postArticle, getAllArticle, getArticleById, updateArticleById, deleteArticleById} = require('../controllers/article.controller');
const requireAuth = require('../middlewares/requireAuth');
const isOwner = require ('../middlewares/owner.auth');


router.post('/articles', requireAuth, postArticle)

router.get('/articles', requireAuth, getAllArticle)

router.get('/articles/:id', requireAuth, getArticleById)

router.put('/articles/:id', requireAuth, isOwner, updateArticleById)
router.delete('/articles/:id', requireAuth, isOwner, deleteArticleById)


module.exports = router;