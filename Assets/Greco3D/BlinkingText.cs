using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BlinkingText : MonoBehaviour {

    Text text;
    [SerializeField]float alpha;

    void Start() {
        text = GetComponent<Text>();
        StartBlinking();
        Debug.Log(text.text);
    }

    IEnumerator Blink()
    {
        bool fade = false;
        Color color = new Color();
        color.a = 0;
        text.color = color;
        while (true)
        {
 
            alpha = text.color.a;
            if (text.color.a <= .01 && !fade)
            {
                fade = true;
                text.CrossFadeAlpha(1f, .5f, false);
            }
            else if (text.color.a >= .9 && fade)
            {
                text.CrossFadeAlpha(0f, .5f, false);
            }

            yield return null;
        }
    }

    void StartBlinking()
    {
        StopCoroutine("Blink");
        StartCoroutine("Blink");
    }
    void StopBlinking()
    {
        StopCoroutine("Blink");
    }
}
