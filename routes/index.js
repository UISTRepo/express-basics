var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    let movies = [
        {
            id: 1,
            title: 'Movie 1',
            actor: 'Actor 1',
            time: 'Time 1'
        },
        {
            id: 2,
            title: 'Movie 2',
            actor: 'Actor 2',
            time: 'Time 2'
        },
        {
            id: 3,
            title: 'Movie 3',
            actor: 'Actor 3',
            time: 'Time 3'
        }
    ];

    res.render('index', {
        title: 'Movies',
        currentPage: 'home',
        movies: movies
    });
});

router.get('/about', function(req, res, next) {
    res.render('about', {
        title: 'About Us',
        currentPage: 'about'
    });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', {
        title: 'Contact Us',
        currentPage: 'contact',
        formData: {}
    });
});

router.post('/contact', function(req, res, next) {

    let name = req.body.name;
    let email = req.body.email;
    let question = req.body.question;

    // email is not validated

    if(!name || name.length < 6){
        res.status(403);

        res.render('contact', {
            title: 'Contact Us',
            currentPage: 'contact',
            formData: {
                name: {
                    valid: false,
                    value: name,
                    error: 'Enter a valid name'
                }
            }
        });
    }

    // the Q is not validated

    // TODO: store the data in the DB

    res.render('contact', {
        title: 'Contact Us',
        currentPage: 'contact',
        formData: {
            submitted: true
        },
    });
});

module.exports = router;
