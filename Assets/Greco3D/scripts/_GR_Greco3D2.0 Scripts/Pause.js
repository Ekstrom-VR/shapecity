#pragma strict

var curAction : String;

function Update() {
		if (Input.GetKeyDown(KeyCode.Escape)) {

	    Debug.Log("escape!!");
	    
	    
	    curAction = GetComponent(PassiveNav3).action;
	    GetComponent(PassiveNav3).action = "pause";
	    gameObject.AddComponent(PauseMenu);


	}
}