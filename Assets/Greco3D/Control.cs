﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Control : MonoBehaviour {

    OutputManager output;
    public int curR, curT, priorCity, cityNum, numCities;
    public string trialType, curVidNav, taskAction, getTaskAction;
    public float getTimer;
    public bool taskOn, task_iti, task_trial, task_run_end, task_start, task_run_start, task_over;
    [SerializeField]List<City.Coords> coordsList = new List<City.Coords>();
    [SerializeField] List<string> curStoreList = new List<string>();
    [SerializeField] List<City.Run> runList = new List<City.Run>();
    [SerializeField] List<int> run_trial_order = new List<int>();
    PassiveNav pasNav;
    Timer timer;
    Trial trial;
    List<string> itiRespKeyList = new List<string>();
    List<float> itiRespTimeList = new List<float>();
    List<string> taskRespKeyList = new List<string>();
    List<float> taskRespTimeList = new List<float>();

    string respKey = "null";
    float respTime = 0f;
    int acc = 99;
    string itiRespKey;
    float itiRespTime;
    float trialStartTime = 0f;
    bool startTask = true;
    [SerializeField] GameObject panel;

    private void OnEnable()
    {
        EventManager.onStartTaskNav += StartRequest;
        EventManager.onStartTaskNav += InstructionsOff;
    }

    private void OnDisable()
    {
        EventManager.onStartTaskNav -= StartRequest;
        EventManager.onStartTaskNav -= InstructionsOff;
    }


    private void InstructionsOff()
    {
        panel.SetActive(false);
    }

    void StartRequest()
    {
        StartCoroutine(StartTask());
    }

    IEnumerator StartTask()
    {
        taskOn = false;
        task_iti = true;
        task_trial = true;
        task_run_end = true;
        task_start = true;
        task_run_start = true;
        task_over = true;

        yield return StartCoroutine(SetUpTaskType());
        yield return StartCoroutine(SetupComps());
        getTaskAction = "run_start";

    }

    void Update () {

        if (startTask)
        {

            if (Input.anyKeyDown){
                startTask = false;
                EventManager.StartTaskNav();
            }
        }

        TaskVariables();

        if (getTaskAction == "iti")
        {

            if (task_iti)
            {
                task_iti = false;
                task_trial = true;
                pasNav.StopTrial();
                trial.StartITI();
                StartCoroutine(NextTrialSetup());
            }
        }
        else if (getTaskAction == "trial")
        {
            GetTrialResponse();
            if (task_trial)
            {
                trialStartTime = timer.GetTime("task");
                task_trial = false;
                task_iti = true;
                pasNav.StartTrial();
                trial.StopITI();
            }
        }
        else if (getTaskAction == "start")
        {
            if (task_start)
            {
                Debug.Log("Start control");
                task_start = false;
                task_trial = true;
                trial.StartITI();
                StartCoroutine(NextTrialSetup());
            }

        }
        else if(getTaskAction == "run_end"){

         	if(task_run_end){
                print("hello");
        	task_run_end = false;
            StartCoroutine(RunEnd());
            }
        }

        else if(getTaskAction == "run_start"){

            if (task_run_start){
             task_run_start = false;
        	StartCoroutine(RunStart());
        	}						
        }
        else if(getTaskAction == "task_over"){
            if (task_over)
            {
                task_over = false;
                StartCoroutine(TaskOver());
            }
        }

    }

    IEnumerator RunStart()
    {
        City.Run run = runList[curR];
        run_trial_order =run.trials;
        yield return null;

        yield return StartCoroutine(trial.StartCountDown());
        Debug.Log("count down over");

        yield return StartCoroutine(timer.SetUpTime(Manager.config.iti_time, Manager.config.trial_time, Manager.config.numT));
        Debug.Log("timer setup");
        taskOn = true;
        yield return StartCoroutine(timer.StartRun());
        Debug.Log("start tun coroutine over");


        task_run_end = true;
        
    }

    IEnumerator RunEnd()
    {
        taskOn = false;

       yield return StartCoroutine(trial.RunBreak());
        
        curR += 1;
        if (curR < Manager.config.numR)
        {
            task_run_start = true;
            getTaskAction = "run_start";
            task_start = true;

        }
        else
        {
            getTaskAction = "task_over";
        }
    }

    IEnumerator SetupComps()
    {
        yield return StartCoroutine(CityConfig());
    }

    IEnumerator SetUpTaskType()
    {
        GameObject player = GameObject.Find("Player");
        pasNav = player.GetComponent(typeof(PassiveNav)) as PassiveNav;

        timer = GetComponent(typeof(Timer)) as Timer;
        trial = GetComponent(typeof(Trial)) as Trial;

        string subj = PlayerPrefs.GetString("subj_id");
        string fname = subj + "_" + Manager.config.version + "_output.txt";
        string dir = Manager.genBehav.BuildPath("Data","Nav", Manager.config.version);

        output = GetComponent(typeof(OutputManager)) as OutputManager;
        yield return null;
        output.Setup(dir,fname);
        output.AddLine("Global_trial_num","run_num", "trial_time","resp_key","resp_time",
            "trial_type","acc","currCity","priorCity","trialList","respList","curVidNav");

        //Load city stuff
        City city = new City(Manager.config.version);
        runList = city.runList;
        curStoreList = city.stores;
        coordsList = city.coordsList;
        numCities = city.coordsList.Count;
        yield return null;
    }

    IEnumerator NextTrialSetup()
    {
        if (curT < Manager.config.numT)
        {
            if(curT > 0)
            {
                LogOutput();
            }
     
            yield return new WaitForSeconds(0.5f);
            cityNum = run_trial_order[curT] - 1;

            if(curT == 0)
            {
                priorCity = 99;
            }
            else
            {
                priorCity = run_trial_order[curT - 1] - 1;
            }

            //response variables
            respKey = "null";
            respTime = 0f;
            taskRespKeyList.Clear();
            taskRespTimeList.Clear();
            itiRespKeyList.Clear();
            itiRespTimeList.Clear();


            //

            pasNav.SetupTrial(cityNum);

            var x = new List<float> ();
            var y = new List<float> ();

            x = coordsList[cityNum].x;
            y = coordsList[cityNum].y;


            for (int i = 0; i < curStoreList.Count; i++){
                Vector3 newPosition = GameObject.Find(curStoreList[i]).transform.position;

                newPosition.x = x[i];
                newPosition.z = y[i];
      
                GameObject.Find(curStoreList[i]).transform.position = newPosition;
            }
        }
    }

    IEnumerator TaskOver()
    {
        yield return StartCoroutine(trial.TaskOver());
        Manager.experiment.StartNextTask();
    }

    void TaskVariables()
    {
        if (taskOn)
        {
            getTaskAction = timer.GetAction();
            getTimer = timer.GetTime("trial");
            curT = timer.cntTrial;

            if (curT != 0)
            {
                priorCity = run_trial_order[curT - 1];
            }

            if (priorCity == cityNum)
            {
                trialType = "s";
            }
            else
            {
                trialType = "d";
            }
        }
    }

    IEnumerator CityConfig()
    {

        GameObject city = GameObject.Find("City");
        yield return null;

        //Remotes stores not used in task
        foreach (Transform child in city.transform)
        {

            if (!curStoreList.Contains(child.name))
            {

                Destroy(GameObject.Find(child.name));
            }
        }
        yield return null;
    }

    void LogOutput()
    {

        output.AddLine(curT.ToString(),curR.ToString(),trialStartTime.ToString(),
            respKey,respTime.ToString(),trialType,acc.ToString(),cityNum.ToString(),priorCity.ToString(),"itiTrialList","itiRespList",curVidNav);
    }


    void GetTrialResponse()
    {

        if (Input.GetKeyDown("left") || Input.GetKeyDown(KeyCode.Alpha1))
        {
            Debug.Log("left arrow key down");
            respKey = "s";
            respTime = timer.GetTime("task");
            taskRespKeyList.Add(respKey);
            taskRespTimeList.Add(respTime);
        }

        if (Input.GetKeyDown("right") || Input.GetKeyDown(KeyCode.Alpha2))
        {
            print("right arrow key down");
            respKey = "d";
            respTime = timer.GetTime("task");
            taskRespKeyList.Add(respKey);
            taskRespTimeList.Add(respTime);
        }
    }

    void GetITIResponse()
    {

        if (Input.GetKeyDown("left") || Input.GetKeyDown("KeyCode.Alpha1"))
        {
            Debug.Log("left arrow key down");
            itiRespKey = "<";
            itiRespTime = timer.GetTime("task");
            itiRespKeyList.Add(itiRespKey);
            taskRespTimeList.Add(itiRespTime);
        }

        if (Input.GetKeyDown("right") || Input.GetKeyDown(KeyCode.Alpha2))
        {
            print("right arrow key down");
            itiRespKey = ">";
            itiRespTime = timer.GetTime("task");
            itiRespKeyList.Add(itiRespKey);
            itiRespTimeList.Add(itiRespTime);
        }
    }


    //bool CheckInView(string objectName){
    //	bool inView;
    //	GameObject store = GameObject.Find(objectName);
    //    Renderer[] allChildren = store.GetComponentsInChildren(typeof(Renderer)) as Renderer[];
    //		foreach(Renderer i in allChildren){
    //			 if(i.isVisible){
    //			 inView =true;	 
    //			 }
    //			 else{
    //			 inView =false;
    //			 }	 
    //		}		
    //	return inView;
    //}

    //int countinview(List<string> stores)
    //{
    //    int cnt = 0;
    //    for (int i = 0; i < stores.Count; i++){
    //        cnt += i;
    //    }
    //    return cnt;
    //}

    //void getinviewlist(List<string> storeList)
    //{
    //    List<string> storesInView = new List<string>();
    //    foreach (string store in storeList)
    //    {
    //        if (CheckInView(store))
    //        {
    //            storesInView.Add(store);
    //        }
    //    }
    //}

}
