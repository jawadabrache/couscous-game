
// get values stored
var storedOrdersRetailer = localStorage.getItem("list_orders_retailer");
if (storedOrdersRetailer) {
    ArrayStoredOrdersRetailer= JSON.parse(storedOrdersRetailer);
}

var storedInventoryRetailer = localStorage.getItem("list_inventory_retailer");
if (storedInventoryRetailer) {
    ArrayStoredInventoryRetailer = JSON.parse(storedInventoryRetailer);
}

var storedBackorderRetailer = localStorage.getItem("list_backorder_retailer");
if (storedBackorderRetailer) {
    ArrayStoredBackorderRetailer = JSON.parse(storedBackorderRetailer);
}


//var rounds=[];

//Static content ---------------------------------------------------------
document.write('<h1 align="left">Retailer</h1></br>');
document.write("<table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Inventory</th><th>Backorder</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= ArrayStoredOrdersRetailer.length-1; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersRetailer[r] + "</td><td>" + ArrayStoredInventoryRetailer[r] +"</td><td>" + ArrayStoredBackorderRetailer[r] +"</td></tr>");
}
