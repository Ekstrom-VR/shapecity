#pragma strict

function Start () {
// print the number of child objects
//	print(transform.childCount);
// Moves all transform children 10 units upwards
for (var child : Transform in transform) {

    
    
    //child.position += Vector3.up * 2.0;
  // Sets the position to be somewhere inside a circle
	// with radius 5 and the center at zero.
	var newPosition : Vector3 = Random.insideUnitCircle * 5;
	child.position.x += newPosition.x;
	child.position.z += newPosition.z;
	
	
    
}

}

function Update () {

}