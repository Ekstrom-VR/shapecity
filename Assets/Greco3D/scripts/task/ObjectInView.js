#pragma strict

// var  toyStoreNV  : boolean = false;
// var  firstBankNV : boolean = false;
// var  bookStoreNV : boolean = false;
// var  camStoreNV  : boolean = false;
// var  coffShopNV  : boolean = false;
// var  craftShopNV : boolean = false;
// var  dentistNV   : boolean = false;
// var  fastFoodNV  : boolean = false;
// var bakeryNV	 : boolean = false;
//var cellPhoneNV	 : boolean = false;
//var gymNV		 : boolean = false;
//var chineseNV	 : boolean = false;
//var floristNV	 : boolean = false;
//var costumeNV	 : boolean = false;
//var musicNV		 : boolean = false;
//var iceCreamNV : boolean = false;

static var numStoresNV : int;

// var stores = new Array("Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop","Bakery","Cell phones", "Gym", "Chinese Food", "Florist","Costume Shop","Dentist","Fast Food Shop", "Music Store", "Ice Cream");
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
//var allNV = new Array();

//toyStoreNV  =CheckInView("Toy Store")!=0?true:false;
//firstBankNV =CheckInView("1ST Bank")!=0?true:false;
//bookStoreNV =CheckInView("Book Store")!=0?true:false;
//camStoreNV  =CheckInView("Camera Store")!=0?true:false;
//coffShopNV  =CheckInView("Coffee Shop")!=0?true:false;
//craftShopNV =CheckInView("Craft Shop")!=0?true:false;
//dentistNV   =CheckInView("Dentist")!=0?true:false;
//fastFoodNV  =CheckInView("Fast Food Shop")!=0?true:false;
//bakeryNV	=CheckInView("Bakery")!=0?true:false;
//cellPhoneNV	=CheckInView("Cell phones")!=0?true:false;
//gymNV		=CheckInView("Gym")!=0?true:false;
//chineseNV	=CheckInView("Chinese Food")!=0?true:false;
//floristNV	=CheckInView("Florist")!=0?true:false;
//costumeNV	=CheckInView("Costume Shop")!=0?true:false;
//dentistNV	=CheckInView("Dentist")!=0?true:false;
//fastFoodNV	=CheckInView("Fast Food Shop")!=0?true:false;
//musicNV		=CheckInView("Music Store")!=0?true:false;
//iceCreamNV	=CheckInView("Ice Cream")!=0?true:false;


//
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