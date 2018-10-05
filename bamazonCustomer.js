var mysql = require("mysql");
var inquirer = require("inquirer");

var con = mysql.createConnection({
	host: "localhost",
	port: 3307,
	user: "root",
	password: "root",
	database: "bamazon"  
});

connection.connect(function(error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
  });

function run() {
    inquirer.prompt([{
        name: "itemID",
        type: "input",
        message: "Whats the ID of the product you want to like to buy?"
    },
    {
        type: "input",
        message: "How many units would you like to buy?",
        name: "buyQuantity"
    }]).then(function (response) {   
        
        if (typeof parseInt(response.itemID) === "number" && typeof parseInt(response.buyQuantity) === "number") {
            con.query("SELECT item_id, 'product', price, stock_quantity, product_sales FROM products WHERE item_id =?", [response.itemID], function (err, res) {
                if (err) throw err;
                if (!(res.length < 1)) {                
                    if (!(res[0].quantity < parseInt(response.buyQuantity))) {
                        var total = parseFloat(response.buyQuantity * res[0].price);                      
                        console.log("\nTotal price: $" + total + "\n");                   
                        con.query("UPDATE products SET quantity=? WHERE item_id=?", [res[0].quantity - parseInt(response.buyQuantity), res[0].item_id], function (innerErr, res) {
                            if (innerErr) throw innerErr;
                                con.query("SELECT * FROM products", function (err, result, fields) {
                                    if (err) throw err;
                                    console.log(result);
                                    });
                            con.end();
                        });
                    } else {
                        console.log("Theres none of that item left!");
                        run();                        
                    }
                } else {
                    console.log("We don't seem to have that guitar in stock!");
                    run();
                }
            });
        } else {
            console.log("A number was expected!");
            run();
        }
    })
}
run();
