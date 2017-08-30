#pragma strict

static var stopwatch:float;
static var startTime : float = 0;
static var trial_action : String;
var timer : float;
private var trial_order = new Array();
private var cityNum : int;
private var g3d_iti :G3D_iti;
private var background : GameObject;
private var GetStartTime : boolean;
private var getStartTime = true;
private var  total_time : float;
var origin : Transform;


function OnEnable(){
	trial_action = 'reset';
	background = GameObject.Find("Background");//Background object
	g3d_iti = GetComponent(G3D_iti); //ITI script
    trial_order = G3D_task.trial_list[G3D_task.currRun];//Get trial order
	background.SetActive(false);//Deactivate background texture
	total_time = G3D_task.trial_time + G3D_task.iti_time;//Set up total trialtime: trial time + iti time
	timer = total_time;
	CityChange();//Config first city
	RandPosition(origin,G3D_task.player,15);	
}

function Update(){
	stopwatch += Time.deltaTime;
	trial_order = G3D_task.trial_list[G3D_task.currRun];//Configure trials



    if(trial_action != 'StopTask'){ 
    timer -=  Time.deltaTime;
    };
	if(getStartTime == true){
      startTime =stopwatch;
      getStartTime = false;
	}
	

    if(timer > G3D_task.iti_time && timer < total_time) {
	trial_action = "task";
	}
	else if(timer > 0 && timer <= G3D_task.iti_time ){
		if(trial_action != 'iti'){
		trial_action ='iti';

		background.SetActive(true);	
		g3d_iti.enabled = true;
		
		G3D_task.cnt++;
		if(G3D_task.cnt < G3D_task.numTrials){
			CityChange();
		}
		}
	}
	else if (timer <= 0){
	     if(G3D_task.cnt < G3D_task.numTrials){
		 trial_action = 'reset';
		 RandPosition(origin,G3D_task.player,15);	
	     background.SetActive(false);
		 g3d_iti.enabled = false;
		 timer = G3D_task.trial_time + G3D_task.iti_time;
		 getStartTime = true;//Related to logging trial start times
		 }
		 else{ 
		 NextTaskStage();	
		 g3d_iti.enabled = false;
		 } 	 
	 }
}



function CityChange(){
var origin = GameObject.Find("Roundabout");
var city = GameObject.Find("City");
var city_currentx = new float[G3D_cityConfig.stores.length];
var city_currentz = new float[G3D_cityConfig.stores.length];
//var storeCheck = new boolean[City.transform.childcount];

cityNum = trial_order[G3D_task.cnt];
print("citynum: " +cityNum);
print(G3D_cityConfig.city_x[0]);
city_currentx =G3D_cityConfig.city_x[cityNum -1];
city_currentz =G3D_cityConfig.city_y[cityNum -1];

//Reposition G3D_cityConfig.stores
      for( var i : int = 0; i < G3D_cityConfig.stores.length; i++){
        
        
				//Setup store position
				  GameObject.Find(G3D_cityConfig.stores[i]).transform.position.x= city_currentx[i];
				  GameObject.Find(G3D_cityConfig.stores[i]).transform.position.z =city_currentz[i];
				  
				//Setup walls
				  GameObject.Find("wall" + i).transform.position.x= city_currentx[i];
				  GameObject.Find("wall" + i).transform.position.z =city_currentz[i];	
				  
				  
				//Setup neighbors
				  GameObject.Find(G3D_cityConfig.stores[i]).transform.position.x= city_currentx[i];
				  GameObject.Find(G3D_cityConfig.stores[i]).transform.position.z =city_currentz[i];
				  
				  
				    if(GameObject.Find(G3D_cityConfig.stores[i]).transform.position.x > origin.transform.position.x){
  	   				 GameObject.Find(G3D_cityConfig.stores[i]+ "_n").transform.localPosition.x = -10;
					}
					else if(GameObject.Find(G3D_cityConfig.stores[i]).transform.position.x < origin.transform.position.x){
  	   				 GameObject.Find(G3D_cityConfig.stores[i]+ "_n").transform.localPosition.x = 10;
					}
					  if(GameObject.Find(G3D_cityConfig.stores[i]).transform.position.z > origin.transform.position.z){
  	   				 GameObject.Find(G3D_cityConfig.stores[i]+ "_n").transform.localPosition.z = -10;
					}
					else if(GameObject.Find(G3D_cityConfig.stores[i]).transform.position.z < origin.transform.position.z){
  	   				 GameObject.Find(G3D_cityConfig.stores[i]+ "_n").transform.localPosition.z = 10;
					}
		
		
	
				  
			
		  			  			  			  
		 }	
		 
		 
		  for( var ii : int = 0; ii < G3D_cityConfig.stores.length; ii++){
				  
				  var targetDir : Vector3;
				 
				 
				  if(ii != G3D_cityConfig.stores.length -1){
				     targetDir =  GameObject.Find(G3D_cityConfig.stores[ii+1]).transform.position - GameObject.Find(G3D_cityConfig.stores[ii]).transform.position;  
				 }	  	
			     else {
				     targetDir =  GameObject.Find(G3D_cityConfig.stores[0]).transform.position - GameObject.Find(G3D_cityConfig.stores[ii]).transform.position;
				 }
				  
				   var forward = GameObject.Find(G3D_cityConfig.stores[ii]).transform.forward;
				   GameObject.Find("wall" + ii).transform.rotation= Quaternion.LookRotation(targetDir);
				   GameObject.Find("wall" + ii).transform.localScale.z = targetDir.magnitude;
				  		  			  			  
		 	}
	 
}



function NextTaskStage(){
	G3D_task.task_stage = "End"; //Choose next stage
	this.enabled = false; //Disable script
}  	


  