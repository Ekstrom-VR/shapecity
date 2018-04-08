#pragma strict

private var stopwatch:float;
private var trial_action : String = "run_start";
private var total_time : float;
public var timer : float = 0;
public var cnt_trial : int;
public var iti_time : float;
public var trial_time : float;
public var numTrials : int;

function GetTime(type : String):float{
	var getTime : float;
	switch(type){
		case 'task':
			getTime = stopwatch;		
			break;
		case 'trial':
			getTime = timer;
			break;
	}
	return timer;
}

function GetAction():String{

	return trial_action;
}

function SetUpTime(iti : float, trial : float, numT : int){
		iti_time = iti;
		trial_time = trial;
		total_time = iti + trial;
		timer = total_time;
		stopwatch = 0;
		trial_action = "run_start";
		numTrials = numT;
		cnt_trial = 0;
		yield;
}

function StartRunClock(){
	while(true){
	stopwatch += Time.deltaTime;
	}
	yield;
}

function StartTimerITI(){
	timer = 0;
	while(timer < iti_time){
	timer += Time.deltaTime;
	yield;
	}
	timer = 0;
}

function StartTimerTrial(){
	timer = 0;
	while(timer < trial_time){
	timer += Time.deltaTime;
	yield;
	}
	timer = 0;
}

function TrialTimer(){
trial_action = "trial";
yield StartCoroutine(StartTimerTrial());
cnt_trial++;
trial_action = "iti";
yield StartCoroutine(StartTimerITI());
}

function StartRun(){
trial_action = "start";
yield StartCoroutine(StartTimerITI());

do
{
yield StartCoroutine(TrialTimer());
}while(cnt_trial<numTrials);

trial_action = "run_end";
}