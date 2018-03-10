#pragma strict

public var rocketPrefab : GameObject;
private var identifier : int = 0;
public var hand : GameObject;
var rocketInstance : GameObject;

function Update(){

//Duplicate
	if(Input.GetButtonDown("Fire2") && !SelectStore.storeSelected && MD_initials.initCheck)
	{
			identifier = identifier +1;
			rocketInstance = Instantiate(rocketPrefab,rocketPrefab.transform.position + new Vector3(1,1,0),  Quaternion.identity);
			rocketInstance.name = "Store" + identifier.ToString();
			rocketInstance.transform.parent = MD_dupMap.curMap.transform;
	}
	
    if (Input.GetKeyDown(KeyCode.Backspace)){
				        					
			Destroy(rocketInstance);					
	}
}