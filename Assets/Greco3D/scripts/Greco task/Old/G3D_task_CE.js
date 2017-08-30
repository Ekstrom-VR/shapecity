#pragma strict

static var task_stage : String;
static var task_stages = new Array("CountDown","Test","End");
static var stageNum : int = 0;
static var version = 'GR';
static var navType = 'active';
static var trial_time  : float = 10;
static var iti_time  : float = 1;
static var numRuns   : int = 4;
static var numTrials : int = 24;
static var currRun    : int = 0;
static var cnt  : float = 0;

var presentStage : String;
var presentRun : int;
//
var taskBreak : boolean = false;
var g3d_cityConfig : G3D_cityConfig_CE;
var g3d_cityMorph : G3D_cityMorph_CE;
var g3d_output : G3D_output_CE;
var g3d_playerMovement : G3D_playerMovement;
var g3d_countDown : G3D_countDown_CE;
var	g3d_end : G3D_end_CE;
var g3d_pause : G3D_pause;
var player : GameObject;


function Start(){
	g3d_cityConfig = GetComponent(G3D_cityConfig_CE);
	g3d_cityMorph = GetComponent(G3D_cityMorph_CE);
    g3d_output = GetComponent(G3D_output_CE);
	g3d_playerMovement = GetComponent(G3D_playerMovement);
	g3d_countDown = GetComponent(G3D_countDown_CE);
	g3d_end = GetComponent(G3D_end_CE);
	g3d_pause = GetComponent(G3D_pause);
	
	
	
   player = GameObject.Find("First Person Controller");
   task_stage = "CountDown";

}



function Update(){
	
	//Present currentStage in Inspector
	presentStage = task_stage;
	presentRun = currRun;
	

	if(task_stage == "CountDown" ){
	g3d_countDown.enabled =true;
	taskBreak = false;	
	}


	if(task_stage == "Test" ){
    g3d_cityMorph.enabled = true;
    player.GetComponent(G3D_playerMovement).enabled = true;
    g3d_output.enabled = true;
    g3d_pause.enabled = true;
	}
	
	if(task_stage == "End"){
		g3d_end.enabled =true;
		cnt = 0;
		
	}
}


