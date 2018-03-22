#pragma strict
import System.Collections.Generic;

private var output : Output;
public var curR : int = 0;
public var curT : int =0;
public var curCity : int;
public var priorCity : int = 99;
public var trial_type : String = "null";
public var curVidNav : String;
public var coordsList = new List.<City.Coords>();

static var task_action : String;

//from control
public var curTrialList = new List.<City.Run>();
static var curStoreList = new List.<String>();

static var storeList : List.<String> = new List.<String>();

public var numCities : int;
static var city_x = new Array();
static var city_y = new Array();
private var intro : boolean = true;
private var task   : boolean = true;
private var vars: Config;

//Scripts
private var pasNav : PassiveNav;
private var timer : Timer;
private var trial : Trial;
private var videoClips: VideoClips;

//Stage gates
public var taskOn : boolean = false;
private var task_iti : boolean = true;
private var task_trial : boolean = true;
private var task_run_end : boolean = true;
//Public vars
public var get_timer: float;
public var get_task_action : String;

public var run_trial_order =new List.<int>();


function Start(){	
yield StartCoroutine(SetUpTaskType());
yield StartCoroutine(SetUpComps());
get_task_action ='run_start';
}

function Update(){

    TaskVariables();

    if(get_task_action == 'iti'){
        
	    if(task_iti){
		task_iti = false;
		task_trial = true;
	    pasNav.StopTrial();
	    trial.StartITI();
	    CityChange();
	    output.Addline();
        }
  	}
	else if(get_task_action == 'trial'){
		output.GetTrialResponse();
		if(task_trial){
		task_trial = false;
		task_iti = true;
		pasNav.StartTrial();
		trial.StopITI();
		}
  	}
	else if(get_task_action == 'run_end'){
 		if(task_run_end){
		task_run_end = false;
        RunEnd();
		}
	}

	else if(get_task_action == 'run_start'){
		get_task_action = "run_starting...";
		RunStart();						
	}
	else if(get_task_action == 'task_over'){
		get_task_action = 'task_over..';
		StartCoroutine(TaskOver());
	}

}

function RunStart(){
		run_trial_order = curTrialList[curR].trials;
//		yield StartCoroutine(trial.StartCountDown());
		yield StartCoroutine(timer.SetUpTime(vars.iti_time,vars.trial_time,vars.numT)); 
		taskOn = true;
		yield StartCoroutine(timer.StartRun());  
}

function RunEnd(){
	taskOn = false;
	yield StartCoroutine(trial.RunBreak());
	curR +=1;
	if(curR < vars.numR){
	get_task_action = 'run_start';
	taskOn = true;
	task_run_end = true;
	}
	else {

	get_task_action = 'task_over';
	}
}

function SetUpComps(){
	gameObject.AddComponent(Output); 
	yield StartCoroutine(CityConfig());
	output = GetComponent(Output);
	videoClips = GetComponent(VideoClips);
	yield;
	yield StartCoroutine(videoClips.Setup());	
}

function SetUpTaskType (){

	var config : GameObject = GameObject.Find("Config");
	vars = config.GetComponent(Config) as Config;
	 
	var player : GameObject = GameObject.Find("Player");
	pasNav = player.GetComponent(PassiveNav) as PassiveNav;
	
	timer = GetComponent(Timer) as Timer;
	trial = GetComponent(Trial) as Trial;

	//Load city stuff
	var	city : City = new City(vars.version);
	curTrialList = city.trialList;
	curStoreList = city.stores;
	coordsList = city.coordsList;
	numCities = city.coordsList.Count;
	yield;
}

function CityChange(){
    yield WaitForSeconds(0.5);


	var x =  new List.<float>();
    var y =  new List.<float>();
    var cityNum : int = run_trial_order[curT];

	x = coordsList[cityNum-1].x;
	y = coordsList[cityNum-1].y;

	//Reposition Control.curStoreList
	for( var i : int = 0; i < curStoreList.Count; i++){
        GameObject.Find(curStoreList[i]).transform.position.x = x[i];
		GameObject.Find(curStoreList[i]).transform.position.z = y[i];  			  	  			  			  
	}	
}

function TaskOver(){
	get_task_action = "task_over..";
	yield StartCoroutine(trial.TaskOver());
	var expObj : GameObject = GameObject.Find("Experiment");
	var expScript: Experiment = expObj.GetComponent("Experiment") as Experiment;
	expScript.LoadNextModule();
}

function TaskVariables(){
	if(taskOn){
	get_task_action = timer.GetAction();
	get_timer = timer.GetTime('trial');
 	curT = timer.cnt_trial;
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
}

function CityConfig(){

	var city : GameObject = GameObject.Find("City");
	yield;
	for ( var store : int = 0; store < Control.curStoreList.Count; store++){
			Control.storeList.Add(Control.curStoreList[store]);
		}
	yield;

	//Remotes stores not used in task
	for (var child : Transform in city.transform) {
	
		if(!Control.storeList.Contains(child.name)){
		
			Destroy(GameObject.Find(child.name));
	    }
	}
	yield;
}

function CheckInView(objectName : String):boolean{
	var inView : boolean;
	var store = GameObject.Find(objectName);
	var allChildren : Renderer[] =store.GetComponentsInChildren(Renderer) as Renderer[];
		for(var i : Renderer in allChildren){
			 if(i.isVisible){
			 inView =true;	 
			 }
			 else{
			 inView =false;
			 }	 
		}		
		return inView;
}

function CountInView(stores : List.<String>){
 	var cnt: int =0;
	for( var i : int = 0;i < stores.Count; i++){
	 cnt += i;
	}
	return cnt;
}

function GetInViewList(storeList:List.<String>){
	var storesInView = new List.<String>();
	for( var store : String in storeList){
	 	if(CheckInView(store)){
		storesInView.Add(store);
		}
	}
}