
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

var storedBackorderRetailer = localStorage.getItem("list_backorder_retailer");
if (storedBackorderRetailer) {
    ArrayStoredBackorderRetailer = JSON.parse(storedBackorderRetailer);
}


var rounds=[];

// for (var r = 0; r<=ArrayStoredOrdersRetailer.length-1; r++) rounds[r]=r; 
for (var r = 0; r<=nrounds; r++) rounds[r]=r; 

var canvasRetailer = document.getElementById("myRetailerChart");
var myRetailerChart = new Chart(canvasRetailer, {
  type: 'line',
  data: {
    labels: rounds,
    datasets: [
        { 
			data: ArrayStoredOrdersRetailer,
			label: "Orders",
			borderColor: "#3e95cd",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredInventoryRetailer,
			label: "Inventory",
			borderColor: "#8e5ea2",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredBackorderRetailer,
			label: "Backorder",
			borderColor: "#3cba9f",
			lineTension: 0,
			fill: false
		}
    ]
  }
});
