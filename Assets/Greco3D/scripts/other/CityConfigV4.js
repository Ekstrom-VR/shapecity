//#pragma strict
////declare
//var trial_time : float=5.0;
//var gui_cross_hair : GameObject;
//var city_num : int;
//
//var city_x = new Array();
//var city_y = new Array();
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
//
//city_x[0] = city1.x;
//city_y[0] = city1.y;
//city_x[1] = city2.x;
//city_y[1] = city2.y;
//city_x[2]=  city3.x;
//city_y[2] = city3.y;
//city_x[3] = city4.x;
//city_y[3]= city4.y;
//city_x[4]= city5.x;
//city_y[4]= city5.y;
//
//
////trial_order = [0,1,2,3,4,3,2,1,0,1,2,3,4];
//
//city_num = Random.Range(0,5);
//
//stores = ["Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop", "Music Store", "Ice Cream"];
//
////Set up total trialtime
//timer = trial_time;
//
//
//  
//   city_currentx =city_x[city_num];
//   city_currentz =city_y[city_num];
//	
// 
//
// //First city
// //	for (var child : Transform in city.transform) {
// for( var i : int = 0; i < 10; i++) {
//  var store_transform= GameObject.Find(stores[i]).transform; 
//  store_transform.position.x =city_currentx[i];
//  store_transform.position.z =city_currentz[i];
//
// }
//
//}
//
//
//
//function Update () 
//{
//timer -= Time.deltaTime;
//
//	if(timer <= 0) 
//	{
//	Application.LoadLevel("ITI");
//	}
//}
//
//
