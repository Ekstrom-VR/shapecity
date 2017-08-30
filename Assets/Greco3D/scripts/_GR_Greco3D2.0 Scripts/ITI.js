#pragma strict
 

private var text : String = "+";
private var fontSize : int = 200;
private var activeBL_On : boolean;
private var vars = new VariablesClass();
private var ab_trial_time: float;
private var collectResp : boolean;
private var respNum : int;
private var keyUp : boolean;
private var cnt : int;
static var respList = new Array();
static  var trialList = new Array();

function Awake(){
	if(vars.activeBL_On){
	ab_trial_time = (vars.iti_time - (vars.int_AB_time * (vars.ab_num_trials + 1)))/vars.ab_num_trials;
	}

}

function OnEnable(){
		print('DB ITI enable!');
	
	if(vars.activeBL_On && CityMorph.trial_action == "iti"){
	
	print('DB ITI stage 2!');
    respList = new Array();
	trialList = new Array();
	StartCoroutine(ActiveBL());
	}
}


function ActiveBL(){

  	print('DB ITI stage 3. Coroutine started!');

  for(cnt =0; cnt < vars.ab_num_trials; cnt++){
  			//Pre arrow period
  			keyUp = true;
  			text = " ";
  			yield WaitForSeconds(vars.int_AB_time);
  			collectResp = true;
			RandArrow();
			trialList[cnt] = text;
			yield WaitForSeconds(ab_trial_time);
	}
	 		text = " ";
}


function RandArrow(){
		var tog : int = Random.Range(0,2);
	
	
	
		
		if(tog){
		 text = "<";
		 }
		else{
		 text = ">";
		 }
		 
}


function OnGUI(){
		//guiStyle specs
		var style : GUIStyle = new GUIStyle();
			style.normal.textColor = Color.white;
			style.fontSize = fontSize;
			style.alignment = TextAnchor.MiddleCenter;
		var buttonWidth : int = 50;
		var buttonHeight : int = 20;
		var rect =Rect((Screen.width /2)-(buttonWidth/2),(Screen.height/2) - (buttonHeight/2),buttonWidth,buttonHeight);
		
		//Present ITI
		GUI.Label(rect,text,style);	
}
	  
function Update(){


	if(collectResp && keyUp){
			
		if ((Input.GetKeyDown('left') || Input.GetKeyDown(KeyCode.Alpha1))){
		respList[cnt]='l';
		keyUp = false;
		}
		
		if ((Input.GetKeyDown('right') || Input.GetKeyDown(KeyCode.Alpha2))){
		respList[cnt]='r';
		keyUp = false;
		}
	}
}
	  
	