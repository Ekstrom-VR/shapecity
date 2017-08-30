#pragma strict

var terr : Terrain;

function Start () {

terr = Terrain.activeTerrain;
  var xRes = terr.terrainData.heightmapWidth;
   var yRes = terr.terrainData.heightmapHeight;
    
//   var heights = terrain.terrainData.GetHeights(0, 0, xRes, yRes);
 
Debug.Log("Width is " + xRes.ToString());
Debug.Log("Height is " + yRes.ToString());

//Debug.Log(xRes);

}

function Update () {

}