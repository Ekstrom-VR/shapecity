using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Config_cs : MonoBehaviour {
    public string version = "Greco";
    public int numVideos = 100;//100
    public float trial_time = 20f;//20
    public int numR = 4;//4
    public int numT = 25;//25
    public bool feedBackOn  = false;
    public string preRun = "CountDown";//Either 'Task' or 'CountDown'
    public bool test_mood = false; 
    public bool initials = false;
    public int numCities;

    public string navPath = "NavClipsFinalRand";
    //Active baseline
    public float iti_time = 3;
    public float int_AB_time = .3f;
    public float ab_num_trials =3;
    public bool activeBL_On = false;
}