using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Background : MonoBehaviour {

	private Image image;

	[SerializeField] GameObject background;
	private bool backgroundon;
	public float targetAlpha;
	public bool fadeMode = true;
	public float fadeTime = .3f;
	public 		Color curColor;
    public float alpha;

	void Awake () {
		image = background.GetComponent<Image>();
	    background.SetActive(false);
    }

    public void Active()
    {
        background.SetActive(true);
    }

    public void Inactive()
    {
        background.SetActive(false);
    }

    public void BackGroundOff () {

		if(backgroundon){
			backgroundon = false;
			if(fadeMode){
				FadeOut();
			}
			else 
			{	
				background.SetActive(false);
			}
		}
	}

	public void BackGroundOn() {
		if(!backgroundon){
			backgroundon = true;
			if(fadeMode){
				FadeIn();
			}
			else 
			{	
				background.SetActive(true);
			}
		}
	}

	void FadeOut(){
        print("fade out");
        image.CrossFadeAlpha( 0f, fadeTime, false );
	}

	void FadeIn(){
        print("Fade In");
        image.CrossFadeAlpha( 1f, fadeTime, false );
	}

}
