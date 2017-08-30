#pragma strict
 
private var  background : GameObject;
private var  timer : float;
private var  waitTime : float;
private var  countdownfrom: float = 3.5;
private var  numStr : String;
private var  style : GUIStyle = new GUIStyle();


function OnEnable(){
background = GameObject.Find("Background");
background.SetActive(true);
timer = countdownfrom;
}

function FixedUpdate(){

 timer -= Time.deltaTime;
    if(timer < 0){
	NextTaskStage();    
	}
 	else if(timer < 0.5){
 	numStr ="+";   
	}
    else if(timer > .5){
    numStr =""+ Mathf.Round(timer);
    }	
}



function OnGUI(){
	//GUI Style specs
	style.normal.textColor = Color.white;
	style.fontSize = 75;
	style.alignment = TextAnchor.MiddleCenter;
	var buttonWidth : int = 50;
	var buttonHeight : int = 20;
	var rect1 =Rect((Screen.width /2)-(buttonWidth/2),(Screen.height/2) - (buttonHeight/2),buttonWidth,buttonHeight);
	//Gui
	GUI.Label(rect1,numStr,style);
	
}
  
  
function NextTaskStage(){
G3D_task_CE.task_stage = "Test";
this.enabled = false;
}  	

