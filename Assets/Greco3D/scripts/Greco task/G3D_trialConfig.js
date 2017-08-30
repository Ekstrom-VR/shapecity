#pragma strict

//City related
static var trial_list= new Array();
//stimList


function Start () {



   if(G3D_task.version == 'CE' || G3D_task.version == 'GR'){
    var stimOrder_CE: StimOrder_CE;
	gameObject.AddComponent(StimOrder_CE);
	stimOrder_CE = GetComponent(StimOrder_CE);

	trial_list[0] = stimOrder_CE.run1;
	trial_list[1] = stimOrder_CE.run2;
	trial_list[2] = stimOrder_CE.run3;
	trial_list[3] = stimOrder_CE.run4;
	}
	
	else if(G3D_task.version == 'PR'){
	var stimOrder_PR: StimOrder_PR;
	gameObject.AddComponent(StimOrder_PR);
	stimOrder_PR = GetComponent(StimOrder_PR);
	trial_list[0] = stimOrder_PR.run1;	
	}
	
}






