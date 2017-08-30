//#pragma strict
////declare
//var trial_time : float=20.0;
//var iti_time : float=5.0;
//var timer : float;
//
//
//var gui_cross_hair : GameObject;
//var iti_Stuff : GameObject;
//var city_num : int;
//
//var city_x = new Array();
//var city_y = new Array();
//
//
//var city_currentx = new float[8];
//var city_currentz = new float[8];
//var trial_order = new Array(0,1,2,3,4,3,2,1,0,1,2,3,4);
//
//var Crosshair= false;
//var ChangeCity = false;
//
//var cnt : int = 0;
//
//var city : GameObject;
//
//
//
//var mouseLook : MouseLook;
//var characterMotor : CharacterMotor;
//var fpsInputController : FPSInputController;
//var playerMovement : PlayerMovementV2;
//var city1 : City1;
//var city2 : City2;
//var city3 : City3;
//var city4 : City4;
//var city5 : City5;
//var action : String;
//var stores = new Array("Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop", "Music Store", "Ice Cream");
//
//
//
//
//
////*************************START************************************************
//function Start () {
//city = GameObject.Find("City");
//iti_Stuff = GameObject.Find("ITI_Stuff");
//iti_Stuff.SetActive(false);
//
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
//
//
//
//
//
//
//
////Set up total trialtime
//timer = trial_time + iti_time;
//
//
//CityConfig();
//
//
//}
//
//
//
//function Update () 
//{
//
//   if(action != 'pause'){ 
//    timer -=  Time.deltaTime;
//    };
//    
//action = GetComponent(PlayerMovementV8).action;
//
//	if(timer > 0 && timer <= iti_time ) 
//	{
//	    if(action!= 'iti'){
////	    timer = iti_time;
//	    GetComponent(PlayerMovementV8).action ='iti';
//		iti_Stuff.SetActive(true);	
//	    cnt++;
//	    CityConfig();
//
//		}
//
//	
//	}
//	else if (timer <= 0){
//	 GetComponent(PlayerMovementV8).action = 'reset';
//	 iti_Stuff.SetActive(false);
//	 timer = trial_time + iti_time;
//	
//	}
//}
//
//
//
//
//function CityConfig(){
//
// city_currentx =city_x[trial_order[cnt]];
// city_currentz =city_y[trial_order[cnt]];
//
//
// for( var ii : int = 0; ii < 10; ii++) {
//
//	  GameObject.Find(stores[ii]).transform.position.x= city_currentx[ii];
//	  GameObject.Find(stores[ii]).transform.position.z =city_currentz[ii];
//
// }
// 
// 
//}