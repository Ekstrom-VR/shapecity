#pragma strict
																							
	
private var instructions1 = 'Soon you will be presented the target shape. \n' +
					'Study the target shape! \n' ;
private var instructions2 = 'Afterwards you will be presented a series of shapes\n'+
							'that are partially covered with rectangular masks.\n'+
							'Your task is to indicate if the target shape is\n'+
							'is covered by the mask\n\n'+
							'If the target shape is behind the mask, press the  < Key.\n'+
							'Otherwise, if the hidden shape is NOT the target shape,\n'+ 
					 		'press the > Key.';
					
									
private var instructions3 = 'Task difficulty will steadily increase.\n'+
					"Don't stress. You'll do great!";
					

private var press_space = '(Press spacebar)';					

var curinstruct;
var cnt : int = 0;



function Update (){
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Backspace);
    
     if(cnt==3){

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
		styleInstrux.fontSize = 20;
        styleInstrux.normal.textColor = Color.white;
        
        var buttonWidth : int = 300;
		var buttonHeight : int = 150;
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
			
		
       	if(cnt==0){
       	GUI.Label(buttonRect1,instructions1,styleInstrux);
       	}
       	else if(cnt==1){
       	GUI.Label(buttonRect1,instructions2,styleInstrux);
       	}
       	else if(cnt==2){
       	GUI.Label(buttonRect1,instructions3,styleInstrux);
       	}  	
       	
       	
       	
       	//Press SpaceBar Text
       	GUI.Label(buttonRect2,press_space,styleInstrux);
  	     	
 }
 
  	

function NextModule(){
SL_control_station_mask.modNum++;
this.enabled = false;
}  	

