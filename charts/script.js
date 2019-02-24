// Our labels along the x-axis
var years = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
// For drawing the lines
var africa = [86,114,106,106,107,111,133,221,783,2478];
var asia = [282,350,411,502,635,809,947,1402,3700,5267];
var europe = [168,170,178,190,203,276,408,547,675,734];
var latinAmerica = [40,20,10,16,24,38,74,167,508,784];
var northAmerica = [6,3,2,2,7,26,82,172,312,433];

var storedOrdersRetailer = localStorage.getItem("list_orders_retailer");
if (storedOrdersRetailer) {
    ArrayStoredOrders = JSON.parse(storedOrdersRetailer);
}

var storedInventoryRetailer = localStorage.getItem("list_inventory_retailer");
if (storedInventoryRetailer) {
    ArrayStoredInventoryRetailer = JSON.parse(storedInventoryRetailer);
}

var storedBackorderRetailer = localStorage.getItem("list_backorder_retailer");
if (storedBackorderRetailer) {
    ArrayStoredBackorderRetailer = JSON.parse(storedBackorderRetailer);
}

var rounds=[];

for (var r = 1; r<=ArrayStoredOrders.length; r++) rounds[r]=r; 

var ctx = document.getElementById("myRetailerChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: rounds,
    datasets: [
        { 
			data: ArrayStoredOrders,
			label: "Orders",
			borderColor: "#3e95cd",
			fill: false
		},
		{ 
			data: ArrayStoredInventoryRetailer,
			label: "Inventory",
			borderColor: "#8e5ea2",
			fill: false
		},
		{ 
			data: ArrayStoredBackorderRetailer,
			label: "Backorder",
			borderColor: "#3cba9f",
			fill: false
		}
    ]
  }
});