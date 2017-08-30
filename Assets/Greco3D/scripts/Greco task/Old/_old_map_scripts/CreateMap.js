#pragma strict


var map1 : GameObject;
var identifier:int = 1;


function Start () {

map1 = GameObject.Find("Map1");


}

function Update () {


    if(Input.GetKeyUp(KeyCode.Space))
    {
    
    
			print (identifier);
			identifier = identifier +1;
			var newMap : GameObject; 
			newMap = Instantiate(map1,map1.transform.position,  Quaternion.identity);//+ new Vector3(50,0,50)
			newMap.name = "Map" + identifier.ToString();	
			print(gameObject.name);
    
    
    };
    

}