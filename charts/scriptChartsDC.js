
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

var storedBackorderDC = localStorage.getItem("list_backorder_DC");
if (storedBackorderDC) {
    ArrayStoredBackorderDC = JSON.parse(storedBackorderDC);
}

var rounds=[];

for (var r = 0; r<=nrounds; r++) rounds[r]=r; 

var canvasDC = document.getElementById("myDCChart");
var myDCChart = new Chart(canvasDC, {
  type: 'line',
  data: {
    labels: rounds,
    datasets: [
        { 
			data: ArrayStoredOrdersDC,
			label: "Orders",
			borderColor: "#3e95cd",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredInventoryDC,
			label: "Inventory",
			borderColor: "#8e5ea2",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredBackorderDC,
			label: "Backorder",
			borderColor: "#3cba9f",
			lineTension: 0,
			fill: false
		}
    ]
  }
});
