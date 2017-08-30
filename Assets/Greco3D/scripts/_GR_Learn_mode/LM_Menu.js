#pragma strict

private var style_on : GUIStyle = new GUIStyle();
private var style_off: GUIStyle = new GUIStyle();
private var styleA :  GUIStyle = new GUIStyle();
private var styleB :  GUIStyle = new GUIStyle();
private var task_select : boolean = false;
private var city_select : boolean = false;
private var task_type : String = "select task";	
private var city_num_str  : String = "select city";
private var city_num : int;


function Update(){
LM_Control.task_type = task_type;

}


function OnGUI () {	
	//Setup styles
	var styleA :  GUIStyle = new GUIStyle();
    var styleB :  GUIStyle = new GUIStyle();
	styleA.normal.textColor = Color.blue;
	styleA.fontSize = 40;
	styleA.alignment = TextAnchor.MiddleCenter;
	styleB.normal.textColor = Color.blue;
	styleB.fontSize = 70;
    styleB.alignment = TextAnchor.MiddleCenter;
        
	//Present task title
	GUI.Label(Rect(Screen.width/2,10,100,50),"Learning Mode",styleB);


	// Vertical group of task type buttons
	GUILayout.BeginArea(Rect (10,20,100,500));
	
	if(GUILayout.Button ("CE")){
	
	task_type = "CE";
	task_select = true;
	
	}
	if(GUILayout.Button ("GR")){
	task_type = "GR";
	task_select = true;
	}
	
	if(GUILayout.Button ("GR_st5")){
	task_type = "GR_st5";
	task_select = true;
	}
	

	if(GUILayout.Button ("GR_st5_5000")){
	task_type = "GR_st5_5000";
	task_select = true;
	}
	
	if(GUILayout.Button ("GR_st5_6000")){
	task_type = "GR_st5_6000";
	task_select = true;
	}
	
	if(GUILayout.Button ("GR_st5_7000")){
	task_type = "GR_st5_7000";
	task_select = true;
	}
	if(GUILayout.Button ("GR_st13")){
	task_type = "GR_st13";
	task_select = true;
	}
	
	if(GUILayout.Button ("GR_st30")){
	task_type = "GR_st30";
	task_select = true;
	}
	
	if(GUILayout.Button ("GR_5000")){
	task_type = "GR_5000";
	task_select = true;
	}
	
	if(GUILayout.Button ("GR_st8_5000_ND")){
	task_type = "GR_st8_5000_ND";
	task_select = true;
	}
	
	if(GUILayout.Button ("GR_st9_5000_3c")){
	task_type = "GR_st9_5000_3c";
	task_select = true;
	}
	
	if(GUILayout.Button ("PR")){
	task_type = "PR";
	task_select = true;
	}
	
	if(GUILayout.Button ("PR_1000")){
	task_type = "PR_1000";
	task_select = true;
	}

	
	if(GUILayout.Button ("PR_2000")){
	task_type = "PR_2000";
	task_select = true;
	}
	GUILayout.EndArea();
	
	
	
		GUILayout.BeginArea (Rect (110,20,100,500));
		if(GUILayout.Button ("1")){
		city_num = 0;
		LM_Control.city_num = city_num;	
		city_num_str = "1";
		city_select = true;
		}
		if(GUILayout.Button ("2")){
		city_num = 1;
		LM_Control.city_num = city_num;	
		city_num_str = "2";
		city_select = true;
		}
		if(GUILayout.Button ("3")){
		city_num = 2;
		LM_Control.city_num = city_num;	
		city_num_str = "3";
		city_select = true;
		}
		if(GUILayout.Button ("4")){
		city_num = 3;
		LM_Control.city_num = city_num;	
		city_num_str = "4";
		city_select = true;
		}
		GUILayout.EndArea();
		
	
	
	
	
	if(city_select){
	GUILayout.BeginArea (Rect (210,20,100,100));
	if(GUILayout.Button ("Start")){			
		LM_Control.task_mode = "Get code";
		Destroy(this);
	}
	GUILayout.EndArea();
	
	}
		
	GUILayout.BeginArea (Rect (Screen.width/2,Screen.height*4/5,200,200));
	if(GUILayout.Button ("Switch to Test Mode")){			
		Application.LoadLevel("Greco3D_video_test");
	}
	GUILayout.EndArea();

	
	// Select task type
    GUI.Label(Rect(Screen.width / 2,Screen.height/3,50,50),task_type,styleA);
    GUI.Label(Rect(Screen.width / 2,Screen.height/2,50,50),city_num_str,styleA);
	
}

    

  
    
