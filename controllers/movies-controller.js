const moviesService = require("../services/movies-service");

exports.index = async function(req, res, next) {

    try{
        let movies = await moviesService.getAll();

        res.render('movies', {
            title: 'Movies',
            currentPage: 'home',
            movies: movies
        });

    }
    catch (e){
        console.log(e);
    }

}

exports.show = async function(req, res, next) {

    try{
        let id = req.params.id;

        id = id.replace( /[^\d].*/, '' );

        id = Number(id);

        if(typeof id != 'number'){
            // throw error
        }

        let movie = await moviesService.getById(id);

        if(!movie){
            res.status(404);

            res.render('movie', {
                title: 'Movies',
                currentPage: 'home',
                movie: {
                    title: 'Movie not found'
                },
                valid: false
            });

        }

        let actors = [];

        let movieActorsIds = await moviesService.getActorIds(movie.id);

        for(const item of movieActorsIds){
            const actor = await moviesService.getActorById(item.id);

            if(actor){
                actors.push(actor);
            }

        }

        movie.actors = actors;

        res.render('movie', {
            title: 'Movies',
            currentPage: 'home',
            movie
        });

    }
    catch (e){
        console.log(e);
    }

}

exports.new = function (req, res, next) {

    let formData = {};

    res.render('add-movie', {
        title: 'Add Movie',
        currentPage: 'home',
        formData: formData
    })
}

exports.store = async function (req, res, next) {

    let formData = validateAndCreateMovieFormData(req.body);

    if(formData.valid){

        let input = {
            title: formData.title.value,
            length: formData.length.value
        };

        let movie = await moviesService.storeNew(input);

        console.log(movie);

        // todo: store the actor ids in the actors_movies table
    }

    res.render('add-movie', {
        title: 'Add Movie',
        currentPage: 'home',
        formData: formData
    })

}

function validateAndCreateMovieFormData(body){

    let title = body.title;
    let actorIds = body.actorIds;
    let length = body.length;

    let formData = {
        valid: true,
        title: {
            value: title
        },
        length: {
            value: length
        }
    };

    if(!title || title.length < 5){
        formData.title = {
            value: title,
            valid: false,
            errorMsg: 'Enter a valid title'
        }

        formData.valid = false;
    }

    if(!length || Number(length) < 0){
        formData.length = {
            value: length,
            valid: false,
            errorMsg: 'Enter a valid number'
        }

        formData.valid = false;
    }

    return formData;
}

exports.update = async function (req, res, next) {


}



















