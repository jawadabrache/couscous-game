
// get values stored

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

