#pragma strict



//private var terrain : GameObject;


var storeName : float;

//var terrainSize = terrain.terrainData.size;
var terrain : Terrain;
terrain = Terrain.activeTerrain;
var terrainSize : Vector3;
terrainSize = terrain.terrainData.size;


function Start () {


print(terrainSize[0]);

}

function Update () {


var fwd = transform.TransformDirection (Vector3.forward);
		if (Physics.Raycast (transform.position, fwd, 10)) {
			print ("There is something in front of the object!");
			
		}


}