#pragma strict

//static var test_mode = false;
public var task_mode_ins : String;

static var task_mode : String;
static var task_type : String;
static var city_num  : int;
static var inputCode : String;

private var player : GameObject;
private var rotate_type : int;
private var background : GameObject;
public  var task_setup = false;
private var menu_setup = false;
private var getCode = false;
private var city_x  = new Array();
private var city_z  = new Array();
private var numPickups : int = 1;
static var curStoreList : String[];
static var storeList = new Array();

function Awake()
{ 
player=gameObject.Find("Passive Navigator");

}


function Start () 
{
        	  
        
	task_mode = "Menu";
	gameObject.AddComponent(VT_Menu);
	menu_setup = true; 
	background = gameObject.Find("Background VT");
	
}


function Update(){

task_mode_ins = task_mode;

	 if(task_mode == "Get code"){
	 	if(!getCode){	 
	 	 gameObject.AddComponent(VT_getCode);
	 	 getCode =true;
	  	}
	 }
	 else if(task_mode == "Task"){
	
	  if(!task_setup){
	  
	    SetUpTaskType ();
	    AddStores();
	    CityConfigure();
	    RotateStores();
	  	
	  	
	  	background.SetActive(false);
	  	player.AddComponent(VT_video);
	  	print("task setup!");
	  	task_setup = true;
	  		    	
	  }	
	  

	    if(Input.GetKeyUp(KeyCode.Escape) && menu_setup)
		  {	
			 Destroy(gameObject.GetComponent(LM_Output)); 
			 task_mode = "Menu";
			 menu_setup = false;
		  }	
	
	  
	}
	else if(task_mode == "Menu" && !menu_setup){
	    background.SetActive(true);
	    Destroy(gameObject.GetComponent(VT_video));
	    Destroy(GameObject.Find("City")); 
	    getCode = false;
	  	task_setup = false;
		menu_setup = true; 
	    gameObject.AddComponent(VT_Menu);	
	  	
	}	
}




function SetUpTaskType (){

  
	var trialListInstance = new TrialListClass();
	var storeListInstance = new StoreListClass();
	var cityListInstance  = new CityListClass();

       if(task_type == 'CE'){ 
    
   
    curStoreList = storeListInstance.stores_CE;
    city_x = cityListInstance.city_x_CE[city_num];
	city_z = cityListInstance.city_y_CE[city_num];
    }
    if(task_type == 'GR'){
    
   
    curStoreList = storeListInstance.stores_GR;
    city_x = cityListInstance.city_x_GR[city_num];
	city_z = cityListInstance.city_y_GR[city_num];
    
	}
	
	if(task_type == 'GR_st5'){
    
    curStoreList = storeListInstance.stores_GR_st5;
    city_x = cityListInstance.city_x_GR_st5[city_num];
	city_z = cityListInstance.city_y_GR_st5[city_num];
    
	}
	
	if(task_type == 'GR_st5_2000'){
    
    curStoreList = storeListInstance.stores_GR_st5;
    city_x = cityListInstance.city_x_GR_st5_2000[city_num];
	city_z = cityListInstance.city_y_GR_st5_2000[city_num];
    
	}
	
	if(task_type == 'GR_st5_3000'){
    
    curStoreList = storeListInstance.stores_GR_st5;
    city_x = cityListInstance.city_x_GR_st5_3000[city_num];
	city_z = cityListInstance.city_y_GR_st5_3000[city_num];
    
	}
	
	if(task_type == 'GR_st5_4000'){
    
    curStoreList = storeListInstance.stores_GR_st5;
    city_x = cityListInstance.city_x_GR_st5_4000[city_num];
	city_z = cityListInstance.city_y_GR_st5_4000[city_num];
    
	}
	
	
	if(task_type == 'GR_st5_5000'){
    
    curStoreList = storeListInstance.stores_GR_st5;
    city_x = cityListInstance.city_x_GR_st5_5000[city_num];
	city_z = cityListInstance.city_y_GR_st5_5000[city_num];
    
	}
	
	if(task_type == 'GR_st5_6000'){
    
    curStoreList = storeListInstance.stores_GR_st5;
    city_x = cityListInstance.city_x_GR_st5_6000[city_num];
	city_z = cityListInstance.city_y_GR_st5_6000[city_num];
    
	}
	
	if(task_type == 'GR_st5_7000'){
    
    curStoreList = storeListInstance.stores_GR_st5;
    city_x = cityListInstance.city_x_GR_st5_7000[city_num];
	city_z = cityListInstance.city_y_GR_st5_7000[city_num];
    
	}
	
	
	if(task_type == 'GR_st13'){
    
    curStoreList = storeListInstance.stores_GR_st13;
    city_x = cityListInstance.city_x_GR_st13[city_num];
	city_z = cityListInstance.city_y_GR_st13[city_num];
    
	}
	
	if(task_type == 'GR_st30'){
    
    curStoreList = storeListInstance.stores_GR_st30;
    city_x = cityListInstance.city_x_GR_st30[city_num];
	city_z = cityListInstance.city_y_GR_st30[city_num];
    
	}
	
	
	if(task_type == 'GR_5000'){
    
    curStoreList = storeListInstance.stores_GR;
    city_x = cityListInstance.city_x_GR_5000[city_num];
	city_z = cityListInstance.city_y_GR_5000[city_num];
    
	}
	
	if(task_type == 'GR_st8_5000_ND'){
    
    curStoreList = storeListInstance.stores_GR_st8;
    city_x = cityListInstance.city_x_GR_st8_5000_ND[city_num];
	city_z = cityListInstance.city_y_GR_st8_5000_ND[city_num];
    
	}
	
	if(task_type == 'GR_st9_5000_3c'){
    
    curStoreList = storeListInstance.stores_GR_st9;
    city_x = cityListInstance.city_x_GR_st9_5000_3c[city_num];
	city_z = cityListInstance.city_y_GR_st9_5000_3c[city_num];
    
	}
	
	
	else if(task_type == 'PR'){

	curStoreList = storeListInstance.stores_PR;
	city_x = cityListInstance.city_x_PR[city_num];
	city_z = cityListInstance.city_y_PR[city_num];

	}
	
	else if(task_type == 'PR_1000'){

	curStoreList = storeListInstance.stores_PR;
	city_x = cityListInstance.city_x_PR_1000[city_num];
	city_z = cityListInstance.city_y_PR_1000[city_num];

	}
	
	else if(task_type == 'PR_2000'){

	curStoreList = storeListInstance.stores_PR;
	city_x = cityListInstance.city_x_PR_2000[city_num];
	city_z = cityListInstance.city_y_PR_2000[city_num];

	}
	
}



function AddStores(){
	var new_city =  new GameObject("City");
	var bwCNT = 0;
	var holdCNT = 0;
	var instance : GameObject;
	for ( var store : int = 0; store < curStoreList.length; store++){
    
	    if(curStoreList[store] == "BrickWall"){
	    bwCNT++;
	    instance = Instantiate(Resources.Load(curStoreList[store],GameObject));
	    instance.name = curStoreList[store] + " " + bwCNT;
	    curStoreList[store] = instance.name;
	    instance.transform.parent = new_city.transform;
	    }
	    else if(curStoreList[store] == "Holder"){
	    holdCNT++;
	    instance = Instantiate(Resources.Load(curStoreList[store],GameObject));
	    instance.name = curStoreList[store] + " " + holdCNT;
	    curStoreList[store] = instance.name;
	    instance.transform.parent = new_city.transform;
	    }
	    else{

		instance = Instantiate(Resources.Load(curStoreList[store],GameObject));
		instance.name = curStoreList[store];
		instance.transform.parent = new_city.transform;
		storeList.Add(curStoreList[store]);
		
		}
	}

}


function CityConfigure(){

//Position stores
      for( var i : int = 0; i < curStoreList.length; i++){
        
				  GameObject.Find(curStoreList[i]).transform.position.x= city_x[i];
				  GameObject.Find(curStoreList[i]).transform.position.z =city_z[i];	  
		 }			 	 
}


function RotateStores(){
          for( var i : int = 0; i < curStoreList.length; i++){				  
				  var targetDir : Vector3;
				 
				 
				  if(i != curStoreList.length -1){
				     targetDir =  GameObject.Find(curStoreList[i+1]).transform.position - GameObject.Find(curStoreList[i]).transform.position;  
				 }	  	
			     else {
				     targetDir =  GameObject.Find(curStoreList[0]).transform.position - GameObject.Find(curStoreList[i]).transform.position;
				 }
				  
				   targetDir.y = 0;
				   var forward = GameObject.Find(curStoreList[i]).transform.forward;
				   
				     //Rotate stores
				   if(rotate_type==1){
				   	GameObject.Find(curStoreList[i]).transform.rotation= Quaternion.LookRotation(targetDir);
				   	}
				   else if(rotate_type==2){
					if(GameObject.Find(curStoreList[i]).tag != "store"){
					   GameObject.Find(curStoreList[i]).transform.rotation= Quaternion.LookRotation(targetDir);
					   }
				   }
				  		  			  			  
		 	}
		 	
}


