var http = require('http');
var fs = require('fs');
var db = require('./db');

var port = 3000;
var connection;

var server = http.createServer(function(request, response) {
    console.log(request.headers);
    response.writeHead(200, { 
            //200: http status code, success
        "Content-Type": "application/json",
            // if without this line, the page interpret it as plain text instead of json file
        "Access-Control-Allow-Origin": "*"
    });

    switch (request.url)
    {
        case "/":
            fs.readFile("./pages/home.html", function(err, data) {
               if (err) {
                   console.log(err);
               }

                response.end(data);
            });
            break;
        case "/portfolio": 
            fs.readFile("./pages/portfolio.html", function(err, data) {
                if (err) {
                    console.log(err);
                }
                response.end(data);
            });
            break;
    }
});

var apiServer = http.createServer(function(request, response) {
    response.writeHead(200, { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    switch (request.url)
    {
        case "/api/inventory":
            connection.query(`select * from inventory`, (err, data) => {
                response.end(JSON.stringify(data));
            });
            break;
    }
});

server.listen(port, function() {
    console.log("Yay! Our server is running on port 3000");
});

apiServer.listen(3001, function() {
    console.log("Our API Server is running");
    connection = db.login();
    connection.connect();
});

