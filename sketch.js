var canvas; // the drawing canvas

// Buttons
var myInitButton;
var myNextStepButton;
var myNextRoundButton;
var mySummaryButton;
var myUpdateParametersButton;

// Order input areas
var retailerOrderInput, warehouseOrderInput, DCOrderInput, factoryOrderInput;

// Iterators for rounds and steps
var roundSim;
var stepInRound;

// Role played in game
var role;
var roleInput;
var adminPasswordInput;

// messages and actions required
var message;
var actionReq;

// Retailer data
var orderReceivedByRetailer = [];
var orderMadeByRetailerMinus1 = [];
var orderMadeByRetailerMinus2 = [];
var quantityDeliveredByRetailer = [];
var quantityReceivedByRetailer = [];
var inventoryRetailer = [];
var backorderRetailer = [];
var costInventoryRetailer = [];
var cumcostInventoryRetailer = [];
var costBackorderRetailer = [];
var cumcostBackorderRetailer = [];

// Warehouse data
var orderReceivedByWarehouse = [];
var orderMadeByWarehouseMinus1 = [];
var orderMadeByWarehouseMinus2 = [];
var quantityDeliveredByWarehouseTransit1 = [];
var quantityDeliveredByWarehouseTransit2 = [];
var quantityReceivedByWarehouse = []
var inventoryWarehouse = [];
var backorderWarehouse = [];
var costInventoryWarehouse = [];
var cumcostInventoryWarehouse = [];
var costBackorderWarehouse = [];
var cumcostBackorderWarehouse = [];

// DC data
var orderReceivedByDC = [];
var orderMadeByDCMinus1 = [];
var orderMadeByDCMinus2 = [];
var quantityDeliveredByDCTransit1 = [];
var quantityDeliveredByDCTransit2 = [];
var quantityReceivedByDC = [];
var inventoryDC = [];
var backorderDC = [];
var costInventoryDC = [];
var cumcostInventoryDC = [];
var costBackorderDC = [];
var cumcostBackorderDC = [];

// Factory data
var orderReceivedByFactory = [];
var quantityDeliveredByFactoryTransit1 = [];
var quantityDeliveredByFactoryTransit2 = [];
var quantityInProduction1 = [];
var quantityInProduction2 = [];
var quantityInProduction3 = [];
var inventoryFactory = [];
var backorderFactory = [];
var costInventoryFactory = [];
var cumcostInventoryFactory = [];
var costBackorderFactory = [];
var cumcostBackorderFactory = [];

// Range for the order size; the latter is uniformly generated as an integer 
// within the interval
var maxOrderSize;
var maxOrderSizeInput;
var minOrderSize;
var minOrderSizeInput;

// Unit holding and backorder costs
var UCInventoryRetailer;
var UCInventoryWarehouse;
var UCInventoryDC;
var UCInventoryFactory;
var UCBackorderRetailer;
var UCBackorderWarehouse;
var UCBackorderDC;
var UCBackorderFactory;

// Admin Password
var adminPasswordSuccess = 0;
var passwordEntered;



function setup() {
  // put setup code here
	
	// main canvas
	canvas = createCanvas(1600, 500);
	//background(230, 0, 230)
	
	//createP('');
	roleInput = createInput('');
	roleInput.position(515, 5);
	roleInput.size(30, 15);
	
	adminPasswordInput = createInput('', 'password');
	adminPasswordInput.position(800, 5);
	adminPasswordInput.size(120, 15);
	
	myInitButton = createButton("Initialize");
	myInitButton.mousePressed(initGame);
	
	createP('');
	
 	myNextStepButton = createButton("Next Step");
	myNextStepButton.mousePressed(nextStep);
	
	//createP('');
	
	myNextRoundButton = createButton("Next Round");
	myNextRoundButton.mousePressed(nextRound);
	
	createP('');
	
	mySummaryButton = createButton("Summary");
	mySummaryButton.mousePressed(generateSummary);
	myChartsButton = createButton("Charts");
	myChartsButton.mousePressed(generateCharts);
	
	createP('');
	
	myUpdateParametersButton = createButton("Update Parameters");
	myUpdateParametersButton.mousePressed(updateParameters);
	
	createP('');
	
	retailerOrderInput = createInput('');
	retailerOrderInput.position(20, 450);
	retailerOrderInput.size(30, 15);
	
	retailerQtyReceived = createInput('');
	retailerQtyReceived.position(20, 400);
	retailerQtyReceived.size(30, 15);
	
	warehouseOrderInput = createInput('');
	warehouseOrderInput.position(20+300, 450);
	warehouseOrderInput.size(30, 15);
	
	DCOrderInput = createInput('');
	DCOrderInput.position(20+600, 450);
	DCOrderInput.size(30, 15);
	
	factoryOrderInput = createInput('');
	factoryOrderInput.position(20+900, 450);
	factoryOrderInput.size(30, 15);
	
	// game parameters
	minOrderSizeInput = createInput('');
	minOrderSizeInput.position(20+1200, 480);
	minOrderSizeInput.size(30, 15);
	
	maxOrderSizeInput = createInput('');
	maxOrderSizeInput.position(80+1200, 480);
	maxOrderSizeInput.size(30, 15);

}


function draw() {
	//background(220, 180, 200);
	// background(200, 200, 0)
	displayInit();
	
}



function initGame() {
	roundSim = 1;
	stepInRound = 0;
	
	// set role
	
	role = "NA";
	switch (roleInput.value()) {
		case "A": checkAdminPassword();
		if (adminPasswordSuccess) role = "Admin";
		break;
		case "R": role = "Retailer";
		break;
		case "W": role = "Warehouse";
		break;
		case "D": role = "DC";
		break;
		case "F": role = "Factory";
		break;
	}
	
	// init message and action required
	message = "New round to start!";
	actionReq = "";
	
	// Retailer elements to initialize and display
	
	orderReceivedByRetailer[roundSim] = "NA";
	orderMadeByRetailerMinus1[roundSim] = 30;
    orderMadeByRetailerMinus2[roundSim] = 35;
    quantityDeliveredByRetailer[roundSim] = "NA";
	quantityReceivedByRetailer[roundSim] = "NA";
	inventoryRetailer[roundSim] = 100;
	backorderRetailer[roundSim] = 0;
	costInventoryRetailer[roundSim] = "NA";
	cumcostInventoryRetailer[roundSim] = 0;
	costBackorderRetailer[roundSim] = "NA";
	cumcostBackorderRetailer[roundSim] = 0;

	// Warehouse elements to initialize and display
	
	orderReceivedByWarehouse[roundSim]= "NA";
	orderMadeByWarehouseMinus1[roundSim] = 25;
	orderMadeByWarehouseMinus2[roundSim] = 35;
	quantityDeliveredByWarehouseTransit1[roundSim] = 25;
	quantityDeliveredByWarehouseTransit2[roundSim] = 35;
	quantityReceivedByWarehouse[roundSim]= "NA";
	inventoryWarehouse[roundSim] = 100;
	backorderWarehouse[roundSim] = 0;
	costInventoryWarehouse[roundSim] = "NA";
	cumcostInventoryWarehouse[roundSim] = 0;
	costBackorderWarehouse[roundSim] = "NA";
	cumcostBackorderWarehouse[roundSim] = 0;
	
	// DC elements to initialize and display
	
	orderReceivedByDC[roundSim]= "NA";
	orderMadeByDCMinus1[roundSim] = 35;
	orderMadeByDCMinus2[roundSim] = 45;
	quantityDeliveredByDCTransit1[roundSim] = 35;
	quantityDeliveredByDCTransit2[roundSim] = 45;
	quantityReceivedByDC[roundSim]= "NA";
	inventoryDC[roundSim] = 100;
	backorderDC[roundSim] = 0;
	costInventoryDC[roundSim] = "NA";
	cumcostInventoryDC[roundSim] = 0;
	costBackorderDC[roundSim] = "NA";
	cumcostBackorderDC[roundSim] = 0;
	
	// Factory elements to initialize and display
	
	orderReceivedByFactory[roundSim]= "NA";
	quantityDeliveredByFactoryTransit1[roundSim] = 40;
	quantityDeliveredByFactoryTransit2[roundSim] = 45;
	quantityInProduction1[roundSim] = 40;
	quantityInProduction2[roundSim] = 45;
	quantityInProduction3[roundSim] = 55;
	inventoryFactory[roundSim] = 100;
	backorderFactory[roundSim] = 0;
	costInventoryFactory[roundSim] = "NA";
	cumcostInventoryFactory[roundSim] = 0;
	costBackorderFactory[roundSim] = "NA";
	cumcostBackorderFactory[roundSim] = 0;
	
	// parameters
	minOrderSize = 20;
	maxOrderSize = 80;
	
	UCInventoryRetailer = 1;
	UCInventoryWarehouse = 0.75;
	UCInventoryDC = 0.50;
	UCInventoryFactory = 0.25;
	UCBackorderRetailer = 5;
	UCBackorderWarehouse = 2;
	UCBackorderDC = 1.50;
	UCBackorderFactory = 1;
	
	switch (role) {
		case "Admin": displayAll();
		break;
		case "Retailer": displayRetailerOnly();
		break;
	}
	// displayAll();
}

function nextStep() {
	
	switch (role) {
		case "Admin": nextStepAdmin();
		break;
		case "Retailer": nextStepRetailer();
		break;
	}
}

function nextStepAdmin() {
	
	stepInRound++;
	switch (stepInRound) {
		case 1:
		// step 1: retailer informs the warehouse that they are receiving 
		// the order they made two periods earlier 
		orderReceivedByWarehouse[roundSim] = orderMadeByRetailerMinus2[roundSim];
		message = "Retailer informs Warehouse of incoming order";
		displayAll();
		break;
		case 2:
		// step 2: warehouse informs the DC that they are receiving 
		// the order they made two periods earlier 
		orderReceivedByDC[roundSim] = orderMadeByWarehouseMinus2[roundSim];
		message = "Warehouse informs DC of incoming order";
		displayAll();
		break;
		case 3:
		// step 3: DC informs the factory that they are receiving 
		// the order they made two periods earlier 
		orderReceivedByFactory[roundSim] = orderMadeByDCMinus2[roundSim];
		message = "DC informs Factory of incoming order";
		displayAll();
		break;
		case 4:
		// step 4: Factory informs the DC that they are receiving 
		// a shipment 
		quantityReceivedByDC[roundSim] = quantityDeliveredByFactoryTransit2[roundSim];
		message = "Factory informs DC of incoming shipment";
		displayAll();
		break;
		case 5:
		// step 5: DC informs the warehouse that they are receiving 
		// a shipment 
		quantityReceivedByWarehouse[roundSim] = quantityDeliveredByDCTransit2[roundSim];
		message = "DC informs Warehouse of incoming shipment";
		displayAll();
		break;
		case 6:
		// step 6: Warehouse informs the retailer that they are receiving 
		// a shipment 
		quantityReceivedByRetailer[roundSim] = quantityDeliveredByWarehouseTransit2[roundSim];
		message = "Warehouse informs Retailer of incoming shipment";
		displayAll();
		break;
		case 7:
		// step 7: Customer order generated at the level of the retailer 
		orderReceivedByRetailer[roundSim] = Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize);
		message = "Retailer gets new customer order";
		displayAll();
		break;
		case 8:
		// step 8: Shipment advancement factory to DC 
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit1[roundSim];
		quantityDeliveredByFactoryTransit1[roundSim] = "NA";
		message = "Shipment advancement Factory to DC";
		displayAll();
		break;
		case 9:
		// step 9: Quantity added to inventory at the level of factory 
		inventoryFactory[roundSim] = inventoryFactory[roundSim] + quantityInProduction3[roundSim];
		quantityInProduction3[roundSim] = "NA";
		message = "Quantity added to Factory inventory";
		displayAll();
		break;
		case 10:
		// step 10: Order fulfillment at the level of factory 
		backorderFactory[roundSim] = backorderFactory[roundSim] + orderReceivedByFactory[roundSim];
		if (inventoryFactory[roundSim] >= backorderFactory[roundSim]) 
		{
			quantityDeliveredByFactoryTransit1[roundSim] = backorderFactory[roundSim] ;
			inventoryFactory[roundSim] = inventoryFactory[roundSim] - backorderFactory[roundSim];
			backorderFactory[roundSim] = 0;
		}
		else
		{
			quantityDeliveredByFactoryTransit1[roundSim] = inventoryFactory[roundSim];
			backorderFactory[roundSim] = backorderFactory[roundSim] - inventoryFactory[roundSim];
			inventoryFactory[roundSim] = 0;
		}
		// compute inventory and backorder costs
		costInventoryFactory[roundSim] = UCInventoryFactory * inventoryFactory[roundSim];
		cumcostInventoryFactory[roundSim] += costInventoryFactory[roundSim];
		costBackorderFactory[roundSim] = UCBackorderFactory * backorderFactory[roundSim];
		cumcostBackorderFactory[roundSim] += costBackorderFactory[roundSim];
		message = "Order fulfillment and inventory update at Factory";
		displayAll();
		break;
		case 11:
		// step 11: Production advancing at the level of factory 
		quantityInProduction3[roundSim] = quantityInProduction2[roundSim];
		quantityInProduction2[roundSim] = quantityInProduction1[roundSim];
		quantityInProduction1[roundSim] = "NA";
		message = "Production advancement at Factory";
		actionReq = "Factory needs to enter new order!";
		displayAll();
		break;
		case 12:
		// step 12: Factory enters its production order 
		quantityInProduction1[roundSim] = parseFloat(factoryOrderInput.value());
		message = "New production order by Factory";
		actionReq = "";
		displayAll();
		break;
		case 13:
		// step 13: Shipment advancement DC to warehouse
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit1[roundSim];
		quantityDeliveredByDCTransit1[roundSim] = "NA";
		message = "Shipment advancement DC to Warehouse";
		displayAll();
		break;
		case 14:
		// step 14: Quantity added to inventory at the level of DC
		inventoryDC[roundSim] = inventoryDC[roundSim] + quantityReceivedByDC[roundSim];
		message = "Quantity added to DC inventory";
		displayAll();
		break;
		case 15:
		// step 15: Order fulfillment at the level of DC 
		backorderDC[roundSim] = backorderDC[roundSim] + orderReceivedByDC[roundSim];
		if (inventoryDC[roundSim] >= backorderDC[roundSim]) 
		{
			quantityDeliveredByDCTransit1[roundSim] = backorderDC[roundSim] ;
			inventoryDC[roundSim] = inventoryDC[roundSim] - backorderDC[roundSim];
			backorderDC[roundSim] = 0;
		}
		else
		{
			quantityDeliveredByDCTransit1[roundSim] = inventoryDC[roundSim];
			backorderDC[roundSim] = backorderDC[roundSim] - inventoryDC[roundSim];
			inventoryDC[roundSim] = 0;
		}
		
		// compute inventory and backorder costs
		costInventoryDC[roundSim] = UCInventoryDC * inventoryDC[roundSim];
		cumcostInventoryDC[roundSim] += costInventoryDC[roundSim];
		costBackorderDC[roundSim] = UCBackorderDC * backorderDC[roundSim];
		cumcostBackorderDC[roundSim] += costBackorderDC[roundSim];
		message = "Order fulfillment and inventory update at DC";
		displayAll();
		break;
		case 16:
		// step 16: orders advancing at the level of DC 
		orderMadeByDCMinus2[roundSim] = orderMadeByDCMinus1[roundSim];
		orderMadeByDCMinus1[roundSim] = "NA";
		message = "Orders advancing at DC";
		actionReq = "DC needs to enter new order!";
		displayAll();
		break;
		case 17:
		// step 17: DC enters its order 
		orderMadeByDCMinus1[roundSim] = parseFloat(DCOrderInput.value());
		message = "New order by DC";
		actionReq = "";
		displayAll();
		break;
		case 18:
		// step 18: Shipment advancement warehouse to retailer
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim];
		quantityDeliveredByWarehouseTransit1[roundSim] = "NA";
		message = "Shipment advancement Warehouse to Retailer";
		displayAll();
		break;
		case 19:
		// step 19: Quantity added to inventory at the level of Warehouse
		inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim] + quantityReceivedByWarehouse[roundSim];
		message = "Quantity added to Warehouse inventory";
		displayAll();
		break;
		case 20:
		// step 20: Order fulfillment at the level of Warehouse 
		backorderWarehouse[roundSim] = backorderWarehouse[roundSim] + orderReceivedByWarehouse[roundSim];
		if (inventoryWarehouse[roundSim] >= backorderWarehouse[roundSim]) 
		{
			quantityDeliveredByWarehouseTransit1[roundSim] = backorderWarehouse[roundSim] ;
			inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim] - backorderWarehouse[roundSim];
			backorderWarehouse[roundSim] = 0;
		}
		else
		{
			quantityDeliveredByWarehouseTransit1[roundSim] = inventoryWarehouse[roundSim];
			backorderWarehouse[roundSim] = backorderWarehouse[roundSim] - inventoryWarehouse[roundSim];
			inventoryWarehouse[roundSim] = 0;
		}
		
		// compute inventory and backorder costs
		costInventoryWarehouse[roundSim] = UCInventoryWarehouse * inventoryWarehouse[roundSim];
		cumcostInventoryWarehouse[roundSim] += costInventoryWarehouse[roundSim];
		costBackorderWarehouse[roundSim] = UCBackorderWarehouse * backorderWarehouse[roundSim];
		cumcostBackorderWarehouse[roundSim] += costBackorderWarehouse[roundSim];
		message = "Order fulfillment and inventory update at Warehouse";
		displayAll();
		break;
		case 21:
		// step 21: orders advancing at the level of Warehouse 
		orderMadeByWarehouseMinus2[roundSim] = orderMadeByWarehouseMinus1[roundSim];
		orderMadeByWarehouseMinus1[roundSim] = "NA";
		message = "Orders advancing at Warehouse";
		actionReq = "Warehouse needs to enter new order!";
		displayAll();
		break;
		case 22:
		// step 22: Warehouse enters its order 
		orderMadeByWarehouseMinus1[roundSim] = parseFloat(warehouseOrderInput.value());
		message = "New order by Warehouse";
		actionReq = "";
		displayAll();
		break;
		case 23:
		// step 23: Quantity added to inventory at the level of Retailer
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim] + quantityReceivedByRetailer[roundSim];
		message = "Quantity added to Retailer inventory";
		displayAll();
		break;
		case 24:
		// step 24: Order fulfillment at the level of Retailer
		backorderRetailer[roundSim] = backorderRetailer[roundSim] + orderReceivedByRetailer[roundSim];
		if (inventoryRetailer[roundSim] >= backorderRetailer[roundSim]) 
		{
			quantityDeliveredByRetailer[roundSim] = backorderRetailer[roundSim] ;
			inventoryRetailer[roundSim] = inventoryRetailer[roundSim] - backorderRetailer[roundSim];
			backorderRetailer[roundSim] = 0;
		}
		else
		{
			quantityDeliveredByRetailer[roundSim] = inventoryRetailer[roundSim];
			backorderRetailer[roundSim] = backorderRetailer[roundSim] - inventoryRetailer[roundSim];
			inventoryRetailer[roundSim] = 0;
		}
		// compute inventory and backorder costs
		costInventoryRetailer[roundSim] = UCInventoryRetailer * inventoryRetailer[roundSim];
		cumcostInventoryRetailer[roundSim] += costInventoryRetailer[roundSim];
		costBackorderRetailer[roundSim] = UCBackorderRetailer * backorderRetailer[roundSim];
		cumcostBackorderRetailer[roundSim] += costBackorderRetailer[roundSim];
		message = "Order fulfillment and inventory update at Retailer";
		displayAll();
		break;
		case 25:
		// step 25: orders advancing at the level of Retailer 
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus1[roundSim];
		orderMadeByRetailerMinus1[roundSim] = "NA";
		message = "Orders advancing at Retailer";
		actionReq = "Retailer needs to enter new order!";
		displayAll();
		break;
		case 26:
		// step 26: Retailer enters its order 
		orderMadeByRetailerMinus1[roundSim] = parseFloat(retailerOrderInput.value());
		message = "New order by Retailer";
		actionReq = "";
		displayAll();
		break;
		case 27:
		// step 27: End of current round, increment round and return step to 0 
		roundSim++;
		stepInRound = 0;
		
		message = "New round to start!";
		
		// Retailer update
		orderReceivedByRetailer[roundSim] = "NA";
		orderMadeByRetailerMinus1[roundSim] = orderMadeByRetailerMinus1[roundSim-1];
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus2[roundSim-1];
		quantityDeliveredByRetailer[roundSim] = "NA";
		quantityReceivedByRetailer[roundSim] = "NA";
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim-1];
		backorderRetailer[roundSim] = backorderRetailer[roundSim-1];
		costInventoryRetailer[roundSim] = "NA";
		cumcostInventoryRetailer[roundSim] = cumcostInventoryRetailer[roundSim-1];
		costBackorderRetailer[roundSim] = "NA";
		cumcostBackorderRetailer[roundSim] = cumcostBackorderRetailer[roundSim-1];
		
		// Warehouse update
		orderReceivedByWarehouse[roundSim]= "NA";
		orderMadeByWarehouseMinus1[roundSim] = orderMadeByWarehouseMinus1[roundSim-1];
		orderMadeByWarehouseMinus2[roundSim] = orderMadeByWarehouseMinus2[roundSim-1];
		quantityDeliveredByWarehouseTransit1[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim-1];
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit2[roundSim-1];
		quantityReceivedByWarehouse[roundSim]= "NA";
		inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim-1];
		backorderWarehouse[roundSim] = backorderWarehouse[roundSim-1];
		costInventoryWarehouse[roundSim] = "NA";
		cumcostInventoryWarehouse[roundSim] = cumcostInventoryWarehouse[roundSim-1];
		costBackorderWarehouse[roundSim] = "NA";
		cumcostBackorderWarehouse[roundSim] = cumcostBackorderWarehouse[roundSim-1];
		
		// DC update
		orderReceivedByDC[roundSim]= "NA";
		orderMadeByDCMinus1[roundSim] = orderMadeByDCMinus1[roundSim-1];
		orderMadeByDCMinus2[roundSim] = orderMadeByDCMinus2[roundSim-1];
		quantityDeliveredByDCTransit1[roundSim] = quantityDeliveredByDCTransit1[roundSim-1];
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit2[roundSim-1];
		quantityReceivedByDC[roundSim]= "NA";
		inventoryDC[roundSim] = inventoryDC[roundSim-1];
		backorderDC[roundSim] = backorderDC[roundSim-1];
		costInventoryDC[roundSim] = "NA";
		cumcostInventoryDC[roundSim] = cumcostInventoryDC[roundSim-1];
		costBackorderDC[roundSim] = "NA";
		cumcostBackorderDC[roundSim] = cumcostBackorderDC[roundSim-1];
		
		// Factory update
		orderReceivedByFactory[roundSim]= "NA";
		quantityDeliveredByFactoryTransit1[roundSim] = quantityDeliveredByFactoryTransit1[roundSim-1];
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit2[roundSim-1];
		quantityInProduction1[roundSim] = quantityInProduction1[roundSim-1];
		quantityInProduction2[roundSim] = quantityInProduction2[roundSim-1];
		quantityInProduction3[roundSim] = quantityInProduction3[roundSim-1];
		inventoryFactory[roundSim] = inventoryFactory[roundSim-1];
		backorderFactory[roundSim] = backorderFactory[roundSim-1];
		costInventoryFactory[roundSim] = "NA";
		cumcostInventoryFactory[roundSim] = cumcostInventoryFactory[roundSim-1];
		costBackorderFactory[roundSim] = "NA";
		cumcostBackorderFactory[roundSim] = cumcostBackorderFactory[roundSim-1];
		
		displayAll();
		
		break;
	}
	
}

function nextStepRetailer() {
	stepInRound++;
	switch (stepInRound) {
		case 1:
		// step 1: retailer informs the warehouse that they are receiving 
		// the order they made two periods earlier 
		message = "Retailer informs Warehouse of incoming order";
		actionReq = "Order to transmit to Warehouse! Waiting Shipment ...";
		displayRetailerOnly();
		break;
		case 2:
		// step 2: Retailer takes note of the shipment received from Warehouse 
		// a shipment 
		message = "Retailer takes note of the shipment received from Warehouse";
		actionReq = "Quantity received to enter!";
		displayRetailerOnly();
		break;
		case 3:
		// step 3: Quantity received by retailer updated 
		quantityReceivedByRetailer[roundSim] = parseFloat(retailerQtyReceived.value());
		message = "Quantity received by retailer updated";
		actionReq = "";
		displayRetailerOnly();
		break;
		case 4:
		// step 4: Customer order generated at Retailer
		orderReceivedByRetailer[roundSim] = Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize);
		message = "Retailer gets new customer order";
		displayRetailerOnly();
		break;
		case 5:
		// step 5: Quantity added to inventory at the level of Retailer
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim] + quantityReceivedByRetailer[roundSim];
		message = "Quantity added to Retailer inventory";
		displayRetailerOnly();
		break;
		case 6:
		// step 6: Order fulfillment at the level of Retailer
		backorderRetailer[roundSim] = backorderRetailer[roundSim] + orderReceivedByRetailer[roundSim];
		if (inventoryRetailer[roundSim] >= backorderRetailer[roundSim]) 
		{
			quantityDeliveredByRetailer[roundSim] = backorderRetailer[roundSim] ;
			inventoryRetailer[roundSim] = inventoryRetailer[roundSim] - backorderRetailer[roundSim];
			backorderRetailer[roundSim] = 0;
		}
		else
		{
			quantityDeliveredByRetailer[roundSim] = inventoryRetailer[roundSim];
			backorderRetailer[roundSim] = backorderRetailer[roundSim] - inventoryRetailer[roundSim];
			inventoryRetailer[roundSim] = 0;
		}
		// compute inventory and backorder costs
		costInventoryRetailer[roundSim] = UCInventoryRetailer * inventoryRetailer[roundSim];
		cumcostInventoryRetailer[roundSim] += costInventoryRetailer[roundSim];
		costBackorderRetailer[roundSim] = UCBackorderRetailer * backorderRetailer[roundSim];
		cumcostBackorderRetailer[roundSim] += costBackorderRetailer[roundSim];
		message = "Order fulfillment and inventory update at Retailer";
		displayRetailerOnly();
		break;
		case 7:
		// step 7: orders advancing at the level of Retailer 
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus1[roundSim];
		orderMadeByRetailerMinus1[roundSim] = "NA";
		message = "Orders advancing at Retailer";
		actionReq = "Retailer needs to enter new order!";
		displayRetailerOnly();
		break;
		case 8:
		// step 8: Retailer enters its order 
		orderMadeByRetailerMinus1[roundSim] = parseFloat(retailerOrderInput.value());
		message = "New order by Retailer";
		actionReq = "";
		displayRetailerOnly();
		break;
		case 9:
		// step 9: End of current round, increment round and return step to 0 
		roundSim++;
		stepInRound = 0;
		
		message = "New round to start!";
		
		// Retailer update
		orderReceivedByRetailer[roundSim] = "NA";
		orderMadeByRetailerMinus1[roundSim] = orderMadeByRetailerMinus1[roundSim-1];
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus2[roundSim-1];
		quantityDeliveredByRetailer[roundSim] = "NA";
		quantityReceivedByRetailer[roundSim] = "NA";
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim-1];
		backorderRetailer[roundSim] = backorderRetailer[roundSim-1];
		costInventoryRetailer[roundSim] = "NA";
		cumcostInventoryRetailer[roundSim] = cumcostInventoryRetailer[roundSim-1];
		costBackorderRetailer[roundSim] = "NA";
		cumcostBackorderRetailer[roundSim] = cumcostBackorderRetailer[roundSim-1];
		
		displayRetailerOnly();
		break;
	}
	
}

function nextRound() {
	
	if (stepInRound != 0) {
		// DO NOTHING: you need to finish the previous round first
	}
	else {
		// Perform all the steps at once
		
		// step 1: retailer informs the warehouse that they are receiving 
		// the order they made two periods earlier 
		orderReceivedByWarehouse[roundSim] = orderMadeByRetailerMinus2[roundSim];
		
		// step 2: warehouse informs the DC that they are receiving 
		// the order they made two periods earlier 
		orderReceivedByDC[roundSim] = orderMadeByWarehouseMinus2[roundSim];
		
		// step 3: DC informs the factory that they are receiving 
		// the order they made two periods earlier 
		orderReceivedByFactory[roundSim] = orderMadeByDCMinus2[roundSim];
		
		// step 4: Factory informs the DC that they are receiving 
		// a shipment 
		quantityReceivedByDC[roundSim] = quantityDeliveredByFactoryTransit2[roundSim];
		
		// step 5: DC informs the warehouse that they are receiving 
		// a shipment 
		quantityReceivedByWarehouse[roundSim] = quantityDeliveredByDCTransit2[roundSim];
		
		// step 6: Warehouse informs the retailer that they are receiving 
		// a shipment 
		quantityReceivedByRetailer[roundSim] = quantityDeliveredByWarehouseTransit2[roundSim];
		
		// step 7: Customer order generated at the level of the retailer 
		orderReceivedByRetailer[roundSim] = Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize);
		
		// step 8: Shipment advancement factory to DC 
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit1[roundSim];
		quantityDeliveredByFactoryTransit1[roundSim] = "NA";
		
		// step 9: Quantity added to inventory at the level of factory 
		inventoryFactory[roundSim] = inventoryFactory[roundSim] + quantityInProduction3[roundSim];
		quantityInProduction3[roundSim] = "NA";
		
		// step 10: Order fulfillment at the level of factory 
		backorderFactory[roundSim] = backorderFactory[roundSim] + orderReceivedByFactory[roundSim];
		if (inventoryFactory[roundSim] >= backorderFactory[roundSim]) 
		{
			quantityDeliveredByFactoryTransit1[roundSim] = backorderFactory[roundSim] ;
			inventoryFactory[roundSim] = inventoryFactory[roundSim] - backorderFactory[roundSim];
			backorderFactory[roundSim] = 0;
		}
		else
		{
			quantityDeliveredByFactoryTransit1[roundSim] = inventoryFactory[roundSim];
			backorderFactory[roundSim] = backorderFactory[roundSim] - inventoryFactory[roundSim];
			inventoryFactory[roundSim] = 0;
		}
		// compute inventory and backorder costs
		costInventoryFactory[roundSim] = UCInventoryFactory * inventoryFactory[roundSim];
		cumcostInventoryFactory[roundSim] += costInventoryFactory[roundSim];
		costBackorderFactory[roundSim] = UCBackorderFactory * backorderFactory[roundSim];
		cumcostBackorderFactory[roundSim] += costBackorderFactory[roundSim];
		
		// step 11: Production advancing at the level of factory 
		quantityInProduction3[roundSim] = quantityInProduction2[roundSim];
		quantityInProduction2[roundSim] = quantityInProduction1[roundSim];
		quantityInProduction1[roundSim] = "NA";
		
		// step 12: Factory enters its production order 
		quantityInProduction1[roundSim] = parseFloat(factoryOrderInput.value());
		
		// step 13: Shipment advancement DC to warehouse
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit1[roundSim];
		quantityDeliveredByDCTransit1[roundSim] = "NA";
		
		// step 14: Quantity added to inventory at the level of DC
		inventoryDC[roundSim] = inventoryDC[roundSim] + quantityReceivedByDC[roundSim];
		
		// step 15: Order fulfillment at the level of DC 
		backorderDC[roundSim] = backorderDC[roundSim] + orderReceivedByDC[roundSim];
		if (inventoryDC[roundSim] >= backorderDC[roundSim]) 
		{
			quantityDeliveredByDCTransit1[roundSim] = backorderDC[roundSim] ;
			inventoryDC[roundSim] = inventoryDC[roundSim] - backorderDC[roundSim];
			backorderDC[roundSim] = 0;
		}
		else
		{
			quantityDeliveredByDCTransit1[roundSim] = inventoryDC[roundSim];
			backorderDC[roundSim] = backorderDC[roundSim] - inventoryDC[roundSim];
			inventoryDC[roundSim] = 0;
		}
		
		// compute inventory and backorder costs
		costInventoryDC[roundSim] = UCInventoryDC * inventoryDC[roundSim];
		cumcostInventoryDC[roundSim] += costInventoryDC[roundSim];
		costBackorderDC[roundSim] = UCBackorderDC * backorderDC[roundSim];
		cumcostBackorderDC[roundSim] += costBackorderDC[roundSim];
		
		// step 16: orders advancing at the level of DC 
		orderMadeByDCMinus2[roundSim] = orderMadeByDCMinus1[roundSim];
		orderMadeByDCMinus1[roundSim] = "NA";
		
		// step 17: DC enters its order 
		orderMadeByDCMinus1[roundSim] = parseFloat(DCOrderInput.value());
		
		// step 18: Shipment advancement warehouse to retailer
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim];
		quantityDeliveredByWarehouseTransit1[roundSim] = "NA";
		
		// step 19: Quantity added to inventory at the level of Warehouse
		inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim] + quantityReceivedByWarehouse[roundSim];
		
		// step 20: Order fulfillment at the level of Warehouse 
		backorderWarehouse[roundSim] = backorderWarehouse[roundSim] + orderReceivedByWarehouse[roundSim];
		if (inventoryWarehouse[roundSim] >= backorderWarehouse[roundSim]) 
		{
			quantityDeliveredByWarehouseTransit1[roundSim] = backorderWarehouse[roundSim] ;
			inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim] - backorderWarehouse[roundSim];
			backorderWarehouse[roundSim] = 0;
		}
		else
		{
			quantityDeliveredByWarehouseTransit1[roundSim] = inventoryWarehouse[roundSim];
			backorderWarehouse[roundSim] = backorderWarehouse[roundSim] - inventoryWarehouse[roundSim];
			inventoryWarehouse[roundSim] = 0;
		}
		
		// compute inventory and backorder costs
		costInventoryWarehouse[roundSim] = UCInventoryWarehouse * inventoryWarehouse[roundSim];
		cumcostInventoryWarehouse[roundSim] += costInventoryWarehouse[roundSim];
		costBackorderWarehouse[roundSim] = UCBackorderWarehouse * backorderWarehouse[roundSim];
		cumcostBackorderWarehouse[roundSim] += costBackorderWarehouse[roundSim];
		
		// step 21: orders advancing at the level of Warehouse 
		orderMadeByWarehouseMinus2[roundSim] = orderMadeByWarehouseMinus1[roundSim];
		orderMadeByWarehouseMinus1[roundSim] = "NA";
		
		// step 22: Warehouse enters its order 
		orderMadeByWarehouseMinus1[roundSim] = parseFloat(warehouseOrderInput.value());
		
		// step 23: Quantity added to inventory at the level of Retailer
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim] + quantityReceivedByRetailer[roundSim];
		
		// step 24: Order fulfillment at the level of Retailer
		backorderRetailer[roundSim] = backorderRetailer[roundSim] + orderReceivedByRetailer[roundSim];
		if (inventoryRetailer[roundSim] >= backorderRetailer[roundSim]) 
		{
			quantityDeliveredByRetailer[roundSim] = backorderRetailer[roundSim] ;
			inventoryRetailer[roundSim] = inventoryRetailer[roundSim] - backorderRetailer[roundSim];
			backorderRetailer[roundSim] = 0;
		}
		else
		{
			quantityDeliveredByRetailer[roundSim] = inventoryRetailer[roundSim];
			backorderRetailer[roundSim] = backorderRetailer[roundSim] - inventoryRetailer[roundSim];
			inventoryRetailer[roundSim] = 0;
		}
		// compute inventory and backorder costs
		costInventoryRetailer[roundSim] = UCInventoryRetailer * inventoryRetailer[roundSim];
		cumcostInventoryRetailer[roundSim] += costInventoryRetailer[roundSim];
		costBackorderRetailer[roundSim] = UCBackorderRetailer * backorderRetailer[roundSim];
		cumcostBackorderRetailer[roundSim] += costBackorderRetailer[roundSim];
		
		// step 25: orders advancing at the level of Retailer 
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus1[roundSim];
		orderMadeByRetailerMinus1[roundSim] = "NA";
		
		// step 26: Retailer enters its order 
		orderMadeByRetailerMinus1[roundSim] = parseFloat(retailerOrderInput.value());
		
		// step 27: End of current round, increment round and return step to 0 
		roundSim++;
		// stepInRound = 0; NO NEED FOR THIS
		
		// Retailer update
		orderReceivedByRetailer[roundSim] = "NA";
		orderMadeByRetailerMinus1[roundSim] = orderMadeByRetailerMinus1[roundSim-1];
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus2[roundSim-1];
		quantityDeliveredByRetailer[roundSim] = "NA";
		quantityReceivedByRetailer[roundSim] = "NA";
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim-1];
		backorderRetailer[roundSim] = backorderRetailer[roundSim-1];
		costInventoryRetailer[roundSim] = "NA";
		cumcostInventoryRetailer[roundSim] = cumcostInventoryRetailer[roundSim-1];
		costBackorderRetailer[roundSim] = "NA";
		cumcostBackorderRetailer[roundSim] = cumcostBackorderRetailer[roundSim-1];
		
		// Warehouse update
		orderReceivedByWarehouse[roundSim]= "NA";
		orderMadeByWarehouseMinus1[roundSim] = orderMadeByWarehouseMinus1[roundSim-1];
		orderMadeByWarehouseMinus2[roundSim] = orderMadeByWarehouseMinus2[roundSim-1];
		quantityDeliveredByWarehouseTransit1[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim-1];
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit2[roundSim-1];
		quantityReceivedByWarehouse[roundSim]= "NA";
		inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim-1];
		backorderWarehouse[roundSim] = backorderWarehouse[roundSim-1];
		costInventoryWarehouse[roundSim] = "NA";
		cumcostInventoryWarehouse[roundSim] = cumcostInventoryWarehouse[roundSim-1];
		costBackorderWarehouse[roundSim] = "NA";
		cumcostBackorderWarehouse[roundSim] = cumcostBackorderWarehouse[roundSim-1];
		
		// DC update
		orderReceivedByDC[roundSim]= "NA";
		orderMadeByDCMinus1[roundSim] = orderMadeByDCMinus1[roundSim-1];
		orderMadeByDCMinus2[roundSim] = orderMadeByDCMinus2[roundSim-1];
		quantityDeliveredByDCTransit1[roundSim] = quantityDeliveredByDCTransit1[roundSim-1];
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit2[roundSim-1];
		quantityReceivedByDC[roundSim]= "NA";
		inventoryDC[roundSim] = inventoryDC[roundSim-1];
		backorderDC[roundSim] = backorderDC[roundSim-1];
		costInventoryDC[roundSim] = "NA";
		cumcostInventoryDC[roundSim] = cumcostInventoryDC[roundSim-1];
		costBackorderDC[roundSim] = "NA";
		cumcostBackorderDC[roundSim] = cumcostBackorderDC[roundSim-1];
		
		// Factory update
		orderReceivedByFactory[roundSim]= "NA";
		quantityDeliveredByFactoryTransit1[roundSim] = quantityDeliveredByFactoryTransit1[roundSim-1];
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit2[roundSim-1];
		quantityInProduction1[roundSim] = quantityInProduction1[roundSim-1];
		quantityInProduction2[roundSim] = quantityInProduction2[roundSim-1];
		quantityInProduction3[roundSim] = quantityInProduction3[roundSim-1];
		inventoryFactory[roundSim] = inventoryFactory[roundSim-1];
		backorderFactory[roundSim] = backorderFactory[roundSim-1];
		costInventoryFactory[roundSim] = "NA";
		cumcostInventoryFactory[roundSim] = cumcostInventoryFactory[roundSim-1];
		costBackorderFactory[roundSim] = "NA";
		cumcostBackorderFactory[roundSim] = cumcostBackorderFactory[roundSim-1];
		
		displayAll();	
	}
	

}


function generateSummary() {
//  var myWindow = window.open(url='dummy.html');
//	var myWindow = window.open("", "MsgWindow", "width=200, height=100");
	var summaryRetailer = window.open("", "MsgWindow");
	var textSummary = 'Summary Retailer';
	summaryRetailer.document.write('<h1>' + textSummary + '</h1>');
	var rows = roundSim-1;
	for (var r = 1; r <= rows; r++) { 
		textSummary = 'Round: ' + r + ' - Order Received: ' + orderReceivedByRetailer[r] + 
		' - Qty. Received: ' + quantityReceivedByRetailer[r] + ' - Qty. Delivered: ' + 
		quantityDeliveredByRetailer[r] + ' - Order Made: ' + orderMadeByRetailerMinus1[r] + 
		' - Inventory: ' + inventoryRetailer[r] + ' - Backorder: ' + backorderRetailer[r] + 
		' - Cost Inventory: ' + costInventoryRetailer[r] + ' - Backorder: ' + backorderRetailer[r] + 
		' - Cost Backorder: ' + costBackorderRetailer[r];
		summaryRetailer.document.write('<p>' + textSummary + '</p>');
	}
}

function generateCharts() {
	
	switch (role) {
		case "Admin": generateChartsAll();
		break;
		case "Retailer": 
		break;
	}
	
}

function generateChartsAll() {

localStorage.setItem("list_orders_retailer",  JSON.stringify(orderMadeByRetailerMinus1));
localStorage.setItem("list_inventory_retailer",  JSON.stringify(inventoryRetailer));
localStorage.setItem("list_backorder_retailer",  JSON.stringify(backorderRetailer));
localStorage.setItem("list_orders_warehouse",  JSON.stringify(orderMadeByWarehouseMinus1));
localStorage.setItem("list_inventory_warehouse",  JSON.stringify(inventoryWarehouse));
localStorage.setItem("list_backorder_warehouse",  JSON.stringify(backorderWarehouse));
localStorage.setItem("list_orders_DC",  JSON.stringify(orderMadeByDCMinus1));
localStorage.setItem("list_inventory_DC",  JSON.stringify(inventoryDC));
localStorage.setItem("list_backorder_DC",  JSON.stringify(backorderDC));
localStorage.setItem("list_orders_factory",  JSON.stringify(quantityInProduction1));
localStorage.setItem("list_inventory_factory",  JSON.stringify(inventoryFactory));
localStorage.setItem("list_backorder_factory",  JSON.stringify(backorderFactory));

var chartWindow = window.open(url="charts/chartsAll.html");

}

function checkAdminPassword() {
	passwordEntered = adminPasswordInput.value();
	adminPasswordInput.value('');
	if (passwordEntered == "admin") adminPasswordSuccess = 1;
	else alert("Wrong password!");

}

function displayRetailerOnly() {
	clear();
	displayInit();
	displayRound();
	displayRetailer();
	displayRetailerPlus();
}
	
function displayRetailer() {
	fill(0, 0, 0);
	textSize(14);
	text("Retailer", 20, 60);
	textSize(11);
	
	text("Order Received: " + orderReceivedByRetailer[roundSim], 20, 80);
	text(orderReceivedByRetailer[roundSim], 25, 275);
	text("Order Made - 1: " + orderMadeByRetailerMinus1[roundSim], 20, 95);
	text(orderMadeByRetailerMinus1[roundSim], 195, 275);
	text("Order Made - 2: " + orderMadeByRetailerMinus2[roundSim], 20, 110);
	text(orderMadeByRetailerMinus2[roundSim], 245, 275);
	text("Qty Delivered: " + quantityDeliveredByRetailer[roundSim], 20, 125);
	text(quantityDeliveredByRetailer[roundSim], 27, 335);
	text("Qty Received: " + quantityReceivedByRetailer[roundSim], 20, 140);
	text(quantityReceivedByRetailer[roundSim], 237, 335);
	text("Inventory: " + inventoryRetailer[roundSim], 20, 155);
	text(inventoryRetailer[roundSim], 155, 315);
	text("Backorder: " + backorderRetailer[roundSim], 20, 170);
	text(backorderRetailer[roundSim], 155, 335);
	
	text("Cost Inventory: " + costInventoryRetailer[roundSim] + " - cumul.: " + cumcostInventoryRetailer[roundSim], 20, 210);
	text("Cost Backorder: " + costBackorderRetailer[roundSim] + " - cumul.: " + cumcostBackorderRetailer[roundSim], 20, 225);
	
	text("Order", 20, 445);
	

}

function displayRetailerPlus() {
	text("Qty. Received", 20, 395);
}

function displayWarehouse() {
	fill(0, 0, 0);
	textSize(14);
	text("Warehouse", 20+300, 60);
	textSize(11);
	text("Order Received: " + orderReceivedByWarehouse[roundSim], 20+300, 80);
	text(orderReceivedByWarehouse[roundSim], 25+300, 275);
	text("Order Made - 1: " + orderMadeByWarehouseMinus1[roundSim], 20+300, 95);
	text(orderMadeByWarehouseMinus1[roundSim], 195+300, 275);
	text("Order Made - 2: " + orderMadeByWarehouseMinus2[roundSim], 20+300, 110);
	text(orderMadeByWarehouseMinus2[roundSim], 245+300, 275);
	text("Qty Delivered in Transit 1: " + quantityDeliveredByWarehouseTransit1[roundSim], 20+300, 125);
	text(quantityDeliveredByWarehouseTransit1[roundSim], 67+300, 335);
	text("Qty Delivered in Transit 2: " + quantityDeliveredByWarehouseTransit2[roundSim], 20+300, 140);
	text(quantityDeliveredByWarehouseTransit2[roundSim], 27+300, 335);
	text("Qty Received: " + quantityReceivedByWarehouse[roundSim], 20+300, 155);
	text(quantityReceivedByWarehouse[roundSim], 237+300, 335);
	text("Inventory: " + inventoryWarehouse[roundSim], 20+300, 170);
	text(inventoryWarehouse[roundSim], 155+300, 315);
	text("Backorder: " + backorderWarehouse[roundSim], 20+300, 185);
	text(backorderWarehouse[roundSim], 155+300, 335);
	
	text("Cost Inventory: " + costInventoryWarehouse[roundSim] + " - cumul.: " + cumcostInventoryWarehouse[roundSim], 20+300, 210);
	text("Cost Backorder: " + costBackorderWarehouse[roundSim] + " - cumul.: " + cumcostBackorderWarehouse[roundSim], 20+300, 225);
	
	text("Order", 20+300, 445);

}

function displayDC() {
	fill(0, 0, 0);
	textSize(14);
	text("DC", 20+600, 60);
	textSize(11);
	text("Order Received: " + orderReceivedByDC[roundSim], 20+600, 80);
	text(orderReceivedByDC[roundSim], 25+600, 275);
	text("Order Made - 1: " + orderMadeByDCMinus1[roundSim], 20+600, 95);
	text(orderMadeByDCMinus1[roundSim], 195+600, 275);
	text("Order Made - 2: " + orderMadeByDCMinus2[roundSim], 20+600, 110);
	text(orderMadeByDCMinus2[roundSim], 245+600, 275);
	text("Qty Delivered in Transit 1: " + quantityDeliveredByDCTransit1[roundSim], 20+600, 125);
	text(quantityDeliveredByDCTransit1[roundSim], 67+600, 335);
	text("Qty Delivered in Transit 2: " + quantityDeliveredByDCTransit2[roundSim], 20+600, 140);
	text(quantityDeliveredByDCTransit2[roundSim], 27+600, 335);
	text("Qty Received: " + quantityReceivedByDC[roundSim], 20+600, 155);
	text(quantityReceivedByDC[roundSim], 237+600, 335);
	text("Inventory: " + inventoryDC[roundSim], 20+600, 170);
	text(inventoryDC[roundSim], 155+600, 315);
	text("Backorder: " + backorderDC[roundSim], 20+600, 185);
	text(backorderDC[roundSim], 155+600, 335);
	
	text("Cost Inventory: " + costInventoryDC[roundSim] + " - cumul.: " + cumcostInventoryDC[roundSim], 20+600, 210);
	text("Cost Backorder: " + costBackorderDC[roundSim] + " - cumul.: " + cumcostBackorderDC[roundSim], 20+600, 225);
	
	text("Order", 20+600, 445);

}

function displayFactory() {
	fill(0, 0, 0);
	textSize(14);
	text("Factory", 20+900, 60);
	textSize(11);
	text("Order Received: " + orderReceivedByFactory[roundSim], 20+900, 80);
	text(orderReceivedByFactory[roundSim], 25+900, 275);
	text("Qty Delivered in Transit 1: " + quantityDeliveredByFactoryTransit1[roundSim], 20+900, 95);
	text(quantityDeliveredByFactoryTransit1[roundSim], 67+900, 335);
	text("Qty Delivered in Transit 2: " + quantityDeliveredByFactoryTransit2[roundSim], 20+900, 110);
	text(quantityDeliveredByFactoryTransit2[roundSim], 27+900, 335);
	text("Qty in Production 1: " + quantityInProduction1[roundSim], 20+900, 125);
	text(quantityInProduction1[roundSim], 195+900, 275);
	text("Qty in Production 2: " + quantityInProduction2[roundSim], 20+900, 140);
	text(quantityInProduction2[roundSim], 245+900, 275);
	text("Qty in Production 3: " + quantityInProduction3[roundSim], 20+900, 155);
	text(quantityInProduction3[roundSim], 237+900, 335);
	text("Inventory: " + inventoryFactory[roundSim], 20+900, 170);
	text(inventoryFactory[roundSim], 155+900, 315);
	text("Backorder: " + backorderFactory[roundSim], 20+900, 185);
	text(backorderFactory[roundSim], 155+900, 335);
	
	text("Cost Inventory: " + costInventoryFactory[roundSim] + " - cumul.: " + cumcostInventoryFactory[roundSim], 20+900, 210);
	text("Cost Backorder: " + costBackorderFactory[roundSim] + " - cumul.: " + cumcostBackorderFactory[roundSim], 20+900, 225);
	
	text("Order", 20+900, 445);

}

function displayInit() {
	//background(230, 0, 230)
	fill(0, 0, 0);
	textSize(18);
	text("Playing as: [A]dmin, [R]etailer, [W]arehouse, [D]C, [F]actory?", 20, 20); 
	text("Password (for Admin):", 600, 20); 
	
	textSize(14);
	text("Retailer", 20, 60);
	text("Warehouse", 20+300, 60);
	text("DC", 20+600, 60);
	text("Factory", 20+900, 60);
	textSize(18);
	text("Game Log", 20+ 1200, 20);
	text("Game Parameters", 20+ 1200, 400);
	
	// display Retailer shapes
	noFill();
	rect(20,260,40,20);
	rect(190,260,40,20);
	rect(240,260,40,20);
	
	rect(120,300,30,20);
	rect(150,300,40,20);
	rect(120,320,30,20);
	rect(150,320,40,20);
	fill(0, 0, 0);
	textSize(10);
	text("Inventory", 120, 295);
	text("OH", 125, 315);
	text("BO", 125, 335);
	
	noFill();
	triangle(20,340,50,340,35,310);
	triangle(230,340,260,340,245,310);
	
	// display Warehouse shapes
	noFill();
	rect(20+300,260,40,20);
	rect(190+300,260,40,20);
	rect(240+300,260,40,20);
	
	rect(120+300,300,30,20);
	rect(150+300,300,40,20);
	rect(120+300,320,30,20);
	rect(150+300,320,40,20);
	fill(0, 0, 0);
	textSize(10);
	text("Inventory", 120+300, 295);
	text("OH", 125+300, 315);
	text("BO", 125+300, 335);
	
	noFill();
	triangle(20+300,340,50+300,340,35+300,310);
	triangle(60+300,340,90+300,340,75+300,310);
	triangle(230+300,340,260+300,340,245+300,310);
	
	// display DC shapes
	noFill();
	rect(20+600,260,40,20);
	rect(190+600,260,40,20);
	rect(240+600,260,40,20);
	
	rect(120+600,300,30,20);
	rect(150+600,300,40,20);
	rect(120+600,320,30,20);
	rect(150+600,320,40,20);
	fill(0, 0, 0);
	textSize(10);
	text("Inventory", 120+600, 295);
	text("OH", 125+600, 315);
	text("BO", 125+600, 335);
	
	noFill();
	triangle(20+600,340,50+600,340,35+600,310);
	triangle(60+600,340,90+600,340,75+600,310);
	triangle(230+600,340,260+600,340,245+600,310);
	
	// display Factory shapes
	noFill();
	rect(20+900,260,40,20);
	rect(190+900,260,40,20);
	rect(240+900,260,40,20);
	
	rect(120+900,300,30,20);
	rect(150+900,300,40,20);
	rect(120+900,320,30,20);
	rect(150+900,320,40,20);
	fill(0, 0, 0);
	textSize(10);
	text("Inventory", 120+900, 295);
	text("OH", 125+900, 315);
	text("BO", 125+900, 335);
	
	noFill();
	triangle(20+900,340,50+900,340,35+900,310);
	triangle(60+900,340,90+900,340,75+900,310);
	
	triangle(230+900,340,260+900,340,245+900,310);
	
	//parameters
	fill(0, 0, 0);
	textSize(10);
	text("Range Cust. Orders", 20+1200, 470);

}

function displayRound() {
	textSize(12);
	fill(0, 0, 0);
	text("You are playing as the " + role, 40+1200, 80);
	text("---------------------------------------", 40+1200, 100);
	text("Round: " + roundSim + " - Step: " + stepInRound, 40+1200, 120);
	text("---------------------------------------", 40+1200, 140);
	text("Event: ", 40+1200, 160);
	text(message, 40+1200, 180);
	text("---------------------------------------", 40+1200, 200);
	text("Action needed: ", 40+1200, 220);
	text(actionReq, 40+1200, 240);
	text("---------------------------------------", 40+1200, 260);
	text("Min: ", 40+1200, 280);
	text(minOrderSize, 40+1200, 300);
	
}

function displayAll() {
	clear();
	displayInit();
	displayRound();
	displayRetailer();
	displayWarehouse();
	displayDC();
	displayFactory();
}

function updateParameters() {
	if (role == "Admin") {
		minOrderSize = parseFloat(minOrderSizeInput.value());
		maxOrderSize = parseFloat(maxOrderSizeInput.value());
		minOrderSizeInput.value('');
		maxOrderSizeInput.value('');
	}
}