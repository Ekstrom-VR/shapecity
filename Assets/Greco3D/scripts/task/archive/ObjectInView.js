#pragma strict

static var numStoresNV : int;

var stores = new Array();
var inViewArray = new Array();
private var hold : int;
var numStoresNV_present : int;
function Start(){

stores = Control.curStoreList;
inViewArray = new int[stores.length];

}
function Update () {

numStoresNV_present =numStoresNV;

	for( var i : int = 0;i < stores.length; i++){
	 hold = CheckInView(stores[i]);
	 inViewArray[i] = hold;
	}
//	
  numStoresNV = CountInView();

}

function CheckInView(objectName : String){
var inView : int;
var store = GameObject.Find(objectName);
var allChildren =store.GetComponentsInChildren(Renderer);
	for(var i : Renderer in allChildren){
		 if(i.isVisible){
		 inView =1;	 
		 }
		 else{
		 inView =0;
		 }	 
	}
	
	return inView;
}

function CountInView(){
 	var cnt: int =0;
	for( var ii : int in inViewArray){
	 cnt += ii;
	}
	return cnt;
}