#pragma strict

function OnGUI(){

//Static variables/classes
var run_trial_order : Array = Control.curTrialList[Task.curR];//Get trial order
var curT = Task.curT;
var curR = Task.curR;
var vars = new VariablesClass();

if(curT < vars.numT){
var cityNum : int= run_trial_order[curT];
}

//vars
var message : String;

//Setup mesage
if(CityMorph.trial_action == "iti"){
message ='';
}
else if(CityMorph.trial_action == "task" && curR == vars.pc_run) {
message  = "City " + cityNum;
}


		var styleInstrux : GUIStyle = new GUIStyle();
		styleInstrux.fontSize = 50;
        styleInstrux.normal.textColor = Color.black;
        styleInstrux.alignment = TextAnchor.MiddleCenter;
        
        var buttonWidth : int = 50;
		var buttonHeight : int = 50;
		var buttonRect1 =Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(Screen.height/9) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			);
			
				
       	GUI.Label(buttonRect1,message,styleInstrux);  	     	
 }
