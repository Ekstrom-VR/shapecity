#pragma strict

 var style : GUIStyle = new GUIStyle();

function OnGUI(){

print('hello??');
	style.fontSize = 140;
	style.alignment = TextAnchor.MiddleCenter;
    style.normal.textColor = Color.green;

        var buttonWidth : int = 50;
		var buttonHeight : int = 50;
		var buttonRect =Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(Screen.height/8) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			);
			
	
	
       	GUI.Label(buttonRect,'Hello',style);


//        Camera.main.WorldToViewportPoint(target.position);


}