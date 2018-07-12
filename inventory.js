var mysql = require("mysql");
var db = require("./db");
var connection = db.login();
var command = process.argv[2];

var inventoryObj = {
    productName: process.argv[3],
    description: process.argv[4],
    price: parseFloat(process.argv[5]),
    cost: parseFloat(process.argv[6])
};

connection.connect(function(err) {
    if (err) throw err;

    executeCommand(command, inventoryObj, connection, function() {
        console.log("done!");
    })
});


function executeCommand(command, inventoryObj, connection, callback) {
    switch(command) {
        case 'add': 
            connection.query(`insert into inventory (product_name, product_description, price, cost) 
            values (?, ?, ?, ?)`, [ inventoryObj.productName, inventoryObj.description, inventoryObj.price, inventoryObj.cost]);
            console.log("added!");
            break;
        case 'remove':
            connection.query(`delete from inventory where product_name = ?`, inventoryObj.productName);
            console.log("remove!");
            break;
    }; 
    callback();
    connection.end();
};

    

// function add() {
//     var command_add = ""

// }


   
//   // connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   //   if (error) throw error;
//   //   console.log('The solution is: ', results[0].solution);
//   // });
  
//   var command1 = "select * from characters";
//   connection.query(command1, function(error, results) {
//     if (error) throw error;
//     console.log(results);
//   });
   
//   connection.end();