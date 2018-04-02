#pragma strict
import System.Collections.Generic;

//enum TaskType {GR,CE,PR};
//public var taskType : TaskType;
private var curStoreList = new List.<String>();
private var monRunning = false;
private var style : GUIStyle = new GUIStyle();
//private var stages = new Array("Instructions", "Montage","End","Next task");

private var stages = ["Instructions", "Montage","End","Next task"];

private var cnt =0;
private var curStage : String;
private var store : GameObject;
public var numRuns : int = 1;//3
private var vars: Config;

function Start(){
	var config : GameObject = GameObject.Find("Config");
	vars = config.GetComponent(Config) as Config;
	ConfigureCity();
	curStage=stages[cnt]; 
}
	
function Update () {

    var space_up =   Input.GetKeyUp(KeyCode.Space);    
   
    if(space_up && !monRunning){
      StageChange();	
    }
}

function RunMontage(){

   print("Run montage called");

	for( var i : int =0; i < numRuns; i++){
		for(var store_name : String in curStoreList){
		        print(store_name);
				var degrees : float = 180;
				var Stime : float = .1;
				var Rtime : float = 2;
				var Etime : float = .1;
				var rate : float = degrees/Rtime;
		        store  = Instantiate(Resources.Load(store_name,GameObject));
		        store.transform.position = Vector3(0,0,0);
		   		
		   		while(Stime > 0){
		   		Stime -= Time.deltaTime;
		   		yield;
		   		}	
				while(Rtime > 0){
				Rtime -= Time.deltaTime;
				store.transform.Rotate(Vector3.up * Time.deltaTime*rate);
				yield;
				}
				while(Etime > 0){
		   		Etime -= Time.deltaTime;
		   		yield;
		   		}	
				
			
			Destroy(store); 	
		}
	
	}
	monRunning = false;
	StageChange();			
}

function OnGUI(){																		//present instructions
         
      switch(curStage)
    {
    
    case "Instructions":
    
        var instructions1 = "Study this presentation order";
		var style1 = SetGUIStyle(40);
		var rect1 = SetGUIRect(100,50,.5,.1);
       	GUI.Label(rect1,instructions1,style1);
       	
       	
       	
       	var style2 = SetGUIStyle(20);
        var instructions2 = "(Press spacebar to start)";
		var rect2 = SetGUIRect(100,50,.5,.9);
       	GUI.Label(rect2,instructions2,style2);
       	break;
    
    case "Montage":
    
    	break;
    
    case "End":
    	
    	
    	var instructions3 = "All done!";
		var style3 = SetGUIStyle(40);
		var rect3 = SetGUIRect(100,50,.5,.1);
       	GUI.Label(rect3,instructions3,style3);
       	
       	var style4 = SetGUIStyle(20);
        var instructions4 = "(Press spacebar to continue)";
		var rect4 = SetGUIRect(100,50,.5,.9);
       	GUI.Label(rect4,instructions4,style4);
       	break;  
    }
   
            	     
}

function StageChange(){																	//iterate stage index
	  if(cnt <stages.length-1){
	  cnt++;
	  
	  }
	  else{
	  cnt =0;
	  }
	  
    curStage = stages[cnt];
	switch(curStage)
    {
    
    case "Instructions":
    
   	 break;
   	 
    case "Montage":
    
        if(monRunning==false){
        monRunning = true;
    	StartCoroutine("RunMontage");
    	}

    	break;
    	
    case "End":
        
        StopCoroutine("RunMontage");
        Destroy(store);
        monRunning = false;
    	break;
	
	case "Next task":
	
		var expObj : GameObject = GameObject.Find("Experiment");
		var expScript: Experiment = expObj.GetComponent("Experiment") as Experiment;
		expScript.LoadNextModule();
    }
   
}

function SetGUIStyle(fontsize : int) : GUIStyle{
      
	   style.fontSize = fontsize;
       style.normal.textColor = Color.white;
       style.alignment = TextAnchor.MiddleCenter;
      
	   return style;
}


function SetGUIRect(buttonWidth : float ,buttonHeight : float,percW : float,percH : float) : Rect{															//Set GUIRect
  
		
		var screenWidth : float = (Screen.width * percW) - (buttonWidth * .5);
		var screenHeight : float = (Screen.height * percH) - (buttonHeight*.5);
		
		var rect =Rect(screenWidth,screenHeight,buttonWidth,buttonHeight);
		return rect;
}



function ConfigureCity(){																//Estabilishes the correct store list

//    var storeListInstance = new StoreListClass();
//       if(taskType == TaskType.CE){ 
//    	curStoreList= storeListInstance.stores_CE;
//    }
//
//	else if(taskType == TaskType.PR){
//		curStoreList = storeListInstance.stores_PR;
//	}
//	
//	else if(taskType == TaskType.GR){
//		curStoreList = storeListInstance.stores_GR_st9;
//	}

//var	cityBuilder = new CityBuilder();
////	var cityBuilder : CityBuilder = GetComponent(CityBuilder) as CityBuilder;
//
////	var city = new City(); 
//    var city : City = cityBuilder.BuildCity(vars.version);
	var	city : City = new City(vars.version);

	curStoreList = city.stores;
}