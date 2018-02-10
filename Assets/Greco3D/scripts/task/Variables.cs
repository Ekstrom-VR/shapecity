using UnityEngine;
using System.Collections;

public class Variables {

 string version = "GR_st9_5000_3c"; //'GR_st9_5000_3c','PR_1000' GR,GR_st30, PR,PR_1000,GR_st8_5000_ND
 string taskMode =  "trial_compare"; //'trial_compare' or 'shape_match'
 int numVideos = 100;   //PR: 20 ,GR: 30     
 float trial_time = 20.0F	; //Typically 20,
 int numR = 4; //PR: 10; GR: 4; CE: 3 ; GR_st9_5000_3c: 4
 int numT = 25; //PR: 10; GR: 24; GR_st9_5000_3c: 25
 bool  feedBackOn = false;
 string preRun = "Task";//Either 'Task' or 'CountDown'

//Static variables from Control
bool  test_mode= false; //If true, skip instructions
bool present_city_info= false;
int pc_run = 0;
string navType= "passive_VC";//passive, passive_VC,
bool  rotate_mode = true;
int rotate_type = 0;


//Active baseline
 float iti_time = 5.0F;  //Typically 5 or 3,
 float int_AB_time = 0.3F;
 float ab_num_trials=3.0F;
 bool  activeBL_On = true;
}