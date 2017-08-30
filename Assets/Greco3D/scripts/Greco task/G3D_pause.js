#pragma strict
//
//var PauseGUI : GUITest;
//var paused : boolean = false;
//
//function Update ()
//{
//	if (Input.GetKeyDown("p") && paused == false)
//	{
//		paused = true;
//		Time.timeScale = 0;
//		PauseGUI.enabled = true;
//	}
//	else if (Input.GetKeyDown("p") && paused == true)
//	{
//		paused = false;
//		Time.timeScale = 1;
//		PauseGUI.enabled = false;
//	}
//}


var curAction : String;

function Update() {
		if (Input.GetKeyDown(KeyCode.Escape)) {

	    Debug.Log("escape!!");
	    
	    
	    curAction = GetComponent(G3D_playerMovement).action;
	    GetComponent(G3D_playerMovement).action = "pause";
	    gameObject.AddComponent(G3D_pauseMenu);


	}
}