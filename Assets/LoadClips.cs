using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
public class LoadClips : MonoBehaviour {

	void Start () {
		string path = "NavClipsFinalRand/CE_1/Position/";
//		List<string> clipPaths = new List<string> ();
//		DirectoryInfo info = new DirectoryInfo(path);
		foreach(string file in System.IO.Directory.GetFiles(path)) 
		{ 
			print (file);
		}
	}
}