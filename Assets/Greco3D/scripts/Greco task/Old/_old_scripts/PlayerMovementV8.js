#pragma strict

//""""""""""""""""""""""""""""""""Timing and translation related variables


static var gameTime : float = 0.0;


var action = 'inactive';

var defaultTime : float = 10.0;
var timer : float;
var targetStoreA : String;
var targetStoreB : String;
var targetStoreC : String;

var origin : Transform;


var tranVel : float = 10.0;
var rotVel : float = 10.0;


var vecTranF : Vector3;
var vecRotR : Vector3;
var vecRotL : Vector3;


//"""""""""""""""""""""""""""""""""Other variables
var fwd;
var cnt = 0;



//""""""""""""""""""""""""""""""""""Lists
var dirList = new Array();
var storeLista = new Array();
var storeListb = new Array();
var storeListc = new Array();
var transList = new Array();
var stores = ["Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop", "Music Store", "Ice Cream"];
var dirs =['l', 'r'];


//"""""""""""""""""""""""""""""""""""Terrain stuff
var terrain : Terrain;
terrain = Terrain.activeTerrain;
var terrainSize : Vector3;
terrainSize = terrain.terrainData.size;


//"""""""""""""""""""""""""""""""""""""Raycast variables
var rayStore : String;
var rayTag : String;
var firstHit : String;



//*************************START************************************************
function Start () {

vecTranF =  Vector3(0,0,1)  *  tranVel;
vecRotR  =  Vector3(0,1,0)  *  rotVel;
vecRotL  =  Vector3(0,-1,0) *  rotVel;


RandPosition();//random start position



//Create lists
	for(var i : int = 0; i < 100; i++){
  
		dirList[i] = dirs[Random.Range(0,2)];
		storeLista[i] = stores[Random.Range(0,10)];
		storeListb[i] = stores[Random.Range(0,10)];
		storeListc[i] = stores[Random.Range(0,10)];
		transList[i] = Random.Range(10,90)/100.0; //25% to 90%
	}
	

}



//*************************UPDATE************************************************
function Update () {
gameTime +=  Time.deltaTime;




fwd = transform.TransformDirection (Vector3.forward);


		if (Physics.Raycast (transform.position, fwd, 10)) {
			print ("There is something in front of the object!");
			action = 'inactive';
			
		}




    if(action != 'pause'){ 
    timer -=  Time.deltaTime;
    };
    



   if(action=='inactive'){
   action = 'stage1';
   targetStoreA = storeLista[cnt];
   targetStoreB = storeListb[cnt];
   targetStoreC = storeListc[cnt];
   timer = defaultTime;
   
   }


   else if(action=='stage1'){
	    RotatePlayer();
	    
	}
	
	else if(action=='stage2'){
	    TranslatePlayer();
	    
	}
	else if(action == 'reset'){
	RandPosition();
	cnt++;
	action = 'inactive';
	
	
	
	}
	
   
 
}//Update close




//""""""""""""""""""""""""""""Random Position""""""""""""""""""""""""""""""""""""""""""""""""
function RandPosition()
{

  var position: Vector3 = Vector3(Random.Range(-30.0, 30.0), 0, Random.Range(-30.0, 30.0));
  transform.position = origin.position +  position;
  

  var rot = Vector3(0,0,0);
  rot.y= Random.Range(0,360); 
  transform.Rotate(rot);
  
  
}





//*************************************Translate forward
function TranslatePlayer()
{
	if(timer > 0){
	  transform.Translate(vecTranF*Time.deltaTime);
	}
  	else{  
	  action = 'inactive';
   }
}

//*****************************Rotate Player************************************************
function RotatePlayer()
{
  if(timer> 0){
  
  	var rotDir : Vector3;
  	
	  
	  
	  if(dirList[cnt]=='l'){
	  rotDir =vecRotL;
	  }
	  else{
	  rotDir =vecRotR;
	  }
	
	
	
	transform.Rotate(rotDir*Time.deltaTime);
	
	
	var hit : RaycastHit;
	var hitDist : float;
	var distPerc : float;

	if (Physics.Raycast (transform.position, fwd ,hit, 200)) {
	
	      rayStore =  hit.collider.gameObject.name;
	      rayTag = hit.collider.gameObject.tag;
	      hitDist = hit.distance;
	      if(firstHit != rayStore && rayTag == 'store'){

		  firstHit = rayStore;
		  
		  

			if(firstHit == storeLista[cnt] || firstHit == storeListb[cnt] || firstHit == storeListc[cnt] ){	
		  	
		  	action = 'stage2';
		  	distPerc =transList[cnt];
		  	cnt++;
		  	
		  	timer =(hitDist/tranVel) *distPerc;  //time it takes to move toward next object
		  	
		  	
		  	}
		  
		  }
			
	}

  }
  else 
  {
  
  timer = defaultTime;
  }
 
}







