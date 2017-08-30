#pragma strict

function Update () {
		if (Input.GetKeyDown("escape")) {
			 Application.Quit();
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
			Application.LoadLevel("Greco3D2.0");
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
	        var curAction = GetComponent(Pause).curAction; 
	        GetComponent(PassiveNav3).action = curAction;
		}
	
}
