#pragma strict
																							
	
private var instructions1 = '' ;


private var press_space = '(Press spacebar)';					

var curinstruct;
var cnt : int = 0;



function Update (){
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Backspace);
    
     if(cnt==1){

    		NextModule();
	}
		
    if(space_up)
    {

	  cnt++;					
	}
	
	if(esc_up)
	{
	
	cnt = 0;
	
	}	
}




function OnGUI(){

		var styleInstrux : GUIStyle = new GUIStyle();
		styleInstrux.fontSize = 50;
        styleInstrux.normal.textColor = Color.white;
        styleInstrux.alignment = TextAnchor.MiddleCenter;
      
        var buttonWidth : int = 300;
		var buttonHeight : int = 150;
		var buttonRect1 =Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(Screen.height/2) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			);
			
		var buttonRect2 =Rect(
			Screen.width/2 - (buttonWidth / 2),
			(Screen.height * .9) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			);
			
		
       	if(cnt==0){
       	GUI.Label(buttonRect1,instructions1,styleInstrux);
       	}
       	
       	
       	
       	
       	//Press SpaceBar Text
       	GUI.Label(buttonRect2,press_space,styleInstrux);
  	     	
 }
 
  	

function NextModule(){
SL_control_station_morph.modNum++;
this.enabled = false;
}  	

