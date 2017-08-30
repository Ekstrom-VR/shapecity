#pragma strict

function Update () {
		if (Input.GetKeyDown("escape")) {
				Application.LoadLevel("MainMenu");
		}
}
	
	
	
	
	function OnGUI(){
		var buttonWidth = 140;
		var buttonHeight = 60;
		
		if (
			GUI.Button(
			// Center in X, 1/3 of the height in Y
			new Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(2 * Screen.height / 5) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			),
			"Retry!"
			)
			)
		{
			// Reload the level
			Application.LoadLevel("Greco3Dv2");
		}
		
		if (
			GUI.Button(
			// Center in X, 2/3 of the height in Y
			new Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(3 * Screen.height / 5) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			),
			"Back to Start menu"
			)
			)
		{
			// Reload the level
			Application.LoadLevel("MenuStart");
		}
		
		
		
			if (
			GUI.Button(
			// Center in X, 2/3 of the height in Y
			new Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(4* Screen.height / 5) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			),
			"Back to task"
			)
			)
		{
		   
            Destroy(GetComponent(G3D_pauseMenu));
            print('back to task');
	        var curAction = GetComponent(G3D_pause).curAction; 
	       GetComponent(G3D_playerMovement).action = curAction;
		}
	
}
