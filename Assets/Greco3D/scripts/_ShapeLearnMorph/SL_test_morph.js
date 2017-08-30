#pragma strict

//Paradigm structure related
var trial_code_arr = new Array();
var trial_times = new Array();
static var rand_shape_paths = new Array();
static var randTrialcode = new Array();
var randAngle = new Array();
static var testStage : String;
//Output
static var resp_key : int;
static var resp_time : float;
static var acc : int;
static var numCorrect: float;
static var logData = false;
private var CallGetResponse = true;
//Image related
private var t_dynamic_tx: Texture2D = null;
private var t_load : WWW = null;
private var imgsize : int;
//Updated variables
static var trial_cnt : int = 0;
static var waitTime : float;
var gameTime : float = 0.0;
var module_cnt : int = 0;
var module_type : String;
private var changeImg : boolean = false;
var cntR : int=0;
var resp_key_list = new Array();
var resp_time_list = new Array();
var taskEnd = false;
var rotAngle : int;
var endTask : boolean;



///
private var numTrials : int;
private var taskTime : float;
private var itiTime : float;
private var begTime : float;
private var perCutOff : float;
private var numShapes : int;
private var curShapeTypes : int;

/////////////////////////////////////////////////////////////
function OnEnable () {

numTrials = SL_task_morph.numTrials;
taskTime = SL_task_morph.taskTime;
itiTime = SL_task_morph.itiTime;
begTime = SL_task_morph.begTime;
perCutOff = SL_task_morph.perCutOff;
numShapes = SL_task_morph.numShapes;
curShapeTypes = SL_task_morph.curShapeTypes;

SetupRun();
}


function OnGUI(){
////timing variables
gameTime +=  Time.deltaTime;


if(gameTime >= waitTime){
    module_cnt++;
}
	



////guiStyle specs
var style1 : GUIStyle = new GUIStyle();
style1.normal.textColor = Color.white;
style1.fontSize = 75;
style1.alignment = TextAnchor.MiddleCenter;
var buttonWidth : int = 50;
var buttonHeight : int = 20;
var rect1 =Rect((Screen.width / 2),(Screen.height/2),buttonWidth,buttonHeight);

var pivotPoint : Vector2;
pivotPoint = Vector2(Screen.width/2,Screen.height/2);
GUIUtility.RotateAroundPivot (rotAngle, pivotPoint); 


if (module_cnt < trial_times.length){ 
   
    testStage = trial_code_arr[module_cnt];
    waitTime = trial_times[module_cnt];
    
    
		if(trial_code_arr[module_cnt]=='TASK'){
		     
		     if(module_cnt >0){
			 logData = true;
			 }
			 
			 
			 GUIUtility.RotateAroundPivot (rotAngle, pivotPoint);
		     GUI.Label(new Rect(Screen.width* 1/2 - (imgsize/2), Screen.height/2 - (imgsize/2), imgsize ,imgsize), t_dynamic_tx);  
		     changeImg = true;
		     
		     //Get response
		    if (CallGetResponse == true){
		      GetResponse();        
			}
		}
		
		
		else if (trial_code_arr[module_cnt]=='ITI' || trial_code_arr[module_cnt]=='BEG' ){
		     
		     GameObject.Find("Background").GetComponent.<GUITexture>().color =Color(0.5, 0.5, 0.5, 0.5); 
		     GUIUtility.RotateAroundPivot (-rotAngle, pivotPoint); 
		     //Response stuff
		     CallGetResponse = true;
		     resp_key = 99;
		     
		     if(SL_task_morph.fixation){
		     GUI.Label(rect1,"+",style1);
		     }
		     
		     if(changeImg==true){
			     trial_cnt++;
			     changeImg = false;
			     t_load = null;

				Destroy(t_dynamic_tx);
		     }
		     
		     if(trial_cnt < numTrials){
		     LoadShape();
		     if(SL_task_morph.rotateShape){
		     rotAngle = randAngle[trial_cnt];
		     }
		     
			 }
		}
     
     
    
	}   
 else{
       if(endTask){
       		NextTaskStage();
       		}
	 }

}



//////////OTHER FUNCTIONS///////////////////
function SetupRun(){

endTask = true;
imgsize = Screen.width/3;//Image related info
//changeImg = true;
waitTime  = 0;
gameTime  	= 0;
trial_cnt  = 0;
module_cnt = 0;
cntR = 0;
trial_code_arr.Clear();
trial_times.Clear();
resp_key_list.Clear();
resp_time_list.Clear();
numCorrect = 0;
rotAngle = 0;

//Create trial list
//yield WaitForSeconds (1);
CreateTrialList();
waitTime = trial_times[module_cnt];

}





function LoadShape(){

	if(t_load == null){

	t_load = new WWW(rand_shape_paths[trial_cnt]);  
	}
	
	else if(t_load.isDone && t_dynamic_tx == null){
	t_dynamic_tx = new Texture2D(1024, 1024);
	t_load.LoadImageIntoTexture(t_dynamic_tx);
	}
	
}




function CreateTrialList(){


//Build trial order array
   trial_code_arr[0] = 'BEG';
   for(var i : int = 1; i < numTrials+1; i++){ 
     trial_code_arr.Add('TASK');
     trial_code_arr.Add('ITI');
    }
    

//Build trial timepoint array
     var hold = begTime;
     trial_times[0] = hold;
    for(var ii : int = 1; ii < trial_code_arr.length; ii++){
    
	    if(trial_code_arr[ii] == 'TASK'){
	    hold = hold + taskTime;
	    trial_times.Add(hold);
	    }
	    else if (trial_code_arr[ii] == 'ITI'){
	    hold = hold + itiTime;
	    trial_times.Add(hold);
	 
	    }
	
    }
    
//Build rand array
var rand_tt : int; //Determine Same or Different
var rand_sh_n : int; //Shape number of new trial
var rand_sh_n_1 : int; //Shape number of prior trial
var rand_sh_t: int =0;
var curPaths = new Array();

randTrialcode.Clear();
rand_shape_paths.Clear();
//Randomly pick first shape
rand_sh_n = Random.Range(0,numShapes);
curPaths =SL_getShapes_morph.shapePaths[rand_sh_t];                  //Pick a shape image, not a dot image
rand_shape_paths.Push(curPaths[rand_sh_n]); //First path
randTrialcode.Push(99);
randAngle[0] = Random.Range(0,360);
for(var iii : int = 1; iii < numTrials; iii++){ 

       rand_tt=Random.Range(1,3);
       randTrialcode.Push(rand_tt);
       randAngle[iii] = Random.Range(0,360); 
       if(rand_tt==1){ //same
       rand_sh_t=Random.Range(0,curShapeTypes);
       curPaths =SL_getShapes_morph.shapePaths[rand_sh_t];   
       rand_shape_paths.Push(curPaths[rand_sh_n]);
       }
       else if(rand_tt==2){
       
       //Pick shape different from prior trial shape
       rand_sh_n_1 = rand_sh_n;
       while(rand_sh_n_1 == rand_sh_n){  
       rand_sh_n = Random.Range(0,numShapes);
       }
       rand_sh_t=Random.Range(0,curShapeTypes); //Randomize shape type(e.g. Shape, 5dot, 10 dot)
       curPaths =SL_getShapes_morph.shapePaths[rand_sh_t];   
       rand_shape_paths.Push(curPaths[rand_sh_n]);
       }            
}

 print('randTrialcode ' +randTrialcode.length);
 print('rand_shape_paths ' +rand_shape_paths.length);
}



function GetResponse(){

	if (Input.GetKeyDown('left'))
	{
				
    CallGetResponse = false; 
    print ('left key down at ' + gameTime);
	resp_key = 1;
	resp_time = gameTime;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = resp_time;
	cntR++;
	
		if(randTrialcode[trial_cnt] == resp_key){
			if(SL_task_morph.feedBack){
			GameObject.Find("Background").GetComponent.<GUITexture>().color =Color(0.55, 0.55, 0.5, .5);
			}
		acc = 1;
		numCorrect++;
		}
		else {
		if(SL_task_morph.feedBack){
		GameObject.Find("Background").GetComponent.<GUITexture>().color =Color(0.55, 0.5, 0.5, .5);
		}
		acc = 0;
		}
	}
	
	if (Input.GetKeyDown('right'))
	{
	

    CallGetResponse = false; 
	print ('right key down at ' + gameTime);
	resp_key = 2;
	resp_time = gameTime;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = resp_time;
	cntR++;
	
	
		if(randTrialcode[trial_cnt] == resp_key){
			if(SL_task_morph.feedBack){
			GameObject.Find("Background").GetComponent.<GUITexture>().color =Color(0.5, 0.55, 0.5, .5);
			}
		acc = 1;
		numCorrect++;
		}
		else {
			if(SL_task_morph.feedBack){
			GameObject.Find("Background").GetComponent.<GUITexture>().color =Color(0.55, 0.5, 0.5, .5);
			}
		acc = 0;
		}
	
	}
	
	
}



function NextTaskStage(){
    endTask = false;
	SL_task_morph.task_stage = "Performance";

	if(SL_task_morph.cntBL < SL_task_morph.cityShapeList.length){
	
	   if((numCorrect/(numTrials-1)) >= perCutOff){
		SL_task_morph.cntBL++;
		}
	}
	
	if(SL_task_morph.cntBL < SL_task_morph.cityShapeList.length){
		
		print("cntBL: " + SL_task_morph.cntBL);
		print("city: " + SL_task_morph.cityShapeList[SL_task_morph.cntBL]);

	}
	
	this.enabled = false;
}  	




	 
