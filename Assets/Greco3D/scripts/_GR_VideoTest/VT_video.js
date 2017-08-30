#pragma strict
import System.IO;


var cnt: int = 0;
var pos : Vector3;
var positionText : TextAsset;
var positionArray = new Array();
var rotationArray = new Array();
var positionHold = new Array();
var rotationHold = new Array();
var lineP : String = '';
var lineR : String = '';
var lineT : String = '';
var lineArray : String[];
var x : float; 
var y : float;
var z : float;
var w : float;
var newPosition : Vector3;
var newRotation : Quaternion;


var timeText : GUIText;
var titleText : GUIText;

var time : float =0;
var vidCnt : int = 001;
var vidLength : float = 30;
var vidPause : float;

var position_output_file : String;
var rotation_output_file : String;
var output_folder : String;
var taskPause = false;


function Start () {

//Setup output folder
output_folder = "NavClips/" + VT_Control.task_type + "_" +  VT_Control.city_num + "_" + VT_Control.inputCode +"/";
System.IO.Directory.CreateDirectory(output_folder);

//Setup video length
vidPause = vidLength;

//Setup gui text stuff
timeText = GameObject.Find("TimeText").GetComponent.<GUIText>();
titleText = GameObject.Find("TitleText").GetComponent.<GUIText>();
titleText.text = VT_Control.task_type + "_" + VT_Control.city_num + "_" + VT_Control.inputCode + ": " + vidCnt;

	//Read uncut navigation files
	var readerPos : StreamReader = new StreamReader("Nav/" + VT_Control.task_type + "_" + VT_Control.city_num + "/" +VT_Control.inputCode+"/position.txt");
	var readerRot : StreamReader = new StreamReader("Nav/" + VT_Control.task_type + "_" + VT_Control.city_num + "/" +VT_Control.inputCode+"/rotation.txt");

	while(lineP != null){
		lineP  =readerPos.ReadLine();
		if(lineP !=null){
		lineArray = lineP.Split(',' [0]);
		x = parseFloat(lineArray[0]);
		y = parseFloat(lineArray[1]);
		z = parseFloat(lineArray[2]);
		positionArray.Add(new Vector3(x,y,z));
		}
	}

	while(lineR != null){
		lineR=readerRot.ReadLine();		
		if(lineR !=null){
		lineArray = lineR.Split(',' [0]);			
	 	x = parseFloat(lineArray[0]);	
		y = parseFloat(lineArray[1]);
		z = parseFloat(lineArray[2]);
		w = parseFloat(lineArray[3]);
		rotationArray.Add(new Quaternion(x,y,z,w));
		}
	}
			
						
	//Setup Output	
	SetupOutput();

}

function FixedUpdate() {


    //Update time text
	timeText.text = time.ToString("f1");
    
    
    //Cycle free navigation input
	if(cnt < positionArray.length && !taskPause){
	   time +=Time.deltaTime;
	   newPosition =  positionArray[cnt];
	   newRotation =  rotationArray[cnt];
//	   transform.position = Vector3.Lerp(transform.position ,newPosition , Time.deltaTime);
//     transform.rotation = Quaternion.Slerp( transform.rotation, newRotation, Time.deltaTime);
//       
       transform.position = newPosition;
       transform.rotation = newRotation;

	WriteOutput();
	cnt++;
	}
	
	
	if(time >= vidPause){
	
		taskPause = true;
	
		titleText.text = "Keep (Return) or \n Throw out (Delete)";
	 
	}
	
}
function Update(){


	  if(Input.GetKeyUp(KeyCode.Return) && taskPause)
		  {		
		    vidCnt++;
		    vidPause += vidLength;
		    SetupOutput();
		    taskPause = false;
		    titleText.text =  VT_Control.task_type + "_" + VT_Control.city_num + "_" + VT_Control.inputCode + ": " + vidCnt;
		    
		  }
	  if(Input.GetKeyUp(KeyCode.Backspace)&& taskPause)
	  	{
	  	
	  	print("esc");
 		  vidPause += vidLength;
 		  taskPause = false;
 		  titleText.text =  VT_Control.task_type + "_" + VT_Control.city_num + "_" + VT_Control.inputCode + ": " + vidCnt;
		}
}


function SetupOutput(){
	
	position_output_file = output_folder + "position_" +vidCnt + ".txt";
	rotation_output_file = output_folder + "rotation_" +vidCnt + ".txt";
	
	var newFile = System.IO.File.Create(position_output_file);
	newFile.Close();
	newFile = System.IO.File.Create(rotation_output_file);
	newFile.Close();
	
}

function WriteOutput(){
	var line : String;
	line = newPosition.x +','+ newPosition.y +',' + newPosition.z + "\n";
    System.IO.File.AppendAllText(position_output_file,line);
    line = newRotation.x +','+ newRotation.y +',' + newRotation.z +',' + newRotation.w + "\n";
    System.IO.File.AppendAllText(rotation_output_file,line);

}