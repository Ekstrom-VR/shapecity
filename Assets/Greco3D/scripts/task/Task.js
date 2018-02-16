#pragma strict

var countDown : CountDown;
var cityMorph : CityMorph;
var iti : ITI;
var output : Output;
var objectInView : ObjectInView;
var pause : Pause;
var end : End;
var cityInfo : CityInfo;
var feedBack : FeedBack;
static var task_stage : String;
static var curR : int;
static var curT : int;
static var background : Background;
var vars : VariablesClass = new VariablesClass();
// vars : VariablesClass;

var curR_ins : int;
var curT_ins : int;

function Start(){

  SetUpComps(); 
  task_stage = vars.preRun;

//   vars = GetComponent(VariablesClass);


}


function Update(){
		
	curR_ins = curR;
	curT_ins = curT;
	
	
	if(task_stage == "CountDown" ){
		countDown.enabled=true;
		cityMorph.enabled=false;
		output.enabled=false;
		objectInView.enabled=false;
		pause.enabled=false;
		end.enabled=false;
		cityInfo.enabled = false;

	}

	else if(task_stage == "Task" ){
   	
	 //Task scripts

		countDown.enabled=false;
		cityMorph.enabled=true;
		output.enabled=true;
		objectInView.enabled=true;
		pause.enabled=true;
		end.enabled=false;
		if(vars.navType == "passive"){
//		Control.player.GetComponent(PassiveNav4).enabled = true;
		}
		else if(vars.navType == "passive_VC"){
		Control.player.GetComponent(PassiveNav_VC).enabled = true;
		}
		
		if(vars.present_city_info){
		
		cityInfo.enabled = true;
		
		}
    
	}
	
	if(task_stage == "End"){
	    
	   
		countDown.enabled=false;
	    cityMorph.enabled=false;
	    output.enabled=false;
	    objectInView.enabled=false;
	    pause.enabled=false;
	   	end.enabled=true; 
	    curT = 0;
		if(vars.navType == "passive"){
//		Control.player.GetComponent(PassiveNav4).enabled = true;
		}
		else if(vars.navType == "passive_VC"){
		Control.player.GetComponent(PassiveNav_VC).enabled = true;
		}
		
		if(vars.present_city_info){
		
		cityInfo.enabled = false;
		
		}
		
	}
}



function SetUpComps(){
    gameObject.AddComponent(CountDown);
    gameObject.AddComponent(CityMorph);
    gameObject.AddComponent(End); 
    gameObject.AddComponent(ObjectInView);
    gameObject.AddComponent(Output); 
    gameObject.AddComponent(Pause); 
    gameObject.AddComponent(Background); 
    gameObject.AddComponent(ITI);
    gameObject.AddComponent(CityInfo);
    gameObject.AddComponent(FeedBack);
    
	if(vars.navType == "passive"){
//	Control.player.AddComponent(PassiveNav4);	
//    Control.player.GetComponent(PassiveNav4).enabled = false;
	}
	else if(vars.navType == "passive_VC"){
	Control.player.AddComponent(PassiveNav_VC);	
    Control.player.GetComponent(PassiveNav_VC).enabled = false;
	}
	    
    countDown = GetComponent(CountDown); 
    cityMorph = GetComponent(CityMorph);
    output = GetComponent(Output);
    objectInView = GetComponent(ObjectInView);
    pause = GetComponent(Pause);
    end = GetComponent(End);	 
    background = GetComponent(Background);
    iti = GetComponent(ITI);
    cityInfo = GetComponent(CityInfo);
    feedBack = GetComponent(FeedBack);
    
	
	countDown.enabled = false;
  	cityMorph.enabled = false;
  	output.enabled = false;
    objectInView.enabled = false;
    pause.enabled = false;
    end.enabled = false;
    background.enabled = true;	 	
    iti.enabled = false;
    cityInfo.enabled = false;
    feedBack.enabled = false; 
}




