
// get values stored

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

//var rounds=[];

//Static content ---------------------------------------------------------
document.write('<h1 align="left">Factory</h1></br>');
document.write("<table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Inventory</th><th>Cost Inv.</th><th>Cum. Cost Inv.</th><th>Backorder</th><th>Cost B.O.</th><th>Cum. Cost B.O.</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= ArrayStoredOrdersFactory.length-1; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersFactory[r] + "</td><td>" + ArrayStoredInventoryFactory[r] + "</td><td>" + ArrayStoredCostInventoryFactory[r] + "</td><td>" + ArrayStoredCumcostInventoryFactory[r] + "</td><td>" + ArrayStoredBackorderFactory[r] + "</td><td>" + ArrayStoredCostBackorderFactory[r] + "</td><td>" + ArrayStoredCumcostBackorderFactory[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table><br>")
