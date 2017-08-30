#pragma strict


private var startP : Vector3;
private var middle : Vector3; 
private var end : Vector3;
private var BezierTime : float = 0;
private var moveVec : Vector3;
private var bezPos : Vector3;
private var oldPos : Vector3;
private var newPos : Vector3;
private var v3 : Vector3;
private var newRot: Vector3;
function Start(){

BezierTime = 0;
//print("Before" +G3D_cityConfig.stores[1]);
RandomizeArray(G3D_cityConfig.stores[0]);
//print("Afterwards" +G3D_cityConfig.stores);
startP = transform.position;
middle = GameObject.Find(G3D_cityConfig.stores[0]).transform.position;
end =GameObject.Find(G3D_cityConfig.stores[1]).transform.position;
}


function Update () {




var bx : float;
var bz : float;
var bezPos : Vector3;
var oldPos =transform.position; 



	if(BezierTime >=1){

	BezierTime = 0;
	RandomizeArray(G3D_cityConfig.stores);
	startP = end;
	middle = GameObject.Find(G3D_cityConfig.stores[0]+"_n").transform.position;
	end =GameObject.Find(G3D_cityConfig.stores[1]+"_n").transform.position;

	 } 
BezierTime +=Time.deltaTime*.1;
oldPos=transform.position;
bx = (((1-BezierTime)*(1-BezierTime)) * startP.x) + (2 * BezierTime * (1 - BezierTime) * middle.x) + ((BezierTime * BezierTime) * end.x);
bz = (((1-BezierTime)*(1-BezierTime)) * startP.z) + (2 * BezierTime * (1 - BezierTime) * middle.z) + ((BezierTime * BezierTime) * end.z);
newPos=new Vector3(bx,transform.position.y,bz);
v3 = newPos - oldPos;
if(v3.x > 0){
newRot.x=1;
}
else if(v3.x < 0){
newRot.x=-1;
}
if(v3.z > 0){
newRot.z=1;
}
else if(v3.z < 0){
newRot.z=-1;
}
newRot.y=0;
//transform.rotation = Quaternion.LookRotation(newRot);
transform.position = new Vector3(bx,transform.position.y,bz);

}





function RandomizeArray(arr : Array){
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i+1);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
}
