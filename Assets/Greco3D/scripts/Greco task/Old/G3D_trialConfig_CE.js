#pragma strict

//City related
static var trial_list= new Array();
//stimList
var stimOrder_CE: StimOrder_CE;

function Start () {

	gameObject.AddComponent(StimOrder_CE);
	stimOrder_CE = GetComponent(StimOrder_CE);

	trial_list[0] = stimOrder_CE.run1;
	trial_list[1] = stimOrder_CE.run2;
	trial_list[2] = stimOrder_CE.run3;
	trial_list[3] = stimOrder_CE.run4;
	
}






