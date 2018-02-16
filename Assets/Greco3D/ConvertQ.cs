using UnityEngine;
using System.IO;

public class ConvertQ : MonoBehaviour {

	string path = "NavClipsFinalCutRand/";
	int numVideos = 100;
	int numCities = 3;

	void Start () {
		
		for (int iC = 0; iC < numCities; iC++){
			for (int iV = 0; iC < numVideos; iV++){

			string rotationPath  = path + "GR_st9_5000_3c" + "_" + iC.ToString() + "/Rotation/rotation_" + iV.ToString();
				Debug.Log(rotationPath);
			
        	}
        }
     path = "Assets/Greco3D/Resources/NavClipsFinalCutRand/GR_st9_5000_3c_0/Position/position_0.txt";

      StreamReader reader = new StreamReader(path); 
        Debug.Log(reader.ReadToEnd());
        reader.Close();

	}

}
