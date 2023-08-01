const express = require('express');
const imgController = require('../controllers/imgController');

const router = express.Router();

router
    .route('/api/imagem/:path')
    .get(imgController.getOne);
    
module.exports = router;