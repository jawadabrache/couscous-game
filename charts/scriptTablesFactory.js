
// get values stored

var nbr_rounds = localStorage.getItem("number_rounds");
if (nbr_rounds) {
    nrounds = JSON.parse(nbr_rounds);
}

var storedOrdersFactory = localStorage.getItem("list_orders_factory");
if (storedOrdersFactory) {
    ArrayStoredOrdersFactory = JSON.parse(storedOrdersFactory);
}

var storedInventoryFactory= localStorage.getItem("list_inventory_factory");
if (storedInventoryFactory) {
    ArrayStoredInventoryFactory = JSON.parse(storedInventoryFactory);
}

var storedCostInventoryFactory = localStorage.getItem("list_cost_inventory_factory");
if (storedCostInventoryFactory) {
    ArrayStoredCostInventoryFactory = JSON.parse(storedCostInventoryFactory);
}

var storedCumcostInventoryFactory = localStorage.getItem("list_cumcost_inventory_factory");
if (storedCumcostInventoryFactory) {
    ArrayStoredCumcostInventoryFactory = JSON.parse(storedCumcostInventoryFactory);
}

var storedBackorderFactory = localStorage.getItem("list_backorder_factory");
if (storedBackorderFactory) {
    ArrayStoredBackorderFactory = JSON.parse(storedBackorderFactory);
}

var storedCostBackorderFactory = localStorage.getItem("list_cost_backorder_factory");
if (storedCostBackorderFactory) {
    ArrayStoredCostBackorderFactory = JSON.parse(storedCostBackorderFactory);
}

var storedCumcostBackorderFactory = localStorage.getItem("list_cumcost_backorder_factory");
if (storedCumcostBackorderFactory) {
    ArrayStoredCumcostBackorderFactory = JSON.parse(storedCumcostBackorderFactory);
}

var storedCostOrderingFactory = localStorage.getItem("list_cost_ordering_factory");
if (storedCostOrderingFactory) {
    ArrayStoredCostOrderingFactory = JSON.parse(storedCostOrderingFactory);
}

var storedCumcostOrderingFactory = localStorage.getItem("list_cumcost_ordering_factory");
if (storedCumcostOrderingFactory) {
    ArrayStoredCumcostOrderingFactory = JSON.parse(storedCumcostOrderingFactory);
}

//var rounds=[];

//Static content ---------------------------------------------------------
document.write('<h1 align="left">Factory</h1></br>');
document.write("<font face='Times' size='2'><table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Cost Ordering</th><th>Cum. Cost Ordering</th><th>O.H. Inventory</th><th>Cost O.H. Inv.</th><th>Cum. Cost O.H. Inv.</th><th>Backorder</th><th>Cost B.O.</th><th>Cum. Cost B.O.</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= nrounds; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersFactory[r] + "</td><td>" + ArrayStoredCostOrderingFactory[r] + "</td><td>" + ArrayStoredCumcostOrderingFactory[r] + "</td><td>" + ArrayStoredInventoryFactory[r] + "</td><td>" + ArrayStoredCostInventoryFactory[r] + "</td><td>" + ArrayStoredCumcostInventoryFactory[r] + "</td><td>" + ArrayStoredBackorderFactory[r] + "</td><td>" + ArrayStoredCostBackorderFactory[r] + "</td><td>" + ArrayStoredCumcostBackorderFactory[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table></font><br>")