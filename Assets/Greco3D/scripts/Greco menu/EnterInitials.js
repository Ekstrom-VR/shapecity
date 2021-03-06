﻿#pragma strict

public var resp : String;
public var resp_final : String = '';
public var i : int = 0;
var instructions1 = 'Enter initials:';
var instructions2 = 'Enter age:';
var instructions3 = 'Check?';
var stage = new Array('initials', 'age','Check');
var instrux;
static var start : GameObject;
var menuOnSpace : MenuOnSpace;

function Start(){

start = GameObject.Find("Start");
start.SetActive(false);
menuOnSpace = GetComponent(MenuOnSpace);

}


function Update(){
		//
		if(i < stage.length)
		{
		   Keyboard();
		  if(Input.GetKeyUp(KeyCode.Escape))
		  {		
		    i = 0; 
		    resp = '';
		    resp_final = '';
		  }
		   
		  PlayerPrefs.SetString('subj_id',resp_final);
		   
		}	
		
		
		
		//Start Instructions script
		if(i == 3)
		{
		menuOnSpace.enabled = true;
		this.enabled = false;
		}	
		
		//Abort and menu and start task	
		if(Input.GetKey(KeyCode.LeftControl)&&Input.GetKeyDown(KeyCode.Q)){
		
	
		PlayerPrefs.SetString('subj_id','JDS99');
		Application.LoadLevel("Greco3D_CE");
		
		}				
		
				
}
		



	
	function OnGUI()
	{
	
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
	
			
		//Toggle through different input instructions
		if( i == 0)
		{
		GUI.Label(rect1,instructions1,style1);
		GUI.Label(rect2,resp,style1);
		}
	
	    if( i == 1)
		{
		GUI.Label(rect1,instructions2,style1);
		GUI.Label(rect2,resp,style1);
		} 
		
	    if( i == 2)
		{
		GUI.Label(rect1,instructions3,style1);
		GUI.Label(rect2,resp_final,style1);
		} 
		

	}
	
	
	
	
	function Keyboard()
	{
		for (var c : char in Input.inputString)
		{
				// Backspace - Remove the last character
				if (c == "\b"[0]) {
					if (resp.Length != 0)
						resp = resp.Substring(0, resp.Length - 1);	
						
				}
				// End of entry
				else if (c == "\n"[0]) {// "\n" for Mac, "\r" for windows.
				    
				    
				    resp_final = resp_final + resp;
					print ("User entered: " + resp);
					print ("User ID: " + resp_final);
					i++;
					resp = '';
				}
		
				else {
					resp += c;
					resp = resp.ToUpper();

					
				}
				
				
					// Normal text input - just append to the end
				if (c == "\b"[0] && i == 2){
					i = 0;
					resp = '';
					resp_final = '';	
					}
				
		}
		
	}
	
	
	
	