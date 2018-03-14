#pragma strict
																							
	
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
var instructions4 = 'Additionally, please make a single response\n' +
					'during the video clip. Please indicate which\n' +
					'shape you think is represented by the stores in\n' + 
					'the city by pressing either "V", "B","N", or "M"\n' +
					'Press "V" if you think it looks like Shape 1 and\n' +
					'press "M" if it is best represented by Shape 2.\n';
					
					 
										
					
var press_space = '(Press spacebar)';

										

var curinstruct;
var cnt : int = 0;
//var vars = new VariablesClass();
var vars : Config;

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


function Awake(){
var config : GameObject = GameObject.Find("Config");
vars = config.GetComponent(Config) as Config;
}

function Update (){
 
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    
    if(cnt==4){

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
			
		
       	if(cnt==0){
       	GUI.Label(buttonRect1,instructions1,styleInstrux);
       	}
       	else if(cnt==1){
       	GUI.Label(buttonRect1,instructions2,styleInstrux);
       	}
       	else if(cnt==2){
	       	if(vars.taskMode=='trial_compare'){
	       	GUI.Label(buttonRect1,instructions3,styleInstrux);
	       	}
	       	
	       	if(vars.taskMode=='shape_match'){
	       	GUI.Label(buttonRect1,instructions4,styleInstrux);
	       	}
	       	
       	}  	
       	
       	
       	
       	//Press SpaceBar Text
       	GUI.Label(buttonRect2,press_space,styleInstrux);

       	
		//Shape presentation stuff
		imgsize1 = Screen.width/4;
		imgsize2 = Screen.width/3;
		
		
		
		
		if(vars.taskMode=='shape_match'){
		
			if(cnt==3){			
	            //Shape 1
		       	if(shape1_t_load == null ){
			    shape1_t_load = new WWW(shape1_path);
				}
				else if(shape1_t_load.isDone && shape1_t_dynamic_tx == null){
				 shape1_t_dynamic_tx = new Texture2D(1024, 1024);
				 shape1_t_load.LoadImageIntoTexture(shape1_t_dynamic_tx);
				}
				else {
				GUI.Label(new Rect(Screen.width* 1/4 - (imgsize1/2), Screen.height*.4 - (imgsize1/2), imgsize1 ,imgsize1), shape1_t_dynamic_tx);
				GUI.Label(new Rect(Screen.width* 1/4, Screen.height*7/10, 300,100), 'Shape 1 (Very)\n "V"',styleInstrux);
				GUI.Label(new Rect(Screen.width* 1.5/4, Screen.height*7/10, 300,100), 'Shape 1 (Less)\n "B"',styleInstrux);
				}
		       	
		       	//Shape 2
		       	if(shape2_t_load == null ){
			    shape2_t_load = new WWW(shape2_path);
				}
				else if(shape2_t_load.isDone && shape2_t_dynamic_tx == null){
				 shape2_t_dynamic_tx = new Texture2D(1024, 1024);
				 shape2_t_load.LoadImageIntoTexture(shape2_t_dynamic_tx);
				}
				else {
				GUI.Label(new Rect(Screen.width* 3/4 - (imgsize1/2), Screen.height*.3  - (imgsize1/2), imgsize2 ,imgsize2), shape2_t_dynamic_tx);
				GUI.Label(new Rect(Screen.width* 3/4, Screen.height*7/10, 300 ,100), 'Shape 2 (Very)\n "M"',styleInstrux);
				GUI.Label(new Rect(Screen.width* 2.5/4, Screen.height*7/10, 300 ,100), 'Shape 2 (Less)\n "N"',styleInstrux);

				}
			
			}
       	}
  	     	
 }
 
  	

function NextModule(){
Destroy(this);
}  	

