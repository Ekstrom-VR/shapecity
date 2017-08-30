#pragma strict



function Update () {
		if (Input.GetKey ("space")) {
			Application.Quit();
		}
	}





function OnGUI(){
	////guiStyle specs
	var style1 : GUIStyle = new GUIStyle();
	style1.normal.textColor = Color.white;
	style1.fontSize = 75;
	style1.alignment = TextAnchor.MiddleCenter;
	var buttonWidth : int = 100;
	var buttonHeight : int = 20;
	var rect1 =Rect((Screen.width / 2),(Screen.height/2),buttonWidth,buttonHeight);
	var endMessage ='The End! Nicely done. \n' +
					'Please report to experimenter. ' ;
	GUI.Label(rect1,endMessage,style1);

}
  

