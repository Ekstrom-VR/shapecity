﻿#pragma strict
import System.IO;
import System.Collections.Generic;

	private var vars : Config;
	private var  path : String = "NavClipsFinalRand/";
	static var cityRoll =  new List.<VideoRoll>();
	private var control : Control;

	function Setup(){

	var config : GameObject = GameObject.Find("Config");
	vars = config.GetComponent(Config) as Config;
	control = GetComponent(Control) as Control;

	yield;
	yield StartCoroutine(Load());
	}
	
	function Load(){
		var numCities : int = control.numCities;
		var numVideos : int = vars.numVideos;
	
		//Read in navigation files
		for(var iC : int = 0; iC < numCities; iC++){

		   var videoList = new List.<VideoClip>();

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
			
			var videopath : String = path + vars.version + "_" + iC.ToString() + "/Position/position_" + iV.ToString() + ".txt";
	
		   	videoList.Add(new VideoClip(curPosNav,curRotNav,videopath));
//			print(videopath);
		}   
		cityRoll.Add(new VideoRoll(videoList));
		}
	yield;
	}

	function GetVideo(city : int): VideoClip{
		var videoRoll = cityRoll[city];
		var video : VideoClip = videoRoll.roll[0];
		videoRoll.roll.RemoveAt(0);
		cityRoll[city] = videoRoll;
		return video;
	}
