#pragma strict

static var modules = new Array("Initials","Instructions","Task");
static var modNum : int = 0;


function Update(){


	if(modules[modNum] == "Initials"){
	var sl_initials : SL_initials_mask;
	sl_initials = GetComponent(SL_initials_mask);
	sl_initials.enabled = true;
	}

	else if(modules[modNum] == "Instructions"){
    var sl_instructs : SL_instructs_mask;
	sl_instructs = GetComponent(SL_instructs_mask);
	sl_instructs.enabled = true;
	}
	
	else if(modules[modNum] == "Task"){
    var sl_task : SL_task_mask;
	sl_task = GetComponent(SL_task_mask);
	sl_task.enabled = true;
	}
	
	

}





