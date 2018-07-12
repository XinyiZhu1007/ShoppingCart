var mysql = require("mysql");

function login() {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'Jun25-shoppingCartExercise',
        // socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
        port : 3306,
        multipleStatements  : true
    });
    // connection.connect() to connect
    return connection;
}

module.exports = {
    login: login
}

// can also export functions
// module.exports = login();