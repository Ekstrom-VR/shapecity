#pragma strict

var version : String = 'GR_st9_5000_3c'; //'GR_st9_5000_3c' 'CE'
var taskMode : String =  'trial_compare'; 
var numVideos : int = 100;//100
var trial_time  : float = 20;//20
var numR  : int = 4;//4
var numT : int = 25;//25
var feedBackOn : boolean = false;
var preRun = 'CountDown';//Either 'Task' or 'CountDown'
var test_mode : boolean= false; 
var present_city_info = false;
var pc_run : int = 0;
var rotate_mode : boolean = true;
var rotate_type : int = 0;
var initials : boolean = false;

//Active baseline
 var iti_time  : float = 3;
 var int_AB_time = .3;
 var ab_num_trials : float=3;
 var activeBL_On : boolean = false;