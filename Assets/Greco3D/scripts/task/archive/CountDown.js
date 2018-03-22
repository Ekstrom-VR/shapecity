//#pragma strict
// 
//private var timer : float; 
//private var numStr : String;
//private var countdown_over : boolean;
// 
//function OnEnable(){
//var  countdownfrom: float = 3.5;
//var background = GameObject.Find("Background");
//background.SetActive(true);
//timer = countdownfrom;
//countdown_over = false;
//}
//
//function Update(){
//    timer -= Time.deltaTime;
//    if(timer < 0){
////	NextTaskStage(); 
//	countdown_over = true;   
//	}
// 	else if(timer < 0.5){
// 	numStr ="+";   
//	}
//    else if(timer > .5){
//    numStr =""+ Mathf.Round(timer);
//    }	
//}
//
//function OnGUI(){
//    var  style : GUIStyle = new GUIStyle();
//    var buttonWidth : int = 50;
//	var buttonHeight : int = 20;
//	var rect = new Rect();
//	style.normal.textColor = Color.white;
//	style.fontSize = 75;
//	style.alignment = TextAnchor.MiddleCenter;
//    rect =Rect((Screen.width /2)-(buttonWidth/2),(Screen.height/2) - (buttonHeight/2),buttonWidth,buttonHeight);
//	GUI.Label(rect,numStr,style);
//}
//  
//function GetCountDown():boolean{
//	return countdown_over;
//}
////function NextTaskStage(){
////Control.task_stage = "Task";
////this.enabled = false;
////}  	
//
