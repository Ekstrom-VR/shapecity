#pragma strict



static var currStoreSelect : GameObject = null;
static var storeSelected : boolean = false;
var currStore: GameObject;
var origColor : Color;
var childRends = new Array();

function Update() {


		if (Input.GetMouseButtonDown(0) && Input.GetKey(KeyCode.LeftControl)) {
		
			var hit: RaycastHit;
			var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			
			if (Physics.Raycast(ray, hit)) {
				if (hit.collider != null && storeSelected ==false){
						Input.ResetInputAxes();
				        currStore = currStoreSelect;
						storeSelected = true;
				        currStoreSelect = hit.collider.gameObject;
						print('Collider hit name: ' + hit.collider.gameObject);
						origColor = hit.collider.gameObject.GetComponent.<Renderer>().material.GetColor("_Color");
						print(origColor);
						
						
						
						
						childRends = currStoreSelect.GetComponentsInChildren(Renderer);
						
						for(var rend : Renderer in childRends){
						rend.material.color = Color.black;
						}
						
						hit.collider.gameObject.GetComponent.<Renderer>().material.color = Color.black;
//						hit.collider.gameObject.transform.localScale = hit.collider.gameObject.transform.localScale * 1.5;
						
						print("Transform.pos:" + hit.collider.gameObject.transform.position);
//						StoreSelect = true;

				}
			}
			
			
			
			

	}
	
	if ((Input.GetKey(KeyCode.Return) && storeSelected ==true)||(Input.GetMouseButtonDown(0) && storeSelected ==true)){
				        

						storeSelected = false;
						
						currStoreSelect.GetComponent.<Renderer>().material.SetColor("_Color",origColor);
						
						childRends = currStoreSelect.GetComponentsInChildren(Renderer);
						
						for(var rend : Renderer in childRends){
						rend.material.color = origColor;
						}
//						currStoreSelect.transform.localScale = currStoreSelect.transform.localScale /1.5;

	}
	
	
	//Destroy
	if(SelectStore.storeSelected){


    if (Input.GetKey(KeyCode.Backspace) && storeSelected ==true){
				        					
						Destroy(SelectStore.currStoreSelect);
						SelectStore.storeSelected= false;
						
	}

}
	
	
}
	
	
	