#pragma strict

function Start(){
	 
	 AddStores();		
	}

function AddStores(){
	var new_city =  new GameObject("City");
	var instance : GameObject;
	for ( var store : int = 0; store < Control.curStoreList.length; store++){

		instance = Instantiate(Resources.Load(Control.curStoreList[store],GameObject));
		instance.name = Control.curStoreList[store];
		instance.transform.parent = new_city.transform;
		Control.storeList.Add(Control.curStoreList[store]);
	}
}