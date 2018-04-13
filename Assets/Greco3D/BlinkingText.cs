using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BlinkingText : MonoBehaviour {

    Text text;
    [SerializeField]float alpha;
  
    Color startColor = new Color();

    [SerializeField] bool fadein = true;
    [SerializeField] bool  fadeout = true;
    enum FadeText {FadeIn,FadeOut};
    [SerializeField] FadeText fadeText = FadeText.FadeIn;
    [SerializeField] bool fadeOn = true;

    void Start() {
        text = GetComponent<Text>();
        StartBlinking();
        Debug.Log(text.text);
        startColor = text.color;
//        color.a = 1;
//        text.color = color;

    }

    IEnumerator Blink()
    {

        while (true)
        {

//            color.a = 0f;
//            text.color = color;
            yield return CrossFadeAlphaCOR(text, 1f, .5f);
            yield return CrossFadeAlphaCOR(text, .2f, .5f);
            //            yield return new WaitForSeconds(1f);
            //            color.a = 1f;
            //            text.color = color;
            //            yield return new WaitForSeconds(1f);
        }
    }

         

    public void StartBlinking()
    {
        StopCoroutine("Blink");
        StartCoroutine("Blink");
    }
   public void StopBlinking()
    {   Debug.Log("stop blinkng");
        StopCoroutine("Blink");
        CrossFadeAlphaWithCallBack(text, 1f,0f);
    }

    void CrossFadeAlphaWithCallBack(Graphic img, float alpha, float duration)
    {
        StartCoroutine(CrossFadeAlphaCOR(img, alpha, duration));
    }

    IEnumerator CrossFadeAlphaCOR(Graphic img, float alpha, float duration)
    {
        
        Color currentColor = img.color;

        Color visibleColor = img.color;
        visibleColor.a = alpha;


        float counter = 0;

        while (counter < duration)
        {
            counter += Time.deltaTime;
            img.color = Color.Lerp(currentColor, visibleColor, counter / duration);
            yield return null;
        }

        //Done. Execute callback
//        action.Invoke();
//        print("cross fade");
    }
}
