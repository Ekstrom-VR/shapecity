#pragma strict

var bgGuiText : GUITexture;
var background : GameObject;
var fadeMode : boolean = true;

function Awake() {
	background = GameObject.Find("Background");
	bgGuiText = background.GetComponent(GUITexture);
}

function BackGroundOff() {

	if(fadeMode){
	StartCoroutine("FadeOut");
	}
	else 
	{	
	background.SetActive(false);
	}
}

function BackGroundOn() {

	if(fadeMode){
	StartCoroutine("FadeIn");
	}
	else 
	{	
	background.SetActive(true);
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