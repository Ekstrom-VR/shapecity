#pragma strict

static var stopwatch:float;
static var startTime : float = 0;
static var trial_action : String;
private var run_trial_order = new Array();
private var cityNum : int;
private var GetStartTime : boolean;
private var cityChange = true;
private var getStartTime : boolean;
private var  total_time : float;
private var feedBackCheck : boolean =true;
var origin : Transform;
var timer : float;
//var vars = new VariablesClass();
var vars : Config;
var iti : ITI;
var background : Background;
var trial_action_ins : String;
var control: Control;


function OnEnable(){
control = GetComponent(Control) as Control;

var config : GameObject = GameObject.Find("Config");
vars = config.GetComponent(Config) as Config;

		trial_action = 'reset';
		iti = GetComponent(ITI); //ITI script
		origin = GameObject.Find("Roundabout").transform;		
	  
	    run_trial_order = control.curTrialList[control.curR];//Get trial order
	    
	    background = GetComponent("Background");
	    	    
		//Set up total trialtime: trial time + iti time
		total_time = vars.trial_time + vars.iti_time;
		timer = total_time;
		
		
		//Reset stopwatch
		getStartTime=true;
		stopwatch = 0;
		
		//Config first city
			CityChange();
//			RotateWalls();
//			if(vars.rotate_mode){
//			RotateStores();
//			}
}

	function Update(){
	stopwatch += Time.deltaTime;
	trial_action_ins = trial_action;
	run_trial_order = control.curTrialList[control.curR];//Configure trials

    if(trial_action != 'StopTask'){ 
    timer -=  Time.deltaTime;
    };
	if(getStartTime == true){
      startTime =stopwatch;
      getStartTime = false;
	}	

    if(timer > vars.iti_time && timer < total_time) {
	trial_action = "task";
	feedBackCheck = true;
	cityChange = true;
	background.BackGroundOff();	
	
	}
	else if(timer > 0 && timer <= vars.iti_time){
		if(trial_action != 'iti' && trial_action != 'StopTask'){ //|| (trial_action != 'iti' && control.curT == 1)) {

					trial_action ='iti';
			        background.BackGroundOn();		
					iti.enabled = true;	
					//Advance to next trial
					control.curT++;	
						
		}
		else if(trial_action == 'StopTask' && vars.feedBackOn &&  feedBackCheck == true){
		iti.enabled = false;									
		control.curT++;
		
		}
				
//Change City ofter iterating trials. Should go back and modify this code.
		if(cityChange){				
					if(control.curT < vars.numT){
						ChangeCityCo();	
					}
					cityChange = false;		
		}
	}
	else if (timer <= 0){
	     if(control.curT == vars.numT){
	         trial_action = 'end';
		     NextTaskStage();	
			 iti.enabled = false;
	     }
	     else{
			 trial_action = 'reset';
//			 RandPosition(origin,control.player,15);		
			 iti.enabled = false;	
			 timer = total_time;
			 getStartTime = true;//Related to logging trial start times
		 } 	 
	 }
}


function ChangeCityCo(){

 	yield WaitForSeconds(0.5);
	CityChange();
//	RotateWalls();
//	if(vars.rotate_mode){
//		RotateStores();
//	}
}

function CityChange(){
//print("DB...city change: city num =" + cityNum);
var city_currentx = new Array();
var city_currentz = new Array();
cityNum = run_trial_order[control.curT];
city_currentx =control.city_x[cityNum -1];
city_currentz =control.city_y[cityNum -1];

	//Reposition control.curStoreList
      for( var i : int = 0; i < control.curStoreList.length; i++){
                			
				  GameObject.Find(control.curStoreList[i]).transform.position.x= city_currentx[i];
				  GameObject.Find(control.curStoreList[i]).transform.position.z =city_currentz[i];
				  
				//Setup walls
//				  GameObject.Find("wall" + i).transform.position.x= city_currentx[i];
//				  GameObject.Find("wall" + i).transform.position.z =city_currentz[i];	
				  			  	  			  			  
		 }	
}
		 		 	 
//function RotateStores(){
//          for( var j : int = 0; j < control.curStoreList.length; j++){				  
//				  var targetDir : Vector3;
//				  
//				 
//				  if(j != control.curStoreList.length -1){
//				     targetDir =  GameObject.Find(control.curStoreList[j+1]).transform.position - GameObject.Find(control.curStoreList[j]).transform.position;  
//				 }	  	
//			     else {
//				     targetDir =  GameObject.Find(control.curStoreList[0]).transform.position - GameObject.Find(control.curStoreList[j]).transform.position;
//				 }
//				  
//				   targetDir.y = 0;
//				   var forward = GameObject.Find(control.curStoreList[j]).transform.forward;
//				   
//				   
//				   //Rotate stores
//				   if(vars.rotate_type==1){
//				   	GameObject.Find(control.curStoreList[j]).transform.rotation= Quaternion.LookRotation(targetDir);
//				   	}
//				   else if(vars.rotate_type==2){
//					if(GameObject.Find(control.curStoreList[j]).tag != "store"){
//					   GameObject.Find(control.curStoreList[j]).transform.rotation= Quaternion.LookRotation(targetDir);
//					   }
//				   }
//				  		  			  			  
//		 	}
//		 
//}
		 
//function RotateWalls(){
//		for( var k : int = 0; k < control.curStoreList.length; k++){
//				  
//				  var targetDirW : Vector3;
//				 
//				 
//				  if(k != control.curStoreList.length -1){
//				     targetDirW =  GameObject.Find(control.curStoreList[k+1]).transform.position - GameObject.Find(control.curStoreList[k]).transform.position;  
//				 }	  	
//			     else {
//				     targetDirW =  GameObject.Find(control.curStoreList[0]).transform.position - GameObject.Find(control.curStoreList[k]).transform.position;
//				 }
//				  
//				   var forward = GameObject.Find(control.curStoreList[k]).transform.forward;
//				   GameObject.Find("wall" + k).transform.rotation= Quaternion.LookRotation(targetDirW);
//				   GameObject.Find("wall" + k).transform.localScale.z = targetDirW.magnitude*2;
//				  		  			  			  
//		 	}
//	 
//}

function NextTaskStage(){
	control.task_stage = "End";
	this.enabled = false; 
}  	