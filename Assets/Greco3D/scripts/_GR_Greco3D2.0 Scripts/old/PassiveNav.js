#pragma strict

//""""""""""""""""""""""""""""""""Timing and translation related variables

static var action : String;
static var action_past : String;
var action_present : String;
var storesNV_present : int;


var targetStoreA : String;
var targetStoreB : String;
var targetStoreC : String;


private var tranVel : float = 8.0;




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
var action_list = new Array('inactive','TranFWD','TranBWD');

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


function OnEnable() {
	cnt =0;
	action = 'inactive';
	CreateLists(1000);
	print("new list creates");
	

}

function Update(){ 
	ShowStatic();
	FindStore();
	AvoidCollision();
	Movement();
	ChangeDir();


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



 
 
 

 
 
function ChangeDir(){
	
	if(CityMorph.trial_action == 'reset'){
	action = action_list[Random.Range(0,2)];
	}
	else if(action=='inactive'){
	cnt++; 
	action = 'Rotate';
	changeDir= true;
	}
	else if(action=='Rotate'){
	RotatePlayer(); 
	}
	else if(action=='TranFWD'){
	TranslatePlayerFWD();   
	}
	
}

function Movement(){
transform.Translate(curTranVec*Time.deltaTime*traAccel);
transform.Rotate(curRotVec*Time.deltaTime*rotAccel);
}


function ShowStatic(){
	action_present = action;
	storesNV_present = ObjectInView.numStoresNV;
 	targetStoreA =storeLista[0];
 	targetStoreB =storeLista[1];
 	targetStoreC =storeLista[2];
}

function TranslatePlayerFWD()
{
	curTranVec =  Vector3(0,0,1)  *  tranVel;
	
	if(changeDir){
     ChangeAccelT(0,1,1);
     ChangeAccelR(1,0,1);
   	 changeDir=false;
    }
}


function RotatePlayer(){

 	var rotVel : float= rotVelList[cnt];
 	var dir : int = dirList[cnt];//1 or -1, i.e. L or R
 	
	curRotVec =  Vector3(0,dir,0)  *  rotVel;

	if(changeDir){
	 ChangeAccelT(1,0,1);
     ChangeAccelR(0,1,1);
   	 changeDir=false;
    }

}


function FindStore()
{
var fwd : Vector3 = transform.TransformDirection (Vector3.forward);
var hit : RaycastHit;

if (Physics.Raycast (transform.position, fwd ,hit, 500)) {
rayStore =  hit.collider.gameObject.name;
rayTag = hit.collider.gameObject.tag;
hitDist = hit.distance;
//		 if(firstHit != rayStore && rayTag == 'store' && ObjectInView.numStoresNV > 1){
 
	 if( rayTag == 'store' && ObjectInView.numStoresNV > 1){
			
 				
		   		firstHit = rayStore;
				if(firstHit == storeLista[cnt] || firstHit == storeListb[cnt] || firstHit == storeListc[cnt] ){	// 
//				
//				 distPerc =transList[cnt];
//				 tranTime =(hitDist/tranVel) *distPerc;
				 action = 'TranFWD';
				 changeDir = true;

		}
			 
	}
}
}




function AvoidCollision()
{
var fwd = transform.TransformDirection (Vector3.forward);
//var percBWD : int = 50;
//var randPerc : int = Random.Range(,101);

	if (Physics.Raycast (transform.position, fwd, 15)) {
		if(action != 'Rotate'){
		print ("There is something in front of the object!");
		
		
//		if (randPerc <=  percBWD){
//		action = 'TranBWD';
//
//		}
//		else {
		action = 'inactive';
		
		}
	}	
}



function OnTriggerEnter(other : Collider) 
{
	print("OnTrigger enter: " + other.gameObject);
	if(objectHit == true){
	 objectHit = false;
	}
}
		
		
function OnTriggerExit(other : Collider) 
{	
	print("OnTriggerExit: " + other.gameObject);
	objectHit = true;
}
	



function CreateLists( num : int)
{
	for(var i : int = 0; i < num; i++){ 
		dirList[i] = dirs[Random.Range(0,2)];
		RandomizeArray(Control.curStoreList);

		storeLista[i] = Control.curStoreList[0];
		storeListb[i] = Control.curStoreList[1];
		storeListc[i] = Control.curStoreList[2];
		transList[i] = Random.Range(40,40)/100.0; //25% to 90%
		
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