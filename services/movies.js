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

module.exports = {
    getAll,
    getById,
    getActorIds,
    getActorById,
}
