#pragma strict

function Start(){
	 
	 AddStores();
//	 AddWalls();
//	 AddTargets();			
	}

function AddStores(){
	var new_city =  new GameObject("City");
	var bwCNT = 0;
	var holdCNT = 0;
	var instance : GameObject;
	for ( var store : int = 0; store < Control.curStoreList.length; store++){
    
	    if(Control.curStoreList[store] == "BrickWall"){
	    bwCNT++;
	    instance = Instantiate(Resources.Load(Control.curStoreList[store],GameObject));
	    instance.name = Control.curStoreList[store] + " " + bwCNT;
	    Control.curStoreList[store] = instance.name;
	    instance.transform.parent = new_city.transform;
	    }
	    else if(Control.curStoreList[store] == "Holder"){
	    holdCNT++;
	    instance = Instantiate(Resources.Load(Control.curStoreList[store],GameObject));
	    instance.name = Control.curStoreList[store] + " " + holdCNT;
	    Control.curStoreList[store] = instance.name;
	    instance.transform.parent = new_city.transform;
	    }
	    else{

		instance = Instantiate(Resources.Load(Control.curStoreList[store],GameObject));
		instance.name = Control.curStoreList[store];
		instance.transform.parent = new_city.transform;
		Control.storeList.Add(Control.curStoreList[store]);
		
		}
	}

}

//function AddWalls(){
//
//	var new_walls = new GameObject("Walls");
//	for ( var i : int = 0; i < Control.curStoreList.length; i++){
//	var instance : GameObject = Instantiate(Resources.Load("wall",GameObject));
//	instance.name = "wall" + i;
//	instance.transform.parent = new_walls.transform;
//	}
//}

//function AddTargets(){	
//	for ( var store in Control.Control.curStoreList){
//	var neighbor = new GameObject(store + "_n");
//	var target = GameObject.Find(store);   
//    neighbor.transform.parent = target.transform;
//    neighbor.transform.position = target.transform.position;
//	}
//}
	
	
	
	
	
	




