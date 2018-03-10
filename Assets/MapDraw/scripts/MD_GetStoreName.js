#pragma strict

static var storeNameCache : String;	
static var nameSelected: boolean = false;
private var cnt : int= 0;
private var styleSN : GUIStyle = new GUIStyle();
private var md_storeInfo : MD_storeInfo;

function Start(){
	storeNameCache = 'New City';
	print('width: ' + Screen.width);
	print('height: ' + Screen.height);
}

function Update(){

	if(SelectStore.storeSelected){
	md_storeInfo=SelectStore.currStoreSelect.GetComponent('MD_storeInfo');
    storeNameCache = md_storeInfo.storeName;
		//Select store name
		if(Input.GetKeyUp(KeyCode.RightArrow)){
			if(cnt < MD_task.curStoreList.length-1){	
			cnt += 1;
			}
			
			storeNameCache = MD_task.curStoreList[cnt];
		}
		else if(Input.GetKeyUp(KeyCode.LeftArrow)){
		
			if(cnt > 0){	
			cnt -= 1;
			}
			storeNameCache = MD_task.curStoreList[cnt];	
		}
	}
	else{	
	  cnt = 0;	
	}	
}