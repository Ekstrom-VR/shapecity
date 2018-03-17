#pragma strict
import System.Collections.Generic;

//private var countDown : CountDown;
//private var cityMorph : CityMorph;
//private var iti : ITI;
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
private var pasNav : PassiveNav_VC;
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
print(run_trial_order);
yield StartCoroutine(SetUpComps());
yield StartCoroutine(pasNav.ConfigurePassiveNav());
task_stage = 'Task';

}

function Update(){
	//Listeners
	///////////////////////////////////

	get_task_action = timer.GetAction();
	get_timer = timer.GetTime('trial');
 	curT = timer.cnt_trial;
	run_trial_order = curTrialList[curR];
	curCity = run_trial_order[curT];

	if(curT != 0){
	priorCity = run_trial_order[curT-1];
	}


  	if(priorCity == curCity){
       trial_type = 's';
      } else {
       trial_type = 'd';
     }

	//Task action
	if(get_task_action == 'trial'){
		
		output.GetTrialResponse();

		if(task_task){
		task_task = false;
		trial.StopITI();
		task_iti = true;
		}
  	}

  	else if(get_task_action == 'iti'){
		if(task_iti){
			task_iti = false;
			trial.StartITI();
			CityChange();
			task_task = true;
			output.Addline();
		}
  	}

  	else if(get_task_action == 'run_end' & task_run_end){
    	if(task_run_end){
		task_run_end = false;
		background.BackGroundOn();
		}
	}

	else if(get_task_action == 'run_start' & task_run_start){
	task_run_start = false;
							
	}



	if(task_stage == "Task"){
		StartTask();
	}
	
	if(task_stage == "End"){
		if(stage_end){
		stage_end = false;
		stage_task = true;
 	    StartEnd();
		}
	}
}


function StartTask(){

	if(stage_task){
 		stage_task = false;

//		yield StartCoroutine(trial.StartCountDown());
		print("timer setup");
		yield StartCoroutine(timer.SetUpTime(vars.iti_time,vars.trial_time,vars.numT));  

		print("timer startrun");
		yield StartCoroutine(timer.StartRun());  
}
}

function StartEnd(){
	curT = 0;
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
	pasNav = player.GetComponent(PassiveNav_VC) as PassiveNav_VC;
	
	timer = GetComponent(Timer) as Timer;
	trial = GetComponent(Trial) as Trial;
      //Setup gameobjects


	//Load video clips if necessary
	gameObject.AddComponent(LoadVideoClips);

	var trialListInstance= new TrialListClass();
	var storeListInstance = new StoreListClass();
	var cityListInstance = new CityListClass();
	
    if(vars.version == 'GR_st9_5000_3c'){
    curTrialList = trialListInstance.trialList_GR_3c;
    curStoreList = storeListInstance.stores_GR_st9;
    city_x = cityListInstance.city_x_GR_st9_5000_3c;
	city_y = cityListInstance.city_y_GR_st9_5000_3c;
	numCities = 3;
	}

    if(vars.version == 'CE'){ 
    
    curTrialList = trialListInstance.trialList_CE;
    curStoreList = storeListInstance.stores_CE;
    city_x = cityListInstance.city_x_CE;
	city_y = cityListInstance.city_y_CE;
	numCities = 4;
    }

	if(vars.version == 'PR_1000'){

	curTrialList = trialListInstance.trialList_PR;
	curStoreList = storeListInstance.stores_PR;
	city_x = cityListInstance.city_x_PR;
	city_y = cityListInstance.city_y_PR;
	numCities = 2;
	}	
	print(curTrialList);
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