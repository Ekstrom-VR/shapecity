#pragma strict





///////initiate variables
/////////////////////////

var moveSpeed : float = 10f;
var turnSpeed : float = 50f;
var roamRadius : float = 10.0;
var randomDirection;

//vectors to be randomized
var vecTran : Vector3; 
var vecRot : Vector3;

var rotate = false;

//timer variables
private var trialTime : float = 10.0;
var curTimer : float;

var numits = 100;
var tranCNT = 0;

var tranTimes = new int[100];
var rotTimes = new int[100];

//Extrat stuff....
//var prefab: GameObject;



function Start () {

curTimer = trialTime;

//random start position
var position: Vector3 = Vector3(Random.Range(-50.0, 50.0), 0, Random.Range(-50.0, 50.0));
transform.position += position;



for(var i : int = 0; i < 10; i++){
tranTimes[i] = Random.Range(3000,1000) / 1000;
rotTimes[i] = Random.Range(3000,1000) / 1000;
};
Debug.Log("tranTimes: "+ tranTimes);
Debug.Log("rotTimes: " + rotTimes);


vecTran = Random.insideUnitSphere * moveSpeed;
vecTran.y = 0.0;


//Rotate variables

vecRot = Random.onUnitSphere * moveSpeed;
vecRot.x =0.0;
vecRot.z=0.0;
}

function Update () {
curTimer -= Time.deltaTime;


if(curTimer <= (trialTime-tranTimes[tranCNT]) && rotate == false) {
Debug.Log("tranTIMES(secs):" +tranTimes[tranCNT]);
tranCNT++;
rotate = true;
vecRot = Random.onUnitSphere * moveSpeed;
vecRot.x =0.0;
vecRot.z=0.0;

}
if(rotate ==true){
transform.Rotate(vecRot*Time.deltaTime);
}
if(curTimer <= 0){
rotate = false;
curTimer = trialTime;
vecTran = Random.onUnitSphere * moveSpeed;
vecTran.y = 0.0;
}
if(rotate==false){
transform.Translate(vecTran*Time.deltaTime);
}

}

//extra code
//transform.Translate (vel*Time.deltaTime);
//transform.Translate(randomDirection);
//Debug.Log(Time.deltaTime);
//transform.Translate(transform(randomDirection);



// var randomDirection = Random.insideUnitSphere * roamRadius;
//        randomDirection += transform.position;
//        NavMeshHit hit;
//        NavMesh.SamplePosition(randomDirection, out hit, roamRadius, 1);
//        Vector3 finalPosition = hit.position;       
//        _nav.destination = finalPosition;