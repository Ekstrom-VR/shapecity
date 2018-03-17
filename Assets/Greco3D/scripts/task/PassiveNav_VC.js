#pragma strict
import System.IO;

public var newPosition;
public var newRotation;

private var reset : boolean = false;
private var prepareClip : boolean = true;
public var curPosNav = new Array();
private var curRotNav = new Array();
static  var curVidNav : String;
static var run_trial_order = new Array();
private var curT : int;
public var cityPosList = new Array();
public var cityRotList = new Array();
public var cityVidList = new Array();
private var cnt : int = 0;
//private var feedBack : FeedBack;
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
var cntCNC : int = 0;
var control: Control;
function Awake(){
var task : GameObject = GameObject.Find("Task");
control = task.GetComponent(Control) as Control;

}
function ConfigurePassiveNav(){

	//Config
	var config : GameObject = GameObject.Find("Config");
	vars = config.GetComponent(Config) as Config;

	//Screenshot output
	subj = PlayerPrefs.GetString("subj_id");
	outPath = "screenshots/" + vars.version + "/";
	fname = outPath +  subj + "_" + vars.version + "_ss.txt";	
	System.IO.Directory.CreateDirectory(outPath);	
	var newFile = System.IO.File.Create(fname);
	newFile.Close();

	cityPosList = LoadVideoClips.cityPosList;
	cityRotList = LoadVideoClips.cityRotList;
	cityVidList = LoadVideoClips.cityVidList;
	ChangeNavClip();
	yield;
}

function ConfigureRun(){
	run_trial_order = control.run_trial_order;   
}

function SetupTrial(){
    curT =control.curT;
	cnt =0;
	yield;
}

function PassiveNav(){
while(true){
newPosition =  curPosNav[cnt];
newRotation =  curRotNav[cnt];
transform.position = newPosition;
transform.rotation = newRotation;
cnt++;
yield WaitForSeconds(.1);
}
}	

function StartTrial(){
yield StartCoroutine(SetupTrial());
StartCoroutine(PassiveNav());
ChangeNavClip();
}

function StopTrial(){
StopCoroutine(PassiveNav());
ChangeNavClip();
}


function ChangeNavClip(){
	run_trial_order = control.run_trial_order;//Get trial order
	curT =control.curT;
	cntCNC++;
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

function Addline(){
//Write out data
System.IO.File.AppendAllText(fname,line);
}