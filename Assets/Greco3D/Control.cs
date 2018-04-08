using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Control : MonoBehaviour {

    OutputManager output;
    public int curR, curT, priorCity, cityNum, numCities;
    public string trialType, curVidNav, taskAction, getTaskAction;
    public float getTimer;
    public bool taskOn, task_iti, task_trial, task_run_end, task_start, task_run_start;
    [SerializeField]List<City.Coords> coordsList = new List<City.Coords>();
    [SerializeField] List<string> curStoreList = new List<string>();
    [SerializeField] List<City.Run> runList = new List<City.Run>();
    [SerializeField] List<int> run_trial_order = new List<int>();
    PassiveNav pasNav;
    Timer timer;
    Trial trial;

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
        getTaskAction = "run_start";

    }

    void Update () {

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
                //output.Addline();
            }
        }
        else if (getTaskAction == "trial")
        {
            //output.GetTrialResponse();
            if (task_trial)
            {
                Debug.Log("Trial control");
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
        	task_run_end = false;
            RunEnd();
            }
        }

        else if(getTaskAction == "run_start"){

            if (task_run_start){
             print("start task");
             task_run_start = false;
        	StartCoroutine(RunStart());
        	}						
        }
        else if(getTaskAction == "task_over"){
            getTaskAction = "task_over..";
        	StartCoroutine(TaskOver());
        }

    }

    IEnumerator RunStart()
    {
        City.Run run = runList[curR];
        run_trial_order =run.trials;
        print("run_trial_order");

        yield return null;

        StartCoroutine(trial.StartCountDown());
        Debug.Log("finish countdown");

        yield return null;
        
        StartCoroutine(timer.SetUpTime(Manager.config.iti_time, Manager.config.trial_time, Manager.config.numT));

        Debug.Log("finish setup");

        StartCoroutine(timer.StartRun());
        Debug.Log("run ended");

        taskOn = true;
        Debug.Log("task on");
    }

    IEnumerator RunEnd()
    {
        taskOn = false;
        yield return null;
        
        StartCoroutine(trial.RunBreak());

        curR += 1;
        if (curR < Manager.config.numR)
        {
            task_run_start = true;
            getTaskAction = "run_start";
            task_run_end = true;
            task_start = true;

        }
        else
        {
            getTaskAction = "task_over";
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
        pasNav = player.GetComponent(typeof(PassiveNav)) as PassiveNav;

        timer = GetComponent(typeof(Timer)) as Timer;
        trial = GetComponent(typeof(Trial)) as Trial;

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
            yield return new WaitForSeconds(0.5f);
            cityNum = run_trial_order[curT] - 1;

            Debug.Log("setup city number" + cityNum);
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
        getTaskAction = "task_over..";
        yield return null;
        StartCoroutine(trial.TaskOver());
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
