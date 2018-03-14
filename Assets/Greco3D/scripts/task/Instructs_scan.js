#pragma strict
																							
//cnt 0	
var instrux_subj = 'You will be presented with a series \n' +
					'of videos. Watch each video closely.\n ' +
					'Each video will feature a single city\n' +
					'configuration. As you watch the video,\n'+
					'mentally attempt to extract this\n' + 
					'configuration. Study the relationship\n'+
					'between the stores within the city.\n' +
                    'If the city configuration is exactly\n'+
					'identical to the city configuration of\n'+
					'the immediately prior video clip, press\n'+
					'Button 1. If the configuration\n'+
					'has changed, press Button 2.\n';
//cnt 1
var instrux_but1 = 'Button box check: \n' +
					'Please press Button 1';
//cnt 2
var instrux_but2 = 'Button box check: \n' +
					'Please press Button 2';
					
//cnt 3
var instrux_startScan = 'Get ready! Task will start soon.';
					
					 
										
					
//var press_space = '(Experimenter press spacebar)';

										

var curinstruct;
var cnt : int = 0;

//For Shape presentation

private var shape1_path : String = "file:/Users/stokesjd/Projects/GrecoEnc/task/make_shapes/Shapes/City2_NS5_FR9/City2_NS5_FR9_proto.png";;
private var shape2_path : String = "file:/Users/stokesjd/Projects/GrecoEnc/task/make_shapes/Shapes/City9_NS5_FR9/City9_NS5_FR9_proto.png";;

private var imgsize1 : int;
private var imgsize2 : int;

private var shape1_t_load : WWW = null;
private var shape1_trial_code_arr = new Array();
private var shape1_trial_times = new Array();
private var shape1_t_dynamic_tx: Texture2D = null;
private var shape2_t_load : WWW = null;
private var shape2_trial_code_arr = new Array();
private var shape2_trial_times = new Array();
private var shape2_t_dynamic_tx: Texture2D = null;




function Update (){
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    var t_trig = 	 Input.GetKeyUp(KeyCode.Alpha5);
    var button1 = 	 Input.GetKeyUp(KeyCode.Alpha1);
    var button2 = 	 Input.GetKeyUp(KeyCode.Alpha2);

    
   
    if(cnt==0 && (button1 || button2 || space_up))
    {		 
	cnt++;					
	}
    else if(cnt==1 && button1)
    {		 
	cnt++;					
	}
    else if(cnt==2 && button2)
    {		 
	cnt++;					
	}
    else if(cnt==3 && t_trig)
    {		 
	cnt++;					
	}
	else if(cnt==4){
     NextModule();
	}
	else if(esc_up)
	{
	cnt = 0;
	}	
}




function OnGUI(){

		var styleInstrux : GUIStyle = new GUIStyle();
		styleInstrux.fontSize = 40;
        styleInstrux.normal.textColor = Color.black;
        
        var buttonWidth : int = 500;
		var buttonHeight : int = 500;
		var buttonRect1 =Rect(
			Screen.width / 2 - (buttonWidth / 2),
			(Screen.height/2) - (buttonHeight / 2),
			buttonWidth,
			buttonHeight
			);
			
//		var buttonRect2 =Rect(
//			Screen.width/2 - (buttonWidth / 4),
//			(Screen.height * .9) - (buttonHeight / 4),
//			buttonWidth,
//			buttonHeight
//			);
			
		
       	if(cnt==0){
       	GUI.Label(buttonRect1,instrux_subj,styleInstrux);
       	}
       	else if(cnt==1){
       	GUI.Label(buttonRect1,instrux_but1,styleInstrux);
       	}
       	else if(cnt==2){
	    GUI.Label(buttonRect1,instrux_but2,styleInstrux);  	
       	} 
       	else if(cnt==3){
	    GUI.Label(buttonRect1,instrux_startScan,styleInstrux);  	
       	}  	 	
       	

  	     	
 }
 
  	

function NextModule(){
Destroy(this);
}  	

