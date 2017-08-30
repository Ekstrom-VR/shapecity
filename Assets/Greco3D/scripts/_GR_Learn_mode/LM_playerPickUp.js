#pragma strict
var curStoreList : String[];
var newPickup : GameObject;
var countText : GUIText;
var storeText : GUIText;
var timeText : GUIText;
var count : int;

private var pickupTot : int = 1;
private var numPickups : int = 1;
private var randStore : String;
private var time : float;

function Update(){

curStoreList = LM_Control.curStoreList;
time +=Time.deltaTime;
timeText.text = time.ToString("f1");


SetCountText();

	if(Input.GetKeyUp(KeyCode.Return))
		  {		
		    DestroyPickup();
		    numPickups = pickupTot;
		    DestroyPickup();
		    PlacePickup();
		    SetStoreText();
		  }	


}

function OnTriggerEnter(other : Collider) {
		if (other.gameObject.tag == "PickUp")
		{
			Destroy(other.gameObject);
			print("Get pickup");
			count++;
			SetCountText();
//			 DestroyPickup();
			numPickups = 1;
		    PlacePickup();
		    SetStoreText();

		}
	}



function PlacePickup(){

    var angleDeg : float;
	var angleRad : float;
	var xC : float;
	var zC : float;
	var radius : float = 10;
	var randVec : Vector3;
     
   for (var i :int; i < numPickups; i++){
   randStore = LM_Control.storeList[Random.Range(0,LM_Control.storeList.length)];
  

	
	
   angleDeg = Random.Range(0,360);
   angleRad = angleDeg * Mathf.PI/180.0f;
   xC = radius * Mathf.Cos(angleRad);
   zC = radius * Mathf.Sin(angleRad);
   randVec = new Vector3(xC,2,zC);  

	var newPickup : GameObject = Instantiate(Resources.Load("PickUp",GameObject));
	newPickup.name = "PickUp";
    newPickup.transform.position = GameObject.Find(randStore).transform.position + randVec;
    print("DB..random store" + randStore);
    }	
	
}




function DestroyPickup(){
 var oldPickup : GameObject = GameObject.Find("PickUp");
 Destroy(oldPickup);

}


function SetStoreText(){

	   storeText.text = randStore;
		
}




function SetCountText(){

		countText.text = "Count: " + count.ToString();
		
}

