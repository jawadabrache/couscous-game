
// get values stored

var nbr_rounds = localStorage.getItem("number_rounds");
if (nbr_rounds) {
    nrounds = JSON.parse(nbr_rounds);
}

var storedOrdersDC = localStorage.getItem("list_orders_DC");
if (storedOrdersDC) {
    ArrayStoredOrdersDC = JSON.parse(storedOrdersDC);
}

var storedInventoryDC= localStorage.getItem("list_inventory_DC");
if (storedInventoryDC) {
    ArrayStoredInventoryDC = JSON.parse(storedInventoryDC);
}

var storedCostInventoryDC = localStorage.getItem("list_cost_inventory_DC");
if (storedCostInventoryDC) {
    ArrayStoredCostInventoryDC = JSON.parse(storedCostInventoryDC);
}

var storedCumcostInventoryDC = localStorage.getItem("list_cumcost_inventory_DC");
if (storedCumcostInventoryDC) {
    ArrayStoredCumcostInventoryDC = JSON.parse(storedCumcostInventoryDC);
}

var storedBackorderDC = localStorage.getItem("list_backorder_DC");
if (storedBackorderDC) {
    ArrayStoredBackorderDC = JSON.parse(storedBackorderDC);
}

var storedCostBackorderDC = localStorage.getItem("list_cost_backorder_DC");
if (storedCostBackorderDC) {
    ArrayStoredCostBackorderDC = JSON.parse(storedCostBackorderDC);
}

var storedCumcostBackorderDC = localStorage.getItem("list_cumcost_backorder_DC");
if (storedCumcostBackorderDC) {
    ArrayStoredCumcostBackorderDC = JSON.parse(storedCumcostBackorderDC);
}

//var rounds=[];

//Static content ---------------------------------------------------------
document.write('<h1 align="left">DC</h1></br>');
document.write("<table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Inventory</th><th>Cost Inv.</th><th>Cum. Cost Inv.</th><th>Backorder</th><th>Cost B.O.</th><th>Cum. Cost B.O.</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= nrounds; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersDC[r] + "</td><td>" + ArrayStoredInventoryDC[r] + "</td><td>" + ArrayStoredCostInventoryDC[r] + "</td><td>" + ArrayStoredCumcostInventoryDC[r] + "</td><td>" + ArrayStoredBackorderDC[r] + "</td><td>" + ArrayStoredCostBackorderDC[r] + "</td><td>" + ArrayStoredCumcostBackorderDC[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table><br>")
