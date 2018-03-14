#pragma strict

var countDown : CountDown;
var cityMorph : CityMorph;
var iti : ITI;
var output : Output;
var objectInView : ObjectInView;
var end : End;
var cityInfo : CityInfo;
var feedBack : FeedBack;
static var task_stage : String;
static var curR : int;
static var curT : int;
static var background : Background;
var vars : Config;
var curR_ins : int;
var curT_ins : int;

function Awake(){

var config : GameObject = GameObject.Find("Config");
vars = config.GetComponent(Config) as Config;
 
}

function Start(){

  SetUpComps(); 
  task_stage = vars.preRun;
}

function Update(){
		
	curR_ins = curR;
	curT_ins = curT;
	
	
	if(task_stage == "CountDown" ){
		countDown.enabled=true;
		cityMorph.enabled=false;
		output.enabled=false;
		objectInView.enabled=false;
		end.enabled=false;
		cityInfo.enabled = false;

	}

	else if(task_stage == "Task" ){
		countDown.enabled=false;
		cityMorph.enabled=true;
		output.enabled=true;
		objectInView.enabled=true;
		end.enabled=false;
		

		Control.player.GetComponent(PassiveNav_VC).enabled = true;

		
		if(vars.present_city_info){		
		cityInfo.enabled = true;		
		}    
	}
	
	if(task_stage == "End"){
	    	   
		countDown.enabled=false;
	    cityMorph.enabled=false;
	    output.enabled=false;
	    objectInView.enabled=false;
	   	end.enabled=true; 
	    curT = 0;

		Control.player.GetComponent(PassiveNav_VC).enabled = true;
		
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
    gameObject.AddComponent(Background); 
    gameObject.AddComponent(ITI);
    gameObject.AddComponent(CityInfo);
    gameObject.AddComponent(FeedBack);
    


	Control.player.AddComponent(PassiveNav_VC);	
    Control.player.GetComponent(PassiveNav_VC).enabled = false;

	    
    countDown = GetComponent(CountDown); 
    cityMorph = GetComponent(CityMorph);
    output = GetComponent(Output);
    objectInView = GetComponent(ObjectInView);
    end = GetComponent(End);	 
    background = GetComponent(Background);
    iti = GetComponent(ITI);
    cityInfo = GetComponent(CityInfo);
    feedBack = GetComponent(FeedBack);
    
	
	countDown.enabled = false;
  	cityMorph.enabled = false;
  	output.enabled = false;
    objectInView.enabled = false;
    end.enabled = false;
    background.enabled = true;	 	
    iti.enabled = false;
    cityInfo.enabled = false;
    feedBack.enabled = false; 
}