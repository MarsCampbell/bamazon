var mysql = require("mysql");
var inquirer = require("inquirer");

var con = mysql.createConnection({
	host: "localhost",
	port: 3307,
	user: "root",
	password: "root",
	database: "bamazon"  
});

function run() {
    inquirer.prompt([{
        name: "itemID",
        type: "input",
        message: "What is the ID of the product you would like to buy?"
    },
    {
        type: "input",
        message: "How many units of the product would you like to buy?",
        name: "buyQuantity"
    }]).then(function (response) {   
        if (typeof parseInt(response.itemID) === "number" && typeof parseInt(response.buyQuantity) === "number") {
            con.query("SELECT item_id, 'product', price, quantity, product_sales FROM products WHERE item_id =?", [response.itemID], function (err, res) {
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
                        console.log("Insuficient Quantity!");
                        run();                        
                    }
                } else {
                    console.log("Item not found!");
                    run();
                }
            });
        } else {
            console.log("Numbers Expected!");
            run();
        }
    })
}
run();