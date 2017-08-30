#pragma strict


private var presTime : int = 2;
private var itiTime : int = 1;
private var i = 0;
public var presTrans : Transform;
private var storeChange : boolean = false;

function Start() {

InstantObject();
i++;

		
				
								

}

function Update(){

	

	
	
	if(i < KT_GetObject2.pres_list.length){
		if(storeChange){
		InstantObject();
		i++;
		}
	}

}


function InstantObject(){

	storeChange = false;
	var instance : GameObject = Instantiate(Resources.Load(KT_GetObject2.pres_list[i],GameObject));
	instance.transform.position = presTrans.position;

	yield WaitForSeconds(presTime);
	Destroy(instance);
	yield WaitForSeconds(.5);
	storeChange = true;
}