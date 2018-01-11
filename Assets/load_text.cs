using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class load_text : MonoBehaviour {

	// Use this for initialization

	private string folderName = "NavClipsFinalCutRand/";
	private string city = "GR_st9_5000_3c_0";

	public TextAsset pathTxt;
	void Start () {
		
		string filePath = folderName +city + "/Position/position_0";
		print(filePath);
		TextAsset pathTxt = Resources.Load(filePath)as TextAsset;
		print(pathTxt);



	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
