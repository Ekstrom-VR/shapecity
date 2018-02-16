#pragma strict

public var curTrialList_ins  : Array;
static var curTrialList = new Array();
static var curStoreList = new Array();
static var storeList = new Array();
static var numCities : int;
static var city_x = new Array();
static var city_y = new Array();
static var player : GameObject;
private var background : GameObject; 
private var intro : boolean = true;
private var task   : boolean = true;
var scan : boolean = true;
private var vars = new VariablesClass();

function Awake()
{
    background = GameObject.Find("Background");
	SetUpTaskType();
}

function Start () 
{
   //Setup gameobjects
	gameObject.AddComponent(CityConfig);

	//Load video clips if necessary
	if(vars.navType=="passive_VC"){
	gameObject.AddComponent(LoadVideoClips);
	}
	
	//activate player
    player.SetActive(true);
             
	if(vars.test_mode){
    StartTask();
    intro = false;
    task = false;
	}
	else{
	GetInitials();
	}		
}

function Update(){

var initials : Initials = GetComponent(Initials);
var instructs : Instructs = GetComponent(Instructs);
var instructs_scan : Instructs_scan = GetComponent(Instructs_scan);

curTrialList_ins = curTrialList;

if(initials == null && instructs == null && instructs_scan == null && intro){
//Present instructions
PresentInstruct();
intro=false;
}
else if(initials == null && instructs == null && instructs_scan == null && !intro && task ){
//Cue up task
StartTask();
task=false;
}

}

function GetInitials(){
gameObject.AddComponent(Initials);
}

function PresentInstruct(){
	if(scan){
    gameObject.AddComponent(Instructs_scan);
	}
	else{
	gameObject.AddComponent(Instructs);
	}
}

function StartTask(){
gameObject.AddComponent(Task);
}

function SetUpTaskType (){

    var vars = new VariablesClass();
	var trialListInstance= new TrialListClass();
	var storeListInstance = new StoreListClass();
	var cityListInstance = new CityListClass();
	
    if(vars.version == 'GR_st9_5000_3c'){
    curTrialList = trialListInstance.trialList_GR_3c;
    curStoreList = storeListInstance.stores_GR_st9;
    city_x = cityListInstance.city_x_GR_st9_5000_3c;
	city_y = cityListInstance.city_y_GR_st9_5000_3c;
	numCities = 3;
	}	
	
	//Play
	var playerPassive = GameObject.Find("Passive Navigator");
   
    playerPassive.SetActive(false);
   
   if(vars.navType == "passive" || vars.navType == "passive_VC" ){
   	player = playerPassive;
   }
}