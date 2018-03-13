#pragma strict

public var i : int = 0;
private var instructions1 = 'Press spacebar to start map drawing task';
private var instructions2 = 'Enter age:';
private var instructions3 = 'Check?';
private var stages = new Array('instructions1');

function Update(){

    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);

    if(space_up){
      i++;	
    }

	if(i == stages.length)
	{
	NextModule();
	}									
}
		
function OnGUI(){
	
		var style1 : GUIStyle = new GUIStyle();	
		
		style1.normal.textColor = Color.white;
		style1.fontSize = 30;
        style1.alignment = TextAnchor.MiddleCenter;
        
        var buttonWidth : int = 10;
		var buttonHeight : int = 20;
		var rect1 =Rect((Screen.width / 2),(Screen.height/3),buttonWidth,buttonHeight);
	
			
		//Toggle through different input instructions
		if( i == 0)
		{
		GUI.Label(rect1,instructions1,style1);
		}
	
	    if( i == 1)
		{
		GUI.Label(rect1,instructions2,style1);
		} 
		
	    if( i == 2)
		{
		GUI.Label(rect1,instructions3,style1);
		} 	
}
			      	
function NextModule(){
this.enabled = false;
MD_task.task_stage = "Test";
}  	