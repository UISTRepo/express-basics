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
        formData: []
    });
});

router.post('/contact', function(req, res, next) {

    let formData = validateAndCreateContactFormData(req.body);

    !formData.valid ? res.status(403) : formData = {};

    // TODO: store the data in the DB

    res.render('contact', {
        title: 'Contact Us',
        currentPage: 'contact',
        formData: formData
    });
});

module.exports = router;

function validateAndCreateContactFormData(body){

    let name = body.name;
    let email = body.email;
    let question = body.question;

    let formData = {
        valid: true,
        email: {
            value: email
        },
        name: {
            value: name
        },
        question: {
            value: question
        }
    };

    let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

    if(!pattern.test(email)) {
        formData.email = {
            valid: false,
            errorMsg: 'Enter a valid email'
        };

        formData.valid = false;
    }

    if(!name || name.length < 2){
        formData.name = {
            valid: false,
            errorMsg: 'Enter a valid name'
        }

        formData.valid = false;
    }

    if(!question || question.length < 10){
        formData.question = {
            valid: false,
            errorMsg: 'Enter a valid name'
        }


        formData.valid = false;
    }

    return formData;
}

