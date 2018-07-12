var http = require('http');
var fs = require('fs');
var db = require('./db');
var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
// express require absolute paths, path package resolves relative path to absolute paths
// otherwise error: path must be absolute or specify root to res.sendFile
var handlebars = require('express-handlebars');

var port = 3000;
var connection;
var invList;

var app = express();
//can do : var app = require("express")()

// create a view engine so handlebar is available 
app.engine('handlebars', handlebars({ 
    defaultLayout: 'main',
    helpers: {
        foo: function(funcParam) {
            if(funcParam === "param1") {
                return "this is a cool parameter";
            } 

            return "this is not a cool parameter";  
        }
    },
    list: "list"

 }));
app.set('view engine', 'handlebars');

app.use(cors());
// parse data as json data
app.use(bodyParser.json());

app.get('/', function(request, response) {
    // utilizing handlebars the view engine
    response.render("home", {
        title: "awesome title",
        subheading: "so awesome if condition = true!",
        subtext: "some awesome text",
        condition: false,
        tempArray: [
            "one",
            "two",
            "three"
        ]
    });
    // response.sendFile(path.resolve('./pages/home.html'));
});

app.post('/', function(request, response) {
    response.send(request.body);
})

app.put('/', (req, res) => {
    res.send('from a put request');
})


///////////////////////////////////
/////shopping cart page ///////////
///////////////////////////////////



app.get("/api/inventory", (req, res) => {
    connection.query(`select * from inventory`, (err, data) => {
        if (err) {
            throw err;
        }
        res.json(data);
    });
});

app.get("/inventory", (req, res) => {
    connection.query(`select * from inventory`, (err, data) => {
        if (err) {
            throw err;
        }

        ///////     ////////        ///////////////
        //methods of choice to do the same thing///
        ///////     ////////        ///////////////

        // var tempArray = [];

        // data.forEach(x => {
        //     tempArray.push(x.product_name);
        // });

        // var temArray = data.map(x => {
        //     return x.product_name;
        // });

        res.render("inventory", {
            javascriptSources: [
                "https://code.jquery.com/jquery-3.3.1.min.js"
            ],
            inventory: data
        });
    });


})

app.post("/api/inventory", (req, res) => {
    connection.query(`insert into inventory (product_name, product_description, price, cost) values (?, ?, ?, ?)`, 
                    [req.body.name, req.body.description, req.body.price, req.body.cost], 
                    // in reality, should also validate user input data before post
                    (err, data) => {
                        if (err) {
                            res.send("cannot write to db");
                            throw err;
                        }
                        res.send("successfully wrote to db");
                    }
    );
});

app.put("/api/inventory/:id", (req, res) => {
    // :id to specify the id of the location that is to be updated
    // :id to pass argument
    // query parameters - another type is "?" in the api url: http://api.com/movies?title=foo&
    var body = req.body;
    connection.query(`update inventory set product_name = ? where id = ?`,
                    [body.name, req.params.id], function(err, data) {
                        if(err) {
                            res.send(`cannot update ${req.params.id}`);
                            throw err;
                        }
                        res.send(`successfully updated ${req.params.id}`);
                    });
});

app.delete("/api/inventory/:id", (req, res) => {
    connection.query(`delete from inventory where id = ?`,
                    [req.params.id], function(err, data) {
                        if(err) {
                            res.json({"secceeded": false});
                            throw err;
                        };
                        res.json({"secceeded": true});
                    });
})

app.listen(port, function() {
    connection = db.login();
    connection.connect();
    console.log(`connection on port: ${port}`);
})

