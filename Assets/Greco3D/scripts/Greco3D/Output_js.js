//#pragma strict
//import System.IO;
 
//static var cntT: int;
//var resp_key : String = 'nan';
//var resp_time : float;
//var resp_key_list = new Array();
//var resp_time_list = new Array();
//var cntR : int  = 0;
//var line : String;
//var subj : String;
//var outputName = 'Output';
//var getTime: float;
//var trial_type : String;
//var start_time : float;
//var acc_curr  : int;
//static var acc_total  : float;
//var vars: Config_cs;
//var control: Control;
//var dir_data : String;
//var fpath_output : String;
//var new_line : String;

//function OnEnable() {

////    var config : GameObject = GameObject.Find("Config");
////    vars = config.GetComponent(Config) as Config;
//	vars = Manager.config;
//    control = GetComponent(Control) as Control;
//    new_line = System.Environment.NewLine;

//	acc_curr  = 0;
//	acc_total = 0;
//	resp_key  = 'nan';
//	var sep : String ="/";
//subj = PlayerPrefs.GetString("subj_id");
////	dir_data = sep +"Data" + sep + vars.version + sep;
//	dir_data = "Data/Nav/"+ vars.version + "/";
//	System.IO.Directory.CreateDirectory(dir_data);
//	print(dir_data);
//	fpath_output =  dir_data + sep + subj + "_" + vars.version + "_output.txt";
//	if(control.curR==0){
//	    var newFile = System.IO.File.Create(fpath_output);
//	    newFile.Close();
//	    line =  'Global_trial_num'  + '\t'+ 'run_num' +'\t' + 'trial_time' + '\t' + 'resp_key' + '\t' + 'resp_time' + '\t' +  'trial_type' + '\t' + 'acc' + '\t' + 'currCity'+ '\t' + 'priorCity'  +  '\t' + 'trialList'+  '\t' + 'respList'+'\t' + 'curVidNav'+new_line;
//	    System.IO.File.AppendAllText(fpath_output,line);
//	}	
//}

//function ResetVariables(){

//		cntR = 0;
//		resp_key = 'nan';
//		resp_time = 00;
//		resp_key_list = [];
//		resp_time_list = [];

//}

//function Addline(){

//if(resp_key ==control.trial_type){
//acc_curr = 1;
////print("Correct!");
//}
//else{
////print("Incorrect!");
//acc_curr = 0;
//}

////Add for total accuracy score
//acc_total += acc_curr;
//print('Accuracy: ' + acc_total);
//line =  (control.curT+1) +  "\t "+ control.curR +"\t " + 'CityMorph.startTime' + "\t" + resp_key + "\t" + resp_time + "\t" + trial_type + '\t' + acc_curr + '\t' + control.cityNum + '\t' + control.priorCity  +  '\t' + 'ITI.trialList' +  '\t' + 'ITI.respList' +'\t' + control.curVidNav +new_line; 

////Write out data
//System.IO.File.AppendAllText(fpath_output,line);
//print(fpath_output);
//}


//function GetTrialResponse(){

//if (Input.GetKeyDown('left') || Input.GetKeyDown(KeyCode.Alpha1) )
//	{
//	print ('left arrow key down');
//	resp_key = 's';
//	resp_time = control.get_timer;
//	resp_key_list[cntR] = resp_key;
////	resp_time_list[cntR] = CityMorph.stopwatch;
//	cntR++;
//	}
	
//	if (Input.GetKeyDown('right') || Input.GetKeyDown(KeyCode.Alpha2))
//	{
//	print ('right arrow key down');
//	resp_key = 'd';
//	resp_time = control.get_timer;
//	resp_key_list[cntR] = resp_key;
////	resp_time_list[cntR] = CityMorph.stopwatch;
//	cntR++;
//	}
//}