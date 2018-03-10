#pragma strict



var title : String;
var style : GUIStyle = new GUIStyle();
var mapName : String;
var toggleText : String;


function Update(){
//Get mapName
mapName = MD_dupMap.curMap.name;

}

function OnGUI(){


if(SelectStore.storeSelected){
toggleText="Select store name";
style.normal.textColor = Color.black;
}

else{
style.normal.textColor = Color.blue;
toggleText=mapName;
}
		
		style.fontSize = 30;
	    style.alignment = TextAnchor.MiddleCenter;
        
        var buttonWidth : int = 20;
		var buttonHeight : int = 50;
		var buttonRect =Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(Screen.height/8) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			);
			
	
	
       	GUI.Label(buttonRect,toggleText,style);
  	     	
 }
 