#pragma strict

private var bgGuiText : GUITexture;
private var background : GameObject;
private var fadeMode : boolean = true;
public var backgroundon : boolean = false;

function Awake() {
	background = GameObject.Find("Background");
	bgGuiText = background.GetComponent(GUITexture);
}

function BackGroundOff() {
//print("background off");
	if(backgroundon){
	backgroundon = false;
	if(fadeMode){
	StartCoroutine("FadeOut");
	}
	else 
	{	
	background.SetActive(false);
	}
	}
}

function BackGroundOn() {
//	print("background on");
	if(!backgroundon){
	backgroundon = true;
	if(fadeMode){
	StartCoroutine("FadeIn");
	}
	else 
	{	
	background.SetActive(true);
	}
	}
}

function FadeOut(){
	while(bgGuiText.color.a >0){
	bgGuiText.color.a -= .01;
	yield new WaitForFixedUpdate ();	
	}
}

function FadeIn(){
	while(bgGuiText.color.a <.5){
	bgGuiText.color.a += .05;
	yield new WaitForFixedUpdate ();
	}
}