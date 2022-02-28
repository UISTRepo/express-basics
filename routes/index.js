var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Movies',
        name: 'Naum'
    });
});

router.get('/:id', function(req, res, next) {
    res.json({
        id: 1,
        name: "Mike"
    });
});

module.exports = router;
