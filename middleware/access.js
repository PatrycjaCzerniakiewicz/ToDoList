const {Board, validate, validateUpdate} = require('../models/board');

module.exports = function (req,res,next) {
    if(req.baseUrl === '/api/boards') Board.findById(req.params.id).then( (board) => {
        if( board.admin !== req.user.email) return res.status(403).send('Access denied !');
        return next();
    }).catch(err => console.log(err));
    else next();
}