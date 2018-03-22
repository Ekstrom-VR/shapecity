#pragma strict
import System.IO;

private var reset : boolean = false;
private var prepareClip : boolean = true;

private var cityPosTrial = new List.<Vector3>();
private var cityRotTrial = new List.<Quaternion>();
static  var cityVidTrial : String;
private var run_trial_order = new List.<int>();
private var curT : int;
private var cnt : int = 0;

//private var feedBack : FeedBack;
private var UseCamera : boolean = false;
private  var StartCam : boolean = false;
private var picN : int = 0;
private var line : String;
//private var vars = new VariablesClass();
private var vars : Config;
private var videoClips : VideoClips;
private var cntSS : int = 1;
private var subj : String;
private var outPath : String;
private var fname : String;
var cntCNC : int = 0;
var control: Control;

var navigate : boolean;
var cityNum : int;

function Awake(){
   var task : GameObject = GameObject.Find("Task");
   control = task.GetComponent(Control) as Control;
   videoClips = task.GetComponent(VideoClips) as VideoClips;
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
	yield;
}

function ConfigureRun(){
	run_trial_order = control.run_trial_order;   
}

function SetupTrial(){
    curT =control.curT;
	cnt =0;
	navigate = true;
	yield;
}

function PassiveNav(){
cnt = 0;
while(navigate){
transform.position = cityPosTrial[cnt];
transform.rotation = cityRotTrial[cnt];
cnt++;
yield WaitForFixedUpdate;
}
}	

function StartTrial(){
yield StartCoroutine(SetupTrial());
yield StartCoroutine(PassiveNav());
}

function StopTrial(){
navigate = false;
ChangeNavClip();
}

function ChangeNavClip(){
	run_trial_order = control.run_trial_order;//Get trial order
	curT =control.curT;
	cityNum = run_trial_order[curT];
	print("Change video: cityNum:" + cityNum + " ; curTrial:" + curT);
	var videoClip : VideoClip = videoClips.GetVideo(cityNum-1);
	print(videoClip.path);
	cityPosTrial = videoClip.pos;
	cityRotTrial = videoClip.rot;
	cityVidTrial = videoClip.path;

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
//		 	line =  (Output.cntT+1) + "\t" + PassiveNav_VC.curVidNav + "\t" + CityMorph.stopwatch  + "\t" + cntSS + "\t" + transform.position + "\t" + transform.rotation.eulerAngles + "\n";
//			Addline();
		}
}

function Addline(){
//Write out data
System.IO.File.AppendAllText(fname,line);
}