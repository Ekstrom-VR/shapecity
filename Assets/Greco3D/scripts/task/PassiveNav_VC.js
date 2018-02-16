#pragma strict
import System.IO;

private var reset : boolean = false;
private var prepareClip : boolean = true;
private var curPosNav = new Array();
private var curRotNav = new Array();
static  var curVidNav : String;
private var run_trial_order = new Array();
private var curT : int;
private var cityPosList = new Array();
private var cityRotList = new Array();
private var cityVidList = new Array();
private var cnt : int = 0;
private var feedBack : FeedBack;

function Start(){
//set from static vars
cityPosList = LoadVideoClips.cityPosList;
cityRotList = LoadVideoClips.cityRotList;
cityVidList = LoadVideoClips.cityVidList;
ChangeNavClip();

feedBack = GetComponent(FeedBack);
}

function FixedUpdate() {
	//set from static vars
	var vars = new VariablesClass();
	if(Task.curR < vars.numR){
	run_trial_order = Control.curTrialList[Task.curR];
	}
	

	curT =Task.curT;
	

//   if(CityMorph.trial_action == 'reset' && !reset){
//	
//		reset = true;
//		cnt =0;
//   }
//   else if(CityMorph.trial_action == "task"){
   if(CityMorph.trial_action == "task"){
	   
			prepareClip = true;

		   //Update rotation and translation
		   if(cnt < curPosNav.length){
		   var newPosition =  curPosNav[cnt];
		   var newRotation =  curRotNav[cnt];
	       transform.position = newPosition;
	       transform.rotation = newRotation;
		   cnt++;
		   }	
   }
   else if(CityMorph.trial_action == "reset" && curT < vars.numT || !reset){
   			cnt =0;
   			if(prepareClip){
   			ChangeNavClip();
   			prepareClip = false;
   			}
		    reset = true;		   
   }    	
}

//Change nav clip
var cntCNC : int = 0;
function ChangeNavClip(){
run_trial_order = Control.curTrialList[Task.curR];//Get trial order
curT =Task.curT;
cntCNC++;
//City number/code
//print("DB... run_trial_order" +run_trial_order + " and curT: " + curT);
var cityNum : int= run_trial_order[curT];
var curCityPos = new Array();
var curCityRot = new Array();
var curCityVid = new Array();

//Get city specific navigation route list of arrays
curCityPos = cityPosList[cityNum - 1];
curCityRot = cityRotList[cityNum - 1];
curCityVid = cityVidList[cityNum - 1];

curPosNav = curCityPos[0];
curRotNav = curCityRot[0];
curVidNav = curCityVid[0];

curCityPos.RemoveAt(0);
curCityRot.RemoveAt(0);
curCityVid.RemoveAt(0);
cityPosList[cityNum - 1] = curCityPos;
cityRotList[cityNum - 1] = curCityRot;
cityVidList[cityNum - 1] = curCityVid;
}