#pragma strict

// JavaScript
function OnGUI () {
    // Fixed Layout
//    GUI.Button (Rect (25,25,100,30), "I am a Fixed Layout Button");

    // Automatic Layout
    
    	var style1 : GUIStyle = new GUIStyle();
		var style2: GUIStyle = new GUIStyle();
	
		
		style1.normal.textColor = Color.green;
		style1.fontSize = 20;
        style1.alignment = TextAnchor.UpperLeft;
 
    
    
    if(GUILayout.Button ("Shape",style1)){
    Application.LoadLevel("ShapeMenu");
    }
    
    
    if(GUILayout.Button ("Montage",style1)){
    Application.LoadLevel("Montage");
    }
    
    if(GUILayout.Button ("Greco3D",style1)){
    Application.LoadLevel("MenuStart");
    }
   
    
    if(GUILayout.Button ("Maps",style1)){  
    Application.LoadLevel("MapDraw_store");
    }
}
