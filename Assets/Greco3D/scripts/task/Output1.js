#pragma strict
import System.IO;
 
static var cntT: int;
var resp_key : String = 'nan';
var resp_time : float;
var resp_key_list = new Array();
var resp_time_list = new Array();
var cntR : int  = 0;
var line : String;
var subj : String;
var outputName = 'Output';
var getTime: float;
var trial_type : String;
var start_time : float;
var acc_curr  : int;
static var acc_total  : float;
var vars: Config;
var control: Control;

function OnEnable() {

var config : GameObject = GameObject.Find("Config");
vars = config.GetComponent(Config) as Config;
control = GetComponent(Control) as Control;

//Initialize variables
	acc_curr  = 0;
	acc_total = 0;
	resp_key  = 'nan';
	    
	subj = PlayerPrefs.GetString("subj_id");
	System.IO.Directory.CreateDirectory("Data/" + vars.version + "/");
	if(control.curR==0){
	var newFile = System.IO.File.Create( "Data/" + vars.version + "/" + subj + "_" + vars.version + "_output.txt");
	newFile.Close();
	line =  'Global_trial_num'  + '\t'+ 'run_num' +'\t' + 'trial_time' + '\t' + 'resp_key' + '\t' + 'resp_time' + '\t' +  'trial_type' + '\t' + 'acc' + '\t' + 'currCity'+ '\t' + 'priorCity'  +  '\t' + 'trialList'+  '\t' + 'respList'+'\t' + 'curVidNav'+'\n';
	System.IO.File.AppendAllText(  "Data/" + vars.version + "/" + subj + "_" + vars.version + "_output.txt",line);
	}	
}


function ResetVariables(){
		cntR = 0;
		resp_key = 'nan';
		resp_time = 00;
		resp_key_list = [];
		resp_time_list = [];

}

function Addline(){

if(resp_key ==control.trial_type){
acc_curr = 1;
print("Correct!");
}
else{
print("Incorrect!");
acc_curr = 0;
}

//Add for total accuracy score
acc_total += acc_curr;	

//line =  (cntT+1) +  "\t "+ control.curR +"\t " + CityMorph.startTime + "\t" + resp_key + "\t" + resp_time + "\t" + trial_type + '\t' + acc_curr + '\t' + control.curCity + '\t' + control.priorCity  +  '\t' + ITI.trialList +  '\t' + ITI.respList +'\t' + control.curVidNav +"\n"; 

line =  (cntT+1) +  "\t "+ control.curR +"\t " + 'CityMorph.startTime' + "\t" + resp_key + "\t" + resp_time + "\t" + trial_type + '\t' + acc_curr + '\t' + control.curCity + '\t' + control.priorCity  +  '\t' + 'ITI.trialList' +  '\t' + 'ITI.respList' +'\t' + control.curVidNav +"\n"; 

//Write out data
System.IO.File.AppendAllText(  "Data/" + vars.version + "/" + subj + "_" + vars.version + "_output.txt",line);
}


function GetTrialResponse(){


if (Input.GetKeyDown('left') || Input.GetKeyDown(KeyCode.Alpha1) )
	{
	print ('left arrow key down');
	resp_key = 's';
//	resp_time = CityMorph.stopwatch;
	resp_key_list[cntR] = resp_key;
//	resp_time_list[cntR] = CityMorph.stopwatch;
	cntR++;
	}
	
	if (Input.GetKeyDown('right') || Input.GetKeyDown(KeyCode.Alpha2))
	{
	print ('right arrow key down');
	resp_key = 'd';
//	resp_time = CityMorph.stopwatch;
	resp_key_list[cntR] = resp_key;
//	resp_time_list[cntR] = CityMorph.stopwatch;
	cntR++;
	}
}