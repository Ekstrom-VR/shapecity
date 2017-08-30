#pragma strict
import System.IO;
 

var cntT = 1;
var pressTime;
var resp_key : String = 'nan';
var resp_time : float;
var resp_key_list = new Array();
var resp_time_list = new Array();
var cntR = 0;
var logTrial : boolean;
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
var acc_total : int;
static var acc_perc   : float;


function OnEnable() {

//Initialize variables
	logTrial = true;
	acc_curr  = 0;
	acc_total = 0;
	acc_perc  = 0;
	
    
	if( cntT ==1){
	subj = PlayerPrefs.GetString("subj_id");
	System.IO.Directory.CreateDirectory("Data/CitiEnc/");
	var newFile = System.IO.File.Create( "Data/CitiEnc/" +subj + "_" + G3D_task_CE.version + "_output.txt");
	newFile.Close();
	}
}

function Update () {
    
     //Get city type
     trial_order = G3D_trialConfig_CE.trial_list[G3D_task_CE.currRun];
     
     //Get trial type and city info
     if (G3D_task_CE.cnt ==0){
     priorCity = 99;
     trial_type = 'null'; 
     }
     else if(G3D_task_CE.cnt < G3D_task_CE.numTrials)  {
      
	     priorCity = trial_order[G3D_task_CE.cnt-1];
	     if(priorCity == currCity) {
	       trial_type = 's';
	      } else {
	       trial_type = 'd';
	       }
     }
     
     
     if(G3D_task_CE.cnt < G3D_task_CE.numTrials) {
     currCity = trial_order[G3D_task_CE.cnt];
     }
     

	if (Input.GetKeyDown('left'))
	{
    print ('left key down at ' + G3D_cityMorph_CE.stopwatch);
	resp_key = 's';
	resp_time = G3D_cityMorph_CE.stopwatch;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = G3D_cityMorph_CE.stopwatch;
	cntR++;
	}
	
	if (Input.GetKeyDown('right'))
	{
	print ('right key down at ' + G3D_cityMorph_CE.stopwatch);
	resp_key = 'd';
	resp_time = G3D_cityMorph_CE.stopwatch;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = G3D_cityMorph_CE.stopwatch;
	cntR++;
	}
	

	//Log results
	if ((G3D_playerMovement.action == 'iti') && logTrial){
	
	
		
	//Calc acc
	if(resp_key ==trial_type){
	acc_curr = 1;
	print("Correct! TT: " + trial_type + " ,Resp: " + resp_key + " ,currCity: " + currCity + " ,priorCity: " + priorCity);
	}
	else{
	acc_curr = 0;
	}

	
	
	
		if (G3D_task_CE.cnt ==0){
		line =  'Global_trial_num' + '\t'+ 'trial_num' + '\t'+ 'run_num' +'\t' + 'trial_time' + '\t' + 'resp_key' + '\t' + 'resp_time' + '\t' +  'trial_type' + '\t' + 'acc' + '\t' + 'currCity'+ '\t' + 'priorCity' + '\t' + 'percCorrect' +'\n'; ///'resp_key_list' + '\t' +'resp_time_list'
		Addline();
		}
		
		
	
 	line =  cntT+ "\t " + G3D_task_CE.cnt + "\t "+ G3D_task_CE.currRun +"\t " + G3D_cityMorph_CE.startTime + "\t" + resp_key + "\t" + resp_time + "\t" + trial_type + '\t' + acc_curr + '\t' + currCity + '\t' + priorCity +'\t' + acc_perc.ToString("f1") +"\n"; //"[" + resp_key_list + "]"+ " \t" +  "[" + resp_time_list + "]" 
	Addline();
	
//	
//	if(cntT < G3D_task_CE.numTrials-1){
	cntT++;
//	}
	logTrial  = false;
	cntR = 0;
	resp_key = 'nan';
	resp_time = 00;
	resp_key_list = [];
	resp_time_list = [];
	}
	

    if ((G3D_playerMovement.action == 'inactive' || G3D_playerMovement.action == 'reset') && !logTrial)
    {
 
    logTrial = true;
  
    }

}

function Addline(){
acc_perc = Mathf.Round(100* (acc_total/(G3D_task_CE.cnt)));
acc_total += acc_curr;		
print(acc_total + " correct, perc: "+ acc_perc.ToString("f1")); 
print(line);
System.IO.File.AppendAllText( "Data/CitiEnc/"  +subj+"_output.txt",line);
}