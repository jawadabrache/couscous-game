var canvas; // the drawing canvas

// Buttons
var myInitButton;
var myNextStepButton;
var myNextRoundButton;
var myClearAllInputsButton;
var mySummaryButton;
var myUpdateParametersButton;
var myMusicButton;
var myMusicRadio;

// Order input areas
var retailerOrderInput, warehouseOrderInput, DCOrderInput, factoryOrderInput;

// Quantity Received areas
var retailerQtyReceived, warehouseQtyReceived, DCQtyReceived, factoryQtyReceived;

// Order Received areas
var warehouseOrderReceived, DCOrderReceived, factoryOrderReceived;

// Iterators for rounds and steps
var roundSim;
var stepInRound;

// Role played in game
var role;
//var roleInput;
var adminPasswordInput;
var myRoleRadio;

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
var costOrderingRetailer = [];
var cumcostOrderingRetailer = [];

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
var costOrderingWarehouse = [];
var cumcostOrderingWarehouse = [];

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
var costOrderingDC = [];
var cumcostOrderingDC = [];

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
var costOrderingFactory = [];
var cumcostOrderingFactory = [];

// Pattern for customer order generation
var pattern;
var patternInput;

// Amplification multiplicative factors
var amplifMultip2;
var amplifMultipInput2;
var amplifMultip3;
var amplifMultipInput3;

// Amplification after/every n rounds
var amplifAfterInput;
var amplifEveryInput;
var amplifAfter;
var amplifEvery;

// Range for the order size; the latter is uniformly generated as an integer 
// within the interval
var maxOrderSize;
var maxOrderSizeInput1;
var maxOrderSizeInput2;
var maxOrderSizeInput3;
var minOrderSize;
var minOrderSizeInput1;
var minOrderSizeInput2;
var minOrderSizeInput3;

// Unit holding, ordering and backorder costs
var UCInventoryRetailer;
var UCInventoryWarehouse;
var UCInventoryDC;
var UCInventoryFactory;
var UCBackorderRetailer;
var UCBackorderWarehouse;
var UCBackorderDC;
var UCBackorderFactory;
var UCOrderingRetailer;
var UCOrderingWarehouse;
var UCOrderingDC;
var UCOrderingFactory;

// Admin Password
var adminPasswordSuccess = 0;
var passwordEntered;

// Music track
var nbrTracks;
var trackId = [];
var trackName = [];
var trackFileName = [];
var trackPlayed;

// Support function for drawing
function drawInformationFlowLine(xorig, yorig, xdest, ydest, withTerm) {

	var rad = 5; //vertex radius
    var offset = rad;
    point(xorig, yorig); //starting vertex
    point(xdest, ydest); //ending vertex
	
	strokeWeight(1);
	drawingContext.setLineDash([0.5, 3]);
    line(xorig, yorig, xdest, ydest); //draw a line beetween the vertices

	if (withTerm) {
		// this code is to make the arrow point
		push() //start new drawing state
		var angle = atan2(yorig - ydest, xorig - xdest); //gets the angle of the line
		translate(xdest, ydest); //translates to the destination vertex
		rotate(angle-HALF_PI); //rotates the arrow point
		triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
		pop();
	}
	drawingContext.setLineDash([]);
}

function drawMaterialFlowLine(xorig, yorig, xdest, ydest, withTerm) {
		
	var rad = 5; //vertex radius
    var offset = rad;
    point(xorig, yorig); //starting vertex
    point(xdest, ydest); //ending vertex
	
	strokeWeight(1);
	drawingContext.setLineDash([]);
    line(xorig, yorig, xdest, ydest); //draw a line beetween the vertices

	if (withTerm) {
		// this code is to make the arrow point
		push() //start new drawing state
		var angle = atan2(yorig - ydest, xorig - xdest); //gets the angle of the line
		translate(xdest, ydest); //translates to the destination vertex
		rotate(angle-HALF_PI); //rotates the arrow point
		triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
		pop();
	}
	
}


function setup() {
  // put setup code here
	
	// main canvas
	canvas = createCanvas(1600, 640);
	
	//createP('');
	//roleInput = createInput('');
	//roleInput.position(505, 5);
	//roleInput.size(30, 15);
	
	// Role
	myRoleRadio = createRadio();
    myRoleRadio.position(120,5);
	myRoleRadio.option('Admin');
	myRoleRadio.option('Retailer');
	myRoleRadio.option('Warehouse');
	myRoleRadio.option('DC');
	myRoleRadio.option('Factory');
	
	adminPasswordInput = createInput('', 'password');
	adminPasswordInput.position(710, 5);
	adminPasswordInput.size(185, 15);
	
	myInitButton = createButton("Initialize Game");
	myInitButton.position(995,5)
	myInitButton.mousePressed(initGame);
	
	myUpdateParametersButton = createButton("Update Params.");
	myUpdateParametersButton.mousePressed(updateParameters);
	myUpdateParametersButton.position(1200+100,560);
	
	myMusicButton = createButton("Track played?");
	myMusicButton.mousePressed(displayMusic);
	myMusicButton.position(180+900,585);
	
	myMusicRadio = createRadio();
    myMusicRadio.position(70+900,585);
	myMusicRadio.option('Yes');
	myMusicRadio.option('No');
	
 	myNextStepButton = createButton("Next Step");
	myNextStepButton.mousePressed(nextStep);
	myNextStepButton.position(450, 550);
	
	myNextRoundButton = createButton("Next Round");
	myNextRoundButton.mousePressed(nextRound);
	myNextRoundButton.position(650, 550);
	
	myClearAllInputsButton = createButton("Clear Inputs");
	myClearAllInputsButton.mousePressed(clearAllInputs);
	myClearAllInputsButton.position(850, 550);
	
	//createP('');
	
	mySummaryButton = createButton("Tables");
	mySummaryButton.mousePressed(generateTables);
	mySummaryButton.position(450, 590);
	myChartsButton = createButton("Charts");
	myChartsButton.mousePressed(generateCharts);
	myChartsButton.position(650,590);
	
	createP('');
	
	retailerOrderInput = createInput('');
	retailerOrderInput.position(20, 450);
	retailerOrderInput.size(30, 15);
	
	retailerQtyReceived = createInput('');
	retailerQtyReceived.position(200, 400);
	retailerQtyReceived.size(30, 15);
	
	
	warehouseOrderInput = createInput('');
	warehouseOrderInput.position(20+300, 450);
	warehouseOrderInput.size(30, 15);
	
	warehouseOrderReceived = createInput('');
	warehouseOrderReceived.position(20+300, 400);
	warehouseOrderReceived.size(30, 15);
	
	warehouseQtyReceived = createInput('');
	warehouseQtyReceived.position(200+300, 400);
	warehouseQtyReceived.size(30, 15);
	
	DCOrderInput = createInput('');
	DCOrderInput.position(20+600, 450);
	DCOrderInput.size(30, 15);
	
	DCOrderReceived = createInput('');
	DCOrderReceived.position(20+600, 400);
	DCOrderReceived.size(30, 15);
	
	DCQtyReceived = createInput('');
	DCQtyReceived.position(200+600, 400);
	DCQtyReceived.size(30, 15);
	
	factoryOrderInput = createInput('');
	factoryOrderInput.position(20+900, 450);
	factoryOrderInput.size(30, 15);
	
	factoryOrderReceived = createInput('');
	factoryOrderReceived.position(20+900, 400);
	factoryOrderReceived.size(30, 15);
	
	// game parameters
	
	// default parameter values
	
	pattern = "1";
	minOrderSize = 20;
	maxOrderSize = 80;
	
	patternInput = createInput('');
	patternInput.position(80+1200, 340);
	patternInput.size(30, 15);
	
	minOrderSizeInput1 = createInput('');
	minOrderSizeInput1.position(40+1200, 400);
	minOrderSizeInput1.size(30, 15);
	
	maxOrderSizeInput1 = createInput('');
	maxOrderSizeInput1.position(80+1200, 400);
	maxOrderSizeInput1.size(30, 15);
	
	minOrderSizeInput2 = createInput('');
	minOrderSizeInput2.position(40+1200, 440);
	minOrderSizeInput2.size(30, 15);
	
	maxOrderSizeInput2 = createInput('');
	maxOrderSizeInput2.position(80+1200, 440);
	maxOrderSizeInput2.size(30, 15);
	
	amplifMultipInput2 = createInput('');
	amplifMultipInput2.position(140+1200, 440);
	amplifMultipInput2.size(30, 15);
	
	amplifAfterInput = createInput('');
	amplifAfterInput.position(220+1200, 440);
	amplifAfterInput.size(30, 15);
	
	minOrderSizeInput3 = createInput('');
	minOrderSizeInput3.position(40+1200, 480);
	minOrderSizeInput3.size(30, 15);
	
	maxOrderSizeInput3 = createInput('');
	maxOrderSizeInput3.position(80+1200, 480);
	maxOrderSizeInput3.size(30, 15);
	
	amplifMultipInput3= createInput('');
	amplifMultipInput3.position(140+1200, 480);
	amplifMultipInput3.size(30, 15);
	
	amplifEveryInput = createInput('');
	amplifEveryInput.position(220+1200, 480);
	amplifEveryInput.size(30, 15);
	
	
	// Populate Music Tracks
	nbrTracks = 30;
	trackId = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
	trackName = [
		'Tchaikovsky - Piano Concerto No.1', 
		'Rossini - Il Barbiere di Siviglia',
		'Orff - Carmina Burana',
		'Rodrigo - Concierto de Aranjuez',
		'Bach - Goldberg Variations',
		'Beethoven - Symphony No.3 (Eroica)',
		'Mozart - Piano Concerto No.21',
		'Beethoven - Piano Sonata No.8 (Pathetique)',
		'Tchaikovsky - Swan Lake',
		'Chopin - Nocturne No.1',
		'Rimsky-Korsakov - Scheherazade',
		'Vivaldi - The Four Seasons',
		'Ravel - Bolero',
		'Beethoven - Piano Sonata No.14 (Moonlight)',
		'Mozart - Symphony No.40',
		'Beethoven - Symphony No.5',
		'Verdi - La Traviata',
		'Mozart - Le Nozze di Figaro',
		'Debussy - Preludes, Book I',
		'Bach - Cello Suite No.1',
		'Dvorak - Symphony No.9 (From the New World)',
		'Bellini - Norma',
		'Rachmaninoff - Piano Concerto No.2',
		'Chopin - Etude No.12 (Revolutionary)',
		'Beethoven - Symphony No.9 (Choral)',
		'Bizet - Carmen',
		'Mozart - Piano Sonata No.11 (Alla Turca)',
		'Strauss - Also Sprach Zarathustra',
		'Chopin - Grande Valse brillante, Op.18',
		'Mendelssohn - Violin Concerto'
		]; 
	trackFileName = [
		'Track0.mp3',
		'Track1.mp3',
		'Track2.mp3',
		'Track3.mp3',
		'Track4.mp3',
		'Track5.mp3',
		'Track6.mp3',
		'Track7.mp3',
		'Track8.mp3',
		'Track9.mp3',
		'Track10.mp3',
		'Track11.mp3',
		'Track12.mp3',
		'Track13.mp3',
		'Track14.mp3',
		'Track15.mp3',
		'Track16.mp3',
		'Track17.mp3',
		'Track18.mp3',
		'Track19.mp3',
		'Track20.mp3',
		'Track21.mp3',
		'Track22.mp3',
		'Track23.mp3',
		'Track24.mp3',
		'Track25.mp3',
		'Track26.mp3',
		'Track27.mp3',
		'Track28.mp3',
		'Track29.mp3'
		];
	
}

function draw() {

	displayInit();
	
}

function initGame() {
	roundSim = 0;
	stepInRound = 0;
	
	// set role
	
	role = "";
	switch (myRoleRadio.value()) {
		case "Admin": checkAdminPassword();
		if (adminPasswordSuccess) role = "Admin";
		break;
		case "Retailer": role = "Retailer";
		break;
		case "Warehouse": role = "Warehouse";
		break;
		case "DC": role = "DC";
		break;
		case "Factory": role = "Factory";
		break;
	}
	
	// init message and action required
	message = "";
	actionReq = "";
	
	// Retailer elements to initialize and display
	
	orderReceivedByRetailer[roundSim] = "";
	orderMadeByRetailerMinus1[roundSim] = 30;
    orderMadeByRetailerMinus2[roundSim] = 35;
    quantityDeliveredByRetailer[roundSim] = "";
	quantityReceivedByRetailer[roundSim] = "";
	inventoryRetailer[roundSim] = 100;
	backorderRetailer[roundSim] = 0;
	costInventoryRetailer[roundSim] = 0;
	cumcostInventoryRetailer[roundSim] = 0;
	costBackorderRetailer[roundSim] = 0;
	cumcostBackorderRetailer[roundSim] = 0;
	costOrderingRetailer[roundSim] = 0;
	cumcostOrderingRetailer[roundSim] = 0;

	// Warehouse elements to initialize and display
	
	orderReceivedByWarehouse[roundSim]= "";
	orderMadeByWarehouseMinus1[roundSim] = 25;
	orderMadeByWarehouseMinus2[roundSim] = 35;
	quantityDeliveredByWarehouseTransit1[roundSim] = 25;
	quantityDeliveredByWarehouseTransit2[roundSim] = 35;
	quantityReceivedByWarehouse[roundSim]= "";
	inventoryWarehouse[roundSim] = 100;
	backorderWarehouse[roundSim] = 0;
	costInventoryWarehouse[roundSim] = 0;
	cumcostInventoryWarehouse[roundSim] = 0;
	costBackorderWarehouse[roundSim] = 0;
	cumcostBackorderWarehouse[roundSim] = 0;
	costOrderingWarehouse[roundSim] = 0;
	cumcostOrderingWarehouse[roundSim] = 0;
	
	// DC elements to initialize and display
	
	orderReceivedByDC[roundSim]= "";
	orderMadeByDCMinus1[roundSim] = 35;
	orderMadeByDCMinus2[roundSim] = 45;
	quantityDeliveredByDCTransit1[roundSim] = 35;
	quantityDeliveredByDCTransit2[roundSim] = 45;
	quantityReceivedByDC[roundSim]= "";
	inventoryDC[roundSim] = 100;
	backorderDC[roundSim] = 0;
	costInventoryDC[roundSim] = 0;
	cumcostInventoryDC[roundSim] = 0;
	costBackorderDC[roundSim] = 0;
	cumcostBackorderDC[roundSim] = 0;
	costOrderingDC[roundSim] = 0;
	cumcostOrderingDC[roundSim] = 0;
	
	// Factory elements to initialize and display
	
	orderReceivedByFactory[roundSim]= "";
	quantityDeliveredByFactoryTransit1[roundSim] = 40;
	quantityDeliveredByFactoryTransit2[roundSim] = 45;
	quantityInProduction1[roundSim] = 40;
	quantityInProduction2[roundSim] = 45;
	quantityInProduction3[roundSim] = 55;
	inventoryFactory[roundSim] = 100;
	backorderFactory[roundSim] = 0;
	costInventoryFactory[roundSim] = 0;
	cumcostInventoryFactory[roundSim] = 0;
	costBackorderFactory[roundSim] = 0;
	cumcostBackorderFactory[roundSim] = 0;
	costOrderingFactory[roundSim] = 0;
	cumcostOrderingFactory[roundSim] = 0;
	
	// Unit Costs
	
	UCInventoryRetailer = 1;
	UCInventoryWarehouse = 0.75;
	UCInventoryDC = 0.50;
	UCInventoryFactory = 0.25;
	UCBackorderRetailer = 5;
	UCBackorderWarehouse = 2;
	UCBackorderDC = 1.50;
	UCBackorderFactory = 1;
	UCOrderingRetailer = 50;
	UCOrderingWarehouse = 50;
	UCOrderingDC = 50;
	UCOrderingFactory = 20;
	
	switch (role) {
		case "Admin": displayAll(); clearAllInputs; displayParams();
		break;
		case "Retailer": displayRetailerOnly(); clearAllInputs;
		break;
		case "Warehouse": displayWarehouseOnly(); clearAllInputs;
		break;
		case "DC": displayDCOnly(); clearAllInputs;
		break;
		case "Factory": displayFactoryOnly(); clearAllInputs;
		break;
	}
	
	// generate randomly the id of track to play
	trackPlayed = Math.floor (Math.random() * nbrTracks);
	
	var track = new Audio("sounds/"+trackFileName[trackPlayed]);
    if (myMusicRadio.value() == "Yes") track.play();

}

function nextStep() {
	
	switch (role) {
		case "Admin": nextStepAdmin();
		break;
		case "Retailer": nextStepRetailer();
		break;
		case "Warehouse": nextStepWarehouse();
		break;
		case "DC": nextStepDC();
		break;
		case "Factory": nextStepFactory();
		break;
	}
}

function nextStepAdmin() {
	var entryErrorInRound = 0;
	switch (stepInRound) {
		case 0: 
		// new round: update data
		roundSim++;
		// Retailer update
		orderReceivedByRetailer[roundSim] = "";
		orderMadeByRetailerMinus1[roundSim] = orderMadeByRetailerMinus1[roundSim-1];
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus2[roundSim-1];
		quantityDeliveredByRetailer[roundSim] = "";
		quantityReceivedByRetailer[roundSim] = "";
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim-1];
		backorderRetailer[roundSim] = backorderRetailer[roundSim-1];
		costInventoryRetailer[roundSim] = 0;
		cumcostInventoryRetailer[roundSim] = cumcostInventoryRetailer[roundSim-1];
		costBackorderRetailer[roundSim] = 0;
		cumcostBackorderRetailer[roundSim] = cumcostBackorderRetailer[roundSim-1];
		costOrderingRetailer[roundSim] = 0;
		cumcostOrderingRetailer[roundSim] = cumcostOrderingRetailer[roundSim-1];
		
		// Warehouse update
		orderReceivedByWarehouse[roundSim]= "";
		orderMadeByWarehouseMinus1[roundSim] = orderMadeByWarehouseMinus1[roundSim-1];
		orderMadeByWarehouseMinus2[roundSim] = orderMadeByWarehouseMinus2[roundSim-1];
		quantityDeliveredByWarehouseTransit1[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim-1];
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit2[roundSim-1];
		quantityReceivedByWarehouse[roundSim]= "";
		inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim-1];
		backorderWarehouse[roundSim] = backorderWarehouse[roundSim-1];
		costInventoryWarehouse[roundSim] = 0;
		cumcostInventoryWarehouse[roundSim] = cumcostInventoryWarehouse[roundSim-1];
		costBackorderWarehouse[roundSim] = 0;
		cumcostBackorderWarehouse[roundSim] = cumcostBackorderWarehouse[roundSim-1];
		costOrderingWarehouse[roundSim] = 0;
		cumcostOrderingWarehouse[roundSim] = cumcostOrderingWarehouse[roundSim-1];
		
		// DC update
		orderReceivedByDC[roundSim]= "";
		orderMadeByDCMinus1[roundSim] = orderMadeByDCMinus1[roundSim-1];
		orderMadeByDCMinus2[roundSim] = orderMadeByDCMinus2[roundSim-1];
		quantityDeliveredByDCTransit1[roundSim] = quantityDeliveredByDCTransit1[roundSim-1];
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit2[roundSim-1];
		quantityReceivedByDC[roundSim]= "";
		inventoryDC[roundSim] = inventoryDC[roundSim-1];
		backorderDC[roundSim] = backorderDC[roundSim-1];
		costInventoryDC[roundSim] = 0;
		cumcostInventoryDC[roundSim] = cumcostInventoryDC[roundSim-1];
		costBackorderDC[roundSim] = 0;
		cumcostBackorderDC[roundSim] = cumcostBackorderDC[roundSim-1];
		costOrderingDC[roundSim] = 0;
		cumcostOrderingDC[roundSim] = cumcostOrderingDC[roundSim-1];
		
		// Factory update
		orderReceivedByFactory[roundSim]= "";
		quantityDeliveredByFactoryTransit1[roundSim] = quantityDeliveredByFactoryTransit1[roundSim-1];
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit2[roundSim-1];
		quantityInProduction1[roundSim] = quantityInProduction1[roundSim-1];
		quantityInProduction2[roundSim] = quantityInProduction2[roundSim-1];
		quantityInProduction3[roundSim] = quantityInProduction3[roundSim-1];
		inventoryFactory[roundSim] = inventoryFactory[roundSim-1];
		backorderFactory[roundSim] = backorderFactory[roundSim-1];
		costInventoryFactory[roundSim] = 0;
		cumcostInventoryFactory[roundSim] = cumcostInventoryFactory[roundSim-1];
		costBackorderFactory[roundSim] = 0;
		cumcostBackorderFactory[roundSim] = cumcostBackorderFactory[roundSim-1];
		costOrderingFactory[roundSim] = 0;
		cumcostOrderingFactory[roundSim] = cumcostOrderingFactory[roundSim-1];
		
		message = "New round starting!";
		
		displayAll();
		
		drawNotifBeginningRetailer();
		drawNotifBeginningWarehouse();
		drawNotifBeginningDC();
		drawNotifBeginningFactory();
		
		break;
		
		case 1:
		// step 1: retailer informs the warehouse that they are receiving 
		// the order they made two periods earlier 
		orderReceivedByWarehouse[roundSim] = orderMadeByRetailerMinus2[roundSim];
		
		message = "Retailer informs Warehouse of incoming order";
		
		displayAll();
		
		// draw flow
		drawLineRetailer_s01();
		
		break;
		
		case 2:
		// step 2: warehouse informs the DC that they are receiving 
		// the order they made two periods earlier 
		orderReceivedByDC[roundSim] = orderMadeByWarehouseMinus2[roundSim];
		
		message = "Warehouse transmits order to DC";
		
		displayAll();
		
		// draw line
		drawLineWarehouse_s03();
		
		break;
		
		case 3:
		// step 3: DC informs the factory that they are receiving 
		// the order they made two periods earlier 
		orderReceivedByFactory[roundSim] = orderMadeByDCMinus2[roundSim];
		message = "DC transmits order to Factory";
		
		displayAll();
		
		// draw line
		drawLineDC_s03();
		
		break;
		
		case 4:
		// step 4: Factory informs the DC that they are receiving 
		// a shipment 
		quantityReceivedByDC[roundSim] = quantityDeliveredByFactoryTransit2[roundSim];
		message = "Incoming shipment reaches DC";
		actionReq = "";
		displayAll();
		
		// draw line
		drawLineFactory_s03();
		
		break;
		
		case 5:
		// step 5: DC informs the warehouse that they are receiving 
		// a shipment 
		quantityReceivedByWarehouse[roundSim] = quantityDeliveredByDCTransit2[roundSim];
		
		message = "Incoming shipment reaches Warehouse";
		
		displayAll();
		
		// draw line
		drawLineDC_s06();
		
		break;
		
		case 6:
		// step 6: Warehouse informs the retailer that they are receiving 
		// a shipment 
		quantityReceivedByRetailer[roundSim] = quantityDeliveredByWarehouseTransit2[roundSim];
		message = "Incoming shipment reaches Retailer";
		
		displayAll();
		
		// draw line
		drawLineWarehouse_s06();
		
		break;
		
		case 7:
		// step 7: Customer order generated at the level of the retailer 
		// orderReceivedByRetailer[roundSim] = Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize);
		
		orderReceivedByRetailer[roundSim] = generateCustomerOrder();
		message = "Retailer gets new customer order";
		displayAll();
		
		// draw line
		drawLineRetailer_s04();
		
		break;
		
		case 8:
		// step 8: Shipment advancement Factory to DC 
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit1[roundSim];
		quantityDeliveredByFactoryTransit1[roundSim] = "";
		message = "Shipment advancement Factory to DC";
		displayAll();
		
		// draw line
		drawLineFactory_s04();
		
		break;
		
		case 9:
		// step 9: Quantity added to inventory at the level of factory 
		inventoryFactory[roundSim] = inventoryFactory[roundSim] + quantityInProduction3[roundSim];
		quantityInProduction3[roundSim] = "";
		message = "Quantity added to Factory inventory";
		
		displayAll();
		
		// draw line
		drawLineFactory_s05();
		
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
		
		// draw line
		drawLineFactory_s06();
		
		break;
		
		case 11:
		// step 11: Production advancing at the level of factory 
		quantityInProduction3[roundSim] = quantityInProduction2[roundSim];
		quantityInProduction2[roundSim] = quantityInProduction1[roundSim];
		quantityInProduction1[roundSim] = "";
		message = "Production advancement at Factory";
		actionReq = "Factory needs to enter new order!";
		displayAll();
		
		// draw line
		drawLineFactory_s07();
		
		// draw line
		drawNotifFactory_s07();
		
		break;
		
		case 12:
		// step 12: Factory enters its production order 
		if (factoryOrderInput.value() == "" || isNaN(factoryOrderInput.value())) {
			alert("Please fill a valid production order!");
			entryErrorInRound = 1;
		}
		else {
		quantityInProduction1[roundSim] = parseFloat(factoryOrderInput.value());
		
		if (quantityInProduction1[roundSim] != 0) {
			costOrderingFactory[roundSim] = UCOrderingFactory;
			cumcostOrderingFactory[roundSim] += costOrderingFactory[roundSim];
			message = "New production order by Factory";
		}
		else {
			message = "No production order made by Factory";
		}
		
		entryErrorInRound = 0;
		
		actionReq = "";
		displayAll();
		
		// draw line
		drawLineFactory_s08();
		}
		break;
		
		case 13:
		// step 13: Shipment advancement DC to Warehouse
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit1[roundSim];
		quantityDeliveredByDCTransit1[roundSim] = "";
		message = "Shipment advancement DC to Warehouse";
		displayAll();
		
		// draw line
		drawLineDC_s07();
		break;
		
		case 14:
		// step 14: Quantity added to inventory at the level of DC
		inventoryDC[roundSim] = inventoryDC[roundSim] + quantityReceivedByDC[roundSim];
		message = "Quantity added to DC inventory";
		displayAll();
		
		// draw line
		drawLineDC_s08();
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
		
		// draw line
		drawLineDC_s09();
		
		break;
		
		case 16:
		// step 16: orders advancing at the level of DC 
		orderMadeByDCMinus2[roundSim] = orderMadeByDCMinus1[roundSim];
		orderMadeByDCMinus1[roundSim] = "";
		message = "Orders advancing at DC";
		actionReq = "DC needs to enter new order!";
		displayAll();
		
		// draw line
		drawLineDC_s10();
		
		// draw notification
		drawNotifDC_s10();
		
		break;
		
		case 17:
		// step 17: DC enters its order 
		if (DCOrderInput.value() == "" || isNaN(DCOrderInput.value())) {
			alert("Please fill a valid DC-made order!");
			entryErrorInRound = 1;
		}
		else {
			entryErrorInRound = 0;
			orderMadeByDCMinus1[roundSim] = parseFloat(DCOrderInput.value());
			
			if (orderMadeByDCMinus1[roundSim] != 0) {
			costOrderingDC[roundSim] = UCOrderingDC;
			cumcostOrderingDC[roundSim] += costOrderingDC[roundSim];
			message = "New order by DC";
			}
			else {
			message = "No order made by DC";
			}
			
			actionReq = "";
			displayAll();
		
		// draw line
		drawLineDC_s11();
		}
		break;
		
		case 18:
		// step 18: Shipment advancement Warehouse to Retailer
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim];
		quantityDeliveredByWarehouseTransit1[roundSim] = "";
		message = "Shipment advancement Warehouse to Retailer";
		displayAll();
		
		// draw line
		drawLineWarehouse_s07();
		break;
		
		case 19:
		// step 19: Quantity added to inventory at the level of Warehouse
		inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim] + quantityReceivedByWarehouse[roundSim];
		message = "Quantity added to Warehouse inventory";
		displayAll();
		
		// draw line
		drawLineWarehouse_s08();
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
		
		// draw line
		drawLineWarehouse_s09();
		break;
		
		case 21:
		// step 21: orders advancing at the level of Warehouse 
		orderMadeByWarehouseMinus2[roundSim] = orderMadeByWarehouseMinus1[roundSim];
		orderMadeByWarehouseMinus1[roundSim] = "";
		message = "Orders advancing at Warehouse";
		actionReq = "Warehouse needs to enter new order!";
		displayAll();
		
		// draw line
		drawLineWarehouse_s10();
		
		// draw notification
		drawNotifWarehouse_s10();
		break;
		
		case 22:
		// step 22: Warehouse enters its order 
		if (warehouseOrderInput.value() == "" || isNaN(warehouseOrderInput.value())) {
			alert("Please fill a valid warehouse-made order!");
			entryErrorInRound = 1;
		}
		
		else {
			entryErrorInRound = 0;
			orderMadeByWarehouseMinus1[roundSim] = parseFloat(warehouseOrderInput.value());
			
			if (orderMadeByWarehouseMinus1[roundSim] != 0) {
			costOrderingWarehouse[roundSim] = UCOrderingWarehouse;
			cumcostOrderingWarehouse[roundSim] += costOrderingWarehouse[roundSim];
			message = "New order by Warehouse";
			}
			else {
			message = "No order made by Warehouse";
			}
			
			actionReq = "";
			displayAll();
		
			// draw line
			drawLineWarehouse_s11();
		}
		break;
		
		case 23:
		// step 23: Quantity added to inventory at the level of Retailer
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim] + quantityReceivedByRetailer[roundSim];
		message = "Quantity added to Retailer inventory";
		displayAll();
		
		// draw line
		drawLineRetailer_s05();
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
		
		// draw line
		drawLineRetailer_s06();
		break;
		
		case 25:
		// step 25: orders advancing at the level of Retailer 
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus1[roundSim];
		orderMadeByRetailerMinus1[roundSim] = "";
		message = "Orders advancing at Retailer";
		actionReq = "Retailer needs to enter new order!";
		displayAll();
		
		// draw line
		drawLineRetailer_s07();
		
		// draw line
		drawNotifRetailer_s07();
		break;
		
		case 26:
		// step 26: Retailer enters its order 
		if (retailerOrderInput.value() == "" || isNaN(retailerOrderInput.value())) {
			alert("Please fill a valid retailer-made order!");
			entryErrorInRound = 1;
		}
		else {
			entryErrorInRound = 0;
			orderMadeByRetailerMinus1[roundSim] = parseFloat(retailerOrderInput.value());
			
			if (orderMadeByRetailerMinus1[roundSim] != 0) {
			costOrderingRetailer[roundSim] = UCOrderingRetailer;
			cumcostOrderingRetailer[roundSim] += costOrderingRetailer[roundSim];
			message = "New order by Retailer";
			}
			else {
			message = "No order made by Retailer";
			}
			
			actionReq = "";
			displayAll();
		
			// draw line
			drawLineRetailer_s08();
		}
		break;
		
		case 27:
		// step 27: End of current round
		message = "End of current round!";
		
		clearAllInputs();
		
		displayAll();
		
		drawNotifEndRetailer();
		drawNotifEndWarehouse();
		drawNotifEndDC();
		drawNotifEndFactory();
		break;
	}
	if (stepInRound == 27) {
		stepInRound = 0; 
	} else 
	{
		if (!entryErrorInRound) stepInRound++;
	}
}

function nextStepRetailer() {
	var entryErrorInRound = 0;
	switch (stepInRound) {
		case 0:
		roundSim++;
		
		// Retailer update
		orderReceivedByRetailer[roundSim] = "";
		orderMadeByRetailerMinus1[roundSim] = orderMadeByRetailerMinus1[roundSim-1];
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus2[roundSim-1];
		quantityDeliveredByRetailer[roundSim] = "";
		quantityReceivedByRetailer[roundSim] = "";
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim-1];
		backorderRetailer[roundSim] = backorderRetailer[roundSim-1];
		costInventoryRetailer[roundSim] = 0;
		cumcostInventoryRetailer[roundSim] = cumcostInventoryRetailer[roundSim-1];
		costBackorderRetailer[roundSim] = 0;
		cumcostBackorderRetailer[roundSim] = cumcostBackorderRetailer[roundSim-1];
		costOrderingRetailer[roundSim] = 0;
		cumcostOrderingRetailer[roundSim] = cumcostOrderingRetailer[roundSim-1];
		
		message = "New round starting!";
		displayRetailerOnly();
		
		drawNotifBeginningRetailer();
		
		break;
		case 1:
		// step 1: retailer informs the warehouse that they are receiving 
		// the order they made two periods earlier 
		message = "Retailer informs Warehouse of incoming order";
		actionReq = "Order to transmit to Warehouse! Waiting shipment ...";
		displayRetailerOnly();	
		
		// draw flow
		drawLineRetailer_s01();
		break;
		case 2:
		// step 2: Retailer takes note of the shipment received from Warehouse 
		// a shipment 
		message = "Retailer takes note of a shipment received";
		actionReq = "Quantity received to enter!";
		displayRetailerOnly();
		
		// draw line
		drawLineRetailer_s02();
		
		drawNotifRetailer_s02();

		break;
		case 3:
		if (retailerQtyReceived.value() == "" || isNaN(retailerQtyReceived.value())) {
			alert("Please fill a valid shipment received!");
			entryErrorInRound = 1;
		}
		else {
			entryErrorInRound = 0;
			// step 3: Quantity received by retailer updated 
			quantityReceivedByRetailer[roundSim] = parseFloat(retailerQtyReceived.value());
		
			message = "Quantity received by retailer updated";
			actionReq = "";
			displayRetailerOnly();
		
			// draw line
			drawLineRetailer_s03();
		}
		break;
		case 4:
		// step 4: Customer order generated at Retailer
		// orderReceivedByRetailer[roundSim] = Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize);
		
		orderReceivedByRetailer[roundSim] = generateCustomerOrder();
		message = "Retailer gets new customer order";
		displayRetailerOnly();
		
		// draw line
		drawLineRetailer_s04();
		break;
		case 5:
		// step 5: Quantity added to inventory at the level of Retailer
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim] + quantityReceivedByRetailer[roundSim];
		message = "Quantity added to Retailer inventory";
		displayRetailerOnly();
		
		// draw line
		drawLineRetailer_s05();
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
		
		// draw line
		drawLineRetailer_s06();
		break;
		case 7:
		// step 7: orders advancing at the level of Retailer 
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus1[roundSim];
		orderMadeByRetailerMinus1[roundSim] = "";
		message = "Orders advancing at Retailer";
		actionReq = "Retailer needs to enter new order!";
		displayRetailerOnly();
		
		// draw line
		drawLineRetailer_s07();
		
		// draw line
		drawNotifRetailer_s07();
		break;
		case 8:
		// step 8: Retailer enters its order 
		if (retailerOrderInput.value() == "" || isNaN(retailerOrderInput.value())) {
			alert("Please fill a valid order made!");
			entryErrorInRound = 1;
		}
		else {
			entryErrorInRound = 0;
			orderMadeByRetailerMinus1[roundSim] = parseFloat(retailerOrderInput.value());
			
			if (orderMadeByRetailerMinus1[roundSim] != 0) {
			costOrderingRetailer[roundSim] = UCOrderingRetailer;
			cumcostOrderingRetailer[roundSim] += costOrderingRetailer[roundSim];
			message = "New order by Retailer";
			}
			else {
			message = "No order made by Retailer";
			}

			actionReq = "";
			displayRetailerOnly();
		
			// draw line
			drawLineRetailer_s08();
		}
		break;
		case 9:
		// step 9: End of current round
		message = "End of current round!";
		
		// clear retailer input
		retailerQtyReceived.value('');
		retailerOrderInput.value('');
		
		displayRetailerOnly();
		
		drawNotifEndRetailer();
		break;
	}
	if (stepInRound == 9) {
		stepInRound = 0; 
	} 
	else 
	{
		if (!entryErrorInRound) stepInRound++;
	}
}

function nextStepWarehouse() {
	var entryErrorInRound = 0;
	switch (stepInRound) {
		case 0:
		roundSim++;
		
		// Warehouse update
		orderReceivedByWarehouse[roundSim]= "";
		orderMadeByWarehouseMinus1[roundSim] = orderMadeByWarehouseMinus1[roundSim-1];
		orderMadeByWarehouseMinus2[roundSim] = orderMadeByWarehouseMinus2[roundSim-1];
		quantityDeliveredByWarehouseTransit1[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim-1];
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit2[roundSim-1];
		quantityReceivedByWarehouse[roundSim]= "";
		inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim-1];
		backorderWarehouse[roundSim] = backorderWarehouse[roundSim-1];
		costInventoryWarehouse[roundSim] = 0;
		cumcostInventoryWarehouse[roundSim] = cumcostInventoryWarehouse[roundSim-1];
		costBackorderWarehouse[roundSim] = 0;
		cumcostBackorderWarehouse[roundSim] = cumcostBackorderWarehouse[roundSim-1];
		costOrderingWarehouse[roundSim] = 0;
		cumcostOrderingWarehouse[roundSim] = cumcostOrderingWarehouse[roundSim-1];
		
		message = "New round starting!";
		displayWarehouseOnly();
		
		drawNotifBeginningWarehouse();
		break;
		case 1: 
		// step 1: Warehouse takes note of the order received from retailer  
		message = "Warehouse takes note of the order received from retailer";
		actionReq = "Order received to enter!";
		displayWarehouseOnly();
		
		// draw line
		drawLineWarehouse_s01();
		
		drawNotifWarehouse_s01();
		break;
		case 2:
		if (warehouseOrderReceived.value() == "" || isNaN(warehouseOrderReceived.value())) {
			alert("Please fill a valid order received!");
			entryErrorInRound = 1;
		}
		else {
			// step 2: Order received by warehouse updated 
			entryErrorInRound = 0;
			orderReceivedByWarehouse[roundSim] = parseFloat(warehouseOrderReceived.value());
			message = "Order received by warehouse updated";
			actionReq = "";
			displayWarehouseOnly();
		
			// draw line
			drawLineWarehouse_s02();
		}
		break;
		case 3:
		// step 3: Warehouse informs the DC that they are receiving 
		// the order they made two periods earlier 
		message = "Warehouse informs DC of incoming order";
		actionReq = "Order to transmit to DC! Waiting shipment ...";
		displayWarehouseOnly();
		
		// draw line
		drawLineWarehouse_s03();
		break;
		case 4:
		// step 4: Warehouse takes note of the shipment received from DC  
		message = "Warehouse takes note of the shipment received from DC";
		actionReq = "Quantity received to enter!";
		displayWarehouseOnly();
		
		// draw line
		drawLineWarehouse_s04();
		
		drawNotifWarehouse_s04();
		break;
		case 5:
		if (warehouseQtyReceived.value() == "" || isNaN(warehouseQtyReceived.value())) {
			alert("Please fill a valid shipment received!");
			entryErrorInRound = 1;
		}
		else {
			// step 5: Quantity received by warehouse updated 
			entryErrorInRound = 0;
			quantityReceivedByWarehouse[roundSim] = parseFloat(warehouseQtyReceived.value());
			message = "Quantity received by warehouse updated";
			actionReq = "";
			displayWarehouseOnly();
		
			// draw line
			drawLineWarehouse_s05();
		}
		break;
		case 6:
		// step 6: Warehouse informs retailer of incoming shipment
		message = "Warehouse informs retailer of incoming shipment";
		actionReq = "Shipment sent to retailer ...";
		displayWarehouseOnly();
		
		// draw line
		drawLineWarehouse_s06();
		
		break;
		case 7:
		// step 7: Shipment advancement warehouse to retailer
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim];
		quantityDeliveredByWarehouseTransit1[roundSim] = "";
		message = "Shipment advancement warehouse to retailer";
		actionReq = "";
		displayWarehouseOnly();
		
		// draw line
		drawLineWarehouse_s07();
		break;
		case 8:
		// step 8: Quantity added to inventory at the level of Warehouse
		inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim] + quantityReceivedByWarehouse[roundSim];
		message = "Quantity added to Warehouse inventory";
		displayWarehouseOnly();
		
		// draw line
		drawLineWarehouse_s08();
		break;
		case 9:
		// step 9: Order fulfillment at the level of Warehouse 
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
		displayWarehouseOnly();
		
		// draw line
		drawLineWarehouse_s09();
		break;
		case 10:
		// step 10: orders advancing at the level of Warehouse 
		orderMadeByWarehouseMinus2[roundSim] = orderMadeByWarehouseMinus1[roundSim];
		orderMadeByWarehouseMinus1[roundSim] = "";
		message = "Orders advancing at Warehouse";
		actionReq = "Warehouse needs to enter new order!";
		displayWarehouseOnly();
		
		// draw line
		drawLineWarehouse_s10();
		
		// draw line
		drawNotifWarehouse_s10();
		break;
		case 11:
		// step 11: Warehouse enters its order 
		if (warehouseOrderInput.value() == "" || isNaN(warehouseOrderInput.value())) {
			alert("Please fill a valid order made!");
			entryErrorInRound = 1;
		}
		else {
			entryErrorInRound = 0;
			orderMadeByWarehouseMinus1[roundSim] = parseFloat(warehouseOrderInput.value());
			
			if (orderMadeByWarehouseMinus1[roundSim] != 0) {
			costOrderingWarehouse[roundSim] = UCOrderingWarehouse;
			cumcostOrderingWarehouse[roundSim] += costOrderingWarehouse[roundSim];
			message = "New order by Warehouse";
			}
			else {
			message = "No order made by Warehouse";
			}
			
			actionReq = "";
			displayWarehouseOnly();
		
			// draw line
			drawLineWarehouse_s11();
		}
		break;
		case 12:
		// step 12: End of current round
		message = "End of current round!";
		displayWarehouseOnly();
		
		// clear warehouse input
		warehouseOrderReceived.value('');
		warehouseQtyReceived.value('');
		warehouseOrderInput.value('');
		
		drawNotifEndWarehouse();
		break;
	}
	if (stepInRound == 12) {
		stepInRound = 0; 
	} 
	else 
	{
		if (!entryErrorInRound) stepInRound++;
	}
	
}

function nextStepDC() {
	var entryErrorInRound = 0;
	switch (stepInRound) {
		case 0:
		roundSim++;
		
		// Warehouse update
		orderReceivedByDC[roundSim]= "";
		orderMadeByDCMinus1[roundSim] = orderMadeByDCMinus1[roundSim-1];
		orderMadeByDCMinus2[roundSim] = orderMadeByDCMinus2[roundSim-1];
		quantityDeliveredByDCTransit1[roundSim] = quantityDeliveredByDCTransit1[roundSim-1];
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit2[roundSim-1];
		quantityReceivedByDC[roundSim]= "";
		inventoryDC[roundSim] = inventoryDC[roundSim-1];
		backorderDC[roundSim] = backorderDC[roundSim-1];
		costInventoryDC[roundSim] = 0;
		cumcostInventoryDC[roundSim] = cumcostInventoryDC[roundSim-1];
		costBackorderDC[roundSim] = 0;
		cumcostBackorderDC[roundSim] = cumcostBackorderDC[roundSim-1];
		costOrderingDC[roundSim] = 0;
		cumcostOrderingDC[roundSim] = cumcostOrderingDC[roundSim-1];
		
		message = "New round starting!";
		displayDCOnly();
		
		drawNotifBeginningDC();
		break;
		case 1: 
		// step 1: DC takes note of the order received from Warehouse  
		message = "DC takes note of the order received from Warehouse";
		actionReq = "Order received to enter!";
		displayDCOnly();
		
		// draw line
		drawLineDC_s01();
		
		drawNotifDC_s01();
		break;
		case 2:
		// step 2: Order received by DC updated 
		if (DCOrderReceived.value() == "" || isNaN(DCOrderReceived.value())) {
			alert("Please fill a valid order received!");
			entryErrorInRound = 1;
		}
		else {
			entryErrorInRound = 0;
			orderReceivedByDC[roundSim] = parseFloat(DCOrderReceived.value());
			message = "Order received by DC updated";
			actionReq = "";
			displayDCOnly();
		
			// draw line
			drawLineDC_s02();
		}
		break;
		case 3:
		// step 3: DC informs the Factory that they are receiving 
		// the order they made two periods earlier 
		message = "DC informs Factory of incoming order";
		actionReq = "Order to transmit to Factory! Waiting shipment ...";
		displayDCOnly();
		
		// draw line
		drawLineDC_s03();
		break;
		case 4:
		// step 4: DC takes note of the shipment received from Factory  
		message = "DC takes note of the shipment received from Factory";
		actionReq = "Quantity received to enter!";
		displayDCOnly();
		
		// draw line
		drawLineDC_s04();
		
		drawNotifDC_s04();
		break;
		case 5:
		// step 5: Quantity received by DC updated 
		if (DCQtyReceived.value() == "" || isNaN(DCQtyReceived.value())) {
			alert("Please fill a valid shipment received!");
			entryErrorInRound = 1;
		}
		else {
			entryErrorInRound = 0;
			quantityReceivedByDC[roundSim] = parseFloat(DCQtyReceived.value());
			message = "Quantity received by DC updated";
			actionReq = "";
			displayDCOnly();
		
			// draw line
			drawLineDC_s05();
		}
		break;
		case 6:
		// step 6: DC informs Warehouse of incoming shipment
		message = "DC informs Warehouse of incoming shipment";
		actionReq = "Shipment sent to Warehouse ...";
		displayDCOnly();
		
		// draw line
		drawLineDC_s06();
		
		break;
		case 7:
		// step 7: Shipment advancement DC to Warehouse
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit1[roundSim];
		quantityDeliveredByDCTransit1[roundSim] = "";
		message = "Shipment advancement DC to Warehouse";
		actionReq = "";
		displayDCOnly();
		
		// draw line
		drawLineDC_s07();
		break;
		case 8:
		// step 8: Quantity added to inventory at the level of DC
		inventoryDC[roundSim] = inventoryDC[roundSim] + quantityReceivedByDC[roundSim];
		message = "Quantity added to DC inventory";
		displayDCOnly();
		
		// draw line
		drawLineDC_s08();
		break;
		case 9:
		// step 9: Order fulfillment at the level of DC 
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
		displayDCOnly();
		
		// draw line
		drawLineDC_s09();
		break;
		case 10:
		// step 10: orders advancing at the level of DC 
		orderMadeByDCMinus2[roundSim] = orderMadeByDCMinus1[roundSim];
		orderMadeByDCMinus1[roundSim] = "";
		message = "Orders advancing at DC";
		actionReq = "DC needs to enter new order!";
		displayDCOnly();
		
		// draw line
		drawLineDC_s10();
		
		// draw line
		drawNotifDC_s10();
		break;
		case 11:
		// step 11: DC enters its order 
		if (DCOrderInput.value() == "" || isNaN(DCOrderInput.value())) {
			alert("Please fill a valid order made!");
			entryErrorInRound = 1;
		}
		else {
			entryErrorInRound = 0;
			orderMadeByDCMinus1[roundSim] = parseFloat(DCOrderInput.value());
			
			if (orderMadeByDCMinus1[roundSim] != 0) {
			costOrderingDC[roundSim] = UCOrderingDC;
			cumcostOrderingDC[roundSim] += costOrderingDC[roundSim];
			message = "New order by DC";
			}
			else {
			message = "No order made by DC";
			}
			
			actionReq = "";
			displayDCOnly();
		
			// draw line
			drawLineDC_s11();
		}
		break;
		case 12:
		// step 12: End of current round
		message = "End of current round!";
		
		// clear DC input
		DCOrderReceived.value('');
		DCQtyReceived.value('');
		DCOrderInput.value(''); 
		
		displayDCOnly();
		
		drawNotifEndDC();
		break;
	}
	if (stepInRound == 12) {
		stepInRound = 0; 
	} 
	else 
	{
		if (!entryErrorInRound) stepInRound++;
	}
	
}

function nextStepFactory() {
	var entryErrorInRound = 0;
	switch (stepInRound) {
		case 0:
		roundSim++;
		
		// Factory update
		
		orderReceivedByFactory[roundSim]= "";
		quantityDeliveredByFactoryTransit1[roundSim] = quantityDeliveredByFactoryTransit1[roundSim-1];
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit2[roundSim-1];
		quantityInProduction1[roundSim] = quantityInProduction1[roundSim-1];
		quantityInProduction2[roundSim] = quantityInProduction2[roundSim-1];
		quantityInProduction3[roundSim] = quantityInProduction3[roundSim-1];
		inventoryFactory[roundSim] = inventoryFactory[roundSim-1];
		backorderFactory[roundSim] = backorderFactory[roundSim-1];
		costInventoryFactory[roundSim] = 0;
		cumcostInventoryFactory[roundSim] = cumcostInventoryFactory[roundSim-1];
		costBackorderFactory[roundSim] = 0;
		cumcostBackorderFactory[roundSim] = cumcostBackorderFactory[roundSim-1];
		costOrderingFactory[roundSim] = 0;
		cumcostOrderingFactory[roundSim] = cumcostOrderingFactory[roundSim-1];
		
		message = "New round starting!";
		displayFactoryOnly();
		
		drawNotifBeginningFactory();
		break;
		
		case 1: 
		// step 1: Factory takes note of the order received from DC  
		message = "Factory takes note of the order received from DC";
		actionReq = "Order received to enter!";
		displayFactoryOnly();
		
		// draw line
		drawLineFactory_s01();
		
		drawNotifFactory_s01();
		break;
		case 2:
		if (factoryOrderReceived.value() == "" || isNaN(factoryOrderReceived.value())) {
			alert("Please fill a valid order received!");
			entryErrorInRound = 1;
		}
		else {
			// step 2: Order received by Factory updated 
			entryErrorInRound = 0;
			orderReceivedByFactory[roundSim] = parseFloat(factoryOrderReceived.value());
			message = "Order received by Factory updated";
			actionReq = "";
			displayFactoryOnly();
		
			// draw line
			drawLineFactory_s02();
		}
		break;
		
		case 3:
		// step 3: Factory informs DC of incoming shipment
		message = "Factory informs DC of incoming shipment";
		actionReq = "Shipment sent to DC ...";
		displayFactoryOnly();
		
		// draw line
		drawLineFactory_s03();
		break;
		
		case 4:
		// step 4: Shipment advancement Factory to DC 
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit1[roundSim];
		quantityDeliveredByFactoryTransit1[roundSim] = "";
		message = "Shipment advancement Factory to DC";
		actionReq = "";
		displayFactoryOnly();
		
		// draw line
		drawLineFactory_s04();
		break;
		
		case 5:
		// step 5: Quantity added to inventory at the level of factory 
		inventoryFactory[roundSim] = inventoryFactory[roundSim] + quantityInProduction3[roundSim];
		quantityInProduction3[roundSim] = "";
		message = "Quantity added to Factory inventory";
		displayFactoryOnly();
		
		// draw line
		drawLineFactory_s05();
		break;
		
		case 6:
		// step 6: Order fulfillment at the level of factory 
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
		displayFactoryOnly();
		
		// draw line
		drawLineFactory_s06();
		break;
		
		case 7:
		// step 7: Production advancing at the level of Factory 
		quantityInProduction3[roundSim] = quantityInProduction2[roundSim];
		quantityInProduction2[roundSim] = quantityInProduction1[roundSim];
		quantityInProduction1[roundSim] = "";
		message = "Production advancement at Factory";
		actionReq = "Factory needs to enter new order!";
		displayFactoryOnly();
		
		// draw line
		drawLineFactory_s07();
		
		// draw line
		drawNotifFactory_s07();
		break;
		
		case 8:
		if (factoryOrderInput.value() == "" || isNaN(factoryOrderInput.value())) {
			alert("Please fill a valid production order!");
			entryErrorInRound = 1;
		}
		else {
			// step 8: Factory enters its production order 
			entryErrorInRound = 0;
			quantityInProduction1[roundSim] = parseFloat(factoryOrderInput.value());
			
			if (quantityInProduction1[roundSim] != 0) {
				costOrderingFactory[roundSim] = UCOrderingFactory;
				cumcostOrderingFactory[roundSim] += costOrderingFactory[roundSim];
				message = "New production order by Factory";
			}
			else {
				message = "No production order made by Factory";
			}
			
			actionReq = "";
			displayFactoryOnly();
		
			// draw line
			drawLineFactory_s08();
		}
		break;
		
		case 9:
		// step 9: End of current round
		message = "End of current round!";
		
		// clear Factory input
		factoryOrderReceived.value('');
		factoryOrderInput.value(''); 
		
		displayFactoryOnly();
		
		drawNotifEndFactory();
		break;
	}
	if (stepInRound == 9) {
		stepInRound = 0; 
	} 
	else 
	{
		if (!entryErrorInRound) stepInRound++;
	}
	
}

function nextRound() {
	
	if (role == "Admin") {
	
	if (stepInRound != 0) {
		alert('It seems you are in the middle of a round. Please finish all its steps first before running a new one!');
		// DO NOTHING: you need to finish the previous round first
	}
	else {
		if (factoryOrderInput.value() == "" || warehouseOrderInput.value() == "" || DCOrderInput.value() == ""|| retailerOrderInput.value() == "" ||
		isNaN(factoryOrderInput.value()) || isNaN(warehouseOrderInput.value()) || isNaN(DCOrderInput.value()) || isNaN(retailerOrderInput.value())) {
			alert('Please make sure valid default orders values are entered. You may change these as the game progresses.');
		}
		
		else {
		//
		// update round first
		roundSim++;
		
		// Retailer update
		orderReceivedByRetailer[roundSim] = "";
		orderMadeByRetailerMinus1[roundSim] = orderMadeByRetailerMinus1[roundSim-1];
		orderMadeByRetailerMinus2[roundSim] = orderMadeByRetailerMinus2[roundSim-1];
		quantityDeliveredByRetailer[roundSim] = "";
		quantityReceivedByRetailer[roundSim] = "";
		inventoryRetailer[roundSim] = inventoryRetailer[roundSim-1];
		backorderRetailer[roundSim] = backorderRetailer[roundSim-1];
		costInventoryRetailer[roundSim] = 0;
		cumcostInventoryRetailer[roundSim] = cumcostInventoryRetailer[roundSim-1];
		costBackorderRetailer[roundSim] = 0;
		cumcostBackorderRetailer[roundSim] = cumcostBackorderRetailer[roundSim-1];
		costOrderingRetailer[roundSim] = 0;
		cumcostOrderingRetailer[roundSim] = cumcostOrderingRetailer[roundSim-1];
		
		// Warehouse update
		orderReceivedByWarehouse[roundSim]= "";
		orderMadeByWarehouseMinus1[roundSim] = orderMadeByWarehouseMinus1[roundSim-1];
		orderMadeByWarehouseMinus2[roundSim] = orderMadeByWarehouseMinus2[roundSim-1];
		quantityDeliveredByWarehouseTransit1[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim-1];
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit2[roundSim-1];
		quantityReceivedByWarehouse[roundSim]= "";
		inventoryWarehouse[roundSim] = inventoryWarehouse[roundSim-1];
		backorderWarehouse[roundSim] = backorderWarehouse[roundSim-1];
		costInventoryWarehouse[roundSim] = 0;
		cumcostInventoryWarehouse[roundSim] = cumcostInventoryWarehouse[roundSim-1];
		costBackorderWarehouse[roundSim] = 0;
		cumcostBackorderWarehouse[roundSim] = cumcostBackorderWarehouse[roundSim-1];
		costOrderingWarehouse[roundSim] = 0;
		cumcostOrderingWarehouse[roundSim] = cumcostOrderingWarehouse[roundSim-1];
		
		// DC update
		orderReceivedByDC[roundSim]= "";
		orderMadeByDCMinus1[roundSim] = orderMadeByDCMinus1[roundSim-1];
		orderMadeByDCMinus2[roundSim] = orderMadeByDCMinus2[roundSim-1];
		quantityDeliveredByDCTransit1[roundSim] = quantityDeliveredByDCTransit1[roundSim-1];
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit2[roundSim-1];
		quantityReceivedByDC[roundSim]= "";
		inventoryDC[roundSim] = inventoryDC[roundSim-1];
		backorderDC[roundSim] = backorderDC[roundSim-1];
		costInventoryDC[roundSim] = 0;
		cumcostInventoryDC[roundSim] = cumcostInventoryDC[roundSim-1];
		costBackorderDC[roundSim] = 0;
		cumcostBackorderDC[roundSim] = cumcostBackorderDC[roundSim-1];
		costOrderingDC[roundSim] = 0;
		cumcostOrderingDC[roundSim] = cumcostOrderingDC[roundSim-1];
		
		// Factory update
		orderReceivedByFactory[roundSim]= "";
		quantityDeliveredByFactoryTransit1[roundSim] = quantityDeliveredByFactoryTransit1[roundSim-1];
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit2[roundSim-1];
		quantityInProduction1[roundSim] = quantityInProduction1[roundSim-1];
		quantityInProduction2[roundSim] = quantityInProduction2[roundSim-1];
		quantityInProduction3[roundSim] = quantityInProduction3[roundSim-1];
		inventoryFactory[roundSim] = inventoryFactory[roundSim-1];
		backorderFactory[roundSim] = backorderFactory[roundSim-1];
		costInventoryFactory[roundSim] = 0;
		cumcostInventoryFactory[roundSim] = cumcostInventoryFactory[roundSim-1];
		costBackorderFactory[roundSim] = 0;
		cumcostBackorderFactory[roundSim] = cumcostBackorderFactory[roundSim-1];
		costOrderingFactory[roundSim] = 0;
		cumcostOrderingFactory[roundSim] = cumcostOrderingFactory[roundSim-1];
		
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
		// orderReceivedByRetailer[roundSim] = Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize);
		
		orderReceivedByRetailer[roundSim] = generateCustomerOrder();
		
		// step 8: Shipment advancement factory to DC 
		quantityDeliveredByFactoryTransit2[roundSim] = quantityDeliveredByFactoryTransit1[roundSim];
		quantityDeliveredByFactoryTransit1[roundSim] = "";
		
		// step 9: Quantity added to inventory at the level of factory 
		inventoryFactory[roundSim] = inventoryFactory[roundSim] + quantityInProduction3[roundSim];
		quantityInProduction3[roundSim] = "";
		
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
		quantityInProduction1[roundSim] = "";
		
		// step 12: Factory enters its production order 
		quantityInProduction1[roundSim] = parseFloat(factoryOrderInput.value());
		if (quantityInProduction1[roundSim] != 0) {
			costOrderingFactory[roundSim] = UCOrderingFactory;
			cumcostOrderingFactory[roundSim] += costOrderingFactory[roundSim];
			}

		
		// step 13: Shipment advancement DC to warehouse
		quantityDeliveredByDCTransit2[roundSim] = quantityDeliveredByDCTransit1[roundSim];
		quantityDeliveredByDCTransit1[roundSim] = "";
		
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
		orderMadeByDCMinus1[roundSim] = "";
		
		// step 17: DC enters its order 
		orderMadeByDCMinus1[roundSim] = parseFloat(DCOrderInput.value());
		if (orderMadeByDCMinus1[roundSim] != 0) {
			costOrderingDC[roundSim] = UCOrderingDC;
			cumcostOrderingDC[roundSim] += costOrderingDC[roundSim];
			}
		
		// step 18: Shipment advancement warehouse to retailer
		quantityDeliveredByWarehouseTransit2[roundSim] = quantityDeliveredByWarehouseTransit1[roundSim];
		quantityDeliveredByWarehouseTransit1[roundSim] = "";
		
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
		orderMadeByWarehouseMinus1[roundSim] = "";
		
		// step 22: Warehouse enters its order 
		orderMadeByWarehouseMinus1[roundSim] = parseFloat(warehouseOrderInput.value());
		if (orderMadeByWarehouseMinus1[roundSim] != 0) {
			costOrderingWarehouse[roundSim] = UCOrderingWarehouse;
			cumcostOrderingWarehouse[roundSim] += costOrderingWarehouse[roundSim];
			}
		
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
		orderMadeByRetailerMinus1[roundSim] = "";
		
		// step 26: Retailer enters its order 
		orderMadeByRetailerMinus1[roundSim] = parseFloat(retailerOrderInput.value());
		if (orderMadeByRetailerMinus1[roundSim] != 0) {
			costOrderingRetailer[roundSim] = UCOrderingRetailer;
			cumcostOrderingRetailer[roundSim] += costOrderingRetailer[roundSim];
			}
		
		// step 27: End of current round
		
		// stepInRound = 0; NO NEED FOR THIS IN THE BATCH MODE
		
		displayAll();	
	}
	
	}
	
	}
	
	else {
		alert("Sorry, but you need to be the Admin for round-based play!");
	}
}

function generateCharts() {
	
	switch (role) {
		case "Admin": generateChartsAll();
		break;
		case "Retailer": generateChartsRetailer();
		break;
		case "Warehouse": generateChartsWarehouse();
		break;	
		case "DC": generateChartsDC();
		break;
		case "Factory": generateChartsFactory();
		break;	
	}
}

function generateChartsAll() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));

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

function generateChartsRetailer() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));
localStorage.setItem("list_orders_retailer",  JSON.stringify(orderMadeByRetailerMinus1));
localStorage.setItem("list_inventory_retailer",  JSON.stringify(inventoryRetailer));
localStorage.setItem("list_backorder_retailer",  JSON.stringify(backorderRetailer));

var chartWindow = window.open(url="charts/chartsRetailer.html");
}

function generateChartsWarehouse() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));
localStorage.setItem("list_orders_warehouse",  JSON.stringify(orderMadeByWarehouseMinus1));
localStorage.setItem("list_inventory_warehouse",  JSON.stringify(inventoryWarehouse));
localStorage.setItem("list_backorder_warehouse",  JSON.stringify(backorderWarehouse));

var chartWindow = window.open(url="charts/chartsWarehouse.html");

}

function generateChartsDC() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));
localStorage.setItem("list_orders_DC",  JSON.stringify(orderMadeByDCMinus1));
localStorage.setItem("list_inventory_DC",  JSON.stringify(inventoryDC));
localStorage.setItem("list_backorder_DC",  JSON.stringify(backorderDC));

var chartWindow = window.open(url="charts/chartsDC.html");

}

function generateChartsFactory() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));
localStorage.setItem("list_orders_factory",  JSON.stringify(quantityInProduction1));
localStorage.setItem("list_inventory_factory",  JSON.stringify(inventoryFactory));
localStorage.setItem("list_backorder_factory",  JSON.stringify(backorderFactory));

var chartWindow = window.open(url="charts/chartsFactory.html");

}

function generateTables() {
	
	switch (role) {
		case "Admin": generateTablesAll();
		break;
		case "Retailer": generateTablesRetailer();
		break;
		case "Warehouse": generateTablesWarehouse();
		break;
		case "DC": generateTablesDC();
		break;
		case "Factory": generateTablesFactory();
		break;
	}
	
}

function generateTablesAll() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));

localStorage.setItem("list_orders_retailer",  JSON.stringify(orderMadeByRetailerMinus1));
localStorage.setItem("list_inventory_retailer",  JSON.stringify(inventoryRetailer));
localStorage.setItem("list_backorder_retailer",  JSON.stringify(backorderRetailer));
localStorage.setItem("list_cost_inventory_retailer",  JSON.stringify(costInventoryRetailer));
localStorage.setItem("list_cumcost_inventory_retailer",  JSON.stringify(cumcostInventoryRetailer));
localStorage.setItem("list_cost_backorder_retailer",  JSON.stringify(costBackorderRetailer));
localStorage.setItem("list_cumcost_backorder_retailer",  JSON.stringify(cumcostBackorderRetailer));
localStorage.setItem("list_cost_ordering_retailer",  JSON.stringify(costOrderingRetailer));
localStorage.setItem("list_cumcost_ordering_retailer",  JSON.stringify(cumcostOrderingRetailer));

localStorage.setItem("list_orders_warehouse",  JSON.stringify(orderMadeByWarehouseMinus1));
localStorage.setItem("list_inventory_warehouse",  JSON.stringify(inventoryWarehouse));
localStorage.setItem("list_backorder_warehouse",  JSON.stringify(backorderWarehouse));
localStorage.setItem("list_cost_inventory_warehouse",  JSON.stringify(costInventoryWarehouse));
localStorage.setItem("list_cumcost_inventory_warehouse",  JSON.stringify(cumcostInventoryWarehouse));
localStorage.setItem("list_cost_backorder_warehouse",  JSON.stringify(costBackorderWarehouse));
localStorage.setItem("list_cumcost_backorder_warehouse",  JSON.stringify(cumcostBackorderWarehouse));
localStorage.setItem("list_cost_ordering_warehouse",  JSON.stringify(costOrderingWarehouse));
localStorage.setItem("list_cumcost_ordering_warehouse",  JSON.stringify(cumcostOrderingWarehouse));

localStorage.setItem("list_orders_DC",  JSON.stringify(orderMadeByDCMinus1));
localStorage.setItem("list_inventory_DC",  JSON.stringify(inventoryDC));
localStorage.setItem("list_backorder_DC",  JSON.stringify(backorderDC));
localStorage.setItem("list_cost_inventory_DC",  JSON.stringify(costInventoryDC));
localStorage.setItem("list_cumcost_inventory_DC",  JSON.stringify(cumcostInventoryDC));
localStorage.setItem("list_cost_backorder_DC",  JSON.stringify(costBackorderDC));
localStorage.setItem("list_cumcost_backorder_DC",  JSON.stringify(cumcostBackorderDC));
localStorage.setItem("list_cost_ordering_DC",  JSON.stringify(costOrderingDC));
localStorage.setItem("list_cumcost_ordering_DC",  JSON.stringify(cumcostOrderingDC));

localStorage.setItem("list_orders_factory",  JSON.stringify(quantityInProduction1));
localStorage.setItem("list_inventory_factory",  JSON.stringify(inventoryFactory));
localStorage.setItem("list_backorder_factory",  JSON.stringify(backorderFactory));
localStorage.setItem("list_cost_inventory_factory",  JSON.stringify(costInventoryFactory));
localStorage.setItem("list_cumcost_inventory_factory",  JSON.stringify(cumcostInventoryFactory));
localStorage.setItem("list_cost_backorder_factory",  JSON.stringify(costBackorderFactory));
localStorage.setItem("list_cumcost_backorder_factory",  JSON.stringify(cumcostBackorderFactory));
localStorage.setItem("list_cost_ordering_factory",  JSON.stringify(costOrderingFactory));
localStorage.setItem("list_cumcost_ordering_factory",  JSON.stringify(cumcostOrderingFactory));

var chartWindow = window.open(url="charts/TablesAll.html");

}

function generateTablesRetailer() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));
localStorage.setItem("list_orders_retailer",  JSON.stringify(orderMadeByRetailerMinus1));
localStorage.setItem("list_inventory_retailer",  JSON.stringify(inventoryRetailer));
localStorage.setItem("list_backorder_retailer",  JSON.stringify(backorderRetailer));
localStorage.setItem("list_cost_inventory_retailer",  JSON.stringify(costInventoryRetailer));
localStorage.setItem("list_cumcost_inventory_retailer",  JSON.stringify(cumcostInventoryRetailer));
localStorage.setItem("list_cost_backorder_retailer",  JSON.stringify(costBackorderRetailer));
localStorage.setItem("list_cumcost_backorder_retailer",  JSON.stringify(cumcostBackorderRetailer));
localStorage.setItem("list_cost_ordering_retailer",  JSON.stringify(costOrderingRetailer));
localStorage.setItem("list_cumcost_ordering_retailer",  JSON.stringify(cumcostOrderingRetailer));

var chartWindow = window.open(url="charts/TablesRetailer.html");
}

function generateTablesWarehouse() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));
localStorage.setItem("list_orders_warehouse",  JSON.stringify(orderMadeByWarehouseMinus1));
localStorage.setItem("list_inventory_warehouse",  JSON.stringify(inventoryWarehouse));
localStorage.setItem("list_backorder_warehouse",  JSON.stringify(backorderWarehouse));
localStorage.setItem("list_cost_inventory_warehouse",  JSON.stringify(costInventoryWarehouse));
localStorage.setItem("list_cumcost_inventory_warehouse",  JSON.stringify(cumcostInventoryWarehouse));
localStorage.setItem("list_cost_backorder_warehouse",  JSON.stringify(costBackorderWarehouse));
localStorage.setItem("list_cumcost_backorder_warehouse",  JSON.stringify(cumcostBackorderWarehouse));
localStorage.setItem("list_cost_ordering_warehouse",  JSON.stringify(costOrderingWarehouse));
localStorage.setItem("list_cumcost_ordering_warehouse",  JSON.stringify(cumcostOrderingWarehouse));

var chartWindow = window.open(url="charts/TablesWarehouse.html");

}



function generateTablesDC() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));
localStorage.setItem("list_orders_DC",  JSON.stringify(orderMadeByDCMinus1));
localStorage.setItem("list_inventory_DC",  JSON.stringify(inventoryDC));
localStorage.setItem("list_backorder_DC",  JSON.stringify(backorderDC));
localStorage.setItem("list_cost_inventory_DC",  JSON.stringify(costInventoryDC));
localStorage.setItem("list_cumcost_inventory_DC",  JSON.stringify(cumcostInventoryDC));
localStorage.setItem("list_cost_backorder_DC",  JSON.stringify(costBackorderDC));
localStorage.setItem("list_cumcost_backorder_DC",  JSON.stringify(cumcostBackorderDC));
localStorage.setItem("list_cost_ordering_DC",  JSON.stringify(costOrderingDC));
localStorage.setItem("list_cumcost_ordering_DC",  JSON.stringify(cumcostOrderingDC));

var chartWindow = window.open(url="charts/TablesDC.html");
}

function generateTablesFactory() {
localStorage.setItem("number_rounds",  JSON.stringify(roundSim));
localStorage.setItem("list_orders_factory",  JSON.stringify(quantityInProduction1));
localStorage.setItem("list_inventory_factory",  JSON.stringify(inventoryFactory));
localStorage.setItem("list_backorder_factory",  JSON.stringify(backorderFactory));
localStorage.setItem("list_cost_inventory_factory",  JSON.stringify(costInventoryFactory));
localStorage.setItem("list_cumcost_inventory_factory",  JSON.stringify(cumcostInventoryFactory));
localStorage.setItem("list_cost_backorder_factory",  JSON.stringify(costBackorderFactory));
localStorage.setItem("list_cumcost_backorder_factory",  JSON.stringify(cumcostBackorderFactory));
localStorage.setItem("list_cost_ordering_factory",  JSON.stringify(costOrderingFactory));
localStorage.setItem("list_cumcost_ordering_factory",  JSON.stringify(cumcostOrderingFactory));

var chartWindow = window.open(url="charts/TablesFactory.html");
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

function displayWarehouseOnly() {
	clear();
	displayInit();
	displayRound();
	displayWarehouse();
	displayWarehousePlus();
}

function displayDCOnly() {
	clear();
	displayInit();
	displayRound();
	displayDC();
	displayDCPlus();
}

function displayFactoryOnly() {
	clear();
	displayInit();
	displayRound();
	displayFactory();
	displayFactoryPlus();
}

function displayRetailer() {
	
	fill(0, 0, 0);
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
	var colorInv = 'G';
	
	if (inventoryRetailer[roundSim] < inventoryRetailer[0]/2 && inventoryRetailer[roundSim] >= inventoryRetailer[0]/4) colorInv = 'Y';
	if (inventoryRetailer[roundSim] < inventoryRetailer[0]/4 && inventoryRetailer[roundSim] > 0) colorInv = 'O';
	if (inventoryRetailer[roundSim] == 0) colorInv = 'R';
	
	switch (colorInv) {
		case 'G': 
			fill(0, 153, 0); 
			break;
		case 'Y': 
			fill(220, 220, 0); 
			break;
		case 'O': 
			fill(255,130,0); 
			break;
		case 'R': 
			fill(215,0,0); 
			break;
	}
		
	text(inventoryRetailer[roundSim], 155, 315);
	fill(0, 0, 0);
	
	text("Backorder: " + backorderRetailer[roundSim], 20, 170);
	
	var colorBO = 'G';
	if (backorderRetailer[roundSim] > 0) colorBO = 'R';
	
	switch (colorBO) {
		case 'G': 
			fill(0, 153, 0); 
			break;
		case 'R': 
			fill(215,0,0); 
			break;
	}
	text(backorderRetailer[roundSim], 155, 335);
	fill(0, 0, 0);
	
	text("Cost Inventory: " + costInventoryRetailer[roundSim] + " - cumul.: " + Math.round(cumcostInventoryRetailer[roundSim]), 20, 210);
	text("Cost Backorder: " + costBackorderRetailer[roundSim] + " - cumul.: " + Math.round(cumcostBackorderRetailer[roundSim]), 20, 225);
	text("Cost Ordering: " + costOrderingRetailer[roundSim] + " - cumul.: " + Math.round(cumcostOrderingRetailer[roundSim]), 20, 240);
	
	text("Order", 20, 445);
	
	textSize(12);
	noFill();
	rect(175,175,120,22);
	fill(215,0,0); 
	text("Cumulative Cost: ", 180, 170);
	text(Math.round(cumcostInventoryRetailer[roundSim]+cumcostBackorderRetailer[roundSim]+cumcostOrderingRetailer[roundSim]), 180, 190);
	textSize(11);
	fill(0, 0, 0);
	

}

function displayRetailerPlus() {
	
	text("Qty. Received", 200, 395);
}

function displayWarehouse() {
	fill(0, 0, 0);
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
	
	var colorInv = 'G';
	
	if (inventoryWarehouse[roundSim] < inventoryWarehouse[0]/2 && inventoryWarehouse[roundSim] >= inventoryWarehouse[0]/4) colorInv = 'Y';
	if (inventoryWarehouse[roundSim] < inventoryWarehouse[0]/4 && inventoryWarehouse[roundSim] > 0) colorInv = 'O';
	if (inventoryWarehouse[roundSim] == 0) colorInv = 'R';
	
	switch (colorInv) {
		case 'G': 
			fill(0, 153, 0); 
			break;
		case 'Y': 
			fill(220, 220, 0); 
			break;
		case 'O': 
			fill(255,130,0); 
			break;
		case 'R': 
			fill(215,0,0); 
			break;
	}
	text(inventoryWarehouse[roundSim], 155+300, 315);
	
	fill(0,0,0);
	text("Backorder: " + backorderWarehouse[roundSim], 20+300, 185);
	
	var colorBO = 'G';
	if (backorderWarehouse[roundSim] > 0) colorBO = 'R';
	
	switch (colorBO) {
		case 'G': 
			fill(0, 153, 0); 
			break;
		case 'R': 
			fill(215,0,0); 
			break;
	}
	
	text(backorderWarehouse[roundSim], 155+300, 335);
	fill(0,0,0);
	
	text("Cost Inventory: " + costInventoryWarehouse[roundSim] + " - cumul.: " + Math.round(cumcostInventoryWarehouse[roundSim]), 20+300, 210);
	text("Cost Backorder: " + costBackorderWarehouse[roundSim] + " - cumul.: " + Math.round(cumcostBackorderWarehouse[roundSim]), 20+300, 225);
	text("Cost Ordering: " + costOrderingWarehouse[roundSim] + " - cumul.: " + Math.round(cumcostOrderingWarehouse[roundSim]), 20+300, 240);
	
	text("Order", 20+300, 445);
	
	textSize(12);
	noFill();
	rect(175+300,175,120,22);
	fill(215,0,0); 
	text("Cumulative Cost: ", 180+300, 170);
	text(Math.round(cumcostInventoryWarehouse[roundSim]+cumcostBackorderWarehouse[roundSim]+cumcostOrderingWarehouse[roundSim]), 180+300, 190);
	textSize(11);
	fill(0, 0, 0);

}

function displayWarehousePlus() {
	text("Order Received", 20+300, 395);
	text("Qty. Received", 200+300, 395);
}

function displayDC() {
	fill(0, 0, 0);
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
	var colorInv = 'G';
	
	if (inventoryDC[roundSim] < inventoryDC[0]/2 && inventoryDC[roundSim] >= inventoryDC[0]/4) colorInv = 'Y';
	if (inventoryDC[roundSim] < inventoryDC[0]/4 && inventoryDC[roundSim] > 0) colorInv = 'O';
	if (inventoryDC[roundSim] == 0) colorInv = 'R';
	
	switch (colorInv) {
		case 'G': 
			fill(0, 153, 0); 
			break;
		case 'Y': 
			fill(220, 220, 0); 
			break;
		case 'O': 
			fill(255,130,0); 
			break;
		case 'R': 
			fill(215,0,0); 
			break;
	}
	
	text(inventoryDC[roundSim], 155+600, 315);
	
	fill(0,0,0);
	text("Backorder: " + backorderDC[roundSim], 20+600, 185);
	
	var colorBO = 'G';
	if (backorderDC[roundSim] > 0) colorBO = 'R';
	
	switch (colorBO) {
		case 'G': 
			fill(0, 153, 0); 
			break;
		case 'R': 
			fill(215,0,0); 
			break;
	}
	
	text(backorderDC[roundSim], 155+600, 335);
	fill(0,0,0);
	
	text("Cost Inventory: " + costInventoryDC[roundSim] + " - cumul.: " + Math.round(cumcostInventoryDC[roundSim]), 20+600, 210);
	text("Cost Backorder: " + costBackorderDC[roundSim] + " - cumul.: " + Math.round(cumcostBackorderDC[roundSim]), 20+600, 225);
	text("Cost Ordering: " + costOrderingDC[roundSim] + " - cumul.: " + Math.round(cumcostOrderingDC[roundSim]), 20+600, 240);
	
	text("Order", 20+600, 445);
	
	textSize(12);
	noFill();
	rect(175+600,175,120,22);
	fill(215,0,0); 
	text("Cumulative Cost: ", 180+600, 170);
	text(Math.round(cumcostInventoryDC[roundSim]+cumcostBackorderDC[roundSim]+cumcostOrderingDC[roundSim]), 180+600, 190);
	textSize(11);
	fill(0, 0, 0);

}

function displayDCPlus() {
	text("Order Received", 20+600, 395);
	text("Qty. Received", 200+600, 395);
}

function displayFactory() {
	fill(0, 0, 0);
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
	
	var colorInv = 'G';
	
	if (inventoryFactory[roundSim] < inventoryFactory[0]/2 && inventoryFactory[roundSim] >= inventoryFactory[0]/4) colorInv = 'Y';
	if (inventoryFactory[roundSim] < inventoryFactory[0]/4 && inventoryFactory[roundSim] > 0) colorInv = 'O';
	if (inventoryFactory[roundSim] == 0) colorInv = 'R';
	
	switch (colorInv) {
		case 'G': 
			fill(0, 153, 0); 
			break;
		case 'Y': 
			fill(220, 220, 0); 
			break;
		case 'O': 
			fill(255,130,0); 
			break;
		case 'R': 
			fill(215,0,0); 
			break;
	}
	
	text(inventoryFactory[roundSim], 155+900, 315);
	fill(0,0,0);
	
	text("Backorder: " + backorderFactory[roundSim], 20+900, 185);
	
	var colorBO = 'G';
	if (backorderFactory[roundSim] > 0) colorBO = 'R';
	
	switch (colorBO) {
		case 'G': 
			fill(0, 153, 0); 
			break;
		case 'R': 
			fill(215,0,0); 
			break;
	}
	text(backorderFactory[roundSim], 155+900, 335);
	fill(0,0,0);
	
	text("Cost Inventory: " + costInventoryFactory[roundSim] + " - cumul.: " + Math.round(cumcostInventoryFactory[roundSim]), 20+900, 210);
	text("Cost Backorder: " + costBackorderFactory[roundSim] + " - cumul.: " + Math.round(cumcostBackorderFactory[roundSim]), 20+900, 225);
	text("Cost Ordering: " + costOrderingFactory[roundSim] + " - cumul.: " + Math.round(cumcostOrderingFactory[roundSim]), 20+900, 240);
	
	text("Order", 20+900, 445);
	
	textSize(12);
	noFill();
	rect(175+900,175,120,22);
	fill(215,0,0); 
	text("Cumulative Cost: ", 180+900, 170);
	text(Math.round(cumcostInventoryFactory[roundSim]+cumcostBackorderFactory[roundSim]+cumcostOrderingFactory[roundSim]), 180+900, 190);
	textSize(11);
	fill(0, 0, 0);

}

function displayFactoryPlus() {
	text("Order Received", 20+900, 395);
}

function displayInit() {
	//background(255);

	fill(0, 0, 0);
	textSize(18);
	text("Playing as: ", 20, 20); 
	text("Password (for Admin):", 515, 20); 
	
	textSize(18);
	text("Retailer", 120, 50);
	text("Warehouse", 120+300, 50);
	text("DC", 120+600, 50);
	text("Factory", 120+900, 50);
	textSize(18);
	text("Game Log", 20+1200, 20);
	text("Game Parameters", 20+1200, 320);
	
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
	triangle(20,340,54,340,37,310);
	triangle(230,340,264,340,247,310);
	
	// Area Retailer
	rect(10,30,300-10,480);
	rect(10,30,300-10,30);
	rect(10,30,300-10,510);
	
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
	triangle(20+300,340,54+300,340,37+300,310);
	triangle(60+300,340,94+300,340,77+300,310);
	triangle(230+300,340,264+300,340,247+300,310);
	
	// Area Warehouse
	
	rect(10+300,30,300-10,480);
	rect(10+300,30,300-10,30);
	rect(10+300,30,300-10,510);
	
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
	triangle(20+600,340,54+600,340,37+600,310);
	triangle(60+600,340,94+600,340,77+600,310);
	triangle(230+600,340,264+600,340,247+600,310);
	
	// Area DC
	rect(10+600,30,300-10,480);
	rect(10+600,30,300-10,30);
	rect(10+600,30,300-10,510);
	
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
	triangle(20+900,340,54+900,340,37+900,310);
	triangle(60+900,340,94+900,340,77+900,310);
	
	triangle(230+900,340,264+900,340,247+900,310);
	
	// Area Factory
	rect(10+900,30,300-10,480);
	rect(10+900,30,300-10,30);
	rect(10+900,30,300-10,510);
	
	// Play Area
	rect(10,540,1200-10,40);
	fill(0, 0, 0);
	textSize(18);
	text("Play ", 20, 560); 
	noFill();
	
	// Summary Area
	rect(10,580,1200-10,40);
	fill(0, 0, 0);
	textSize(18);
	text("Display Summary", 20, 600); 
	noFill();
	
	// Music Area
	rect(10+900,580,300-10,40);
	fill(0, 0, 0);
	textSize(18);
	text("Music", 20+900, 600); 
	noFill();
	
	
	// Game log area
	rect(10+1200,30,300,260);
	
	// Game parameters area
	rect(10+1200,330,300,290);
	
	//parameters
	//
	
	
	// Copyright text
	fill(0, 0, 0);
	textSize(9);
	text("Copyright 2019 Jawad Abrache. All rights reserved.", 100+1200, 610);
	noFill();
}

function displayRound() {
	textSize(11);
	fill(0, 0, 0);
	text("You are playing as the " + role, 20+1200, 80);
	text("-------------------------------------------------------------", 20+1200, 100);
	text("Round " + roundSim + " - Step " + stepInRound, 20+1200, 120);
	text("-------------------------------------------------------------", 20+1200, 140);
	text("What is happening: ", 20+1200, 160);
	fill(0,0,255);
	text(message, 25+1200, 180);
	fill(0, 0, 0);
	text("-------------------------------------------------------------", 20+1200, 200);
	text("Action needed: ", 20+1200, 220);
	fill(255, 0, 0);
	text(actionReq, 25+1200, 240);
	fill(0, 0, 0);
	text("-------------------------------------------------------------", 20+1200, 260);
	
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
		
		pattern = patternInput.value();
		patternInput.value('');
		
		switch(pattern) {
			case "1":
			minOrderSize = parseFloat(minOrderSizeInput1.value());
			maxOrderSize = parseFloat(maxOrderSizeInput1.value());
			minOrderSizeInput1.value('');
			maxOrderSizeInput1.value('');
			break;
			case "2":
			minOrderSize = parseFloat(minOrderSizeInput2.value());
			maxOrderSize = parseFloat(maxOrderSizeInput2.value());
			amplifMultip2 = parseFloat(amplifMultipInput2.value());
			amplifAfter = parseFloat(amplifAfterInput.value());
			minOrderSizeInput2.value('');
			maxOrderSizeInput2.value('');
			amplifMultipInput2.value('');
			amplifAfterInput.value('');
			break;
			case "3":
			minOrderSize = parseFloat(minOrderSizeInput3.value());
			maxOrderSize = parseFloat(maxOrderSizeInput3.value());
			amplifMultip3 = parseFloat(amplifMultipInput3.value());
			amplifEvery = parseFloat(amplifEveryInput.value());
			minOrderSizeInput3.value('');
			maxOrderSizeInput3.value('');
			amplifMultipInput3.value('');
			amplifEveryInput.value('');
			break;
		}	
		
	}
	
	else {
		alert("Sorry, but you need to be the Admin to modify the game parameters!");
	}
}

function generateCustomerOrder() {
	
	switch(pattern) {
			case "1":
			return(Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize));
			break;
			case "2":
			if (roundSim < amplifAfter) return(Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize));
			else return(Math.floor(amplifMultip2 *  (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize)));
			break;
			case "3": 
			if (roundSim % amplifEvery) return(Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize));
			else return(Math.floor(amplifMultip3 *  (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize)));
			break;
			default:
			return(Math.floor (Math.random() * (maxOrderSize - minOrderSize) + minOrderSize));
			break;
		}	
}

function clearAllInputs() {
	// clear retailer input
	retailerQtyReceived.value('');
	retailerOrderInput.value('');
		
	// clear warehouse input
	warehouseOrderReceived.value('');
	warehouseQtyReceived.value('');
	warehouseOrderInput.value('');
		
	// clear DC input
	DCOrderReceived.value('');
	DCQtyReceived.value('');
	DCOrderInput.value('');
		
	// clear factory input
	factoryOrderReceived.value('');
	factoryOrderInput.value(''); 
}

function drawNotifBeginningRetailer() {
	textSize(18);
	text("Round is beginning ...", 80, 450); 
}

function drawNotifEndRetailer() {
	textSize(18);
	text("This is the end ...", 80, 450); 
}

function drawNotifBeginningWarehouse() {
	textSize(18);
	text("Round is beginning ...", 80+300, 450); 
}

function drawNotifEndWarehouse() {
	textSize(18);
	text("This is the end ...", 80+300, 450); 
}

function drawNotifBeginningDC() {
	textSize(18);
	text("Round is beginning ...", 80+600, 450); 
}

function drawNotifEndDC() {
	textSize(18);
	text("This is the end ...", 80+600, 450); 
}

function drawNotifBeginningFactory() {
	textSize(18);
	text("Round is beginning ...", 80+900, 450); 
}

function drawNotifEndFactory() {
	textSize(18);
	text("This is the end ...", 80+900, 450); 
}

function drawLineRetailer_s01() {
	drawInformationFlowLine(260,255,260,245,0);
	drawInformationFlowLine(260,245,340,245,0);
	drawInformationFlowLine(340,245,340,255,1);
	drawEnveloppe(270,230);
}

function drawLineRetailer_s02() {
	drawMaterialFlowLine(315,325,260,325,1);
	drawTruck(270,305);
}

function drawNotifRetailer_s02() {
	noFill();
	ellipse(215,408,120,80);
}

function drawLineRetailer_s03() {
	drawMaterialFlowLine(240,408,245,408,0);
	drawMaterialFlowLine(245,408,245,350,1);
}

function drawLineRetailer_s04() {
	drawInformationFlowLine(40,245,40,255,1);
}

function drawLineRetailer_s05() {
	drawMaterialFlowLine(230,325,200,325,1);
}

function drawLineRetailer_s06() {
	drawMaterialFlowLine(110,325,50,325,1);
	drawMaterialFlowLine(35,300,35,290,1);
}

function drawLineRetailer_s07() {
	drawInformationFlowLine(210,245,260,245,1);
}

function drawNotifRetailer_s07() {
	noFill();
	ellipse(35,458,120,80);
}

function drawLineRetailer_s08() {
	drawInformationFlowLine(60,460,80,460,0);
	drawInformationFlowLine(80,460,80,245,0);
	drawInformationFlowLine(80,245,210,245,0);
	drawInformationFlowLine(210,245,210,255,1);
}

function drawLineWarehouse_s01() {
	drawInformationFlowLine(260,255,260,245,0);
	drawInformationFlowLine(260,245,340,245,0);
	drawInformationFlowLine(340,245,340,255,1);
	drawEnveloppe(270,230);
}

function drawNotifWarehouse_s01() {
	noFill();
	ellipse(45+300,400,120,80);
}

function drawLineWarehouse_s02() {
	drawInformationFlowLine(55+300,408,110+300,408,0);
	drawInformationFlowLine(110+300,408,110+300,270,0);
	drawInformationFlowLine(110+300,270,65+300,270,1);

}

function drawLineWarehouse_s03() {
	drawInformationFlowLine(260+300,255,260+300,245,0);
	drawInformationFlowLine(260+300,245,340+300,245,0);
	drawInformationFlowLine(340+300,245,340+300,255,1);
	drawEnveloppe(270+300,230);
}

function drawLineWarehouse_s04() {
	drawMaterialFlowLine(315+300,325,260+300,325,1);
	drawTruck(270+300,305);
}

function drawNotifWarehouse_s04() {
	noFill();
	ellipse(215+300,408,120,80);
}

function drawLineWarehouse_s05() {
	drawMaterialFlowLine(240+300,408,245+300,408,0);
	drawMaterialFlowLine(245+300,408,245+300,350,1);
}

function drawLineWarehouse_s06() {
	drawMaterialFlowLine(315,325,260,325,1);
	drawTruck(270,305);
}

function drawLineWarehouse_s07() {
	drawMaterialFlowLine(60+300,325,50+300,325,1);
}

function drawLineWarehouse_s08() {
	drawMaterialFlowLine(230+300,325,200+300,325,1);
}

function drawLineWarehouse_s09() {
	drawInformationFlowLine(65+300,270,75+300,270,0);
	drawInformationFlowLine(75+300,270,75+300,305,1);
	drawMaterialFlowLine(110+300,325,90+300,325,1);
	
}

function drawLineWarehouse_s10() {
	drawInformationFlowLine(210+300,245,260+300,245,1);
}

function drawNotifWarehouse_s10() {
	noFill();
	ellipse(35+300,458,120,80);
}

function drawLineWarehouse_s11() {
	drawInformationFlowLine(60+300,460,105+300,460,0);
	drawInformationFlowLine(105+300,460,105+300,245,0);
	drawInformationFlowLine(105+300,245,210+300,245,0);
	drawInformationFlowLine(210+300,245,210+300,255,1);
}
	
function drawLineDC_s01() {
	drawInformationFlowLine(260+300,255,260+300,245,0);
	drawInformationFlowLine(260+300,245,340+300,245,0);
	drawInformationFlowLine(340+300,245,340+300,255,1);
	drawEnveloppe(270+300,230);
}

function drawNotifDC_s01() {
	noFill();
	ellipse(45+600,400,120,80);

}

function drawLineDC_s02() {
	drawInformationFlowLine(55+600,408,110+600,408,0);
	drawInformationFlowLine(110+600,408,110+600,270,0);
	drawInformationFlowLine(110+600,270,65+600,270,1);
}

function drawLineDC_s03() {
	drawInformationFlowLine(260+600,255,260+600,245,0);
	drawInformationFlowLine(260+600,245,340+600,245,0);
	drawInformationFlowLine(340+600,245,340+600,255,1);
	drawEnveloppe(270+600,230);
}

function drawLineDC_s04() {
	drawMaterialFlowLine(315+600,325,260+600,325,1);
	drawTruck(270+600,305);
}

function drawNotifDC_s04() {
	noFill();
	ellipse(215+600,408,120,80);
}

function drawLineDC_s05() {
	drawMaterialFlowLine(240+600,408,245+600,408,0);
	drawMaterialFlowLine(245+600,408,245+600,350,1);
}

function drawLineDC_s06() {
	drawMaterialFlowLine(315+300,325,260+300,325,1);
	drawTruck(270+300,305);
}

function drawLineDC_s07() {
	drawMaterialFlowLine(60+600,325,50+600,325,1);
}

function drawLineDC_s08() {
	drawMaterialFlowLine(230+600,325,200+600,325,1);
}

function drawLineDC_s09() {
	drawInformationFlowLine(65+600,270,75+600,270,0);
	drawInformationFlowLine(75+600,270,75+600,305,1);
	drawMaterialFlowLine(110+600,325,90+600,325,1);
	
}

function drawLineDC_s10() {
	drawInformationFlowLine(210+600,245,260+600,245,1);
}

function drawNotifDC_s10() {
	noFill();
	ellipse(35+600,458,120,80);
}

function drawLineDC_s11() {
	drawInformationFlowLine(60+600,460,105+600,460,0);
	drawInformationFlowLine(105+600,460,105+600,245,0);
	drawInformationFlowLine(105+600,245,210+600,245,0);
	drawInformationFlowLine(210+600,245,210+600,255,1);
}

function drawLineFactory_s01() {
	drawInformationFlowLine(260+600,255,260+600,245,0);
	drawInformationFlowLine(260+600,245,340+600,245,0);
	drawInformationFlowLine(340+600,245,340+600,255,1);
	drawEnveloppe(270+600,230);
}

function drawNotifFactory_s01() {
	noFill();
	ellipse(45+900,400,120,80);
}

function drawLineFactory_s02() {
	drawInformationFlowLine(55+900,408,110+900,408,0);
	drawInformationFlowLine(110+900,408,110+900,270,0);
	drawInformationFlowLine(110+900,270,65+900,270,1);
}

function drawLineFactory_s03() {
	drawMaterialFlowLine(315+600,325,260+600,325,1);
	drawTruck(270+600,305);
}

function drawLineFactory_s04() {
	drawMaterialFlowLine(60+900,325,50+900,325,1);
}

function drawLineFactory_s05() {
	drawMaterialFlowLine(230+900,325,200+900,325,1);
}

function drawLineFactory_s06() {
	drawInformationFlowLine(65+900,270,75+900,270,0);
	drawInformationFlowLine(75+900,270,75+900,305,1);
	drawMaterialFlowLine(110+900,325,90+900,325,1);
	
}

function drawLineFactory_s07() {
	drawMaterialFlowLine(210+900,245,260+900,245,1);
	drawMaterialFlowLine(270+900,290,270+900,325,0);
	drawMaterialFlowLine(270+900,325,260+900,325,1);
}

function drawNotifFactory_s07() {
	noFill();
	ellipse(35+900,458,120,80);
}

function drawLineFactory_s08() {
	drawInformationFlowLine(60+900,460,105+900,460,0);
	drawInformationFlowLine(105+900,460,105+900,245,0);
	drawInformationFlowLine(105+900,245,210+900,245,0);
	drawInformationFlowLine(210+900,245,210+900,255,1);
}

function displayParams() {
	fill(0, 0, 0);
	textSize(16);
	text("Pattern: ", 20+1200, 355);
	
	textSize(10);
	text("Min", 50+1200, 390);
	text("Max", 90+1200, 390);
	
	text("1) ", 20+1200, 410);
	
	text("2) ", 20+1200, 450);
	text("(x)", 125+1200, 450);
	text("after", 190+1200, 450);
	text("rounds", 260+1200, 450);
	
	text("3) ", 20+1200, 490);
	text("(x)", 125+1200, 490);
	text("every", 190+1200, 490);
	text("rounds", 260+1200, 490);
}

function displayMusic() {
	switch (role) {
			case 'Admin': 
			displayMusicRetailer(); displayMusicWarehouse(); displayMusicDC(); displayMusicFactory();
			break;
			case 'Retailer': displayMusicRetailer();
			break;
			case 'Warehouse': displayMusicWarehouse();
			break;
			case 'DC': displayMusicDC();
			break;
			case 'Factory': displayMusicFactory();
			break;
	}
}

function displayMusicRetailer() {
	textSize(13);
	fill(0,0,255);
	text("Music played - Excerpts from:", 20, 505);
	text(trackName[trackPlayed], 20, 530); 
}

function displayMusicWarehouse() {
	textSize(13);
	fill(0,0,255);
	text("Music played - Excerpts from:", 20+300, 505);
	text(trackName[trackPlayed], 20+300, 530); 
}

function displayMusicDC() {
	textSize(13);
	fill(0,0,255);
	text("Music played - Excerpts from:", 20+600, 505);
	text(trackName[trackPlayed], 20+600, 530); 
}

function displayMusicFactory() {
	textSize(13);
	fill(0,0,255);
	text("Music played - Excerpts from:", 20+900, 505);
	text(trackName[trackPlayed], 20+900, 530); 
}

function drawEnveloppe(x,y) {
	noFill();
	rect(x,y,20,10);
	line(x,y,x+10,y+6);
	line(x+10,y+6,x+20,y);
}

function drawTruck(x,y) {
	noFill();
	rect(x,y+3,7,5);
	rect(x+8,y,12,8);
	ellipse(x+4,y+10,4,4);
	ellipse(x+16,y+10,4,4);
}