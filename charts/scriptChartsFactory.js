
// get values stored

var storedOrdersFactory = localStorage.getItem("list_orders_factory");
if (storedOrdersFactory) {
    ArrayStoredOrdersFactory = JSON.parse(storedOrdersFactory);
}

var storedInventoryFactory= localStorage.getItem("list_inventory_factory");
if (storedInventoryFactory) {
    ArrayStoredInventoryFactory = JSON.parse(storedInventoryFactory);
}

var storedBackorderFactory = localStorage.getItem("list_backorder_factory");
if (storedBackorderFactory) {
    ArrayStoredBackorderFactory = JSON.parse(storedBackorderFactory);
}

var rounds=[];

for (var r = 0; r<=ArrayStoredOrdersFactory.length-1; r++) rounds[r]=r; 

var canvasFactory = document.getElementById("myFactoryChart");
var myFactoryChart = new Chart(canvasFactory, {
  type: 'line',
  data: {
    labels: rounds,
    datasets: [
        { 
			data: ArrayStoredOrdersFactory,
			label: "Orders",
			borderColor: "#3e95cd",
			fill: false
		},
		{ 
			data: ArrayStoredInventoryFactory,
			label: "Inventory",
			borderColor: "#8e5ea2",
			fill: false
		},
		{ 
			data: ArrayStoredBackorderFactory,
			label: "Backorder",
			borderColor: "#3cba9f",
			fill: false
		}
    ]
  }
});
