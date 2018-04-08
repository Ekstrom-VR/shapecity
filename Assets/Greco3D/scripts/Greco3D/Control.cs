using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Control : MonoBehaviour {

    OutputManager output;
    int curR, curT, priorCity, cityNum, numCities;
    string trialType, curVidNav, taskAction, get_task_action;
    bool taskOn, task_iti, task_trial, task_run_end, task_start, task_run_start;
    List<City.Coords> coordsList = new List<City.Coords>();
    List<string> curStoreList = new List<string>();
    List<City.Run> runList = new List<City.Run>();
    List<int> run_trial_order = new List<int>();

    void Start () {
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

        StartCoroutine(SetUpTaskType());
        yield return null;
        StartCoroutine(SetupComps());
        yield return null;
        get_task_action = "run_start";
    }

	void Update () {

        TaskVariables();

        if (get_task_action == "iti")
        {

            if (task_iti)
            {
                task_iti = false;
                task_trial = true;
                //pasNav.StopTrial();
                //trial.StartITI();
                NextTrialSetup();
                //output.Addline();
            }
        }
        else if (get_task_action == "trial")
        {
            //output.GetTrialResponse();
            if (task_trial)
            {
                task_trial = false;
                task_iti = true;
                //pasNav.StartTrial();
                //trial.StopITI();
            }
        }
        else if (get_task_action == "start")
        {
            if (task_start)
            {
                task_start = false;
                task_trial = true;
                //trial.StartITI();
                NextTrialSetup();
            }

        }
        else if(get_task_action == "run_end"){
         	if(task_run_end){
        	task_run_end = false;
            RunEnd();
            }
        }

        else if(get_task_action == "run_start"){
        	if(task_run_start){
        	task_run_start = false;
        	RunStart();
        	}						
        }
        else if(get_task_action == "task_over"){
        	get_task_action = "task_over..";
        	StartCoroutine(TaskOver());
        }

    }

    IEnumerator RunStart()
    {
        City.Run run = runList[curR];
        run_trial_order =run.trials;
        print("run_trial_order");

        yield return null;

        //StartCoroutine(trial.StartCountDown());

        yield return null;
        
        //StartCoroutine(timer.SetUpTime(vars.iti_time, vars.trial_time, vars.numT));
        //timer.StartRun();

        taskOn = true;
    }

    IEnumerator RunEnd()
    {
        taskOn = false;
        yield return null;
        
        //StartCoroutine(trial.RunBreak());

        curR += 1;
        if (curR < Manager.config.numR)
        {
            task_run_start = true;
            get_task_action = "run_start";
            task_run_end = true;
            task_start = true;

        }
        else
        {
            get_task_action = "task_over";
        }
    }

    IEnumerator SetupComps()
    {
        StartCoroutine(CityConfig());
        yield return null;
    }

    IEnumerator SetUpTaskType()
    {
        GameObject player = GameObject.Find("Player");
        PassiveNavC pasNav = player.GetComponent(typeof(PassiveNavC)) as PassiveNavC;

        //timer = GetComponent(typeof(Timer)) as Timer;
        //trial = GetComponent(typeof(Timer)) as Trial;

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
        if (curt < Manager.config.numT)
        {
            yield return WaitForSeconds(0.5);
            citynum = run_trial_order[curt] - 1;

            debug.log("setup city number" + citynum);
            pasnav.setuptrial(citynum);

            var x = new list.< float > ();
            var y = new list.< float > ();



            x = coordslist[citynum].x;
            y = coordslist[citynum].y;

            reposition control.curstorelist
            for (var i : int = 0; i < curstorelist.count; i++){
                gameobject.find(curstorelist[i]).transform.position.x = x[i];
                gameobject.find(curstorelist[i]).transform.position.z = y[i];
            }
        }
    }

    IEnumerator TaskOver()
    {
        get_task_action = "task_over..";
        yield return null;
        //StartCoroutine(trial.TaskOver());
        GameObject expObj = GameObject.Find("Experiment");
        Experiment expScript = expObj.GetComponent("Experiment") as Experiment;
        expScript.StartNextTask();
    }

    void TaskVariables()
    {
        if (taskOn)
        {
            //get_task_action = timer.getaction();
            //get_timer = timer.gettime("trial");
            //curT = timer.cnt_trial;
            //curvidnav = pasnav.cityvidtrial as string;

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
        //yield return null;

        //for (int store = 0; store < curStoreList.Count; store++){
        //    storeList.Add(curStoreList[store]);
        //}
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
