#pragma strict

public class VariablesClass
{
var version : String = 'GR_st9_5000_3c';
var taskMode : String =  'trial_compare'; 
var numVideos : int = 100;    
var trial_time  : float = 5;
var numR  : int = 4;
var numT : int = 25;
var feedBackOn : boolean = false;
var preRun = 'Task';//Either 'Task' or 'CountDown'
var test_mode : boolean= true; 
var present_city_info = false;
var pc_run : int = 0;
var navType = 'passive_VC';
var rotate_mode : boolean = true;
var rotate_type : int = 0;

//Active baseline
 var iti_time  : float = 5;
 var int_AB_time = .3;
 var ab_num_trials : float=3;
 var activeBL_On : boolean = false;
}