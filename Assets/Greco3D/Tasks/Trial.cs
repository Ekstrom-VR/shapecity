using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Trial : MonoBehaviour {

    public string numStr;
    public float timer;
    private Background background;
    private bool runBreak;
    public Text taskText;
    public Text accuracy;

    private void Start()
    {
        background = GetComponent(typeof(Background)) as Background;
        taskText.text = "";
        accuracy.text = "";
    }

    private void TextOn()
    {
         taskText.text = numStr;
    }

    public void TextOff()
    {
        taskText.text = "";
    }


    public IEnumerator StartCountDown()
    {
        float timer = 3.5f;
        //guiOn = true;
        TextOn();
        background.BackGroundOn();

        while (timer > 0f)
        {
            timer -= Time.deltaTime;

            if (timer < 0.5f)
            {
                taskText.text = "";
            }
            else if (timer > .5f)
            {
                taskText.text = "" + Mathf.Round(timer);
            }
            yield return null;
        }
    }

    public IEnumerator StartITI()
    {
        numStr = "+";
        background.BackGroundOn();
        yield return new WaitForSeconds(.3f);
        //guiOn = true;
        TextOn();
    }

    public IEnumerator StopITI()
    {
        //guiOn = false;
        TextOff();

        yield return new WaitForSeconds(.3f);
        background.BackGroundOff();
    }

    public IEnumerator RunBreak()
    {

        numStr = "Press SPACE to continue";
        //guiOn = true;
        TextOn();
        background.BackGroundOn();
        runBreak = true;
        accuracy.text = Manager.experiment.accPerc;
        yield return StartCoroutine(WaitForSpace());
        accuracy.text = "";
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

}
