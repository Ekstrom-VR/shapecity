#pragma strict
 
var background : GameObject;
var vars = new VariablesClass();
var startNextRun : boolean = false;
var cnt : int =0;

function Start(){
	var background = GameObject.Find("Background");
	background.SetActive(true);
}



function Update (){
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    var t_trig = 	 Input.GetKeyUp(KeyCode.Alpha5);
    
    //
     if(space_up){
  	cnt++;
    	}
    //Start next run
    if(t_trig && startNextRun){
    cnt=0;
    startNextRun=false;
  	NextTaskStage();
    	}
}


function OnGUI(){
	//guiStyle specs
	var style1 : GUIStyle = new GUIStyle();
		style1.normal.textColor = Color.white;
		style1.fontSize = 60;
		style1.alignment = TextAnchor.MiddleCenter;
	var buttonWidth : int = 50;
	var buttonHeight : int = 20;
	var rect1 =Rect((Screen.width /2)-(buttonWidth/2),(Screen.height/2) - (buttonHeight/2),buttonWidth,buttonHeight);
	var message : String;
	//Configure message
	if(cnt ==0)
	         message = "Run over";
	if(cnt ==1){
		if (Task.curR >= vars.numR - 1){
	//	message = "The End!\n" + Output.acc_total + " / "  + (vars.numT-1)  + "\n"+ Mathf.Round((Output.acc_total/(vars.numT-1))*100f) + " %";
	    message = "The End!\n" + Output.acc_total;
		}
		else {
	//	message = "Break!\n" + Output.acc_total + " / " + (vars.numT-1)  + "\n"+ Mathf.Round((Output.acc_total/(vars.numT-1))*100f) + " %" +
	//	         "\n (Experimenter will start next run)";
		         
		message = "Break!\n" + Output.acc_total +  "\n (Experimenter will start next run)";
		
		}
		startNextRun = true;
	}
	
	GUI.Label(rect1,message,style1);		
				
}
  
  
 
   
function NextTaskStage(){
Task.curR++;
if(Task.curR < vars.numR){
  Task.task_stage = vars.preRun;	
  this.enabled = false;
 }
 else {
 
 Application.Quit();
 
 }
}  	 	

