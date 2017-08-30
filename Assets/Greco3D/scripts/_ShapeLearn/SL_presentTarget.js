#pragma strict
//Loads instruction text, "Study"
//Loads target




public var t_load : WWW;
private var imgsize : int;

private var trial_code_arr = new Array();
private var trial_times = new Array();



private var t_dynamic_tx: Texture2D;


var changeImg : boolean = true;
var timer : float;






function OnEnable(){

    imgsize = Screen.width/3;
//    loadShape = GetComponent(LoadShape);
//    sl_output = GetComponent(SL_output);
//    Debug.Log("Beginning load at time: " + Time.time);
//	print("Width: " + Screen.width);
//    print("Height: " + Screen.height);    
//    print("Image size: " + imgsize);
    
    
    t_load = null;
    t_dynamic_tx = null;
    timer = SL_task.studytime;
    
}

function Update (){
 
 
    timer -= Time.deltaTime;
     
    var space_up =   Input.GetKeyUp(KeyCode.Space);
    var esc_up   =   Input.GetKeyUp(KeyCode.Escape);
    
    
    
	if(SL_task.testMode){
			if(space_up || timer < 0){
			NextTaskStage();
			}
	}
	else{
			if(space_up){
			NextTaskStage();
			}
		}
}



function OnGUI(){


////guiStyle specs
var style1 : GUIStyle = new GUIStyle();
style1.normal.textColor = Color.white;
style1.fontSize = 50;
style1.alignment = TextAnchor.MiddleCenter;
var buttonWidth : int = 50;
var buttonHeight : int = 20;
var rect1 =Rect((Screen.width / 2),Screen.height-(Screen.height/10),buttonWidth,buttonHeight);
var rect2 =Rect((Screen.width / 2),(Screen.height/10),buttonWidth,buttonHeight);


   
		if(t_load == null){
		t_load = new WWW(SL_getShapes.protoPath);  
//		print(SL_getShapes.protoPath);

		}
		else if(t_load.isDone && t_dynamic_tx == null){
		t_dynamic_tx = new Texture2D(1024, 1024);
		 t_load.LoadImageIntoTexture(t_dynamic_tx);
		 changeImg = false;
		}
		else {
		GUI.Label(rect2,"Study the shape",style1);
		GUI.Label(rect1,SL_task.curShapeName,style1);
		GUI.Label(new Rect(Screen.width* 1/2 - (imgsize/2), Screen.height*.55 - (imgsize/2), imgsize ,imgsize), t_dynamic_tx);
		
		

		}

  }
  
  
  
function NextTaskStage(){
SL_task.task_stage = "Test";
print('stage num:' + SL_task.stageNum);
this.enabled = false;
}  	

