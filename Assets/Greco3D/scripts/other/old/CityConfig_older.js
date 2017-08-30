#pragma strict
private var myTimer : float =15.0;

public var gui_cross_hair : GameObject;
private var city : GameObject;
public var stores = new Array ("1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Costume Shop","Craft Shop", "Dentist", "Fast Food Shop");

 var mouseLook : MouseLook;
 var characterMotor : CharacterMotor;
 var fpsInputController : FPSInputController;


//var city1x = [297, 297.5,297.5,260,222.5,222.5,222.5,260];
//var city1y = [277,227.5,202,202.5,202.5,252.5,277.5,277.5];
//var city2x = [277,227.5,202,202.5,202.5,252.5,277.5,277.5];
//var city2y = [297, 297.5,297.5,260,222.5,222.5,222.5,260];
//var city3x = [];
//var city3y = [];
//var city4x = [];
//var city5y = [];

//
//
function Start () {
city = GameObject.Find("City");
mouseLook = GetComponent(MouseLook);
characterMotor = GetComponent(CharacterMotor);
fpsInputController = GetComponent(FPSInputController);
}



function Update () {
myTimer -= Time.deltaTime;

if(myTimer <= 5) {
gui_cross_hair.SetActive(true);

city.SetActive(false);


//gameObject.GetComponent(MouseLook).enabled = false;	
//gameObject.GetComponent(CharacterMotor).enabled = false;	
mouseLook.enabled = false;  
characterMotor.enabled = false;
fpsInputController.enabled = false;
}


if(myTimer <= 0) {



city.SetActive(true);
mouseLook.enabled = true;
characterMotor.enabled = true;
fpsInputController.enabled = true;


gui_cross_hair.SetActive(false);
city.SetActive(true);

	for (var child : Transform in city.transform) {

    if (child.name == "Book Store"){
    Debug.Log(child.name);
    
    }
    
    //child.position += Vector3.up * 2.0;
  // Sets the position to be somewhere inside a circle
	// with radius 5 and the center at zero.
	var newPosition : Vector3 = Random.insideUnitCircle * 5;
	child.position.x += newPosition.x;
	child.position.z += newPosition.z;
}
myTimer=15;
}

}


//
//function movementToggle(){
//
//city.SetActive(!city.activeSelf);
//GetComponent(CharacterController).enabled = !GetComponent(CharacterController).enabled;
//GetComponent(MouseLook).enabled = !GetComponent(MouseLook).enabled;
//}
//			


