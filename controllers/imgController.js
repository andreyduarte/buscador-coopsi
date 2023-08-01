const db = require('../backend/db_interface') 
const path = require('path');
const config = require('../config')

// Retornar um
exports.getOne = async (req, res) => {
    res.sendFile(path.join(config.initial_path, "/imgs/", req.params.path))
};