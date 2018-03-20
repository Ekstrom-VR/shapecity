#pragma strict
import System.Collections.Generic;


private var output : Output1;
private var objectInView : ObjectInView;
private var end : End;
private var cityInfo : CityInfo;
static var task_stage : String;
public var curR : int = 0;
public var curT : int =0;
public var curCity : int;
public var priorCity : int = 99;
public var trial_type : String = "null";
public var curVidNav : String;

static var background : Background;
static var task_action : String;

//from control
public var curTrialList = new Array();
static var curStoreList = new Array();
//static var storeList = new Array();
static var storeList : List.<String> = new List.<String>();


static var numCities : int;
static var city_x = new Array();
static var city_y = new Array();
private var intro : boolean = true;
private var task   : boolean = true;
private var vars: Config;



//Scripts
private var pasNav : PassiveNav;
private var timer : Timer;
private var trial : Trial;

//Stage gates
private var stage_count : boolean = true;
private var stage_task : boolean = true;
private var stage_end : boolean = true;

//Public vars
public var get_timer: float;
public var get_task_action : String;


//Task gates
private var task_task : boolean = true;
private var task_iti : boolean = true;
private var task_run_end : boolean = true;
private var task_run_start : boolean = true;

private var get_countdown_over : boolean = false;


public var run_trial_order = new Array();


function Start(){	
yield StartCoroutine(SetUpTaskType());
run_trial_order = curTrialList[curR];
yield StartCoroutine(SetUpComps());
yield StartCoroutine(pasNav.ConfigurePassiveNav());
task_stage = 'TaskSetup';

}

function Update(){
	//Listeners
	///////////////////////////////////

	if(task_stage == "TaskOn"){
	get_task_action = timer.GetAction();
	get_timer = timer.GetTime('trial');
 	curT = timer.cnt_trial;
	run_trial_order = curTrialList[curR];
	curCity = run_trial_order[curT];
 	curVidNav = pasNav.cityVidTrial as String;

	if(curT != 0){
	priorCity = run_trial_order[curT-1];
	}

  	if(priorCity == curCity){
       trial_type = 's';
      } else {
       trial_type = 'd';
     }
	}


	//Task action
///////////////////////////////////
	if(get_task_action == 'trial'){
		
		output.GetTrialResponse();

		if(task_task){
		task_task = false;
		pasNav.StartTrial();
		trial.StopITI();
		task_iti = true;
		
		}
  	}

  	else if(get_task_action == 'iti'){
		if(task_iti){
			task_iti = false;
			pasNav.StopTrial();
			trial.StartITI();
			CityChange();
			task_task = true;
			output.Addline();
		}
  	}

  	else if(get_task_action == 'run_end'){
    	if(task_run_end){
		task_run_end = false;
		task_iti = true;
 		 RunEnd();
		}
	}

	else if(get_task_action == 'run_start'){
		get_task_action = "run_starting...";
		RunStart();						
	}



	if(task_stage == "TaskSetup"){
		StartCoroutine(StartTask());
	}
	
	if(task_stage == "End"){
	
	}
}

function RunEnd(){
	task_stage = "TaskOff";
	yield StartCoroutine(trial.RunBreak());
	curR +=1;
	if(curR < vars.numR){
	get_task_action = 'run_start';
	}
	else {
	get_task_action = 'task_over';
	}
	task_run_end = true;
}


function StartTask(){
		task_stage = "TaskStarting...";

//		yield StartCoroutine(trial.StartCountDown());
		print("timer setup");
		yield StartCoroutine(timer.SetUpTime(vars.iti_time,vars.trial_time,vars.numT));  
		task_stage = "TaskOn";
		print("timer startrun");
		yield StartCoroutine(timer.StartRun());  
}

function StartEnd(){
	curT = 0;
}

function RunStart(){
//		yield StartCoroutine(trial.StartCountDown());
		print("timer setup");
		yield StartCoroutine(timer.SetUpTime(vars.iti_time,vars.trial_time,vars.numT)); 
		task_stage = "TaskOn";
		print("timer startrun");
		yield StartCoroutine(timer.StartRun());  
}

function SetUpComps(){

//	gameObject.AddComponent(CountDown);
//	gameObject.AddComponent(CityMorph);
//	gameObject.AddComponent(End); 
	gameObject.AddComponent(Output1); 
	gameObject.AddComponent(Background); 
//	gameObject.AddComponent(ITI);
//	gameObject.AddComponent(CityInfo);
	gameObject.AddComponent(CityConfig);

	
//	countDown = GetComponent(CountDown); 
//	cityMorph = GetComponent(CityMorph);
	output = GetComponent(Output1);
//	end = GetComponent(End); 
	background = GetComponent(Background);
//	iti = GetComponent(ITI);
//	cityInfo = GetComponent(CityInfo);
	
//	countDown.enabled = false;
//	cityMorph.enabled = false;
//	output.enabled = false;
//	end.enabled = false;
	background.enabled = true;	 	
//	iti.enabled = false;
	
	yield;
}

function SetUpTaskType (){

	var config : GameObject = GameObject.Find("Config");
	vars = config.GetComponent(Config) as Config;
	 
	var player : GameObject = GameObject.Find("Player");
	pasNav = player.GetComponent(PassiveNav) as PassiveNav;
	
	timer = GetComponent(Timer) as Timer;
	trial = GetComponent(Trial) as Trial;

	//Load video clips
	gameObject.AddComponent(LoadVideoClips);

	//Load city stuff
	var	cityBuilder = new CityBuilder();
	var city : City = cityBuilder.BuildCity(vars.version);	
	curTrialList = city.trialList;
	curStoreList = city.stores;
	city_x = city.city_x;
	city_y = city.city_y;
	numCities = city_x.length;
	yield;
}

function CityChange(){
    yield WaitForSeconds(0.3);

    var city_currentx = new Array();
    var city_currentz = new Array();

	
    var cityNum : int = run_trial_order[curT];

    city_currentx =city_x[cityNum -1];
    city_currentz =city_y[cityNum -1];

	//Reposition Control.curStoreList
      for( var i : int = 0; i < curStoreList.length; i++){
				  GameObject.Find(curStoreList[i]).transform.position.x = city_currentx[i];
				  GameObject.Find(curStoreList[i]).transform.position.z = city_currentz[i];  			  	  			  			  
		 }	
}