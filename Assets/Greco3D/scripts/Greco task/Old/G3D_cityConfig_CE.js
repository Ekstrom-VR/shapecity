#pragma strict

static var city_x = new Array();
static var city_y = new Array();
static var stores = new Array();

function Start () {

	if(G3D_task_CE.version == 'CE'){
     stores = new Array("Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop");
	}
	else if(G3D_task_CE.version == 'GR'){
     stores = new Array("Bakery","Cell phones", "Gym", "Chinese Food", "Florist","Costume Shop","Dentist","Fast Food Shop", "Music Store", "Ice Cream");
//     stores = new Array("Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop");
	}


	if(G3D_task_CE.version == 'CE'){
     configCE();
	}
	else if(G3D_task_CE.version == 'GR'){
     configGR();
	}
	 AddStores();
	 AddWalls();

	
	}


function configCE(){
	gameObject.AddComponent(CE_1);
	gameObject.AddComponent(CE_2);
	gameObject.AddComponent(CE_3);
	gameObject.AddComponent(CE_4);
	var city1 = GetComponent(CE_1);
	var city2 = GetComponent(CE_2);
	var city3 = GetComponent(CE_3);
	var city4 = GetComponent(CE_4);
	
	city_x[0] = city1.x;
	city_y[0] = city1.y;
	city_x[1] = city2.x;
	city_y[1] = city2.y;
	city_x[2] = city3.x;
	city_y[2] = city3.y;
	city_x[3] = city4.x;
	city_y[3] = city4.y;
}



function configGR(){
gameObject.AddComponent(City1);
gameObject.AddComponent(City2);
gameObject.AddComponent(City3);
gameObject.AddComponent(City4);
//gameObject.AddComponent(City5);
var city1 = GetComponent(City1);
var city2 = GetComponent(City2);
var city3 = GetComponent(City3);
var city4 = GetComponent(City4);
//var city5 = GetComponent(City5);

city_x[0] = city1.x;
city_y[0] = city1.y;
city_x[1] = city2.x;
city_y[1] = city2.y;
city_x[2] = city3.x;
city_y[2] = city3.y;
city_x[3] = city4.x;
city_y[3] = city4.y;
//city_x[4] = city5.x;
//city_y[4] = city5.y;

}






function AddStores(){

	var new_city =  new GameObject("City");
	for ( var store in stores){

//	print(store);
	//var newStore = new GameObject(store);
	var instance : GameObject = Instantiate(Resources.Load(store,GameObject));
	instance.name = store;
	instance.transform.parent = new_city.transform;
	}

}


function AddWalls(){

	var new_walls = new GameObject("Walls");
	for ( var i : int = 0; i < stores.length; i++){
	var instance : GameObject = Instantiate(Resources.Load("wall",GameObject));
	instance.name = "wall" + i;
	instance.transform.parent = new_walls.transform;
	}


}


