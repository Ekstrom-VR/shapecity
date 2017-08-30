#pragma strict
import System;
import System.IO;


private var cnt: int = 0;
private var pos : Vector3;
private var positionText : TextAsset;
private var positionArray = new Array();
private var rotationArray = new Array();
private var vidTitle : String;
private var positionHold = new Array();
private var rotationHold = new Array();
private var lineP : String = '';
private var lineR : String = '';
private var lineT : String = '';
private var lineArray : String[];
private var x : float; 
private var y : float;
private var z : float;
private var w : float;
private var newPosition : Vector3;
private var newRotation : Quaternion;


private var timeText : GUIText;
private var titleText : GUIText;

private var time : float =0;
private var outVidCnt : int = 0;


private var loadVid : boolean = false;
private var taskPause : boolean;
private var allVidsLoaded :boolean = false;

private var position_output_file : String;
private var rotation_output_file : String;


private var input_folder : String;
private var output_folder : String;



//list of position paths and rotation paths
private var posNavArray = new Array();
private var rotNavArray = new Array();
private var cityVidList = new Array();

//other variables
private var numFiles : int;

function Start () {

//GetVidoes
input_folder = "NavClipsFinal/" + VTF_Control.task_type + "_" +  VTF_Control.city_num  +"/";
LoadVideoClips();

//Setup output folder
output_folder = "NavClipsFinalCut/" + VTF_Control.task_type + "_" +  VTF_Control.city_num  +"/";
System.IO.Directory.CreateDirectory(output_folder);
SetupOutput();

//Setup gui text stuff
timeText = GameObject.Find("TimeText").GetComponent.<GUIText>();
titleText = GameObject.Find("TitleText").GetComponent.<GUIText>();

//Setup first video

}

function FixedUpdate() {
    //Update time text
	timeText.text = time.ToString("f1");
       
    //Cycle free navigation input
    	if(!loadVid && allVidsLoaded){
    	 LoadVid();
    	}
		else if(cnt < positionArray.length && !taskPause && loadVid){
		   time +=Time.deltaTime;
		   newPosition =  positionArray[cnt];
		   newRotation =  rotationArray[cnt];
	    
	       transform.position = newPosition;
	       transform.rotation = newRotation;
		   WriteOutput();
		   cnt++;
		}

		else if(!taskPause && loadVid){
			taskPause = true;
			titleText.text = "Keep (Return) or \n Throw out (Delete)";
		}	



	  if(Input.GetKeyUp(KeyCode.Return) && taskPause)
		  {		
		    outVidCnt++;
		    SetupOutput();
		    cnt = 0;
		    loadVid= false;
		    taskPause = false;
		    
		  }
	  if(Input.GetKeyUp(KeyCode.Backspace)&& taskPause)
	  	{
	  	  SetupOutput();
	  	  cnt = 0;
	  	  loadVid= false;
 		  taskPause = false;
		}
}


function SetupOutput(){
	
	position_output_file = output_folder + "position_" +outVidCnt + ".txt";
	rotation_output_file = output_folder + "rotation_" +outVidCnt + ".txt";
	
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



function LoadVid(){
      
        if(posNavArray.length > 0){
		positionArray = posNavArray[0];
	    rotationArray = rotNavArray[0];
	    vidTitle = cityVidList[0];
	    posNavArray.RemoveAt(0);
	    rotNavArray.RemoveAt(0);
	    cityVidList.RemoveAt(0);
	    //Input vid title into gui text
	    titleText.text = vidTitle;
	    print('video loaded');
	    loadVid = true;
	    }
	    
}




function LoadVideoClips() {

	//CountFiles();
	var filePaths : String[] = System.IO.Directory.GetFiles(input_folder + '/Position/');
	numFiles = filePaths.length;
	//Setup variables
		posNavArray = new Array[numFiles];
   	    rotNavArray = new Array[numFiles];
   	    cityVidList = new String[numFiles];
   	    
   	    var vidArray = new String[numFiles];
		for(var iV : int = 0; iV < numFiles; iV++){
		    var curPosNav = new Array();
			var curRotNav = new Array();
			
		  	var x : float;
			var y : float;
			var z : float;
			var w : float;
			var lineP : String = '';
			var lineR : String = '';
			var lineArray : String[];
		
		
		print( input_folder + "Position/position_" + iV.ToString() + ".txt");
		cityVidList[iV] = input_folder + "Position/position_" + iV.ToString() + ".txt";
		var readerPos : StreamReader = new StreamReader(input_folder + "Position/position_" + iV.ToString() + ".txt");
		var readerRot : StreamReader = new StreamReader(input_folder +  "Rotation/rotation_" + iV.ToString() + ".txt");

	    
			while(lineP != null){
				lineP  =readerPos.ReadLine();
				if(lineP !=null){
				lineArray = lineP.Split(',' [0]);
				x = parseFloat(lineArray[0]);
				y = parseFloat(lineArray[1]);
				z = parseFloat(lineArray[2]);
				curPosNav.Add(new Vector3(x,y,z));
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
				curRotNav.Add(new Quaternion(x,y,z,w));
				}
			}
		readerPos.Close();
		readerRot.Close();
		
		posNavArray[iV] = curPosNav;
	    rotNavArray[iV] = curRotNav;
	    vidArray[iV] = input_folder + "/Position/position_" + iV.ToString() + ".txt";
	   
      yield;
	}
	
	
	allVidsLoaded = true;
	print('all videos loaded');

}



