#pragma strict
import System.IO;
 

private var cntT = 1;
var pressTime;
var resp_key : String = 'nan';
var resp_time : float;
var resp_key_list = new Array();
var resp_time_list = new Array();
var cntR = 0;
static var logTrial : boolean;
var line;
var subj;
var outputName = 'Output';
var getTime: float;
var priorCity : int;
var currCity : int;
var trial_type : String;
var trial_order = new Array();
var start_time : float;

var acc_curr  : int;
static var acc_total  : float;

var vars = new VariablesClass();

function OnEnable() {

//Initialize variables
	logTrial = true;
	acc_curr  = 0;
	acc_total = 0;
	cntT = 0;
	resp_key  = 'nan';
	
    

	subj = PlayerPrefs.GetString("subj_id");
	System.IO.Directory.CreateDirectory("Data/" + vars.version + "/");
	if(Task.curR==0){
	var newFile = System.IO.File.Create( "Data/" + vars.version + "/" + subj + "_" + vars.version + "_output.txt");
	newFile.Close();
	}
	
}

function Update () {

     if(cntT < vars.numT && Task.curR < vars.numR ) {
     //Get city type
     trial_order = Control.curTrialList[Task.curR];
     
     //Get trial type and city info     
     currCity =  trial_order[cntT];
     
     }
     
    
     
  
if (CityMorph.trial_action == 'task'){
	if (Input.GetKeyDown('left') || Input.GetKeyDown(KeyCode.Alpha1) )
	{
	print ('left arrow key down at ' + CityMorph.stopwatch);
	resp_key = 's';
	resp_time = CityMorph.stopwatch;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = CityMorph.stopwatch;
	cntR++;
	}
	
	if (Input.GetKeyDown('right') || Input.GetKeyDown(KeyCode.Alpha2))
	{
	print ('right arrow key down at ' + CityMorph.stopwatch);
	resp_key = 'd';
	resp_time = CityMorph.stopwatch;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = CityMorph.stopwatch;
	cntR++;
	}
	
	if (Input.GetKeyDown('v'))
	{
	print ('V key down at ' + CityMorph.stopwatch);
	resp_key = '1';
	resp_time = CityMorph.stopwatch;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = CityMorph.stopwatch;
	cntR++;
	}
	if (Input.GetKeyDown('b'))
	{
	print ('B key down at ' + CityMorph.stopwatch);
	resp_key = '2';
	resp_time = CityMorph.stopwatch;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = CityMorph.stopwatch;
	cntR++;
	}
	if (Input.GetKeyDown('n'))
	{
	print ('N key down at ' + CityMorph.stopwatch);
	resp_key = '3';
	resp_time = CityMorph.stopwatch;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = CityMorph.stopwatch;
	cntR++;
	}
	if (Input.GetKeyDown('m'))
	{
	print ('M key down at ' + CityMorph.stopwatch);
	resp_key = '4';
	resp_time = CityMorph.stopwatch;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = CityMorph.stopwatch;
	cntR++;
	}
	
	}

	//Log results
	if ((CityMorph.trial_action == 'reset' || CityMorph.trial_action == 'end') && logTrial){
	
	
	 if (cntT ==0){
     priorCity = 99;
     trial_type = 'null'; 
     }
     else if(cntT< vars.numT)  {
      
	     priorCity = trial_order[cntT-1];

	     if(priorCity == currCity) {
	       trial_type = 's';
	      } else {
	       trial_type = 'd';
	       }
     }
     
	
		
	//Calc acc
	if(vars.taskMode=='trial_compare'){ //Specific taskMode in order to calculate the correct accuracy
		if(resp_key ==trial_type){
		acc_curr = 1;
		print("Correct! TT: " + trial_type + " ,Resp: " + resp_key + " ,currCity: " + currCity + " ,priorCity: " + priorCity);
		}
		else{
		print("Incorrect! TT: " + trial_type + " ,Resp: " + resp_key + " ,currCity: " + currCity + " ,priorCity: " + priorCity);
		acc_curr = 0;
		}
	}
	else if(vars.taskMode=='shape_match'){
	
		if((currCity < 3 && (resp_key == '1' || resp_key == '2')) || (currCity > 2 && (resp_key == '3' || resp_key == '4'))){
		acc_curr = 1;
		print("Correct! TT: " + trial_type + " ,Resp: " + resp_key + " ,currCity: " + currCity + " ,priorCity: " + priorCity);
		}
		else{
		print("Incorrect! TT: " + trial_type + " ,Resp: " + resp_key + " ,currCity: " + currCity + " ,priorCity: " + priorCity);
		acc_curr = 0;
		}

	}
	else{
	
		Debug.Log("Variable assigned incorrectly!");
		Debug.Break();
	
	}

	
	//Add line	
		if (cntT ==0 && Task.curR ==0){
		line =  'Global_trial_num'  + '\t'+ 'run_num' +'\t' + 'trial_time' + '\t' + 'resp_key' + '\t' + 'resp_time' + '\t' +  'trial_type' + '\t' + 'acc' + '\t' + 'currCity'+ '\t' + 'priorCity'  +  '\t' + 'trialList'+  '\t' + 'respList'+'\t' + 'curVidNav'+'\n'; ///'resp_key_list' + '\t' +'resp_time_list'
		Addline();
		}
		

	 	line =  (cntT+1) +  "\t "+ Task.curR +"\t " + CityMorph.startTime + "\t" + resp_key + "\t" + resp_time + "\t" + trial_type + '\t' + acc_curr + '\t' + currCity + '\t' + priorCity  +  '\t' + ITI.trialList +  '\t' + ITI.respList +'\t' + PassiveNav_VC.curVidNav +"\n"; //"[" + resp_key_list + "]"+ " \t" +  "[" + resp_time_list + "]" 
		Addline();
	
	
	if(resp_key=='nan' && vars.feedBackOn){
	
	CityMorph.trial_action ='StopTask';
	}

	//Reset variables
		logTrial  = false;
		cntR = 0;
		resp_key = 'nan';
		resp_time = 00;
		resp_key_list = [];
		resp_time_list = [];	
	}
	

    if ((CityMorph.trial_action == 'task') && !logTrial)
    {
 
    logTrial = true;
    cntT++;
    
    }
}

function Addline(){

//Add for total accuracy score
acc_total += acc_curr;	
//Write out data
System.IO.File.AppendAllText(  "Data/" + vars.version + "/" + subj + "_" + vars.version + "_output.txt",line);

}