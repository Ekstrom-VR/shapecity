using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EventManager : MonoBehaviour {
    public delegate void StartTaskDelegate();
    public static StartTaskDelegate onStartTask;

    public delegate void StartTaskStrDelegate(string task);
    public static StartTaskStrDelegate onStartTaskStr;

    public delegate void EndExperimentDelegate();
    public static EndExperimentDelegate onEndExperiment;

    public delegate void StartTaskNavDelegate();
    public static StartTaskNavDelegate onStartTaskNav;

	public delegate void StartTaskMDDelegate();
	public static StartTaskMDDelegate onStartTaskMD;

    public static void StartTask()
    {
        if (onStartTask != null)
            onStartTask();
    }

    public static void StartTaskStr(string task)
    {
        if (onStartTaskStr != null)
            onStartTaskStr(task);
    }

    public static void EndExperiment()
    {
        if (onEndExperiment != null)
            onEndExperiment();
    }

    public static void StartTaskNav()
    {
        if (onStartTaskNav != null)
            onStartTaskNav();
    }

	public static void StartTaskMD()
	{
		if (onStartTaskMD != null)
			onStartTaskMD();
	}
}
