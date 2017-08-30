#pragma strict

	
private var city : GameObject;
private var mouseLook : MouseLook;
private var characterMotor : CharacterMotor;
private var fpsInputController : FPSInputController;


function Start () {

city = GameObject.Find("City");
mouseLook = GetComponent(MouseLook);
characterMotor = GetComponent(CharacterMotor);
fpsInputController = GetComponent(FPSInputController);

}
	function Update() {
		if (Input.GetKeyDown(KeyCode.Escape)) {

	   Debug.Log("escape!!");
	    gameObject.AddComponent(G3D_pauseMenu);	

			
   
   
		city.SetActive(false);
		mouseLook.enabled = false;	  
		characterMotor.enabled = false;
		fpsInputController.enabled = false;
				  
				  



	}
	
	

}