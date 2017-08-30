#pragma strict

///////initiate variables
/////////////////////////

var moveSpeed : float = 10f;
var turnSpeed : float = 10f;
var roamRadius : float = 10.0;
var randomDirection;


var origin : Transform;
var distanceFromOrigin : float;

//vectors to be randomized
var vecTran : Vector3; 
var vecRotR : Vector3;
var vecRotL : Vector3;



var rotateL = false;
var rotateR = false;
var translate = true;
var trigger = false;

//timer variables
private var trialTime : float = 10.0;
var curTimer : float;

var numits = 100;
var tranCNT = 0;
var rotCNT = 0;

var tranTimes = new float[100];
var rotTimes = new float[100];
var breakTimes= new float[100];

var togglePath : int;
var toggleDir :int;

//Extrat stuff....
//var prefab: GameObject;



function Start () {

curTimer = trialTime;

//random start position
var position: Vector3 = Vector3(Random.Range(-5.0, 5.0), 0, Random.Range(-5.0, 5.0));
transform.position += position;

//Initialize rotation and translation vectors
vecRotR = Vector3(0, 1, 0)*turnSpeed;
vecRotL = Vector3(0, -1, 0)*turnSpeed;
vecTran = Vector3(0,0,1)* moveSpeed;



//Figure out 
	for(var i : int = 0; i < 10; i++){

		tranTimes[i] = Random.Range(3000,6000)/1000.0;
		rotTimes[i] = Random.Range(500,3000)/1000.0;

	}
}

function OnTriggerEnter (other : Collider)
{
	if(other.gameObject.tag == "store" || other.gameObject.tag == "boundary"  )
		{
			Debug.Log("Object is within trigger: " + other.gameObject.name );

			if(trigger==false){
			Triggered();
			trigger=true;
			};
		}   
}


function Update () {
//Countdown
curTimer -= Time.deltaTime;

//Calculate distance between Player and origin
var distanceFromOrigin = Vector3.Distance(transform.position, origin.position);

//Debug.Log("Distance from the origin: " + distanceFromOrigin);
if(distanceFromOrigin>40 && trigger==false){


	if(trigger==false){
			Triggered();
			trigger=true;
			};
	


}

//Move straight
 if(translate == true && rotateL ==false && rotateR == false){
 
    trigger = false;
     
	if (curTimer >0){
	transform.Translate(vecTran*Time.deltaTime);
	}
	else {
	
	ToggleWander();
	}
}
//Rotate Right
else if(translate == false && rotateL == false && rotateR == true){
	if(curTimer > 0){
 
     transform.Rotate(vecRotR*Time.deltaTime);
	}
	else
	{
	
	if(trigger==false){
	ToggleWanderL();}
	else if(trigger==true){
	WalkStraight();
	}
	}

}

//Rotate Left
else if(translate == false && rotateL == true && rotateR == false){
	if(curTimer > 0){
 
     transform.Rotate(vecRotL*Time.deltaTime);
	}
	else
	{
	if(trigger==false){
	ToggleWanderR();}
	else if(trigger==true){
	WalkStraight();
	}
	
	}

}
//Translate Left
else if(translate == true && rotateL ==true && rotateR==false){

	if(curTimer > 0){
     transform.Translate(vecTran*Time.deltaTime);
     transform.Rotate(vecRotL*Time.deltaTime);
	}
	else
	{

	ToggleWanderR();
	}

}
//Translate Right
else if(translate == true && rotateL ==false && rotateR==true){

	if(curTimer > 0){
     transform.Translate(vecTran*Time.deltaTime);
     transform.Rotate(vecRotR*Time.deltaTime);
	}
	else
	{

	ToggleWanderL();
	}

}
//Stand still
else if(translate == false && rotateR ==false && rotateL==false){

	if(curTimer > 0){
//     transform.Translate(vecTran*Time.deltaTime);
//     transform.Rotate(vecRot*Time.deltaTime);
	}
	else
	{
	
	ToggleWander();
	}

}



}


//General toggle script
function ToggleWander(){

   if(trigger==true){
   
   togglePath=88;
   toggleDir=Random.Range(0,2);
   
   } 
   else if(trigger==false){
	togglePath=Random.Range(1,100);
	toggleDir=Random.Range(0,2);
	}
	
	
	if (togglePath <=66){
	translate = true;
	rotateL = false;
	rotateR = false;
	trigger = false;
	curTimer = 3.0;
	}
	else if(togglePath <= 88){
	translate = false;
	
	if(toggleDir==0){
	rotateL = true;
	rotateR = false;
	}
	else if(toggleDir==1){
	rotateL = false;
	rotateR = true;
	}
	translate =false;
	curTimer = 1.0;
	}
	else if(togglePath<= 100){
	rotateL = false;
	rotateR = false;
	translate =false;
	curTimer = 0.5;
	}
}

function ToggleWanderL(){


	togglePath=Random.Range(1,3);
	toggleDir=0;//left only

	
	
	if (togglePath ==1){
	translate = true;
	rotateL = false;
	rotateR = false;
	trigger = false;
	curTimer = 3.0;
	}
	else if(togglePath==2){
	translate = false;
	if(toggleDir==0){
	rotateL = true;
	rotateR = false;
	}
	else if(toggleDir==1){
	rotateL = false;
	rotateR = true;
	}
	translate =false;
	curTimer = 1.0;
	}
	else if(togglePath==3){
	rotateL = false;
	rotateR = false;
	translate =false;
	curTimer = 0.5;
	}

}


function ToggleWanderR(){



	togglePath=Random.Range(1,3);
	toggleDir=1;//right only

	
	
	if (togglePath ==1){
	translate = true;
	rotateL = false;
	rotateR = false;
	trigger = false;
	curTimer = 3.0;
	}
	else if(togglePath==2){
	translate = false;
	if(toggleDir==0){
	rotateL = true;
	rotateR = false;
	}
	else if(toggleDir==1){
	rotateL = false;
	rotateR = true;
	}
	translate =false;
	curTimer = 1.0;
	}
	else if(togglePath==3){
	rotateL = false;
	rotateR = false;
	translate =false;
	curTimer = 0.5;
	}

}


function Triggered(){


	toggleDir=Random.Range(0,2);
	curTimer = 3;
	translate = false;
	if(toggleDir==0){
	rotateL = true;
	rotateR = false;
	}
	else if(toggleDir==1){
	rotateL = false;
	rotateR = true;
	}
	
}

function WalkStraight(){
    curTimer = 3.0;
	translate = true;
	rotateL = false;
	rotateR = false;
	
}
//if((curTimer <= (trialTime - tranTimes[tranCNT]) ) && (rotate == false)) {
//
//tranCNT++;
//rotate = true;
//vecRot = Random.onUnitSphere * turnSpeed;
//vecRot.x =0.0;
//vecRot.z=0.0;
//
//}
//if(rotate ==true){
//transform.Rotate(vecRot*Time.deltaTime);
//}
//if(curTimer <= (trialTime - tranTimes[tranCNT]- rotTimes[rotCNT])){
//rotCNT++;
//rotate = false;
//curTimer = trialTime;
////vecTran = Random.onUnitSphere * moveSpeed;
//vecTran = Vector3(0,0,1)* moveSpeed;
//vecTran.y = 0.0;
//}
//if(rotate==false){
//transform.Translate(vecTran*Time.deltaTime);
//}



//extra code
//transform.Translate (vel*Time.deltaTime);
//transform.Translate(randomDirection);
//Debug.Log(Time.deltaTime);
//transform.Translate(transform(randomDirection);



// var randomDirection = Random.insideUnitSphere * roamRadius;
//        randomDirection += transform.position;
//        NavMeshHit hit;
//        NavMesh.SamplePosition(randomDirection, out hit, roamRadius, 1);
//        Vector3 finalPosition = hit.position;       
//        _nav.destination = finalPosition;