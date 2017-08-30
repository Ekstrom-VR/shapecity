#pragma strict



function OnMouseEnter() {
gameObject.GetComponent.<GUIText>().color = Color.red;
}
	
	
		
function OnMouseExit() {
gameObject.GetComponent.<GUIText>().color = Color.white;
}


function OnMouseDown(){
	Application.LoadLevel("Greco3D_CE");
}


	
	




		
	