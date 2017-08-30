#pragma strict

private var version : String = "GR_st9";//"GR_8st";
var curStoreList = new Array();
var monRunning = false;
var style : GUIStyle = new GUIStyle();
var stages = new Array("Instructions", "Montage","End");
var cnt =0;
var curStage : String;
var store : GameObject;
var numRuns : int = 1;

function Start(){
	ConfigureCity();
	curStage=stages[cnt]; 
}
	
function Update () {

    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    
  
    
    
    if(space_up){
      StageChange();	
    }
    
	
	if(esc_up){
	 Application.Quit();
	}	


 

}





function RunMontage(){


   print("Run montage called");

		for(var store_name : String in curStoreList){
		        print(store_name);
				var degrees : float = 180;
				var Stime : float = .1;
				var Rtime : float = 2;
				var Etime : float = .1;
				var rate : float = degrees/Rtime;
		        store  = Instantiate(Resources.Load(store_name,GameObject));
		        store.transform.position = Vector3(0,0,0);
		   		

		var isPaused :boolean = true;	


		 while (isPaused)
			 {
			
			      yield;
				  if (Input.GetKeyUp(KeyCode.Return)) {
				  	isPaused = false;
				    Destroy(store);
				
			   	    }
			 }

//		   		while(Stime > 0){
//		   		Stime -= Time.deltaTime;
//		   		yield;
//		   		}	
//				while(Rtime > 0){
//				Rtime -= Time.deltaTime;
//				store.transform.Rotate(Vector3.up * Time.deltaTime*rate);
//				yield;
//				}
//				while(Etime > 0){
//		   		Etime -= Time.deltaTime;
//		   		yield;
//		   		}	
				
			
//			Destroy(store); 	
	
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
        var instructions4 = "(Press escape to close)";
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
    }
   
}

function SetGUIStyle(fontsize : int) : GUIStyle{														//set GUIstyle
//       var style : GUIStyle = new GUIStyle();
      
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

    var storeListInstance = new StoreListClass();
       if(version == 'CE'){ 
    	curStoreList= storeListInstance.stores_CE;
    }
    else if(version == 'GR'){    
   	 	curStoreList = storeListInstance.stores_GR;
	}
	
	else if(version == 'PR'){
		curStoreList = storeListInstance.stores_PR;
	}
	
	else if(version == 'GR_st8'){
		curStoreList = storeListInstance.stores_GR_st8;
	}
	else if(version == 'GR_st9'){
		curStoreList = storeListInstance.stores_GR_st9;
	}


}