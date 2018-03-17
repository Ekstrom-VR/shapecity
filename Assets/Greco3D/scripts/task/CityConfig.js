#pragma strict

private var city : GameObject;

function OnEnable () {
city = GameObject.Find("City");

print(Control.curStoreList);

}

function Start(){

//Shold be changed. Redundant
for ( var store : int = 0; store < Control.curStoreList.length; store++){
		Control.storeList.Add(Control.curStoreList[store]);
	}

//Remotes stores not used in task
for (var child : Transform in city.transform) {

	if(!Control.storeList.Contains(child.name)){
	
		Destroy(GameObject.Find(child.name));
    }
}

}
