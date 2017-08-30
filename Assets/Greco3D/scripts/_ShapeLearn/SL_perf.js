#pragma strict
 
 
var getPerf : boolean = true;
var perfCount : int =0;
var timer : float;
  
function OnEnable () {
getPerf = true;
timer = SL_task.studytime;

}


function Update (){

    timer -= Time.deltaTime;
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    
    if(SL_task.testMode){
	    if(space_up || timer < 0){
	    	NextTaskStage();
		}
	}
	else{
		if(space_up){
		    NextTaskStage();
		}
	}
}



function OnGUI(){


	////guiStyle specs
	var style1 : GUIStyle = new GUIStyle();
	style1.normal.textColor = Color.white;
	style1.fontSize = 75;
	style1.alignment = TextAnchor.MiddleCenter;
	var buttonWidth : int = 100;
	var buttonHeight : int = 20;
	var rect1 =Rect((Screen.width / 2),(Screen.height/2),buttonWidth,buttonHeight);
	var perf =  SL_test.numCorrect / SL_test.numTrials * 100;
	var perfFeedback = perf + " % correct";
	GUI.Label(rect1,perfFeedback,style1);
	
	if(perf > 25 && getPerf == true){
	    getPerf = false;
        perfCount++;
     
	}

}
  
  
  
function NextTaskStage(){


if(SL_task.cntBL < SL_task.allCities.length){

SL_task.task_stage = "Target";
}
else { 
SL_task.task_stage = "End";

}
this.enabled = false;
}  	

