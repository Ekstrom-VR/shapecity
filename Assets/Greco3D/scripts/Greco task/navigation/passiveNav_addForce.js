#pragma strict



private var ht = new Hashtable();
//public var timer : float;	
private var numPoints = 4;
private var points : Transform[];

private var player : GameObject;



function OnEnable() {
player = GameObject.Find("Graphics");
  }
  
  




function FixedUpdate () {
		player.GetComponent.<Rigidbody>().AddForce (Vector3.up * 10);
	}



function RandomizeArray(arr : Array){
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i+1);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
}



