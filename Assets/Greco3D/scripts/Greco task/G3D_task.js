#pragma strict

static var task_stage : String;
static var task_stages = new Array("CountDown","Task","End");
static var stageNum : int = 0;
static var version = 'PR';
static var navType = 'passive';
static var trial_time  : float = 100;
static var iti_time  : float = 1;
static var numRuns   : int = 4;
static var numTrials : int = 24;
static var currRun    : int = 0;
static var cnt  : float = 0;
static var trial_list= new Array();
static var player : GameObject;

var presentStage : String;
var presentRun : int;
var taskBreak : boolean = false;
var playerPassive : GameObject;
var playerActive : GameObject;


var countDown : G3D_countDown;
var cityMorph : G3D_cityMorph;
var iti : G3D_iti;
var output : G3D_output;
var objectInView : G3D_ObjectInView;
var pause : G3D_pause;
var end : G3D_end;
var stimOrder_CE: StimOrder_CE;

function Awake(){
	
	
	 //Task scripts
	countDown = GetComponent(G3D_countDown);
	cityMorph = GetComponent(G3D_cityMorph);
	iti = GetComponent(G3D_iti);
    output = GetComponent(G3D_output);
    objectInView = GetComponent(G3D_ObjectInView);
    pause = GetComponent(G3D_pause);
	end = GetComponent(G3D_end);
	 

	//Trial order
	
	  if(G3D_task.version == 'CE' || G3D_task.version == 'GR'){
    var stimOrder_CE: StimOrder_CE;
	gameObject.AddComponent(StimOrder_CE);
	stimOrder_CE = GetComponent(StimOrder_CE);

	trial_list[0] = stimOrder_CE.run1;
	trial_list[1] = stimOrder_CE.run2;
	trial_list[2] = stimOrder_CE.run3;
	trial_list[3] = stimOrder_CE.run4;
	}
	
	else if(G3D_task.version == 'PR'){
	var stimOrder_PR: StimOrder_PR;
	gameObject.AddComponent(StimOrder_PR);
	stimOrder_PR = GetComponent(StimOrder_PR);
	trial_list[0] = stimOrder_PR.run1;	
	}
	
	//Player
	playerPassive = GameObject.Find("Passive Navigator");
    playerActive = GameObject.Find("Active Navigator");
   
    playerPassive.SetActive(false);
    playerActive.SetActive(false);
   
   if(navType == "passive"){
   	player = playerPassive;
   }
   else if(navType == "active"){
   	player = playerActive;
   }   
   

    player.SetActive(true);
    
    
//    task_stage = "CountDown";
     task_stage = "Task";
}



function Update(){
	
	//Present currentStage in Inspector
	presentStage = task_stage;
	presentRun = currRun;
	
	if(task_stage == "CountDown" ){
	 //Task scripts
	countDown.enabled=true;
	cityMorph.enabled=false;
    output.enabled=false;
    objectInView.enabled=false;
    pause.enabled=false;
	end.enabled=false;

	}

	else if(task_stage == "Task" ){
   	
	 //Task scripts
	countDown.enabled=false;
	cityMorph.enabled=true;
    output.enabled=true;
    objectInView.enabled=true;
    pause.enabled=true;
	end.enabled=false;
	if(navType == "passive"){
	player.GetComponent(G3D_passiveNav).enabled = true;
	}
    
	}
	
	if(task_stage == "End"){
	 
	 	 //Task scripts
	countDown.enabled=false;
	cityMorph.enabled=false;
    output.enabled=false;
    objectInView.enabled=false;
    pause.enabled=false;
	end.enabled=true; 
    cnt = 0;
		
	}
}


