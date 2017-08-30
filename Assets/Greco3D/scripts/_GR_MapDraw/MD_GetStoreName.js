#pragma strict

//var stores = new Array("New Store","Wall","Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop", "Music Store", "Ice Cream","Bakery","Cell phones", "Gym", "Chinese Food", "Florist","Costume Shop");


static var storeNameCache : String;	
static var nameSelected: boolean = false;

private var cnt : int= 0;
private var styleSN : GUIStyle = new GUIStyle();
private var md_storeInfo : MD_storeInfo;
private var vars = new VariablesClass();

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

//function OnGUI()
//{
//
//	//Initialize Font and Location parameters fo gui
//	if(SelectStore.storeSelected){
//	styleSN.normal.textColor = Color.black;
//	styleSN.fontSize = 15;
//
//
//	var buttonWidth : int =200;
//	var buttonHeight : int = 15;
//	var rectQ=Rect(Screen.width - buttonWidth ,0,buttonWidth,buttonHeight);
//	var rectSN=Rect(Screen.width - buttonWidth ,buttonHeight,buttonWidth,buttonHeight);
//
//	GUI.Label(rectQ,"Store Name: ",styleSN);
//	GUI.Label(rectSN,storeNameCache,styleSN);
//	}
//}
	
	
	
	

