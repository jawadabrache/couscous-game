
// get values stored

var nbr_rounds = localStorage.getItem("number_rounds");
if (nbr_rounds) {
    nrounds = JSON.parse(nbr_rounds);
}


// Retailer

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


// Warehouse

var storedOrdersWarehouse = localStorage.getItem("list_orders_warehouse");
if (storedOrdersWarehouse) {
    ArrayStoredOrdersWarehouse = JSON.parse(storedOrdersWarehouse);
}

var storedInventoryWarehouse = localStorage.getItem("list_inventory_warehouse");
if (storedInventoryWarehouse) {
    ArrayStoredInventoryWarehouse = JSON.parse(storedInventoryWarehouse);
}

var storedCostInventoryWarehouse = localStorage.getItem("list_cost_inventory_warehouse");
if (storedCostInventoryWarehouse) {
    ArrayStoredCostInventoryWarehouse = JSON.parse(storedCostInventoryWarehouse);
}

var storedCumcostInventoryWarehouse = localStorage.getItem("list_cumcost_inventory_warehouse");
if (storedCumcostInventoryWarehouse) {
    ArrayStoredCumcostInventoryWarehouse = JSON.parse(storedCumcostInventoryWarehouse);
}

var storedBackorderWarehouse = localStorage.getItem("list_backorder_warehouse");
if (storedBackorderWarehouse) {
    ArrayStoredBackorderWarehouse = JSON.parse(storedBackorderWarehouse);
}

var storedCostBackorderWarehouse = localStorage.getItem("list_cost_backorder_warehouse");
if (storedCostBackorderWarehouse) {
    ArrayStoredCostBackorderWarehouse = JSON.parse(storedCostBackorderWarehouse);
}

var storedCumcostBackorderWarehouse = localStorage.getItem("list_cumcost_backorder_warehouse");
if (storedCumcostBackorderWarehouse) {
    ArrayStoredCumcostBackorderWarehouse = JSON.parse(storedCumcostBackorderWarehouse);
}

var storedCostOrderingWarehouse = localStorage.getItem("list_cost_ordering_warehouse");
if (storedCostOrderingWarehouse) {
    ArrayStoredCostOrderingWarehouse = JSON.parse(storedCostOrderingWarehouse);
}

var storedCumcostOrderingWarehouse = localStorage.getItem("list_cumcost_ordering_warehouse");
if (storedCumcostOrderingWarehouse) {
    ArrayStoredCumcostOrderingWarehouse = JSON.parse(storedCumcostOrderingWarehouse);
}

// DC 

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

var storedCostOrderingDC = localStorage.getItem("list_cost_ordering_DC");
if (storedCostOrderingDC) {
    ArrayStoredCostOrderingDC = JSON.parse(storedCostOrderingDC);
}

var storedCumcostOrderingDC = localStorage.getItem("list_cumcost_ordering_DC");
if (storedCumcostOrderingDC) {
    ArrayStoredCumcostOrderingDC = JSON.parse(storedCumcostOrderingDC);
}


// Factory 

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

//Static content ---------------------------------------------------------
document.write('<h1 align="left">Warehouse</h1></br>');
document.write("<font face='Times' size='2'><table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Cost Ordering</th><th>Cum. Cost Ordering</th><th>O.H. Inventory</th><th>Cost O.H. Inv.</th><th>Cum. Cost O.H. Inv.</th><th>Backorder</th><th>Cost B.O.</th><th>Cum. Cost B.O.</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= nrounds; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersWarehouse[r] + "</td><td>" + ArrayStoredCostOrderingWarehouse[r] + "</td><td>" + ArrayStoredCumcostOrderingWarehouse[r] +"</td><td>" + ArrayStoredInventoryWarehouse[r] + "</td><td>" + ArrayStoredCostInventoryWarehouse[r] + "</td><td>" + ArrayStoredCumcostInventoryWarehouse[r] + "</td><td>" + ArrayStoredBackorderWarehouse[r] + "</td><td>" + ArrayStoredCostBackorderWarehouse[r] + "</td><td>" + ArrayStoredCumcostBackorderWarehouse[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table></font><br>")

//Static content ---------------------------------------------------------
document.write('<h1 align="left">DC</h1></br>');
document.write("<font face='Times' size='2'><table border='1' width='1000'>")
document.write("<tr><th>Round #</th><th>Order made</th><th>Cost Ordering</th><th>Cum. Cost Ordering</th><th>O.H. Inventory</th><th>Cost O.H. Inv.</th><th>Cum. Cost O.H. Inv.</th><th>Backorder</th><th>Cost B.O.</th><th>Cum. Cost B.O.</th></tr>");
//Dynamic content --------------------------------------------------------
for(var r = 0; r <= nrounds; r++)
{
	document.write("<tr><td>" + r + "</td><td>" + ArrayStoredOrdersDC[r] + "</td><td>" + ArrayStoredCostOrderingDC[r] + "</td><td>" + ArrayStoredCumcostOrderingDC[r] + "</td><td>" + ArrayStoredInventoryDC[r] + "</td><td>" + ArrayStoredCostInventoryDC[r] + "</td><td>" + ArrayStoredCumcostInventoryDC[r] + "</td><td>" + ArrayStoredBackorderDC[r] + "</td><td>" + ArrayStoredCostBackorderDC[r] + "</td><td>" + ArrayStoredCumcostBackorderDC[r] +"</td></tr>");
}
//Static content  --------------------------------------------------------
document.write("</table></font><br>")

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
