var mysql = require('mysql');

const config = {
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'ip_express_basics'
}

module.exports = {
    connection: mysql.createConnection(config)
}
