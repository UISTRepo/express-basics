var express = require('express');
var router = express.Router();

var moviesService = require('../services/movies');

router.get('/', async function(req, res, next) {

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

});

router.get('/:id', async function(req, res, next) {

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

});

module.exports = router;
