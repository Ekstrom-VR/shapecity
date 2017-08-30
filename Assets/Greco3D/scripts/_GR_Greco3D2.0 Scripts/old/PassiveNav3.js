#pragma strict

//""""""""""""""""""""""""""""""""Timing and translation related variables

static var action : String;
static var action_past : String;
var action_present : String;
var storesNV_present : int;
var avoidCoOn : boolean = false;
var dir_present : int;


var targetStoreA : Transform;
var targetStoreB : Transform;
var targetStoreC : Transform;


private var tranVel : float = 6.0;

var rotAccel : float = 1;//1.0;
var traAccel : float = 1;//1.0;
var curTranVec = new Vector3();
var curRotVec = new Vector3();
var cnt :  int;


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
var dirs =[1, -1];
var action_list = new Array('NewRotate','NewTranFWD','NewTranBWD');

var rayStore : String;
var rayTag   : String;
var firstHit : String;

///Pause Variables
var pausePercList  = new Array();
var curPause : boolean;
private var pausePerc : int = 0;
var pauseType : String;
var rotDir : Vector3;


var test = true;
var hitDist : float;
var distPerc : float;
var changeDir : boolean = true;
var smooth : float = 2.0;
private var timer : float = 2.0;
var timer_present : float;
var storeList = new Array(Control.curStoreList);
var storesTEST = new Array();




function OnEnable() {
	cnt =0;
	action = 'reset';
	CreateLists(1000);
	print("new list creates");
 	GetStoreDistance();
    
    
//    for(var i : Transform in storesTEST){
//    
//    print("DB: Name "+ i.name);
//    var squmag : float = (i.position - transform.position ).sqrMagnitude;
//    print("DB: Dist " +squmag );
//    
//    }
 	
 
}

function Update(){ 
	ShowStatic();
	Movement();
	ToggleMove();
	AvoidCollision();
    GetStoreDistance();
}


 
 function ChangeAccelR(startAcc : float, endAcc : float, time : float) 
 {
  	var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        rotAccel = Mathf.Lerp(startAcc, endAcc, i);
      	yield;
        }
   }

 function ChangeAccelT(startAcc : float, endAcc : float, time : float) 
 {
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        traAccel = Mathf.Lerp(startAcc, endAcc, i);
      	yield;
        }
  }

 function ChangeAccelReR(startAcc : float, endAcc : float, time : float) 
 {
 
 
     var rotVel : float= rotVelList[cnt];
 	 var dir : int  = dirList[cnt];
     dir = dir * -1;
 	 dirList[cnt] = dir;
 
 
 
    var i = 0.0;
    var rate = 1.0/time;
    var deaccel = true;
    var reaccel = false;
	    while(deaccel){
		     if(i < 1.0) {
		        i += Time.deltaTime * rate;
		        rotAccel = Mathf.Lerp(startAcc, endAcc, i);
		        
		        } 
		     else{
		     	
		        curRotVec =  Vector3(0,dir,0)  *  rotVel;
		        deaccel = false;
		        reaccel = true;
		        i = 0;
		        } 
		  yield;     
		}
		while(reaccel){
		
		  if(i < 1.0) {
		        i += Time.deltaTime * rate;
		        rotAccel = Mathf.Lerp(endAcc, startAcc, i);
		      	
		        } 
		     else{
		        
		        reaccel = false;
		        
		        }
		       yield; 
		 } 	
   
 }


function ToggleMove(){	
	if(CityMorph.trial_action == 'reset' || action == 'reset'){
	action = action_list[Random.Range(0,3)];
	print('PN Action: Reset');
	StopAllCoroutines();
	}
	else if(action=='NewRotate'){
	RotatePlayer();
	}
	else if(action=='ReRotate'){
	ReRotatePlayer();
	}
	else if(action=='NewTranFWD'){
	TranslatePlayerFWD();   
	}
	else if(action=='NewTranFWDEsc'){
	TranslatePlayerFWDEsc();   
	}
	else if(action=='NewTranBWD'){
	TranslatePlayerBWD();
	} 
	else if(action=='NewTarg'){
	RotatePlayerTarg();
	}	
}


function ChangeMovement(){

var pastAction = action;
print("DB: changemovement " + pastAction);
if(pastAction =='Rotate'){
cnt++;
FindStore();
if(hitDist >= 10){
action = 'NewTranFWD';
}
else {
action = 'ReRotate';
print("DB: HitDist too low. HitDist: " + hitDist);

}

}

else if(pastAction == 'TranFWD' || pastAction == 'TranBWD'){
action = 'NewRotate';
}
else if (pastAction == 'AvoidFrontTrigger' || pastAction == 'AvoidBackTrigger'){
action ='NewTarg';
}
else if( pastAction == 'Targeting'){
action = 'NewTranFWDEsc';
}
}


function Movement(){
transform.Translate(curTranVec*Time.deltaTime*traAccel);
transform.Rotate(curRotVec*Time.deltaTime*rotAccel);
}


function ShowStatic(){
	action_present = action;
	storesNV_present = ObjectInView.numStoresNV;
	dir_present = dirList[cnt];
	
	targetStoreA =storesTEST[storesTEST.length-1];
	targetStoreB =storesTEST[storesTEST.length-2];
    targetStoreC =storesTEST[storesTEST.length-3];
	
 	timer_present=timer;
}

function TranslatePlayerFWD()
{
	 curTranVec =  Vector3(0,0,1)  *  tranVel;
     ChangeAccelT(0,1,1);
     ChangeAccelR(1,0,1);
//   	 changeDir=false;
//	 timer = 4;
   	 StartCoroutine("Timer");
   	 action = "TranFWD";
   	 SetTimer();
           
}
function TranslatePlayerFWDEsc()
{
	 curTranVec =  Vector3(0,0,1)  *  tranVel;
     ChangeAccelT(0,1,1);
     ChangeAccelR(1,0,1);
	 timer =  (hitDist/tranVel) *.2;
	 print("TranslatePlayerFWDEsc timer: " + timer);                															//Factors in store distance
   	 StartCoroutine("TimerTarg");
   	 action = "TranFWD";
   	 print("Translate Timer: " + timer);
           
}

function TranslatePlayerBWD()
{
	 curTranVec =  Vector3(0,0,-1)  *  tranVel;
     ChangeAccelT(0,1,1);
     ChangeAccelR(1,0,1);

   	 StartCoroutine("Timer");
     action = "TranBWD";             
}


function RotatePlayer()
{

 	var rotVel : float= rotVelList[cnt];
 	var dir : int = dirList[cnt];//1 or -1, i.e. L or R
 	
	 curRotVec =  Vector3(0,dir,0)  *  rotVel;
	 ChangeAccelT(1,0,1);
     ChangeAccelR(0,1,1);
     timer = Random.Range(5,40) / 10.0;
   	 StartCoroutine("Timer");
     action = "Rotate"; 
     
     print("Rotate Timer: " + timer);
}


function ReRotatePlayer()
{

 	 var rotVel : float= rotVelList[cnt];
 	 var dir : int  = dirList[cnt];
     dir = dir * -1;
 	 dirList[cnt] = dir;
 	  					//Reverse direction from current direction
 	 ChangeAccelReR(1,.5,1);
//	 curRotVec =  Vector3(0,dir,0)  *  rotVel;
     timer = Random.Range(30,40) / 10.0;
   	 StartCoroutine("Timer");
     action = "Rotate"; 
     print("Re Rotate Timer: " + timer);
}

function RotatePlayerTarg()
{

 	var rotVel : float= rotVelList[cnt];
 	var dir : int = dirList[cnt];//1 or -1, i.e. L or R
 	
	 curRotVec =  Vector3(0,dir,0)  *  rotVel;
//	 ChangeAccelT(1,0,1);
     ChangeAccelR(0,1,1);
//     rotAccel = 1;
     traAccel = 0;
   	 StartCoroutine("FindStoreSearch");
     
     action = "Targeting"; 
     StopCoroutine("Timer");
}


function SetTimer()
{
var hit : RaycastHit;
var randPerc : float;
var targetFound : boolean = false;
		if(Physics.Raycast (transform.position,transform.TransformDirection(Vector3.forward) ,hit, 500)){

				rayStore =  hit.collider.gameObject.name;
				rayTag = hit.collider.gameObject.tag;
         		hitDist = hit.distance;
         		randPerc = Random.Range(50,80) / 100.0;
         		timer =  (hitDist/tranVel) *randPerc; 

         }
               
}



function Timer(){
  
    while(timer > 0) {
        timer -= Time.deltaTime;
      	yield;
    }
   
   	if(timer < 0){
    timer = 2;
    ChangeMovement();
    }
 }




function TimerTarg(){
    while(timer > 0) {
        timer -= Time.deltaTime;
      	yield;
    }
   	if(timer < 0){
    timer = 2;
    objectHit = false;
    ChangeMovement();
    }
 }

function FindStore(){
	var hit : RaycastHit;
	if(Physics.Raycast (transform.position,transform.TransformDirection(Vector3.forward) ,hit, 500)){
	rayStore =  hit.collider.gameObject.name;
	rayTag = hit.collider.gameObject.tag;
	hitDist = hit.distance;
	}
	else{
	rayStore =  null;
	rayTag = null;
	hitDist = 0;
	}
	
	print("rayStore: " + rayStore + ", rayTag: " + rayTag + ", hitDist: " + hitDist );

}

function FindStoreSearch()
{
var hit : RaycastHit;
var targetFound : boolean = false;
while(targetFound==false){

  
				if(Physics.Raycast (transform.position,transform.TransformDirection(Vector3.forward) ,hit, 500)){
				
				print("raycast hit!");
				

				rayStore =  hit.collider.gameObject.name;
				rayTag = hit.collider.gameObject.tag;
         		hitDist = hit.distance;
				
				      if(rayTag == "store"){
						if(rayStore == targetStoreA.name || rayStore == targetStoreB.name || rayStore == targetStoreC.name ){			
						 distPerc =transList[cnt];
						 ChangeMovement();
						 print ("DG: Target found!" + rayStore);
						 print("DG: Potential targets: " + targetStoreA.name + ", " + targetStoreB.name + ", " + targetStoreC.name);
						 targetFound = true;
						}
								
									 
					}
							
					yield;
					
				}

}
}







var lastStoreHit : String;
function AvoidCollision()
{
var fwd = transform.TransformDirection (Vector3.forward);
var bwd = transform.TransformDirection (Vector3.back);
var hit : RaycastHit;
   if(avoidCoOn){
   if(!objectHit){
		if (Physics.Raycast (transform.position, fwd,hit,5)) {
			if(action != 'Rotate'){
			print ("There is something in front of the object!" + hit.collider.gameObject.name);
			action = "AvoidFrontTrigger";
			ChangeMovement();
			lastStoreHit = hit.collider.gameObject.name;
			objectHit= true;
			}	
		}
		if (Physics.Raycast (transform.position, bwd, 5)) {
			if(action != 'Rotate'){
			print ("There is something behaind the object!");
			action = "AvoidBackTrigger";
			lastStoreHit = hit.collider.gameObject.name;
			ChangeMovement();
			objectHit= true;
			}	
		}
	}
	}
}






function CreateLists( num : int)
{
	for(var i : int = 0; i < num; i++){ 
		dirList[i] = dirs[Random.Range(0,2)];


//		storeLista[i] = Control.curStoreList[0];
//		storeListb[i] = Control.curStoreList[1];
//		storeListc[i] = Control.curStoreList[2];
		transList[i] = Random.Range(40,70)/100.0; //25% to 90%
		
		//For rotation
		rotVelList[i] = Random.Range(50,70);//Rotation velocity
		rotTimeList[i] = Random.Range(5,10); //Rotation
		//new 
		pausePercList[i] = Random.Range(0,100);
		rotTypeList[i] = 0;//Random.Range(0,2);
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





function GetStoreDistance(){														//These 3 functions order stores by distance from player
var city = GameObject.Find("City").transform;
storesTEST= GetStores(city);
	if(storesTEST.length > 0){
	SortStoresByDistance(storesTEST);
	}
}

function GetStores(city : Transform){
 var stores = new Array();																											    
    
	for(var s : Transform in city)
	{
 	stores.Add(s);
	}	
	return stores;
}

 function SortStoresByDistance(stores : Array)
 {   																									    																													
//																						bubble-sort transforms													
     var targets : Array = stores;
     var myTransform = transform;		
     var targ1 : Transform;	
     var targ2 : Transform;				
     for ( var e : int = 0; e < targets.length - 1; e ++ )
     {
     
           targ1 = targets[e + 0];
           targ2 = targets[e + 1];
         var sqrMag1 : float = ( targ1.position - myTransform.position ).sqrMagnitude;
         var sqrMag2 : float = ( targ2.position - myTransform.position ).sqrMagnitude;
         
         if ( sqrMag2 < sqrMag1 )
         {
             var tempStore : Transform = targets[e];
             targets[e] = targets[e + 1];
             targets[e + 1] = tempStore;
             e = 0;
         }
     }
     
     return targets;
 }


