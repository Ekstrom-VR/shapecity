#pragma strict
																								
var instructions1 = 'Navigation task \n' +
					'(Press spacebar to begin)';

var curinstruct;
var cnt : int = 0;

function Update (){
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    
    if(cnt==1){
		NextModule();
	}
        
    if(space_up){
		cnt++;						
	}	
}

function OnGUI(){

		var styleInstrux : GUIStyle = new GUIStyle();
		styleInstrux.fontSize = 40;
        styleInstrux.normal.textColor = Color.black;
        
        var buttonWidth : int = 500;
		var buttonHeight : int = 100;
		var buttonRect1 =Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(Screen.height/2) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			);
					
       	if(cnt==0){
       	GUI.Label(buttonRect1,instructions1,styleInstrux);
       	}			     	
 }
 
function NextModule(){
Destroy(this);
}  	