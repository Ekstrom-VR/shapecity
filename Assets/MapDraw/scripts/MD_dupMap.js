#pragma strict

static  var curMap : GameObject;
var newMap : GameObject;
var oldMap : GameObject;
private var identifier : int = 1;
static var allMaps = new Array(); 
var cnt : int = 0;

function Start(){
curMap = GameObject.Find("Map 1");
allMaps.Push(curMap);
}

function Update(){

//Duplicate
	if(Input.GetKeyDown(KeyCode.M) && !SelectStore.storeSelected && cnt < MD_task.numCities - 1){


			identifier = identifier +1;
			
			newMap = Instantiate(curMap,curMap.transform.position,  Quaternion.identity);
			newMap.name = "Map " + identifier.ToString();
						
			//Inactivate prior Map
			oldMap=allMaps[cnt];
			oldMap.SetActive(false);
						
			//Add curMap to map array
			 allMaps.Push(newMap);
			
			//Get cnt
			cnt = allMaps.length -1;
					    
			//Set cur map		    
		    curMap = allMaps[cnt];
	}

	if(Input.GetKeyDown(KeyCode.LeftArrow) && !SelectStore.storeSelected && allMaps.length > 1 && cnt > 0){
                  
			oldMap=allMaps[cnt];
			oldMap.SetActive(false);
		    cnt -= 1;
		    curMap = allMaps[cnt];
		    curMap.SetActive(true);
	}
	
	if(Input.GetKeyDown(KeyCode.RightArrow) && !SelectStore.storeSelected && allMaps.length > 1 && cnt < allMaps.length-1){
                  
			oldMap=allMaps[cnt];
			oldMap.SetActive(false);
		    cnt ++;
		    curMap = allMaps[cnt];
		    curMap.SetActive(true);
	}
		
//Destroy
    if (Input.GetKey(KeyCode.LeftCommand) && Input.GetKeyDown(KeyCode.Backspace)){
				
		   if(curMap.name != "Map 1"){  
		    allMaps.RemoveAt(cnt);
		    cnt = 0; 					
			Destroy(curMap);	
			curMap = allMaps[0];
			curMap.SetActive(true);
			}				
	}
}