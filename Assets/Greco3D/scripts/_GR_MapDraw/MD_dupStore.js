#pragma strict

public var rocketPrefab : GameObject;
private var identifier : int = 0;
public var hand : GameObject;
var rocketInstance : GameObject;







function Update(){

//Duplicate
	if(Input.GetButtonDown("Fire2") && !SelectStore.storeSelected && MD_initials.initCheck)
	{
		
//			RandomColor();
			identifier = identifier +1;
			
			rocketInstance = Instantiate(rocketPrefab,rocketPrefab.transform.position + new Vector3(1,1,0),  Quaternion.identity);
			rocketInstance.name = "Store" + identifier.ToString();
			
			//Make current map parent of new store
			rocketInstance.transform.parent = MD_dupMap.curMap.transform;
			//Set color of new store
//			rocketInstance.renderer.material.SetColor("_Color",Color.black);

	}
	

//Destroy
    if (Input.GetKeyDown(KeyCode.Backspace)){
				        					
			Destroy(rocketInstance);					
	}



}







//var Color1 : Color;
//var Color2 : Color;
//var Color3 : Color;
//var Color4 : Color;
//var Color5 : Color;
//var Color6 : Color;
//var Color7 : Color;
//var Color8 : Color;
//var Color9 : Color;
//var Color10 : Color;
//var Color11 : Color;
//var Color12 : Color;
//var curColor : Color;
//
//
//
// 
//function RandomColor(){
//if(colorArray.length > 0){
//curColor = colorArray[Random.Range(0,colorArray.length)];
//colorArray.Remove(curColor);
//}
//}










