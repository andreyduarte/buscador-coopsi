const db = require('../backend/db_interface') 

// Retornar todos
exports.getAll = async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: await db.select('author')
    });
};

// Retornar um
exports.getOne = async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: await db.where('author','id',req.params.slug)
    });
};