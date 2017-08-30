#pragma strict

var myTimer2 : float =10.0;
public  var gui_cross_hair : GameObject;
private var city : GameObject;
private var stores = new Array ("1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Costume Shop","Craft Shop", "Dentist", "Fast Food Shop");
private var trial_order = new Array(1,2,1,2,1,2,1,2);  
private var mouseLook : MouseLook;
private var characterMotor : CharacterMotor;
private var fpsInputController : FPSInputController;
private var cnt =0;

private var city1x = [297, 297.5,297.5,260,222.5,222.5,222.5,260];
private var city1y = [277.0,227.5,202,202.5,202.5,252.5,277.5,277.5];

private var city2x = [277,227.5,202,202.5,202.5,252.5,277.5,277.5];
private var city2y = [297, 297.5,297.5,260,222.5,222.5,222.5,260];
var city_currentx : float[];
var city_currentz : float[];




var Crosshair= false;
var ChangeCity = false;



function Start () {
city = GameObject.Find("City");
mouseLook = GetComponent(MouseLook);
characterMotor = GetComponent(CharacterMotor);
fpsInputController = GetComponent(FPSInputController);

}



function Update () {
myTimer2 -= Time.deltaTime;

if(myTimer2 <= 5 ) {
if(!Crosshair){


Crosshair = true;

//Activate Crosshair but deactive movement and city
gui_cross_hair.SetActive(true);
city.SetActive(false);	
mouseLook.enabled = false;  //gameObject.GetComponent(MouseLook).enabled = false;	
characterMotor.enabled = false;
fpsInputController.enabled = false;
}
}


if(myTimer2 <= 0) {

if(!ChangeCity){

ChangeCity=true;
city.SetActive(true);
mouseLook.enabled = true;
characterMotor.enabled = true;
fpsInputController.enabled = true;


gui_cross_hair.SetActive(false);
city.SetActive(true);
cnt=cnt+1;


 if (trial_order[cnt]==1){   
   city_currentx =city1x;
   city_currentz =city1y;
	Debug.Log(cnt);
	Debug.Log("trial order: " + trial_order[cnt]);
   }
   else if (trial_order[cnt]==2){ 
   city_currentx =city2x;  
   city_currentz =city2y;
	Debug.Log(cnt);
	Debug.Log("trial order: " + trial_order[cnt]);
   }
//	for (var child : Transform in city.transform) {
 for( var i : int = 0; i < 8; i++) {

	
	var store_transform= GameObject.Find(stores[i]).transform; 
	Debug.Log(stores[i]);
	Debug.Log(store_transform.name);
	Debug.Log("Store number: " + i);
//	Debug.Log(city_currentz[i]);
  store_transform.position.x =city_currentx[i];
  store_transform.position.z =city_currentz[i];

 }



}

myTimer2=10;
Crosshair= false;
ChangeCity = false;

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


