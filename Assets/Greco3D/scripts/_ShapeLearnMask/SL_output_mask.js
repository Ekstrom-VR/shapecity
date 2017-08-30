#pragma strict
import System.IO;

private var line : String;
private var subj : String;
private var version : String;
private var path = 'Data/ShapeMask/';


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
path = 'Data/ShapeLearn/';
subj = PlayerPrefs.GetString('subj_id');
version = PlayerPrefs.GetString('mask_version');
System.IO.Directory.CreateDirectory(path);
var newFile =System.IO.File.Create( path + subj + '_' + version + '_mask_output.txt');
newFile.Close();
}


function Update(){
cityName = SL_task_mask.curCityName;
curRun = SL_task_mask.curRun;
trial_time  = SL_test_mask.waitTime;

resp_key = SL_test_mask.resp_key;
resp_time = SL_test_mask.resp_time;
acc = SL_test_mask.acc;

if(trial_num < SL_getShapes_mask.randPaths.length){
shapePath = SL_getShapes_mask.randPaths[trial_num];
trialType = SL_getShapes_mask.randTrialcode[trial_num];
}



	if( SL_test_mask.logData && SL_test_mask.testStage == 'ITI'){
		if(trial_num ==1){
		line =  'curCityName' + '\t' + 'curRun'  + '\t' + 'trial_num' +  '\t' + 'trial_time' + '\t' + 'shapePath'+ '\t'+ 'trialtype'+ '\t'+ 'resp_key' + '\t' + 'resp_time' +  '\t' + 'acc' + '\t' +'resp_time_list' +'\n';
		Addline();
		}

		line =   cityName + '\t' + curRun  + '\t' + trial_num +  '\t' + trial_time + '\t' + shapePath + '\t' +  trialType + '\t' + resp_key + '\t' + resp_time +  '\t' + acc  +'\n';
		Addline();
		
		SL_test_mask.logData = false;
		trial_num++;
	}


}



function Addline(){
	
	print(line);
	System.IO.File.AppendAllText( path +subj + '_' + version + '_mask_output.txt',line);
}
