// get values stored

var nbr_rounds = localStorage.getItem("number_rounds");
if (nbr_rounds) {
    nrounds = JSON.parse(nbr_rounds);
}

var storedOrdersRetailer = localStorage.getItem("list_orders_retailer");
if (storedOrdersRetailer) {
    ArrayStoredOrdersRetailer= JSON.parse(storedOrdersRetailer);
}

var storedInventoryRetailer = localStorage.getItem("list_inventory_retailer");
if (storedInventoryRetailer) {
    ArrayStoredInventoryRetailer = JSON.parse(storedInventoryRetailer);
}

var storedCostInventoryRetailer = localStorage.getItem("list_cost_inventory_retailer");
if (storedCostInventoryRetailer) {
    ArrayStoredCostInventoryRetailer = JSON.parse(storedCostInventoryRetailer);
}

var storedCumcostInventoryRetailer = localStorage.getItem("list_cumcost_inventory_retailer");
if (storedCumcostInventoryRetailer) {
    ArrayStoredCumcostInventoryRetailer = JSON.parse(storedCumcostInventoryRetailer);
}

var storedBackorderRetailer = localStorage.getItem("list_backorder_retailer");
if (storedBackorderRetailer) {
    ArrayStoredBackorderRetailer = JSON.parse(storedBackorderRetailer);
}

var storedCostBackorderRetailer = localStorage.getItem("list_cost_backorder_retailer");
if (storedCostBackorderRetailer) {
    ArrayStoredCostBackorderRetailer = JSON.parse(storedCostBackorderRetailer);
}

var storedCumcostBackorderRetailer = localStorage.getItem("list_cumcost_backorder_retailer");
if (storedCumcostBackorderRetailer) {
    ArrayStoredCumcostBackorderRetailer = JSON.parse(storedCumcostBackorderRetailer);
}

var storedCostOrderingRetailer = localStorage.getItem("list_cost_ordering_retailer");
if (storedCostOrderingRetailer) {
    ArrayStoredCostOrderingRetailer = JSON.parse(storedCostOrderingRetailer);
}

var storedCumcostOrderingRetailer = localStorage.getItem("list_cumcost_ordering_retailer");
if (storedCumcostOrderingRetailer) {
    ArrayStoredCumcostOrderingRetailer = JSON.parse(storedCumcostOrderingRetailer);
}


//var rounds=[];

//Static content ---------------------------------------------------------
document.write('<h1 align="left">Retailer</h1></br>');
document.write("<font face='Times' size='2'><table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Cost Ordering</th><th>Cum. Cost Ordering</th><th>O.H. Inventory</th><th>Cost O.H. Inv.</th><th>Cum. Cost O.H. Inv.</th><th>Backorder</th><th>Cost B.O.</th><th>Cum. Cost B.O.</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= nrounds; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersRetailer[r] + "</td><td>" + ArrayStoredCostOrderingRetailer[r] + "</td><td>" + ArrayStoredCumcostOrderingRetailer[r] +"</td><td>" + ArrayStoredInventoryRetailer[r] + "</td><td>" + ArrayStoredCostInventoryRetailer[r] + "</td><td>" + ArrayStoredCumcostInventoryRetailer[r] + "</td><td>" + ArrayStoredBackorderRetailer[r] + "</td><td>" + ArrayStoredCostBackorderRetailer[r] + "</td><td>" + ArrayStoredCumcostBackorderRetailer[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table></font><br>")
