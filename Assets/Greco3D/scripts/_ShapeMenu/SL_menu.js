#pragma strict


function OnGUI () {	
																		//Setup gui styleM
    var styleM : GUIStyle = new GUIStyle();								
	styleM.normal.textColor = Color.green;
	styleM.fontSize = 30;
    styleM.alignment = TextAnchor.UpperLeft;
    var styleT : GUIStyle = new GUIStyle();								
	styleT.normal.textColor = Color.white;
	styleT.fontSize = 40;
    styleT.alignment = TextAnchor.UpperCenter;
    var rect_title =  Rect((Screen.width *1/2),(Screen.height * 1/9),50,50);
   
    
    																	//Title
    GUI.Label(rect_title,'Shape',styleT);
    
																		//Setup version buttons   
    if(GUILayout.Button ("Mask V: A long",styleM)){
    PlayerPrefs.SetString('mask_version','A_long');
    Application.LoadLevel("ShapeLearnMask");
    }
    if(GUILayout.Button ("Mask V: A med",styleM)){
    PlayerPrefs.SetString('mask_version','A_med');
    Application.LoadLevel("ShapeLearnMask");
    }
  
    if(GUILayout.Button ("Mask V: A short",styleM)){
    PlayerPrefs.SetString('mask_version','A_short');
    Application.LoadLevel("ShapeLearnMask");
    }
    if(GUILayout.Button ("Mask V: B long",styleM)){ 
    PlayerPrefs.SetString('mask_version','B_long');
    Application.LoadLevel("ShapeLearnMask");
    }
    if(GUILayout.Button ("Mask V: B med",styleM)){
    PlayerPrefs.SetString('mask_version','B_med');
    Application.LoadLevel("ShapeLearnMask");
    }
    if(GUILayout.Button ("Mask V: B short",styleM)){
    PlayerPrefs.SetString('mask_version','B_short');
    Application.LoadLevel("ShapeLearnMask");
    }
    if(GUILayout.Button ("Mask V: test mode",styleM)){
    PlayerPrefs.SetString('mask_version','test');
    Application.LoadLevel("ShapeLearnMask");
    }
    if(GUILayout.Button ("Morph V: A",styleM)){
    PlayerPrefs.SetString('match_version','A');
    Application.LoadLevel("ShapeLearnMorph");
    }
    if(GUILayout.Button ("Morph V: B",styleM)){ 
    PlayerPrefs.SetString('match_version','B');
    Application.LoadLevel("ShapeLearnMorph");
    }
    if(GUILayout.Button ("Morph V: test mode",styleM)){ 
    PlayerPrefs.SetString('match_version','test');
    Application.LoadLevel("ShapeLearnMorph");
    }
    if(GUILayout.Button ("Exit",styleM)){
    Application.LoadLevel("MainMenu");
    }
}



//Quit application after pressing escape
	function Update () {
		if (Input.GetKey ("escape")) {
			Application.Quit();
		}
	}
