#pragma strict
import System.IO;

private var cityPosTrial = new List.<Vector3>();
private var cityRotTrial = new List.<Quaternion>();
static  var cityVidTrial : String;
private var run_trial_order = new List.<int>();
private var curT : int;
public var cnt : int = 0;

private var line : String;
private var vars : Config_cs;
private var videoClips : VideoClips;
private var cntSS : int = 1;
private var subj : String;
private var outPath : String;
private var fname : String;
private var control: Control;

private var navigate : boolean;
private var cityNum : int;

function Awake(){
   var task : GameObject = GameObject.Find("Task");
   control = task.GetComponent(Control) as Control;
   videoClips = task.GetComponent(VideoClips) as VideoClips;
	var config : GameObject = GameObject.Find("Config");
//	vars = config.GetComponent(Config) as Config;
	vars = Manager.config;
}

function SetupTrial(){
    curT =control.curT;
	cnt =0;
	navigate = true;
	ChangeNavClip();
	yield;
}

function PassiveNav(){
cnt = 0;
while(navigate){
transform.localPosition.x = cityPosTrial[cnt].x;
transform.localPosition.z = cityPosTrial[cnt].z;
transform.localRotation = cityRotTrial[cnt];
cnt++;
yield WaitForFixedUpdate;
}
}	

function StartTrial(){
yield StartCoroutine(PassiveNav());
}

function StopTrial(){
navigate = false;
}

function ChangeNavClip(){
	run_trial_order = control.run_trial_order;//Get trial order
	curT =control.curT;
	cityNum = run_trial_order[curT];
	print("Change video: cityNum:" + cityNum + " ; curTrial:" + curT);
	var videoClip : VideoClips.Clip = videoClips.GetVideo(cityNum-1);
	print(videoClip.path);
	cityPosTrial = videoClip.pos;
	cityRotTrial = videoClip.rot;
	cityVidTrial = videoClip.path;
}