#pragma strict
import System.IO;
import System.Collections.Generic;
	
static var cityPosList = new Array();
static var cityRotList = new Array();
static var cityVidList = new Array();
//static var cityVidList String = new List.<String>();
private var vars : Config;
var path : String = "NavClipsFinalRand/";
function Awake(){
var config : GameObject = GameObject.Find("Config");
vars = config.GetComponent(Config) as Config;
}
function Start() {

	//Setup variables
	var numCities : int = Control.numCities;
	var numVideos : int = vars.numVideos;
	cityPosList = new Array[numCities];
//	cityRotList = new Array[numCities];
//	cityVidList = new Array[numCities];
	var videoList = new List.<VideoClip>();
	var cityRoll =  new List.<VideoRoll>();

	//Read in navigation files
	for(var iC : int = 0; iC < numCities; iC++){
//		var posNavArray = new Array[numVideos];
//   	    var rotNavArray = new Array[numVideos];
//		var posNavArray = new List.<>();
//   	    var rotNavArray = new List.<>();

//		var vidArray = new List.<String>();            


		for(var iV : int = 0; iV < numVideos; iV++){
//		    var curPosNav = new Array();
			var curPosNav = new List.<Vector3>();
//			var curRotNav = new Array();
			var curRotNav = new List.<Quaternion>();
			
		  	var x : float;
			var y : float;
			var z : float;
			var w : float;
			var lineP : String = '';
			var lineR : String = '';
			var lineArray : String[];
		
		
//		print(path + vars.version + "_" + iC.ToString() + "/Position/position_" + iV.ToString() + ".txt");
		var readerPos : StreamReader = new StreamReader(path + vars.version + "_" + iC.ToString() + "/Position/position_" + iV.ToString() + ".txt");
		var readerRot : StreamReader = new StreamReader(path + vars.version + "_" + iC.ToString() + "/Rotation/rotation_" + iV.ToString() + ".txt");

	    
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
		
//		posNavArray[iV] = curPosNav;
//	    rotNavArray[iV] = curRotNav;

		var videopath : String = path + vars.version + "_" + iC.ToString() + "/Position/position_" + iV.ToString() + ".txt";
//	    vidArray[iV] = videopath;

//		var newVideo : VideoC= 
	   	videoList.Add(new VideoClip(curPosNav,curRotNav,videopath));
	}   
//		cityPosList[iC]=posNavArray;
//		cityRotList[iC]=rotNavArray;
//		cityVidList[iC]=vidArray;	   
//	}	
	cityRoll.Add(new VideoRoll(videoList));
	}	
}