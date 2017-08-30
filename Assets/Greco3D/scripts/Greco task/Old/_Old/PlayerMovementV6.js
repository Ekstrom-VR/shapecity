#pragma strict

///////initiate variables
/////////////////////////
var timer : float;
var tranVel : float = 10f;
var rotVel : float = 10f;
var roamRadius : float = 10.0;


var origin : Transform;
var distanceFromOrigin : float;

var triggered = false;

var tranTimes = new float[100];
var rotTimes =  new float[100];
var breakTimes= new float[100];

var dirs = ['f','r','l'];
var moveList = new Array();

var cntM = 0;

var pivot = true;


var vecTranF = Vector3(0,0,1)  * tranVel;
var vecRotR = Vector3(0,1,0)  * rotVel;
var vecRotL = Vector3(0,-1,0) * rotVel;

function Start () {


//	RandPosition();//random start position



//Create lists
	for(var i : int = 0; i < 100; i++){
        moveList[i]   =    dirs[Random.Range(1,3)];
		tranTimes[i] = Random.Range(3000,6000)/1000.0;
		rotTimes[i]  = Random.Range(500,3000)/1000.0;

	}
}


function Update () {


//var distanceFromOrigin = Vector3.Distance(transform.position, origin.position);
//
////Debug.Log("Distance from the origin: " + distanceFromOrigin);
//	if(distanceFromOrigin>40 && triggered==false){
//	
//			    Escape();
//		
//	}


timer -=  Time.deltaTime;


 
 if(pivot == true){
  pivot =false;
  timer = tranTimes[cntM];
  }
 
   
   if(moveList[cntM]== 'f'){
    TranslatePlayer();
    }
   else if(moveList[cntM]== 'r' || moveList[cntM]== 'l'){
    RotatePlayer();
   }

    
   
       
  
}//Update close


//
//function OnTriggerEnter (other : Collider)
//{
//	if(other.gameObject.tag == "store" || other.gameObject.tag == "boundary"  )
//		{
//			Debug.Log("Object is within trigger: " + other.gameObject.name );
//
//			if(triggered==false){
//			Escape();
//			};
//		}   
//}



function RandPosition()
{

  var position: Vector3 = Vector3(Random.Range(-5.0, 5.0), 0, Random.Range(-5.0, 5.0));
  transform.position += position;
}





///Translate forward
function TranslatePlayer()
{
  if(timer > 0){
  transform.Translate(vecTranF*Time.deltaTime);
  }
  else{  
  cntM++;
  pivot = true;
  }
}

/////Rotate
function RotatePlayer()
{
  
  if(timer > 0){
	  if(moveList[cntM]=='r'){
	  transform.Rotate(vecRotR*Time.deltaTime);
	  }
	  else if(moveList[cntM]=='l'){
	  transform.Rotate(vecRotL*Time.deltaTime);
	  }
  }
  else{
  cntM++;
  pivot = true;
  }

}

//
////Escape corner
//function Escape()
//{   
//      triggered = true;
//      
//      RotatePlayer(rotVel,3, dirs[Random.Range(2,4)]);
//      TranslatePlayer(tranVel,1);
//      
//      triggered = false;          
// }




