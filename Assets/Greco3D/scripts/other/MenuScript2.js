#pragma strict



//
//var start : GameObject;


//*************************OnGUI************************************************

function OnGUI()
	{
	
		var style : GUIStyle;
		var buttonWidth : int = 84;
		var buttonHeight : int = 60;
		style.fontSize = 40;
		style.normal.textColor = Color.white;
//         style.hover.textColor = Color.black;
		// Determine the button's place on screen
		// Center in X, 2/3 of the height in Y
		var buttonRect =Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(2 * Screen.height / 3) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			);
		
//		GUI.Label(buttonRect,"Hello world",style);
		

	}
	