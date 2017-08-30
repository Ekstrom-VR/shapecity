#pragma strict


//Paradigm structure related
var trial_code_arr = new Array();
var trial_times = new Array();
static var testStage : String;




static  var numTrials : float = 20;
private var taskTime : float = 2;
private var itiTime : float = 1;
private var begTime : float = 2;


//Output
static var resp_key : String;
static var resp_time : float;
static var acc : int;


static var numCorrect: float;
var CallGetResponse = true;
static var logData = true;


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
var changeImg : boolean = true;
var cntR : int=0;

var resp_key_list = new Array();
var resp_time_list = new Array();



var taskEnd = false;
var rotAngle : int;

var endTask : boolean;



/////////////////////////////////////////////////////////////
function OnEnable () {


    endTask = true;
	//Image related info
    imgsize = Screen.width/3;
    print("SL test enabled!!");
//	print("Width: " + Screen.width);
//    print("Height: " + Screen.height);    
//    print("Image size: " + imgsize);


     changeImg = true;
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
	CreateTrialList();
	waitTime = trial_times[module_cnt];
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

////Main loop
if (module_cnt < trial_times.length){ 
   
    testStage = trial_code_arr[module_cnt];
    waitTime = trial_times[module_cnt];
    
    
		if(trial_code_arr[module_cnt]=='TASK'){
			 logData = true;
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
		     resp_key = 'nan';
		     
		     
		     GUI.Label(rect1,"+",style1);
		     
		     if(changeImg==true){
			     trial_cnt++;
			     changeImg = false;
			     t_load = null;
//	             t_dynamic_tx = null;
				Destroy(t_dynamic_tx);
		     }
		     LoadShape();
		     rotAngle = SL_getShapes.randAngle[trial_cnt];
		}
     
     
    
	}   
 else{
       if(endTask){
       		NextTaskStage();
       		}
	 }

}



//////////OTHER FUNCTIONS///////////////////


function LoadShape(){

	if(t_load == null){

	t_load = new WWW(SL_getShapes.randPaths[trial_cnt]);  
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
    
    
//    print('length of trial times:' + trial_times.length);
//    print('trial times:' + trial_times);
}



function GetResponse(){

	if (Input.GetKeyDown('left'))
	{
	
		
	
    CallGetResponse = false; 
    print ('left key down at ' + gameTime);
	resp_key = 'targ';
	resp_time = gameTime;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = resp_time;
	cntR++;
	
		if(SL_getShapes.randTrialcode[trial_cnt] == resp_key){
		GameObject.Find("Background").GetComponent.<GUITexture>().color =Color(0.55, 0.55, 0.5, .5);
		acc = 1;
		numCorrect++;
		}
		else {
		GameObject.Find("Background").GetComponent.<GUITexture>().color =Color(0.55, 0.5, 0.5, .5);
		acc = 0;
		}
	}
	
	if (Input.GetKeyDown('right'))
	{
	
	
	
	
	
    CallGetResponse = false; 
	print ('right key down at ' + gameTime);
	resp_key = 'lure';
	resp_time = gameTime;
	resp_key_list[cntR] = resp_key;
	resp_time_list[cntR] = resp_time;
	cntR++;
	
	
		if(SL_getShapes.randTrialcode[trial_cnt] == resp_key){
		GameObject.Find("Background").GetComponent.<GUITexture>().color =Color(0.5, 0.55, 0.5, .5);
		acc = 1;
		numCorrect++;
		}
		else {
		GameObject.Find("Background").GetComponent.<GUITexture>().color =Color(0.55, 0.5, 0.5, .5);
		acc = 0;
		}
	
	}
	
	
}



function NextTaskStage(){
    endTask = false;
	SL_task.task_stage = "Performance";
	
	if(SL_task.cntBL < SL_task.allCities.length){
		SL_task.cntBL++;
		

	}
	
	if(SL_task.cntBL < SL_task.allCities.length){
		
		print("cntBL: " + SL_task.cntBL);
		print("city: " + SL_task.allCities[SL_task.cntBL]);
		print("RunNum: " + SL_task.allRuns[SL_task.cntBL]);
	    print("Block length: " + SL_task.allRuns.length);

	}
	

	
	this.enabled = false;
}  	




	 
