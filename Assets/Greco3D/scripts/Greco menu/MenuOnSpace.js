#pragma strict


var instructions = new Array();																									
	

var instructions1 = 'You will be presented with a series \n' +
					'of videos. Watch each video closely.\n ' ;
var instructions2 = 'Each video will feature a single city\n' +
					'configuration. As you watch the video,\n'+
					'mentally attempt to extract this\n' + 
					'configuration. Study the relationship\n'+
					'between the stores within the city.';
var instructions3 = 'If the city configuration is exactly\n'+
					'identical to the city configuration of\n'+
					'the immediately prior video clip, press\n'+
					'the LEFT ARROW key. If the configuration\n'+
					'has changed, press the RIGHT ARROW key.';

var press_space = '(Press spacebar)';					

var curinstruct;
var cnt : int = 0;
var enterInitials : EnterInitials; 




function Start(){
enterInitials = GetComponent(EnterInitials);
//start = GameObject.Find("Start");

print('Start activeself: ' + enterInitials.start.activeSelf);
//start.SetActive(false);

}

function Update (){
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up =   Input.GetKeyUp(KeyCode.Escape);
    
    if(space_up)
    {
		 if(cnt==3){

			enterInitials.start.SetActive(true);
			this.enabled = false;
		}
		else{
//		    start.SetActive(false);
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
 
  	
      	



		
	