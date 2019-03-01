
// get values stored

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

//var rounds=[];

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
