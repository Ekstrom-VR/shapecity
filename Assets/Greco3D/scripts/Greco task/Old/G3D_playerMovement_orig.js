#pragma strict

//""""""""""""""""""""""""""""""""Timing and translation related variables
//static var stopwatch : float = 0.0;
var trial_times = new Array();

static var action : String;
var action_present : String;
var storesNV_present : int;
private var maxRotTime: float = 3;

private var timer : float;
var targetStoreA : String;
var targetStoreB : String;
var targetStoreC : String;

var origin : Transform;


private var tranVel : float = 8.0;
private var rotVel : float = 35.0;

//"""""""""""""""""""""""""""""""""Other variables
var cnt :  int;


//""""""""""""""""""""""""""""""""""Lists
var dirList    = new Array();
var storeLista = new Array();
var storeListb = new Array();
var storeListc = new Array();
var transList  = new Array();
private var tranTime : float;


var rotVelList = new Array();
var rotTypeList = new Array();

var rotTimeList = new Array();
var curRotTime : float;
var tranBWDTimeList = new Array();
var curBWDtime : float;


//Bools
var setTimer : boolean = false;
var stores = new Array("Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop");
var dirs =['l', 'r'];


//"""""""""""""""""""""""""""""""""""Terrain stuff
var terrain : Terrain;
terrain = Terrain.activeTerrain;
var terrainSize : Vector3;
terrainSize = terrain.terrainData.size;


//"""""""""""""""""""""""""""""""""""""Raycast variables
var rayStore : String;
var rayTag   : String;
var firstHit : String;

///Pause Variables
var pausePercList  = new Array();
var curPause : boolean;
private var pausePerc : int = 50;
var pauseType : String;



//*************************START************************************************
function OnEnable () {

cnt =0;
action = 'inactive';


//Generate random start position
RandPosition();
//Create lists
	for(var i : int = 0; i < 300; i++){
       
		dirList[i] = dirs[Random.Range(0,2)];
		RandomizeArray(G3D_cityConfig_CE.stores);
		storeLista[i] = G3D_cityConfig_CE.stores[0];
		storeListb[i] = G3D_cityConfig_CE.stores[1];
		storeListc[i] = G3D_cityConfig_CE.stores[2];
		transList[i] = Random.Range(40,40)/100.0; //25% to 90%
		
		//For rotation
		rotVelList[i] = Random.Range(30,40);//Rotation velocity
		rotTimeList[i] = Random.Range(3,5); //Rotation
		//new 
		pausePercList[i] = Random.Range(0,100);
		rotTypeList[i] = 0;//Random.Range(0,2);
		
		
	}

}



//*************************UPDATE************************************************
function Update () {

//Make action visible in inspector
action_present = action;
storesNV_present = G3D_ObjectInView.numStoresNV;
//Make target stores visible in inspector
targetStoreA = storeLista[cnt];
targetStoreB = storeListb[cnt];
targetStoreC = storeListc[cnt];

//Configure real time variables

//Check for objects. Avoid collision
AvoidCollision();
TimerCountDown();
GetPause();

   
    //occurs every ITI
   if(action == 'reset'){
	RandPosition();
	action = 'inactive';
	}
   else if(action=='inactive'){
   cnt++; 
   action = 'Rotate';
   timer = rotTimeList[cnt];
   }
	else if(action=='Rotate'){
	    RotatePlayer();    
	}
	else if(action=='TranFWD'){
	    TranslatePlayerFWD();
	    
	}
	else if(action=='TranBWD'){
	    TranslatePlayerBWD();   
	}  
    else if(action=='PrepPauseFWD' || action=='PrepPauseINA'){
	    pauseType = action;
	    timer = 2;//Pause time
	    action = 'Pause';   
	}
	else if(action=='Pause'){
	 PauseTask();
	}
    
}

 
function PauseTask(){

	if(timer < 0){ 

	    if(pauseType == 'PrepPauseFWD'){
	    
	    action = 'TranFWD';
		timer = tranTime;
		}
		else if(pauseType == 'PrepPauseINA'){
		action = 'inactive';
	   }

	}
}

function GetPause(){

    var  holdPause : float= pausePercList[cnt];
	if(holdPause < pausePerc){
	curPause = true;
	} 
	else{
	curPause = false;
	}
}

function TimerCountDown(){
	if(action != 'pause'){ 
   timer -=  Time.deltaTime;
    };
}
function RandPosition()
{
  var position: Vector3 = Vector3(Random.Range(-15.0, 15.0), 0, Random.Range(-15.0, 15.0));
  transform.position = origin.position +  position; 

  var rot = Vector3(0,0,0);
  rot.y= Random.Range(0,360); 
  transform.Rotate(rot);
}
function TranslatePlayerFWD()
{

var vecTranF : Vector3;
vecTranF =  Vector3(0,0,1)  *  tranVel;
transform.Translate(vecTranF*Time.deltaTime);
	
  	if(timer < 0){  
	  action = 'inactive';
   }
}



function TranslatePlayerBWD()
{

var vecTranF : Vector3;
vecTranF =  Vector3(0,0,-1)  *  tranVel;

	if(timer > 0){
	  transform.Translate(vecTranF*Time.deltaTime);
	}
  	else{  
	  action = 'inactive';
   }
}

function RotatePlayer(){

	  	var rotDir : Vector3;
	  	var rotVel : float = rotVelList[cnt];//Randomized rotation velocity
	  	var vecRotR  =  Vector3(0,1,0)  *  rotVel;
	    var vecRotL  =  Vector3(0,-1,0) *  rotVel;
		var hit : RaycastHit;
        var hitDist : float;
        var fwd = transform.TransformDirection (Vector3.forward);
        var distPerc : float;

		  
		  if(dirList[cnt]=='l'){
		  rotDir =vecRotL;
		  }
		  else{
		  rotDir =vecRotR;
		  }
			
	
		transform.Rotate(rotDir*Time.deltaTime);	
		
		//if timer expires, go back to inactive
	    if(timer < 0){ 
	        if(curPause && G3D_ObjectInView.numStoresNV > 1){ 
	        action = 'PrepPauseINA';
		    }
		    else{
		    action = 'inactive';
		    }
	    }
	   
			
		
		//if hit go to TranFWD
	     if (Physics.Raycast (transform.position, fwd ,hit, 200)) {
	     rayStore =  hit.collider.gameObject.name;
	     rayTag = hit.collider.gameObject.tag;
	     hitDist = hit.distance;
		 if(firstHit != rayStore && rayTag == 'store' && G3D_ObjectInView.numStoresNV > 1){
				    firstHit = rayStore;
						if(firstHit == storeLista[cnt] || firstHit == storeListb[cnt] || firstHit == storeListc[cnt] ){	// 
						
						
						
						 distPerc =transList[cnt];
						 tranTime =(hitDist/tranVel) *distPerc;
						
						  if(curPause && G3D_ObjectInView.numStoresNV > 3){ 
						    action = 'PrepPauseFWD';
						    }
						    else{

						    action = 'TranFWD';
						    timer = tranTime;
						    }
						
						
					    
						}
					}
			}
		
}


function AvoidCollision(){
var fwd = transform.TransformDirection (Vector3.forward);
var percBWD : int = 50;
var randPerc : int = Random.Range(1,101);
	if (Physics.Raycast (transform.position, fwd, 10)) {
		if(action != 'Rotate'){
		print ("There is something in front of the object!");
		
		
		if (randPerc <=  percBWD){
		action = 'TranBWD';
		timer = 1;
		}
		else {
		action = 'inactive';
		}
	}	
	}
}



function RandomizeArray(arr : Array){
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i+1);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
}

function OnTriggerEnter(other : Collider) {
	
	
	print("OnTrigger enter: " + other.gameObject);
	
		}
		
		
function OnTriggerExit(other : Collider) {
	
	
	print("OnTriggerExit: " + other.gameObject);
	
		}


