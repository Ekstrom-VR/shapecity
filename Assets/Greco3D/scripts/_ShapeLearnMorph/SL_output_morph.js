#pragma strict
import System.IO;

private var line : String;
private var subj : String;
private var version : String;
private var path = "Data/ShapeMatch/";


private var trial_num : int = 1;
var cityName : String;
var trial_time : float;
var shapePath : String;
var trialType : int;
var resp_key : int;
var resp_time : float;
var acc :int;
var curRun : int;

function OnEnable() {
//Get target shape name
//Get presented shape name
//Subject info and directory setup
path = "Data/ShapeMatch/";
subj = PlayerPrefs.GetString("subj_id");
version = PlayerPrefs.GetString('match_version');
System.IO.Directory.CreateDirectory(path);
var newFile =System.IO.File.Create( path + subj + '_' + version +'_match_output.txt');
newFile.Close();
}


function Update(){

curRun = SL_task_morph.curRun;
trial_time  = SL_test_morph.waitTime;

resp_key = SL_test_morph.resp_key;
resp_time = SL_test_morph.resp_time;
acc = SL_test_morph.acc;
if(SL_test_morph.trial_cnt > 0){
if(trial_num < SL_test_morph.rand_shape_paths.length){
shapePath = SL_test_morph.rand_shape_paths[SL_test_morph.trial_cnt];
trialType = SL_test_morph.randTrialcode[SL_test_morph.trial_cnt];
}
}



	if( SL_test_morph.logData && SL_test_morph.testStage == 'ITI'){
		if(trial_num ==1){
		line = 'curRun'  + '\t' + 'trial_num' +  '\t' + 'trial_time' + '\t' + 'shapePath'+ '\t'+ 'trialtype'+ '\t'+ 'resp_key' + '\t' + 'resp_time' +  '\t' + 'acc' + '\t' +'resp_time_list' +'\n';
		Addline();
		}

		line =  curRun  + '\t' + trial_num +  '\t' + trial_time + '\t' + shapePath + '\t' +  trialType + '\t' + resp_key + '\t' + resp_time +  '\t' + acc  +'\n';
		Addline();
		
		SL_test_morph.logData = false;
		trial_num++;
	}

	}



function Addline(){
	
	print(line);
	System.IO.File.AppendAllText( path + subj  + '_' + version + '_match_output.txt',line);
}
