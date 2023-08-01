const express = require('express');
const newsController = require('./../controllers/newsController');

const router = express.Router();

router
    .route('/noticias')
    .get(newsController.getFront);
router
    .route('/noticias/:slug')
    .get(newsController.getView);
router
    .route('/api/noticias')
    .get(newsController.getAll);
router
    .route('/api/noticia/:slug')
    .get(newsController.getOne);
router
    .route('/api/addNoticia')
    .get(newsController.postOne);
    
module.exports = router;