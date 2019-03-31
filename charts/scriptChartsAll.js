
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
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredInventoryFactory,
			label: "Inventory",
			borderColor: "#8e5ea2",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredBackorderFactory,
			label: "Backorder",
			borderColor: "#3cba9f",
			lineTension: 0,
			fill: false
		}
    ]
  }
});

var canvasOrder = document.getElementById("myOrderChart");
var myOrderChart = new Chart(canvasOrder, {
  type: 'line',
  data: {
    labels: rounds,
    datasets: [
        { 
			data: ArrayStoredOrdersRetailer,
			label: "Retailer",
			borderColor: "#3e95cd",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredOrdersWarehouse,
			label: "Warehouse",
			borderColor: "#8e5ea2",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredOrdersDC,
			label: "DC",
			borderColor: "#3cba9f",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredOrdersFactory,
			label: "Factory",
			borderColor: "#c45850",
			lineTension: 0,
			fill: false
		}
    ]
  }
});

var canvasInventory = document.getElementById("myInventoryChart");
var myInventoryChart = new Chart(canvasInventory, {
  type: 'line',
  data: {
    labels: rounds,
    datasets: [
        { 
			data: ArrayStoredInventoryRetailer,
			label: "Retailer",
			borderColor: "#3e95cd",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredInventoryWarehouse,
			label: "Warehouse",
			borderColor: "#8e5ea2",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredInventoryDC,
			label: "DC",
			borderColor: "#3cba9f",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredInventoryFactory,
			label: "Factory",
			borderColor: "#c45850",
			lineTension: 0,
			fill: false
		}
    ]
  }
});

var canvasBackorder = document.getElementById("myBackorderChart");
var myBackorderChart = new Chart(canvasBackorder, {
  type: 'line',
  data: {
    labels: rounds,
    datasets: [
        { 
			data: ArrayStoredBackorderRetailer,
			label: "Retailer",
			borderColor: "#3e95cd",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredBackorderWarehouse,
			label: "Warehouse",
			borderColor: "#8e5ea2",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredBackorderDC,
			label: "DC",
			borderColor: "#3cba9f",
			lineTension: 0,
			fill: false
		},
		{ 
			data: ArrayStoredBackorderFactory,
			label: "Factory",
			borderColor: "#c45850",
			lineTension: 0,
			fill: false
		}
    ]
  }
});