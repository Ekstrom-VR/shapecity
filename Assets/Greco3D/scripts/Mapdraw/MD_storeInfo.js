#pragma strict

var storeName : String = null;
var mapName : String;
var storeLocation : Vector2;
function Update(){

//Get storeName
if(gameObject==SelectStore.currStoreSelect){
storeName = MD_GetStoreName.storeNameCache;
};


storeLocation = Vector2(gameObject.transform.position.x,gameObject.transform.position.y);
mapName =  gameObject.transform.parent.name;

}


//Place store Name
var style : GUIStyle = new GUIStyle();
function OnGUI(){
	var newPos = Camera.main.WorldToScreenPoint(this.transform.position);
	style.fontSize = 10;
	style.alignment = TextAnchor.UpperLeft;
	style.normal.textColor = Color.black;
	var buttonWidth : int = 5;
	var buttonHeight : int = 5;
	var buttonRect =Rect(newPos.x,Screen.height - newPos.y + 20,buttonWidth,buttonHeight);
	GUI.Label(buttonRect,storeName,style);
}