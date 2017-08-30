#pragma strict

var myTimer : float =5.0;
var debugText : GUIText;
var pickups_list : GameObject[];
var count : int = 0;

pickups_list = GameObject.FindGameObjectsWithTag("PickUp");
Debug.Log(pickups_list[0].name);


function Start () {

SetDebugText();

}


// Reactivate all pickups after specified time integer
function Update () {
myTimer -= Time.deltaTime;

if(myTimer <= 0) {

myTimer = 5.0;

	for(var i : int = 0; i < pickups_list.Length; i++)
	{

		
		if(pickups_list[i].gameObject.activeSelf==false )
		{
		count = count +1; 
		pickups_list[i].gameObject.SetActive(true);
		
//		SetDebugText();
		SetDebugText();
		}

	}	
}
}
 
function SetDebugText()
	{

		debugText.text = "Reactivated: " + count.ToString();
		
	}



