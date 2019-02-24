
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

var storedOrdersWarehouse = localStorage.getItem("list_orders_warehouse");
if (storedOrdersWarehouse) {
    ArrayStoredOrdersWarehouse = JSON.parse(storedOrdersWarehouse);
}

var storedInventoryWarehouse = localStorage.getItem("list_inventory_warehouse");
if (storedInventoryWarehouse) {
    ArrayStoredInventoryWarehouse = JSON.parse(storedInventoryWarehouse);
}

var storedBackorderWarehouse = localStorage.getItem("list_backorder_warehouse");
if (storedBackorderWarehouse) {
    ArrayStoredBackorderWarehouse = JSON.parse(storedBackorderWarehouse);
}

var storedOrdersDC = localStorage.getItem("list_orders_DC");
if (storedOrdersDC) {
    ArrayStoredOrdersDC = JSON.parse(storedOrdersDC);
}

var storedInventoryDC= localStorage.getItem("list_inventory_DC");
if (storedInventoryDC) {
    ArrayStoredInventoryDC = JSON.parse(storedInventoryDC);
}

var storedBackorderDC = localStorage.getItem("list_backorder_DC");
if (storedBackorderDC) {
    ArrayStoredBackorderDC = JSON.parse(storedBackorderDC);
}

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
document.write('<h1 align="left">Retailer</h1></br>');
document.write("<table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Inventory</th><th>Backorder</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= ArrayStoredOrdersRetailer.length-1; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersRetailer[r] + "</td><td>" + ArrayStoredInventoryRetailer[r] +"</td><td>" + ArrayStoredBackorderRetailer[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table><br>")

//Static content ---------------------------------------------------------
document.write('<h1 align="left">Warehouse</h1></br>');
document.write("<table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Inventory</th><th>Backorder</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= ArrayStoredOrdersWarehouse.length-1; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersWarehouse[r] + "</td><td>" + ArrayStoredInventoryWarehouse[r] +"</td><td>" + ArrayStoredBackorderWarehouse[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table><br>")

//Static content ---------------------------------------------------------
document.write('<h1 align="left">DC</h1></br>');
document.write("<table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Inventory</th><th>Backorder</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= ArrayStoredOrdersDC.length-1; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersDC[r] + "</td><td>" + ArrayStoredInventoryDC[r] +"</td><td>" + ArrayStoredBackorderDC[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table><br>")

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
