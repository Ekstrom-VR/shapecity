#pragma strict

	
var ITI_time : float = 2.0;
var timer : float;



function Start()
{
timer = ITI_time;

}

function Update() 
{
	
	timer  -= Time.deltaTime;

    if(timer <= 0)
    {
	Application.LoadLevel("Greco3Dv2");
	}
}
	
	

