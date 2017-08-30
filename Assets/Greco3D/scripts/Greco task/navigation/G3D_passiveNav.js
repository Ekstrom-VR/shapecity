#pragma strict

//""""""""""""""""""""""""""""""""Timing and translation related variables
//static var stopwatch : float = 0.0;
var trial_times = new Array();
static var action : String;
static var action_past : String;
var action_present : String;
var storesNV_present : int;

private var timer : float;
var targetStoreA : String;
var targetStoreB : String;
var targetStoreC : String;
var origin : Transform;


private var tranVel : float = 8.0;
var accelerate : float = 1.0;
var deAccel : boolean = false;
var curTranVec = new Vector3();
var curRotVec = new Vector3();
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
var objectHit : boolean = false;
//Bools
var setTimer : boolean = false;
var dirs =['l', 'r'];


var rayStore : String;
var rayTag   : String;
var firstHit : String;

///Pause Variables
var pausePercList  = new Array();
var curPause : boolean;
private var pausePerc : int = 0;
var pauseType : String;




function OnEnable () {

cnt =0;
action = 'inactive';
//action_past = 'null';

//Create lists
CreateLists(1000);
print("new list creates");
}



function Update () {


action_present = action;
storesNV_present = G3D_ObjectInView.numStoresNV;
targetStoreA = storeLista[cnt];
targetStoreB = storeListb[cnt];
targetStoreC = storeListc[cnt];

//Configure real time variables

//Check for objects. Avoid collision
AvoidCollision();
TimerCountDown();
GetPause();

   
    //occurs every ITI
        if(G3D_cityMorph.trial_action == 'reset'){
        G3D_cityMorph.trial_action = 'task';
	    var randAct : int = Random.Range(0,3);
	    if(randAct==0){
	    action = 'inactive';
	    }
	    else if(randAct==1){
	    timer = Random.Range(0,4);
	    action = 'TranFWD';
	    }
	    else if(randAct==2){
	    timer = Random.Range(0,4);
	    action = 'TranBWD';
	 
	    }
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
	else if(action == 'DeAccel'){
	
	 DeAccelerate();
	
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




function TranslatePlayerFWD()
{

var vecTranF : Vector3;


curTranVec =  Vector3(0,0,1)  *  tranVel;
curRotVec = Vector3(0,0,0);
transform.Translate(curTranVec*Time.deltaTime*accelerate);	

	
  	if(timer < 0){  
	  action = 'DeAccel';
   }
}



function TranslatePlayerBWD()
{


	if(timer > 0){
	
      curTranVec =  Vector3(0,0,-1)  *  tranVel;
	  curRotVec = Vector3(0,0,0);	
	  transform.Translate(curTranVec*Time.deltaTime*accelerate);
	}
  	else{  
	  action = 'DeAccel';
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
			
			
	    curTranVec =  Vector3(0,0,0);
        curRotVec = rotDir;
		transform.Rotate(rotDir*Time.deltaTime);	
		
//		//if timer expires, go back to inactive
//	    if(timer < 0){ 
//	        if(curPause && G3D_ObjectInView.numStoresNV > 1){ 
//	        action = 'PrepPauseINA';
//		    }
//		    else{
//		    action = 'DeAccel';
//		    }
//	    }
//	   
			
		
		//if hit go to TranFWD
	     if (Physics.Raycast (transform.position, fwd ,hit, 500)) {
	     rayStore =  hit.collider.gameObject.name;
	     rayTag = hit.collider.gameObject.tag;
	     hitDist = hit.distance;
		 if(firstHit != rayStore && rayTag == 'store' && G3D_ObjectInView.numStoresNV > 1){
				    firstHit = rayStore;
						if(firstHit == storeLista[cnt] || firstHit == storeListb[cnt] || firstHit == storeListc[cnt] ){	// 
						
						
						
						 distPerc =transList[cnt];
						 tranTime =(hitDist/tranVel) *distPerc;
						
						  if(curPause && G3D_ObjectInView.numStoresNV > 1){ 
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
	if(objectHit == true){
	
	 action = 'DeAccel';
	 objectHit = false;
	
	}
}
		
		
function OnTriggerExit(other : Collider) {
	
	
	print("OnTriggerExit: " + other.gameObject);
	objectHit = true;
	}
	
	
	
	
function DeAccelerate(){

	if( accelerate > 0){
	accelerate -= .01;
	transform.Translate(curTranVec*Time.deltaTime*accelerate);
	transform.Rotate(curRotVec*Time.deltaTime*accelerate);	
	}
	else{

	accelerate =1;
	action = 'inactive';

	}

}


function CreateLists( num : int){
	for(var i : int = 0; i < num; i++){ 
		dirList[i] = dirs[Random.Range(0,2)];
		RandomizeArray(G3D_cityConfig.stores);

		storeLista[i] = G3D_cityConfig.stores[0];
		storeListb[i] = G3D_cityConfig.stores[1];
		storeListc[i] = G3D_cityConfig.stores[2];
		transList[i] = Random.Range(40,40)/100.0; //25% to 90%
		
		//For rotation
		rotVelList[i] = Random.Range(50,70);//Rotation velocity
		rotTimeList[i] = Random.Range(5,10); //Rotation
		//new 
		pausePercList[i] = Random.Range(0,100);
		rotTypeList[i] = 0;//Random.Range(0,2);
	}
}