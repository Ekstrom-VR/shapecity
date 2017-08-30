#pragma strict
import System.IO;

private var line : String;
private var subj : String;
private var path = '/Data/ShapeLearn/';


private var trial_num : int = 1;
var cityName : String;
var trial_time : float;
var shapePath : String;
var trialType : String;
var resp_key : String;
var resp_time : float;
var acc :int;
var curRun : int;

function OnEnable() {
//Get target shape name
//Get presented shape name
//Subject info and directory setup
path = "Data/ShapeLearn/";
subj = PlayerPrefs.GetString("subj_id");
System.IO.Directory.CreateDirectory(path);
var newFile =System.IO.File.Create( path + subj + '_output.txt');
newFile.Close();
}


function Update(){
cityName = SL_task.curCityName;
curRun = SL_task.curRun;
trial_time  = SL_test.waitTime;

resp_key = SL_test.resp_key;
resp_time = SL_test.resp_time;
acc = SL_test.acc;

if(trial_num < SL_getShapes.randPaths.length){
shapePath = SL_getShapes.randPaths[trial_num];
trialType = SL_getShapes.randTrialcode[trial_num];
}



	if( SL_test.logData && SL_test.testStage == 'ITI'){
		if(trial_num ==1){
		line =  'curCityName' + '\t' + 'curRun'  + '\t' + 'trial_num' +  '\t' + 'trial_time' + '\t' + 'shapePath'+ '\t'+ 'trialtype'+ '\t'+ 'resp_key' + '\t' + 'resp_time' +  '\t' + 'acc' + '\t' +'resp_time_list' +'\n';
		Addline();
		}

		line =   cityName + '\t' + curRun  + '\t' + trial_num +  '\t' + trial_time + '\t' + shapePath + '\t' +  trialType + '\t' + resp_key + '\t' + resp_time +  '\t' + acc  +'\n';
		Addline();
		
		SL_test.logData = false;
		trial_num++;
	}


}



function Addline(){
	
	print(line);
	System.IO.File.AppendAllText( path +subj + '_output.txt',line);
}
