#pragma strict
import System.IO;
import System.Collections.Generic;
import Shuffle;

class VideoClips extends MonoBehaviour{

		private var  path : String = "NavClipsFinalRand/";
	static var cityRoll =  new List.<VideoClips.Roll>();
	function Setup(numCities : int, numVideos : int, version : String){

		for(var iC : int = 0; iC < numCities; iC++){

		   var videoList = new List.<VideoClips.Clip>();

			for(var iV : int = 0; iV < numVideos; iV++){
				var curPosNav = new List.<Vector3>();
				var curRotNav = new List.<Quaternion>();
				
			  	var x : float;
				var y : float;
				var z : float;
				var w : float;
				var lineP : String = '';
				var lineR : String = '';
				var lineArray : String[];
					
			var readerPos : StreamReader = new StreamReader(path + version + "_" + iC.ToString() + "/Position/position_" + iV.ToString() + ".txt");
			var readerRot : StreamReader = new StreamReader(path + version + "_" + iC.ToString() + "/Rotation/rotation_" + iV.ToString() + ".txt");
		    
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
			
			var videopath : String = path + version + "_" + iC.ToString() + "/Position/position_" + iV.ToString() + ".txt";
	
		   	videoList.Add(new Clip(curPosNav,curRotNav,videopath));
		}  
		 
		cityRoll.Add(new Roll(ShuffleList(videoList)));
		}
	yield;
	}

	function GetVideo(city : int): VideoClips.Clip{
		var videoRoll = cityRoll[city];
		var video : VideoClips.Clip = videoRoll.roll[0];
		videoRoll.roll.RemoveAt(0);
		cityRoll[city] = videoRoll;
		return video;
	}


	class Clip{
		var pos = new List.<Vector3>();
		var rot = new List.<Quaternion>();
		var path : String;
	
		public function Clip(pos:List.<Vector3>,rot:List.<Quaternion>,path : String){
			 this.pos = pos;
			 this.rot = rot;
			 this.path = path;
		}
	}

	class Roll{
		
		var roll = new List.<Clip>();
	
		public function Roll(roll:List.<VideoClips.Clip>){
			 this.roll = roll;
		}
	}
}