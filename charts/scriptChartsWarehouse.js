
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

var storedBackorderWarehouse = localStorage.getItem("list_backorder_warehouse");
if (storedBackorderWarehouse) {
    ArrayStoredBackorderWarehouse = JSON.parse(storedBackorderWarehouse);
}

var rounds=[];

for (var r = 0; r<=nrounds; r++) rounds[r]=r; 

var canvasWarehouse = document.getElementById("myWarehouseChart");
var myWarehouseChart = new Chart(canvasWarehouse, {
  type: 'line',
  data: {
    labels: rounds,
    datasets: [
        { 
			data: ArrayStoredOrdersWarehouse,
			label: "Orders",
			borderColor: "#3e95cd",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredInventoryWarehouse,
			label: "Inventory",
			borderColor: "#8e5ea2",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredBackorderWarehouse,
			label: "Backorder",
			borderColor: "#3cba9f",
			lineTension: 0,
			fill: false
		}
    ]
  }
});
