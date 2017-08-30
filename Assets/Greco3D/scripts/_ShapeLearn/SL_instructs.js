#pragma strict
																							
	
var instructions1 = 'Study the first shape presented. \n' +
					'This first shape is the target shape. ' ;
var instructions2 = 'Your task will be to decide if the other shapes\n'+
					'belong to the same family as the target shape.';				
var instructions3 = 'Task difficulty will steadily increase.\n'+
					"Don't stress. You'll do great!";
					

var press_space = '(Press spacebar)';					

var curinstruct;
var cnt : int = 0;



function Update (){
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    
    if(space_up)
    {
		 if(cnt==3){

    		NextModule();
		}
		else{
			cnt++;
		}
							
	}
	
	if(esc_up)
	{
	
	cnt = 0;
	
	}	
}




function OnGUI(){

		var styleInstrux : GUIStyle = new GUIStyle();
		styleInstrux.fontSize = 20;
        styleInstrux.normal.textColor = Color.white;
        
        var buttonWidth : int = 300;
		var buttonHeight : int = 100;
		var buttonRect1 =Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(Screen.height/2) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			);
			
		var buttonRect2 =Rect(
			Screen.width/2 - (buttonWidth / 4),
			(Screen.height * .9) - (buttonHeight / 4),
			buttonWidth,
			buttonHeight
			);
			
		
       	if(cnt==1){
       	GUI.Label(buttonRect1,instructions1,styleInstrux);
       	}
       	else if(cnt==2){
       	GUI.Label(buttonRect1,instructions2,styleInstrux);
       	}
       	else if(cnt==3){
       	GUI.Label(buttonRect1,instructions3,styleInstrux);
       	}  	
       	
       	
       	
       	//Press SpaceBar Text
       	GUI.Label(buttonRect2,press_space,styleInstrux);
  	     	
 }
 
  	

function NextModule(){
SL_control_station.modNum++;
this.enabled = false;
}  	

