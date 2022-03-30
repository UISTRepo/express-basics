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

        let length = movie.length;

        const hours = Math.round(length / 60);
        let minutes = (length % 60).toString();

        if(Number(minutes) < 10){
            minutes = '0' + minutes;
        }

        const fullTime = hours + ':' + minutes;

        movie.fullTime = fullTime;


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

exports.new = async function (req, res, next) {

    let formData = {};

    let actors = await moviesService.getAllActors();

    res.render('add-movie', {
        title: 'Add Movie',
        currentPage: 'home',
        formData: formData,
        actors: actors
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

        let submittedActorIds = req.body.actors;

        submittedActorIds.forEach(actor_id => {
            const input = {
                movie_id: movie.insertId,
                actor_id: Number(actor_id)
            }

            moviesService.addActorToMovie(input);

            console.log(input);
        })

        res.redirect('/movies');
    }
    else{
        let actors = await moviesService.getAllActors();

        res.render('add-movie', {
            title: 'Add Movie',
            currentPage: 'home',
            formData,
            actors
        })
    }

}

function validateAndCreateMovieFormData(body){

    let title = body.title;
    let actors = body.actors;
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

    if(!actors || !actors.length){
        formData.actors = {
            value: actors,
            valid: false,
            errorMsg: 'Check at least one actor'
        }

        formData.valid = false;
    }

    return formData;
}

exports.update = async function (req, res, next) {


}

exports.destroy = async function (req, res, next) {

    let id = req.params.id;

    moviesService.deleteById(id);
    moviesService.cleanUp(id);

    res.redirect('/');

}




















