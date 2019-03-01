
// get values stored

var storedOrdersFactory = localStorage.getItem("list_orders_factory");
if (storedOrdersFactory) {
    ArrayStoredOrdersFactory = JSON.parse(storedOrdersFactory);
}

var storedInventoryFactory= localStorage.getItem("list_inventory_factory");
if (storedInventoryFactory) {
    ArrayStoredInventoryFactory = JSON.parse(storedInventoryFactory);
}

var storedBackorderFactory = localStorage.getItem("list_backorder_factory");
if (storedBackorderFactory) {
    ArrayStoredBackorderFactory = JSON.parse(storedBackorderFactory);
}

//var rounds=[];

//Static content ---------------------------------------------------------
document.write('<h1 align="left">Factory</h1></br>');
document.write("<table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Inventory</th><th>Backorder</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= ArrayStoredOrdersFactory.length-1; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersFactory[r] + "</td><td>" + ArrayStoredInventoryFactory[r] +"</td><td>" + ArrayStoredBackorderFactory[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table><br>")
