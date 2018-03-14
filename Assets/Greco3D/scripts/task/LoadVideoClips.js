#pragma strict
import System.IO;

static var cityPosList = new Array();
static var cityRotList = new Array();
static var cityVidList = new Array();
//var vars = new VariablesClass();
var vars : Config;
var path : String = "NavClipsFinalCutRand/";

function Start() {


var config : GameObject = GameObject.Find("Config");
vars = config.GetComponent(Config) as Config;
 

	//Setup variables
	var numCities : int = Control.numCities;
	var numVideos : int = vars.numVideos;
	cityPosList = new Array[numCities];
	cityRotList = new Array[numCities];
	cityVidList = new Array[numCities];
	
	//Read in navigation files
	for(var iC : int = 0; iC < numCities; iC++){
		var posNavArray = new Array[numVideos];
   	    var rotNavArray = new Array[numVideos];
   	    var vidArray = new String[numVideos];
		for(var iV : int = 0; iV < numVideos; iV++){
		    var curPosNav = new Array();
			var curRotNav = new Array();
			
		  	var x : float;
			var y : float;
			var z : float;
			var w : float;
			var line : String = '';
			var lineArray : String[];
		
//		print(path + vars.version + "_" + iC.ToString() + "/Position/position_" + iV.ToString() + ".txt");
	
		// for StreamReader
//		var positionPath : String = path + vars.version + "_" + iC.ToString() + "/Position/position_" + iV.ToString() + ".txt";
//		var rotationPath : String = path + vars.version + "_" + iC.ToString() + "/Rotation/rotation_" + iV.ToString() + ".txt";

		var positionPath : String = path + vars.version + "_" + iC.ToString() + "/Position/position_" + iV.ToString();
		var rotationPath : String = path + vars.version + "_" + iC.ToString() + "/Rotation/rotation_" + iV.ToString();

		var readerPos: TextAsset = Resources.Load(positionPath )as TextAsset;
		var readerRot: TextAsset = Resources.Load(rotationPath )as TextAsset;

		var separator : char[] = ["\n"[0]];

		var posArray = readerPos.text.Split(separator);
	    var rotArray = readerRot.text.Split(separator);

		for(var i :int = 0; i < posArray.Length; i ++)
		{
			if(!String.IsNullOrEmpty(posArray[i])) {
				line  = posArray[i];
				lineArray = line.Split(',' [0]);
				
				curPosNav.Add(new Vector3(float.Parse(lineArray[0]),float.Parse(lineArray[1]),float.Parse(lineArray[2])));

				line = rotArray[i];
				lineArray = line.Split(',' [0]);
				curRotNav.Add(new Quaternion(float.Parse(lineArray[0]),float.Parse(lineArray[1]),float.Parse(lineArray[2]),float.Parse(lineArray[3])));
			}
		}

//		var readerPos : StreamReader = new StreamReader(positionPath);
//		var readerRot : StreamReader = new StreamReader(rotationPath);
	    
//			while(lineP != null){
//				lineP  =readerPos.ReadLine();
//				if(lineP !=null){
//				lineArray = lineP.Split(',' [0]);
//				x = parseFloat(lineArray[0]);
//				y = parseFloat(lineArray[1]);
//				z = parseFloat(lineArray[2]);
//				curPosNav.Add(new Vector3(x,y,z));
//				}
//			}
//
//			while(lineR != null){
//				lineR=readerRot.ReadLine();		
//				if(lineR !=null){
//				lineArray = lineR.Split(',' [0]);			
//			 	x = parseFloat(lineArray[0]);	
//				y = parseFloat(lineArray[1]);
//				z = parseFloat(lineArray[2]);
//				w = parseFloat(lineArray[3]);
//				curRotNav.Add(new Quaternion(x,y,z,w));
//				}
//			}
//		readerPos.Close();
//		readerRot.Close();
//		
		posNavArray[iV] = curPosNav;
	    rotNavArray[iV] = curRotNav;
	    vidArray[iV] = path + vars.version + "_" + iC.ToString() + "/Position/position_" + iV.ToString() + ".txt";
//	   
	    
		
	}
	   
	   
		cityPosList[iC]=posNavArray;
		cityRotList[iC]=rotNavArray;
		cityVidList[iC]=vidArray;

//		print('DB...City #: '+ iC+ ', Number of videos: ' +  posNavArray.length);
	   
	}				
}