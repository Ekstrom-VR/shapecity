#pragma strict
 
var background : Background;

function OnEnable(){

	//Present background
	background = GetComponent("Background");
	

}


function OnGUI(){
	


	//wait for spacebar press
	if (Input.GetKeyDown(KeyCode.Space))
	{
	this.enabled = false;
	CityMorph.trial_action = 'feedBackOver';
	}


	//guiStyle specs
	var style1 : GUIStyle = new GUIStyle();
		style1.normal.textColor = Color.white;
		style1.fontSize = 50;
		style1.alignment = TextAnchor.MiddleCenter;
		

		
	var buttonWidth : int = 50;
	var buttonHeight : int = 20;
	var rect1 =Rect((Screen.width /2)-(buttonWidth/2),(Screen.height*1/5) - (buttonHeight/2),buttonWidth,buttonHeight);
	var rect2 =Rect((Screen.width /2)-(buttonWidth/2),(Screen.height* 4/5) - (buttonHeight/2),buttonWidth,buttonHeight);
	
	GUI.Label(rect1,"Please make a response before end of video.",style1);	
	GUI.Label(rect2,"(Press spacebar to continue)",style1);
}
  
  
  
