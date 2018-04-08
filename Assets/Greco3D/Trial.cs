using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Trial : MonoBehaviour {

    public string numStr;
    public float timer;
    private bool guiOn;
    private Background background;
    private bool runBreak;
    public Text taskText;

    private void Start()
    {
        background = GetComponent(typeof(Background)) as Background;
    }

    private void OnGUI()
    {
        if (guiOn)
        {
            
            GUIStyle style = new GUIStyle();
            int buttonWidth = 50;
            int buttonHeight = 20;
            style.normal.textColor = Color.white;
            style.fontSize = 75;
            style.alignment = TextAnchor.MiddleCenter;
            Rect rect = new Rect((Screen.width/2)-(buttonWidth/2),(Screen.height/2) - (buttonHeight / 2),buttonWidth,buttonHeight);
            GUI.Label(rect, numStr, style);
        }
    }

    public IEnumerator StartCountDown()
    {
        float timer = 3.5f;
        guiOn = true;
        background.BackGroundOn();

        while (timer > 0f)
        {
            timer -= Time.deltaTime;

            if (timer < 0.5f)
            {
                numStr = "";
            }
            else if (timer > .5f)
            {
                numStr = "" + Mathf.Round(timer);
            }
            yield return null;
        }
    }

    public void StartITI()
    {
        numStr = "+";
        guiOn = true;
        background.BackGroundOn();
        Debug.Log("Start iti");
    }

    public void StopITI()
    {
        guiOn = false;
        background.BackGroundOff();
        numStr = "";
        Debug.Log("Stop iti");
    }

    public IEnumerator RunBreak()
    {
        numStr = "Press SPACE to continue";
        guiOn = true;
        background.BackGroundOn();
        runBreak = true;
        yield return StartCoroutine(WaitForSpace());
        numStr = "";
    }
    IEnumerator WaitForSpace()
    {
        while (runBreak)
        {
            if (Input.GetKeyUp(KeyCode.Space))
            {
                Debug.Log("Spacebar pressed");
                runBreak = false;
            }
            yield return null;
        }
    }

    public IEnumerator TaskOver()
    {
        numStr = "Task over";
        guiOn = true;
        background.BackGroundOn();
        runBreak = true;
        yield return StartCoroutine(WaitForSpace());
        numStr = "";
    }

}
