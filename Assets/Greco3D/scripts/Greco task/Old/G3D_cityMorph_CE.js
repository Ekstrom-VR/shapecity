#pragma strict

static var stopwatch:float;

private var timer : float;
private var trial_order = new Array();
private var cityNum : int;
private var g3d_iti :G3D_iti;
private var background : GameObject;
private var GetStartTime : boolean;
private var getStartTime = true;
static  var startTime : float = 0;



function OnEnable() {
	

	background = GameObject.Find("Background");//Background object
	
	g3d_iti = GetComponent(G3D_iti); //ITI script


    print("Run #:"+G3D_task_CE.currRun);
    trial_order = G3D_trialConfig_CE.trial_list[G3D_task_CE.currRun];
	
	background.SetActive(false);//Deactivate background texture

	timer = G3D_task_CE.trial_time + G3D_task_CE.iti_time;	//Set up total trialtime
	
	CityConfig();//Config first city	
}

function Update () 
{
	stopwatch += Time.deltaTime;
    if(G3D_playerMovement.action != 'pause'){ 
    timer -=  Time.deltaTime;
    };
	if(getStartTime == true){
      startTime =stopwatch;
      getStartTime = false;
	}




   trial_order = G3D_trialConfig_CE.trial_list[G3D_task_CE.currRun];//Configure trials


	if(timer > 0 && timer <= G3D_task_CE.iti_time ) 
	{
		if(G3D_playerMovement.action != 'iti'){
		G3D_playerMovement.action ='iti';

		background.SetActive(true);	
		g3d_iti.enabled = true;
		
		G3D_task_CE.cnt++;
			if(G3D_task_CE.cnt < G3D_task_CE.numTrials){
			CityConfig();
			}

		}

	
	}
	else if (timer <= 0){

	     if(G3D_task_CE.cnt < G3D_task_CE.numTrials){

		 G3D_playerMovement.action = 'reset';
	     background.SetActive(false);
		 g3d_iti.enabled = false;
		 timer = G3D_task_CE.trial_time + G3D_task_CE.iti_time;
		 getStartTime = true;//Related to logging trial start times
		 }
		 else{ 
		 NextTaskStage();	
		 g3d_iti.enabled = false;
		 }
	 
	 }
}



function CityConfig(){
var city = GameObject.Find("City");
var city_currentx = new float[G3D_cityConfig_CE.stores.length];
var city_currentz = new float[G3D_cityConfig_CE.stores.length];
//var storeCheck = new boolean[City.transform.childcount];

cityNum = trial_order[G3D_task_CE.cnt];
print("citynum: " +cityNum);
city_currentx =G3D_cityConfig_CE.city_x[cityNum -1];
city_currentz =G3D_cityConfig_CE.city_y[cityNum -1];

//Reposition G3D_cityConfig_CE.stores
      for( var i : int = 0; i < G3D_cityConfig_CE.stores.length; i++){
        
        
				//Setup store position
				  GameObject.Find(G3D_cityConfig_CE.stores[i]).transform.position.x= city_currentx[i];
				  GameObject.Find(G3D_cityConfig_CE.stores[i]).transform.position.z =city_currentz[i];
				  
				//Setup walls
				  GameObject.Find("wall" + i).transform.position.x= city_currentx[i];
				  GameObject.Find("wall" + i).transform.position.z =city_currentz[i];	
				  
			
		  			  			  			  
		 }	
		 
		 
		  for( var ii : int = 0; ii < G3D_cityConfig_CE.stores.length; ii++){
				  
				  var targetDir : Vector3;
				 
				 
				  if(ii != G3D_cityConfig_CE.stores.length -1){
				     targetDir =  GameObject.Find(G3D_cityConfig_CE.stores[ii+1]).transform.position - GameObject.Find(G3D_cityConfig_CE.stores[ii]).transform.position;  
				 }	  	
			     else {
				     targetDir =  GameObject.Find(G3D_cityConfig_CE.stores[0]).transform.position - GameObject.Find(G3D_cityConfig_CE.stores[ii]).transform.position;
				 }
				  
				   var forward = GameObject.Find(G3D_cityConfig_CE.stores[ii]).transform.forward;
				   GameObject.Find("wall" + ii).transform.rotation= Quaternion.LookRotation(targetDir);
				   GameObject.Find("wall" + ii).transform.localScale.z = targetDir.magnitude;
				  		  			  			  
		 	}
		 
		 
		 
		 
}




function NextTaskStage(){


	//Deactive player object
	var player : GameObject;
	player = G3D_task.player;
	player.GetComponent(G3D_playerMovement).enabled = false;

    //Deactive ability to pause game
	var g3d_pause : G3D_pause;
	g3d_pause = GetComponent(G3D_pause);
	g3d_pause.enabled = false;


	G3D_task.task_stage = "End"; //Choose next stage
	this.enabled = false; //Disable script
}  	


  