#pragma strict


//function OnEnable () {
////Generate random start position
//
//RandPosition();
//}
//
//
//function Update () {
//    //occurs every ITI
//   if(G3D_cityMorph.trial_action == 'reset'){
//   G3D_cityMorph.trial_action ='task';
//   RandPosition();
//	}
//  }
// 

function RandPosition()
{
  var origin : Transform; 
  var player : GameObject;


  player = G3D_task.player;
  
  var position: Vector3 = Vector3(Random.Range(-15.0, 15.0), 0, Random.Range(-15.0, 15.0));
  player.transform.position = Vector3(origin.position.x,player.transform.position.y,origin.position.x) + position;

  var rot = Vector3(0,0,0);
  rot.y= Random.Range(0,360); 
  player.transform.Rotate(rot);
}


