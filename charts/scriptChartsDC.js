
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

var rounds=[];

for (var r = 0; r<=ArrayStoredOrdersDC.length-1; r++) rounds[r]=r; 

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
			fill: false
		},
		{ 
			data: ArrayStoredInventoryDC,
			label: "Inventory",
			borderColor: "#8e5ea2",
			fill: false
		},
		{ 
			data: ArrayStoredBackorderDC,
			label: "Backorder",
			borderColor: "#3cba9f",
			fill: false
		}
    ]
  }
});
