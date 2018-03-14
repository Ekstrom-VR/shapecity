#pragma strict

public class RandPosition
{
	public function RandPosition(origin : Transform, player : GameObject, rangeVal : float){
	  
	  var position: Vector3 = Vector3(Random.Range(-1 * rangeVal, rangeVal), 0, Random.Range(-1 * rangeVal, rangeVal));
	  player.transform.position = Vector3(origin.position.x,player.transform.position.y,origin.position.x) + position;

	  var rot = Vector3(0,0,0);
	  rot.y= Random.Range(0,360); 
	  player.transform.Rotate(rot);
	}
}