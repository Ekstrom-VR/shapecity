#pragma strict



public var rotate_type : int = 0;
public var city_num_ins : int;


private var oculus_mode = true;
static var test_mode = false;
static var task_mode : String;
static var task_type : String;
static var city_num  : int;
static var curStoreList = new Array();
static var storeList = new Array();
static var inputTag : String;

private var player : CharacterController;
private var background : GameObject;
private var task_setup = false;
private var menu_setup = false;
private var change_city = false;
private var getCode = false;
private var city_x  = new Array();
private var city_z  = new Array();
private var numPickups : int = 0;



function Start () 
{
	//GameObjects
	if(oculus_mode){
  	player = gameObject.Find("Active Navigator").GetComponent(CharacterController);
  	}
  	else{
  	
  	player = gameObject.Find("Active Navigator").GetComponent(CharacterController);
  	}
  	player.enabled = false;
  	background = gameObject.Find("Background LM");
  	
  	
  	//Variables
	task_mode = "Menu";
	Menu();	
	menu_setup = true;
}


function Update(){

//for inspector
city_num_ins = city_num;

 	if(task_mode == "Get code"){
	 	if(!getCode){	 
	 	 gameObject.AddComponent(LM_getCode);
	 	 getCode =true;
	  	}
	 }

	if(task_mode == "Task"){
	
		  if(!task_setup){
		    getCode = false;
		    player.enabled = true;
		    background.SetActive(false);
		    ChangeCity();
		    AddStores();
		    CityConfigure();
		    RotateStores();
		  	task_setup = true;
		  	gameObject.AddComponent(LM_Output);  	  	
		  }
	  
		   if(change_city){	
		    Destroy(gameObject.GetComponent(LM_Output)); 
		    ChangeCity(); 
		    CityConfigure();
		    RotateStores();
		  	change_city = false;	
		  	gameObject.AddComponent(LM_Output);	
  	
		  }		
	}
	
	else if(task_mode == "Menu" && !menu_setup){
		    player.enabled = false;
		    background.SetActive(true);
		    Destroy(gameObject.GetComponent(LM_Output));
		    Destroy(GameObject.Find("City")); 
		  	task_setup = false;
			menu_setup = true; 
		  	Menu();		  	
		  	
	}
	  

	
		if(Input.GetKeyUp(KeyCode.Alpha1) && !getCode)
		  {		
		   	
		    city_num = 0;
		    change_city = true;
		  }	
		  if(Input.GetKeyUp(KeyCode.Alpha2) && !getCode)
		  {		
		    city_num = 1;
		    change_city = true;

		  }		
		  if(Input.GetKeyUp(KeyCode.Alpha3) && !getCode)
		  {		
			 city_num = 2;
			 change_city = true;

		  }		
		  if(Input.GetKeyUp(KeyCode.Alpha4) && !getCode)
		  {	
			 city_num = 3;
			 change_city = true;

		  }	
		  
		  if(Input.GetKeyUp(KeyCode.Escape) && menu_setup)
		  {	
			 Destroy(gameObject.GetComponent(LM_Output)); 
			 Destroy(gameObject.GetComponent(LM_getCode));
			 task_mode = "Menu";
			 menu_setup = false;
			
		  }	
		  
		  if(Input.GetKeyUp(KeyCode.R))
		  {	
				if(rotate_type < 2){
				rotate_type++;
				}
				else {
				rotate_type = 0;
				}
		  }	
}

function Menu(){
gameObject.AddComponent(LM_Menu);
}



function ChangeCity (){

  
	var trialListInstance = new TrialListClass();
	var storeListInstance = new StoreListClass();
	var cityListInstance  = new CityListClass();
	curStoreList.Clear();
	
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
	storeList.Clear();
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

function DestroyStores(){
	Destroy(GameObject.Find("City"));
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



