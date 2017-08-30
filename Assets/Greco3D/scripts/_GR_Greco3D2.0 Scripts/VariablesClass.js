#pragma strict

public class VariablesClass
{

 var version : String = 'GR_st9_5000_3c'; //'GR_st9_5000_3c','PR_1000' GR,GR_st30, PR,PR_1000,GR_st8_5000_ND
 var taskMode : String =  'trial_compare'; //'trial_compare' or 'shape_match'
 var numVideos : int = 100;   //PR: 20 ,GR: 30     
 var trial_time  : float = 20	; //Typically 20,
 var numR  : int = 4; //PR: 10; GR: 4; CE: 3 ; GR_st9_5000_3c: 4
 var numT : int = 25; //PR: 10; GR: 24; GR_st9_5000_3c: 25
 var feedBackOn : boolean = false;
 var preRun = 'Task';//Either 'Task' or 'CountDown'

//Static variables from Control
var test_mode : boolean= false; //If true, skip instructions
var present_city_info = false;
var pc_run : int = 0;
var navType = 'passive_VC';//passive, passive_VC,
var rotate_mode : boolean = true;
var rotate_type : int = 0;


//Active baseline
 var iti_time  : float = 5;  //Typically 5 or 3,
 var int_AB_time = .3;
 var ab_num_trials : float=3;
 var activeBL_On : boolean = true;
 
 

//
	public function TotTime() : float
	{
		return trial_time + iti_time;
	}

}


/*Notes
feedback Check is located in CityMorph
*/