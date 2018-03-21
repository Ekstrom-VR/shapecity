#pragma strict
import UnityEngine.UI;

var numStr : String;
var timer : float;
var gui_on : boolean;
private var background : Background;
private var runbreak : boolean = true;
public var taskText : Text; 

function Start(){
background = GetComponent("Background");
}

function OnGUI(){
	if(gui_on){
    var  style : GUIStyle = new GUIStyle();
    var buttonWidth : int = 50;
	var buttonHeight : int = 20;
	var rect = new Rect();
	style.normal.textColor = Color.white;
	style.fontSize = 75;
	style.alignment = TextAnchor.MiddleCenter;
    rect =Rect((Screen.width /2)-(buttonWidth/2),(Screen.height/2) - (buttonHeight/2),buttonWidth,buttonHeight);
	GUI.Label(rect,numStr,style);
	}
}

function StartCountDown(){
	var timer : float = 3.5;	
	gui_on = true;
	background.BackGroundOn();


    while(timer > 0){
		timer -= Time.deltaTime;

	 	if(timer < 0.5){
	 		numStr ="";   
		}
	    else if(timer > .5){
	    	numStr =""+ Mathf.Round(timer);
	    }
		yield;
	}
}


function StartITI(){
	numStr ="+";
	print(numStr);
	gui_on = true;
	background.BackGroundOn();
}

function StopITI(){
	gui_on = false;
	background.BackGroundOff();
	numStr ="";
}

function RunBreak(){
numStr = "Press SPACE to continue";
gui_on = true;
background.BackGroundOn();
runbreak = true;
yield StartCoroutine(WaitForSpace());
numStr ="";
}

function WaitForSpace(){
	while(runbreak){
		if(Input.GetKeyUp(KeyCode.Space)){
			print("Spacebar pressed");
			runbreak = false;
		}
		yield;
	}
}

function TaskOver(){
numStr = "Task over";
gui_on = true;
background.BackGroundOn();
runbreak = true;
yield StartCoroutine(WaitForSpace());
numStr ="";
}