var mysqlConfig = require('../connections/mysql');
var connection = mysqlConfig.connection;

getAll = () =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM movies ',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

getById = (id) =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM movies WHERE id = ' + id,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements[0]);
        });
    });
};

getActorIds = (movie_id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT actor_id as id FROM actors_movies WHERE movie_id = ' + movie_id,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

getActorById = (id) =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM actors WHERE id = ' + id,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements[0]);
        });
    });
};

storeNew = (input) =>{
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO movies (title, length) VALUES ('" + input.title + "', " + input.length + ")";

        connection.query(sql,  (error, movie)=>{
            if(error){
                return reject(error);
            }
            return resolve(movie);
        });
    });
};

getAllActors = () =>{
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM actors ',  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

addActorToMovie = (input) =>{
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO actors_movies (actor_id, movie_id) VALUES (" + input.actor_id + ", " + input.movie_id + ")";

        connection.query(sql,  (error, movie)=>{
            if(error){
                return reject(error);
            }
            return resolve(movie);
        });
    });
};

deleteById = (id) =>{
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM movies WHERE id = " + id;

        connection.query(sql, (error, movie)=> {
            if(error){
                return reject(error);
            }
            return resolve(movie);
        });
    });
};

cleanUp = (id) =>{
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM actors_movies WHERE movie_id = " + id;

        connection.query(sql,  (error, movie)=>{
            if(error){
                return reject(error);
            }
            return resolve(movie);
        });
    });
};

module.exports = {
    getAll,
    getById,
    getActorIds,
    getActorById,
    storeNew,
    getAllActors,
    addActorToMovie,
    deleteById,
    cleanUp
}
