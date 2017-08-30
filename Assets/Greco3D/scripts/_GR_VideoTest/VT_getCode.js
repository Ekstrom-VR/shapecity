#pragma strict

public var resp : String;
public var resp_final : String = '';

var instructions1 = 'Enter code:';



//Initialize Font and Location parameters fo gui
var style1 : GUIStyle = new GUIStyle();
var style2: GUIStyle = new GUIStyle();


style1.normal.textColor = Color.red;
style1.fontSize = 30;
style2.normal.textColor = Color.red;
style2.fontSize = 40;
style1.alignment = TextAnchor.MiddleCenter;
style2.alignment = TextAnchor.MiddleCenter;

var buttonWidth : int = 10;
var buttonHeight : int = 20;
var rect1 =Rect((Screen.width / 2),(Screen.height/3),buttonWidth,buttonHeight);
var rect2 =Rect(Screen.width / 2 ,(Screen.height/2) ,buttonWidth,buttonHeight);


function Update(){
				
		   Keyboard();											
}
		

	
function OnGUI(){
	
	
		//Initialize Font and Location parameters fo gui
		var style1 : GUIStyle = new GUIStyle();
		var style2: GUIStyle = new GUIStyle();
	
		
		style1.normal.textColor = Color.black;
		style1.fontSize = 30;
		style2.normal.textColor = Color.black;
		style2.fontSize = 40;
        style1.alignment = TextAnchor.MiddleCenter;
        style2.alignment = TextAnchor.MiddleCenter;
        
        var buttonWidth : int = 10;
		var buttonHeight : int = 20;
		var rect1 =Rect((Screen.width / 2),(Screen.height/3),buttonWidth,buttonHeight);
	    var rect2 =Rect(Screen.width / 2 ,(Screen.height/2) ,buttonWidth,buttonHeight);

		
		GUI.Label(rect1,instructions1,style1);
		GUI.Label(rect2,resp,style1);
		
	
}

	      	
function NextModule(){

	VT_Control.task_mode = "Task";
	VT_Control.inputCode = resp;
	Destroy(this);
}  	


function Keyboard(){
		for (var c : char in Input.inputString)
		{
				// Backspace - Remove the last character
				if (c == "\b"[0]) {
					if (resp.Length != 0)
						resp = resp.Substring(0, resp.Length - 1);	
						
				}
				// End of entry
				else if (c == "\n"[0]) {// "\n" for Mac, "\r" for windows.				    
				    NextModule();		

				}
				else {
					resp += c;
					resp = resp.ToUpper();	
				}
	
		}
		
	}	
	
	