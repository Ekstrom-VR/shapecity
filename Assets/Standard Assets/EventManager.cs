using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EventManager : MonoBehaviour {
    public delegate void StartTaskDelegate();
    public static StartTaskDelegate onStartTask;

    public delegate void EndTaskDelegate();
    public static EndTaskDelegate onEndTask;

    public static void StartTask()
    {
        if (onStartTask != null)
            onStartTask();
    }

    public static void EndTask()
    {
        if (onEndTask != null)
            onEndTask();
    }
}
