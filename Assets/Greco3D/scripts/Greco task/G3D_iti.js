#pragma strict
 

function OnGUI(){
	//guiStyle specs
	var style1 : GUIStyle = new GUIStyle();
	style1.normal.textColor = Color.white;
	style1.fontSize = 75;
	style1.alignment = TextAnchor.MiddleCenter;
	var buttonWidth : int = 50;
	var buttonHeight : int = 20;
	var rect1 =Rect((Screen.width /2)-(buttonWidth/2),(Screen.height/2) - (buttonHeight/2),buttonWidth,buttonHeight);
	//Gui
	GUI.Label(rect1,"+",style1);
	
}
  
  
  
