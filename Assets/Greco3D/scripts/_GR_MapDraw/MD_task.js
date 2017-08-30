#pragma strict


var currentStage : String;
static var task_stage : String;
static var task_stages = new Array("SubjID","Test","Break","End");
static var stageNum : int = 0;
static var stores = new Array();
static var task_type = 'GR_st9_5000_3c';//'GR_st8_5000_ND','CE','GR_st9_5000_3c'

private var intro : GameObject;
private var mapDraw : GameObject;
private var end : GameObject;
private var city_x_all  = new Array();
private var city_z_all   = new Array();
static var curStoreList : String[];

function Start(){

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

  
	var trialListInstance = new TrialListClass();
	var storeListInstance = new StoreListClass();
	var cityListInstance  = new CityListClass();

    if(task_type == 'CE'){
    curStoreList = storeListInstance.stores_CE;
    city_x_all = cityListInstance.city_x_CE;
	city_z_all  = cityListInstance.city_y_CE;
    }
    
    if(task_type == 'GR'){   
    curStoreList = storeListInstance.stores_GR;
    city_x_all = cityListInstance.city_x_GR;
	city_z_all  = cityListInstance.city_y_GR;  
	}
	
	if(task_type == 'GR_st5'){   
    curStoreList = storeListInstance.stores_GR_st5;
    city_x_all = cityListInstance.city_x_GR_st5;
	city_z_all  = cityListInstance.city_y_GR_st5; 
	}
	
	if(task_type == 'GR_st5_2000'){   
    curStoreList = storeListInstance.stores_GR_st5;
    city_x_all = cityListInstance.city_x_GR_st5_2000;
	city_z_all  = cityListInstance.city_y_GR_st5_2000; 
	}
	
	if(task_type == 'GR_st5_3000'){
    curStoreList = storeListInstance.stores_GR_st5;
    city_x_all = cityListInstance.city_x_GR_st5_3000;
	city_z_all  = cityListInstance.city_y_GR_st5_3000;
	}
	
	if(task_type == 'GR_st5_4000'){
    curStoreList = storeListInstance.stores_GR_st5;
    city_x_all = cityListInstance.city_x_GR_st5_4000;
	city_z_all  = cityListInstance.city_y_GR_st5_4000;
	}
	
	
	if(task_type == 'GR_st5_5000'){    
    curStoreList = storeListInstance.stores_GR_st5;
    city_x_all = cityListInstance.city_x_GR_st5_5000;
	city_z_all  = cityListInstance.city_y_GR_st5_5000;   
	}
	
	if(task_type == 'GR_st5_6000'){  
    curStoreList = storeListInstance.stores_GR_st5;
    city_x_all = cityListInstance.city_x_GR_st5_6000;
	city_z_all  = cityListInstance.city_y_GR_st5_6000;
	}
	
	if(task_type == 'GR_st5_7000'){
    curStoreList = storeListInstance.stores_GR_st5;
    city_x_all = cityListInstance.city_x_GR_st5_7000;
	city_z_all  = cityListInstance.city_y_GR_st5_7000;
	}
	
	
	if(task_type == 'GR_st13'){
    curStoreList = storeListInstance.stores_GR_st13;
    city_x_all = cityListInstance.city_x_GR_st13;
	city_z_all  = cityListInstance.city_y_GR_st13;
	}
	
	if(task_type == 'GR_st30'){
    curStoreList = storeListInstance.stores_GR_st30;
    city_x_all = cityListInstance.city_x_GR_st30;
	city_z_all  = cityListInstance.city_y_GR_st30;
	}
	
	
	if(task_type == 'GR_5000'){
    curStoreList = storeListInstance.stores_GR;
    city_x_all = cityListInstance.city_x_GR_5000;
	city_z_all  = cityListInstance.city_y_GR_5000;
	}
	
	if(task_type == 'GR_st8_5000_ND'){
    
    curStoreList = storeListInstance.stores_GR_st8;
    city_x_all = cityListInstance.city_x_GR_st8_5000_ND;
	city_z_all = cityListInstance.city_y_GR_st8_5000_ND;
    
	}
	
	if(task_type == 'GR_st9_5000_3c'){
    
    curStoreList = storeListInstance.stores_GR_st9;
    city_x_all = cityListInstance.city_x_GR_st9_5000_3c;
	city_z_all = cityListInstance.city_y_GR_st9_5000_3c;
    
	}
	
	
	else if(task_type == 'PR'){
	curStoreList = storeListInstance.stores_PR;
	city_x_all = cityListInstance.city_x_PR;
	city_z_all  = cityListInstance.city_y_PR;

	}
}