using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Timer : MonoBehaviour {
    public string trialAction;
    public float stopWatch, timer,totalTime, itiTime, trialTime;
    public int cntTrial, numTrials;

    public float GetTime(string type)
    {
        float getTime = 0f;
        switch (type)
        {
         case "task":
            getTime = stopWatch;
            break;
        case "trial":
            getTime = timer;
            break;
        }
        return getTime;
    }

    public string GetAction()
    {
        return trialAction;
    }

    public IEnumerator SetUpTime(float iti, float trial, int numT)
    {
        itiTime = iti;
        trialTime = trial;
        totalTime = iti + trial;
        timer = totalTime;
        stopWatch = 0f;
        trialAction = "run_start";
        numTrials = numT;
        cntTrial = 0;
        yield return null;
    }

    IEnumerator StartRunClock()
    {
        while (true)
        {
            stopWatch += Time.deltaTime;
            yield return null;
        }
    }

    IEnumerator StartTimerITI()
    {
        timer = 0f;
        while (timer < itiTime)
        {
            timer += Time.deltaTime;
            yield return null;
        }
    }

    IEnumerator StartTimer(float time)
    {
        timer = 0f;
        while (timer < time)
        {
            timer += Time.deltaTime;
            yield return null;
        }
    }

    IEnumerator StartTimerTrial()
    {
        timer = 0f;
        while (timer < trialTime)
        {
            timer += Time.deltaTime;
            yield return null;
        }
    }

    IEnumerator TrialTimer()
    {
        trialAction = "trial";
        yield return StartCoroutine(StartTimerTrial());
       
        trialAction = "iti";
        cntTrial++;
        yield return StartCoroutine(StartTimerITI());
    }

    public IEnumerator StartRun()
    {
        trialAction = "start";
        StartCoroutine(StartRunClock());
        yield return StartCoroutine(StartTimer(2f));
        do
        {
            yield return StartCoroutine(TrialTimer());
        } while (cntTrial < numTrials);
        StopCoroutine(StartRunClock());
        trialAction = "run_end";
    }
}
