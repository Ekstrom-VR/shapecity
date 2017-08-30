#pragma strict
import System.IO;
 
var line;
var player : GameObject;
var time : float = 0;;

function OnEnable() {


	System.IO.Directory.CreateDirectory("Nav/" + LM_Control.task_type +"_" +  LM_Control.city_num + "/" + LM_Control.inputTag +"/");
//	if(Task.curR==0){
	var newFile = System.IO.File.Create( "Nav/" + LM_Control.task_type +"_" +  LM_Control.city_num + "/" + LM_Control.inputTag +"/"+ "position.txt");
	newFile.Close();
	newFile = System.IO.File.Create( "Nav/" + LM_Control.task_type +"_" +  LM_Control.city_num + "/" + LM_Control.inputTag +"/" + "rotation.txt");
	newFile.Close();
//	newFile.Close();
//	}
//	
}

function Start(){

player = GameObject.Find("Active Navigator");

}

function FixedUpdate () {
    
time += Time.deltaTime;
line = player.transform.position.x +','+ player.transform.position.y +',' + player.transform.position.z +',' + time + "\n";
System.IO.File.AppendAllText(  "Nav/" + LM_Control.task_type +"_" +  LM_Control.city_num + "/" +LM_Control.inputTag + "/" + "position.txt",line);
line = player.transform.rotation.x +','+ player.transform.rotation.y +',' + player.transform.rotation.z +',' + player.transform.rotation.w +',' + time + "\n";
System.IO.File.AppendAllText(  "Nav/" + LM_Control.task_type +"_" +  LM_Control.city_num + "/" + LM_Control.inputTag +"/" + "rotation.txt",line);
		
}








