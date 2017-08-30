#pragma strict
 
 
var getPerf : boolean = true;
var perfCount : int =0;
var timer : float;
  
function OnEnable () {
getPerf = true;
timer = SL_task_mask.studytime;
}

function Update (){

    timer -= Time.deltaTime;
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    
    if(SL_task_mask.testMode){
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
	
	var style2 : GUIStyle = new GUIStyle();
	style2.normal.textColor = Color.white;
	style2.fontSize = 20;
	style2.alignment = TextAnchor.MiddleCenter;
	
	//rect1 and rect2: position specifications for Gui labels
	var buttonWidth : int = 100;
	var buttonHeight : int = 20;
	var rect1 =Rect((Screen.width / 2),(Screen.height/2),buttonWidth,buttonHeight);
	var rect2 =Rect(Screen.width/2 - (buttonWidth / 4),(Screen.height * .9) - (buttonHeight / 4),buttonWidth,buttonHeight);
			
	//Print performance
	var perf =  SL_test_mask.numCorrect / SL_task_mask.numTrials * 100;
	var perfFeedback = perf + " % correct";
	GUI.Label(rect1,perfFeedback,style1);
	
	//Press SpaceBar Text
     GUI.Label(rect2,'(Press spacebar to continue)',style2);
     
	//Assess performance
	if(perf > 25 && getPerf == true){
	    getPerf = false;
        perfCount++;
     
	}

}
  
  
  
function NextTaskStage(){


if(SL_task_mask.cntBL < SL_task_mask.cityList.length){

SL_task_mask.task_stage = "Target";
}
else { 
SL_task_mask.task_stage = "End";

}
this.enabled = false;
}  	

