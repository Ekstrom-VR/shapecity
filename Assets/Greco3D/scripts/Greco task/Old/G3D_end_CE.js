#pragma strict
 
private var background : GameObject;

function Start(){
var background = GameObject.Find("Background");
background.SetActive(true);
}



function Update (){
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    
    if(space_up){
  	NextTaskStage();
    	}
}


function OnGUI(){
	//guiStyle specs
	var style1 : GUIStyle = new GUIStyle();
	style1.normal.textColor = Color.white;
	style1.fontSize = 75;
	style1.alignment = TextAnchor.MiddleCenter;
	var buttonWidth : int = 50;
	var buttonHeight : int = 20;
	var rect1 =Rect((Screen.width /2)-(buttonWidth/2),(Screen.height/2) - (buttonHeight/2),buttonWidth,buttonHeight);
	var message : String;
	//Configure message
	
	if (G3D_task_CE.currRun >= G3D_task_CE.numRuns - 1){
	message = "The End!\n" + G3D_output_CE.acc_perc.ToString() + ' %';
	}
	else {
	message = "Break!\n" + G3D_output_CE.acc_perc.ToString() + ' %';
	}
	
	GUI.Label(rect1,message,style1);		
				
}
  
  
 
   
function NextTaskStage(){
G3D_task_CE.currRun ++;
if (G3D_task_CE.currRun < G3D_task_CE.numRuns){
 
  G3D_task_CE.task_stage = "CountDown";	
 this.enabled = false;
 
 }
 else {
 
 Application.LoadLevel("MainMenu");

 }
}  	 	

