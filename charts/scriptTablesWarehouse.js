
// get values stored

var nbr_rounds = localStorage.getItem("number_rounds");
if (nbr_rounds) {
    nrounds = JSON.parse(nbr_rounds);
}

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