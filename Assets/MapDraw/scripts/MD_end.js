#pragma strict

public var resp : String;
public var resp_final : String = '';
public var i : int = 0;

function Update(){
	
	//Exit task an enable output script when Escape is pressed
	if(Input.GetKeyUp(KeyCode.Escape)){
	    	
		var expObj : GameObject = GameObject.Find("Experiment");
		var expScript: Experiment = expObj.GetComponent("Experiment") as Experiment;
		expScript.LoadNextModule();

	}
								
}

function OnGUI(){
	
		//Initialize Font and Location parameters fo gui
		var style1 : GUIStyle = new GUIStyle();
			
		style1.normal.textColor = Color.white;
		style1.fontSize = 30;
        style1.alignment = TextAnchor.MiddleCenter;

        var buttonWidth : int = 10;
		var buttonHeight : int = 20;
		var rect1 =Rect((Screen.width /2),(Screen.height/2),buttonWidth,buttonHeight);
	
		GUI.Label(rect1,"All done. Thank you!",style1);
 
}