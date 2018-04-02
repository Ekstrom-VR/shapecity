#pragma strict
private var currentStage : String;
static var task_stage : String;
static var task_stages = new Array("SubjID","Test","Break","End");
static var stageNum : int = 0;
static var stores = new Array();
//public enum TaskType {GR,CE,PR,all};
//public var taskType : TaskType;
static var task_type: String;
static var numCities : int;
private var intro : GameObject;
private var mapDraw : GameObject;
private var end : GameObject;
private var city_x_all  = new Array();
private var city_z_all   = new Array();
static var curStoreList : String[];
private var vars: Config_cs;

function Start(){
	vars = Manager.config;
	task_type = vars.version;
  	mapDraw = GameObject.Find("MapDraw");
  	intro = GameObject.Find("Intro");
  	end = GameObject.Find("End");
  	task_stage = "SubjID";
  	SetUpTaskType();
}

function Update(){
	
	currentStage = task_stage;

	if(task_stage == "SubjID" ){
	 intro.SetActive(true);
	 mapDraw.SetActive(false);
	 end.SetActive(false);	 
	}

	if(task_stage == "Test" ){   
     intro.SetActive(false);
	 mapDraw.SetActive(true);
	 end.SetActive(false);
	}
	
	if(task_stage == "End"){
	
	 intro.SetActive(false);
	 mapDraw.SetActive(false);
	 end.SetActive(true);
		for (var map : GameObject in MD_dupMap.allMaps){
		 map.SetActive(false);
		 }
	}
}

function SetUpTaskType (){
  
	var storeListInstance = new MD_StoreList();

    if(task_type == "CE"){
    curStoreList = storeListInstance.stores_CE;
//	task_type = 'CE';
	numCities = 4;
    }
    
    if(task_type == "Greco"){   
    curStoreList = storeListInstance.stores_GR;
//	task_type = 'GR';
	numCities = 3;
	}
	
	if(task_type == "PR"){
	curStoreList = storeListInstance.stores_PR;
//	task_type = 'PR';
	numCities = 2;
	}
	
//	if(taskType == TaskType.all){
//	curStoreList = storeListInstance.stores_all;
//	task_type = 'all';
//	numCities = 4;
//	}
}