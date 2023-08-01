const express = require('express');
const authorController = require('./../controllers/authorController');

const router = express.Router();

router
    .route('/api/autor')
    .get(authorController.getAll);
router
    .route('/api/autor/:id')
    .get(authorController.getOne);
    
module.exports = router;