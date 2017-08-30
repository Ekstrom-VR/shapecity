//#pragma strict
//
//var trial_time : float=10.0;
//var iti_time : float=5.0;
//var timer : float;
//static var stopwatch:float;
//
//
//var gui_cross_hair : GameObject;
//var iti : GameObject;
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
//
//var city1 : City1;
//var city2 : City2;
//var city3 : City3;
//var city4 : City4;
////var city5 : City5;
//var stores = new Array("Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop", "Music Store", "Ice Cream");
//
//
//
////*************************START************************************************
//function Start () {
//
//iti= GameObject.Find("ITI");
//iti.SetActive(false);
//
//gameObject.AddComponent(City1);
//gameObject.AddComponent(City2);
//gameObject.AddComponent(City3);
//gameObject.AddComponent(City4);
//gameObject.AddComponent(City5);
//city1 = GetComponent(City1);
//city2 = GetComponent(City2);
//city3 = GetComponent(City3);
//city4 = GetComponent(City4);
////city5 = GetComponent(City5);
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
////city_x[4]= city5.x;
////city_y[4]= city5.y;
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
//
//	stopwatch += Time.deltaTime;
//
//
//
//    if(G3D_playerMovement.action != 'pause'){ 
//    timer -=  Time.deltaTime;
//    };
//    
//
//
//	if(timer > 0 && timer <= iti_time ) 
//	{
//	    if(G3D_playerMovement.action != 'iti'){
//	    G3D_playerMovement.action ='iti';
//		iti.SetActive(true);	
//	    cnt++;
//	    CityConfig();
//
//		}
//
//	
//	}
//	else if (timer <= 0){
//	 G3D_playerMovement.action = 'reset';
//	 iti.SetActive(false);
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