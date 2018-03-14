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
private var UseCamera : boolean = false;
private  var StartCam : boolean = false;
private var picN : int = 0;
private var line;
//private var vars = new VariablesClass();
private var vars : Config;
private var cntSS : int = 1;
private var subj : String;
private var outPath : String;
private var fname : String;

function OnEnable(){

var config : GameObject = GameObject.Find("Config");
vars = config.GetComponent(Config) as Config;
 

	subj = PlayerPrefs.GetString("subj_id");
	outPath = "screenshots/" + vars.version + "/";
	fname = outPath +  subj + "_" + vars.version + "_ss.txt";

	System.IO.Directory.CreateDirectory(outPath);

	if(Task.curR==0){
	var newFile = System.IO.File.Create(fname);
	newFile.Close();
	}
}
function Start(){



//set from static vars
cityPosList = LoadVideoClips.cityPosList;
cityRotList = LoadVideoClips.cityRotList;
cityVidList = LoadVideoClips.cityVidList;
ChangeNavClip();
feedBack = GetComponent(FeedBack);
StartCam = true;
}

function FixedUpdate(){
	//set from static vars
//	var vars = new VariablesClass();
	if(Task.curR < vars.numR){
	run_trial_order = Control.curTrialList[Task.curR];   
	}	

    curT =Task.curT;
	
    if(CityMorph.trial_action == "task"){
	   
		   //Update rotation and translation
		   prepareClip = true;
		   if(cnt < curPosNav.length){
		   var newPosition =  curPosNav[cnt];
		   var newRotation =  curRotNav[cnt];
	       transform.position = newPosition;
	       transform.rotation = newRotation;
		   cnt++;

	           if(StartCam){
				print(CityMorph.trial_action);
				StartCam = false;
			    StartCoroutine("TakePic");
				print("start Takepic");
				}
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

else{
			
			if(!StartCam){
			print("stop Takepic");

			StartCam = true;
            StopCoroutine("TakePic");
			}}		   
    	
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

function TakePic(){
	if(UseCamera){
		while(true){
			yield WaitForSeconds(.1); 
			
			//Take picture
		    Application.CaptureScreenshot(outPath + cntSS.ToString("D10") + ".png");
			print("Snap " + curT);
			cntSS++;
			//Add line to screenshot output
			if (cntSS ==0){
			line =  "Global_trial_num" + "\t" + "curVidNav" + "\t" + "time" + "\t" + "cntSS" + "\t" + "transform" + "\t" + "rotation" +"\n";
			Addline();
			}
		 	line =  (Output.cntT+1) + "\t" + PassiveNav_VC.curVidNav + "\t" + CityMorph.stopwatch  + "\t" + cntSS + "\t" + transform.position + "\t" + transform.rotation.eulerAngles + "\n";
			Addline();
		}
	}
}

function Addline(){
//Write out data
System.IO.File.AppendAllText(fname,line);
}