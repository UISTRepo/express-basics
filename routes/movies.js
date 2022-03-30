var express = require('express');
var router = express.Router();

var moviesController = require('../controllers/movies-controller');

router.get('/', moviesController.index);
router.get('/:id', moviesController.show);
router.get('/movie/new', moviesController.new);
router.post('/', moviesController.store);

router.post('/deleteMovie/:id', moviesController.destroy);

module.exports = router;
