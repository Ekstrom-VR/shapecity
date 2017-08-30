#pragma strict

///////initiate variables
/////////////////////////

var timer : float;
var tranVel : float = 10.0;
var rotVel : float = 20.0;
var roamRadius : float = 10.0;


var origin : Transform;
var distanceFromOrigin : float;

var triggered = false;

var tranTimes = new float[100];
var rotTimes =  new float[100];
var breakTimes = new float[100];

var dirs = ['f','f','f','r','l'];
var moveList = new Array();

var cntM = 0;

var action = 'active';

var vecTranF : Vector3;
var vecRotR : Vector3;
var vecRotL : Vector3;




function Start () {

vecTranF =  Vector3(0,0,1)  *  tranVel;
vecRotR  =  Vector3(0,1,0)  *  rotVel;
vecRotL  =  Vector3(0,-1,0) *  rotVel;

	RandPosition();//random start position



//Create lists
	for(var i : int = 0; i < 100; i++){
        moveList[i]   =    dirs[Random.Range(0,3)];
		tranTimes[i] = Random.Range(3000,6000)/1000.0;
		rotTimes[i]  = Random.Range(500,3000)/1000.0;
	}
}


function Update () {

var fwd = transform.TransformDirection (Vector3.forward);
		if (Physics.Raycast (transform.position, fwd, 10)) {
			print ("There is something in front of the object!");
			if(action != 'escape_1'){ 
	   	 
	    	action ='escape_1';
	    	timer = 2;     
	    }
		}


var distanceFromOrigin = Vector3.Distance(transform.position, origin.position);

//Debug.Log("Distance from the origin: " + distanceFromOrigin);
	if(distanceFromOrigin>40 && triggered==false){
	
	    if(action != 'escape_1'){ 
	    action ='escape_1'; 
	    timer = 3;   
	    }

	}


timer -=  Time.deltaTime;


 
 if(action == 'active'){
  
  action = 'inactive';
  }
 
   //If not escaping, choose action from movelist
   if(action == 'inactive' ){
	   if(moveList[cntM]== 'f'){
	    TranslatePlayer();
	    }
	   else if(moveList[cntM]== 'r' || moveList[cntM]== 'l'){
	    RotatePlayer();
	   }
   }
   
   //If escaping, pivot and translate until away from danger
   else if (action=='escape_1'){
        RotatePlayer();
   }
   else if (action=='escape_2'){
        TranslatePlayer();
   }
}//Update close


//
function OnTriggerEnter (other : Collider)
{

	if(other.gameObject.tag == "store" || other.gameObject.tag == "boundary"  )
	{
			Debug.Log("Object entered trigger: " + other.gameObject.name );

		
		  
	}
}


function OnTriggerExit (other : Collider)
{

	if(other.gameObject.tag == "store" || other.gameObject.tag == "boundary"  )
	{
			Debug.Log("Object exited trigger: " + other.gameObject.name );

		
		  
	}
}



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
	  ToggleAction();
   }
}

/////Rotate
function RotatePlayer()
{
  
  if(timer > 0){
  
  	var rotDir : Vector3;
  	if(action == 'inactive'){
	  if(moveList[cntM]=='r'){
	  rotDir =vecRotR;
	  }
	  else if(moveList[cntM]=='l'){
	  rotDir =vecRotR;
	  }
	}
	else if(action == 'escape_1'){
	
	rotDir = vecRotR;
	}
	  
	  
 transform.Rotate(vecRotL*Time.deltaTime);

  }
  else{
  	ToggleAction();
  }

}

function ToggleAction()
{
      
	  if(action == 'inactive'){
	    cntM++;
	  	action = 'active';
	  	timer = tranTimes[cntM];
	  }
	  else if(action == 'escape_1'){
	  	action = 'escape_2';
	  	timer = 2;
	  }
	  else if(action == 'escape_2'){
	    cntM++;
	  	action = 'active';
	  	timer = tranTimes[cntM];
	  }


}




