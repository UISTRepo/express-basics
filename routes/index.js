var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

    console.log('A');

    var mysql = require('mysql');

    const config = {
        host: 'localhost',
        user: 'root',
        // port: 8889,
        password: '',
        database: 'ip_express_basics'
    }

    var connection = mysql.createConnection(config);
    let err = await connection.connect();

    if (err){
        console.log('error connecting:' + err.stack);
    }

    console.log('Y');

    connection.end();

    console.log('B');

    res.render('index', {
        title: 'Movies',
        currentPage: 'home',
        movies: []
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

