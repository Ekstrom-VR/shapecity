//#pragma strict
////declare
//var Trial_time : float=5.0;
//var ITI_time : float = 2.0;
//var gui_cross_hair : GameObject;
//
//
//var city1x = new float[10];
//var city1y = new float[10];
//var city2x = new float[10];
//var city2y = new float[10];
//var city3x = new float[10];
//var city3y = new float[10];
//var city4x = new float[10];
//var city4y = new float[10];
//var city5x = new float[10];
//var city5y = new float[10];
//
//
//var city_currentx = new float[8];
//var city_currentz = new float[8];
//var trial_order = new int[4];
//var stores = new String[8];
//
//var Crosshair= false;
//var ChangeCity = false;
//
//private var timer : float;
//private var city : GameObject;
//private var mouseLook : MouseLook;
//private var characterMotor : CharacterMotor;
//private var fpsInputController : FPSInputController;
//private var playerMovement : PlayerMovementV2;
//private var cnt =0;
//private var city1 : City1;
//private var city2 : City2;
//private var city3 : City3;
//private var city4 : City4;
//private var city5 : City5;
//
//
//function Start () {
//city = GameObject.Find("City");
//mouseLook = GetComponent(MouseLook);
//characterMotor = GetComponent(CharacterMotor);
//fpsInputController = GetComponent(FPSInputController);
//playerMovement = GetComponent(PlayerMovementV2);
//gameObject.AddComponent(City1);
//gameObject.AddComponent(City2);
//gameObject.AddComponent(City3);
//gameObject.AddComponent(City4);
//gameObject.AddComponent(City5);
//city1 = GetComponent(City1);
//city2 = GetComponent(City2);
//city3 = GetComponent(City3);
//city4 = GetComponent(City4);
//city5 = GetComponent(City5);
//
////City coordinates
////city1x = [297.639, 297.5,297.5,260,222.5,222.5,222.5,260];
////city1y = [277.0,227.5,202,202.5,202.5,252.5,277.5,277.5];
//city1x = city1.x;
//city1y = city1.y;
//city2x = city2.x;
//city2y = city2.y;
//city3x = city3.x;
//city3y = city3.y;
//city4x = city4.x;
//city4y = city4.y;
//city5x = city5.x;
//city5y = city5.y;
////
//
////city2y = [275.03,228,204.97,200.81,204.97,252,275.03,279.19];
////city3x = [292.6,300,292.6,260,227.4,220.1,227.4,260];
////city3y = [272.6,228.5,207.4,199.12,207.4,251.5,272.6,280.9];
////city4x = [290.1,301.1,290.1,260,229.9,218.9,229.9,260];
////city4y = [270.1,229,210,197,209.9,251,270.1,282.6];
//trial_order = [1,2,3,4,5,4,3,2,1,2,3,4,5];
//stores = ["Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop", "Music Store", "Ice Cream"];
//
////Set up total trialtime
//timer = Trial_time + ITI_time;
//
//
////First city
// //	for (var child : Transform in city.transform) {
// for( var i : int = 0; i < 10; i++) {
//
//	
//  var store_transform= GameObject.Find(stores[i]).transform; 
//  store_transform.position.x =city1x[i];
//  store_transform.position.z =city1y[i];
//
// }
//
//}
//
//
//
//function Update () {
//timer -= Time.deltaTime;
//
//if(timer <= ITI_time) {
//if(!Crosshair){
//
//
//Crosshair = true;
//
////Activate Crosshair but deactive movement and city
//gui_cross_hair.SetActive(true);
//city.SetActive(false);	
//mouseLook.enabled = false;  //gameObject.GetComponent(MouseLook).enabled = false;	
//characterMotor.enabled = false;
//fpsInputController.enabled = false;
//playerMovement.enabled = false;
//}
//}
//
//
//if(timer <= 0) {
//
//if(!ChangeCity){
//
//ChangeCity=true;
//city.SetActive(true);
//mouseLook.enabled = true;
//characterMotor.enabled = true;
//fpsInputController.enabled = true;
//playerMovement.enabled = true;
//
//
//
//gui_cross_hair.SetActive(false);
//city.SetActive(true);
//cnt=cnt+1;
//
// if (trial_order[cnt]==1){   
//   city_currentx =city1x;
//   city_currentz =city1y;
//	
//   }
//   else if (trial_order[cnt]==2){ 
//   city_currentx =city2x;  
//   city_currentz =city2y;
//	
//   }
//   else if (trial_order[cnt]==3){ 
//   city_currentx =city3x;  
//   city_currentz =city3y;
//   }
//   else if (trial_order[cnt]==4){ 
//   city_currentx =city4x;  
//   city_currentz =city4y;
//   }
//   else if (trial_order[cnt]==5){ 
//   city_currentx =city5x;  
//   city_currentz =city5y;
//   }
////	for (var child : Transform in city.transform) {
// for( var i : int = 0; i < 10; i++) {
//
//	
//  var store_transform= GameObject.Find(stores[i]).transform; 
//  store_transform.position.x =city_currentx[i];
//  store_transform.position.z =city_currentz[i];
//
// }
//
//
//
//}
////Recent timer
//timer = Trial_time + ITI_time;
//Crosshair= false;
//ChangeCity = false;
//
//}
//
//
//}
//
//
////
////function movementToggle(){
////
////city.SetActive(!city.activeSelf);
////GetComponent(CharacterController).enabled = !GetComponent(CharacterController).enabled;
////GetComponent(MouseLook).enabled = !GetComponent(MouseLook).enabled;
////}
////			
//
//
