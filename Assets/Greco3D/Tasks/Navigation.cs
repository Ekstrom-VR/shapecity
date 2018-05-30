using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Greco3D.UnityFramework.Tasks
{
    public class Navigation : Task
    {
        private TaskState testState = TaskState.Inactive;
        OutputManager output;
        public int curR, curT, priorCity, cityNum, numCities;
        public string trialType, curVidNav, taskAction, getTaskAction;
        public float getTimer;
        public bool taskOn, task_iti, task_trial, task_run_end, task_start, task_run_start, task_over;
        [SerializeField] List<City.Coords> coordsList = new List<City.Coords>();
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
        bool startTask = true;

        [Header("Accuracy")] public string respKey = "null";
        public float respTime = 0f;
        public int acc = 0;
        public int accTotal = 0;
        public float accPerc;
        public int accTrialCnt = 0;

        [Header("ITI")] public string itiRespKey;
        public float itiRespTime;
        public float trialStartTime = 0f;

        [Header("UI")] [SerializeField] GameObject panel;

        private Background background;

        private void Start()
        {
            testState = TaskState.Started;
            print(testState);
            background = GetComponent(typeof(Background)) as Background;
            StartCoroutine(Task());
        }

        IEnumerator Task()
        {
           yield return StartCoroutine(InstuctStart());
           background.Active();
            StartCoroutine(StartTask());
        }

        IEnumerator InstuctStart()
        {
            Manager.menu.SetupTaskPanel("NAVIGATION TASK", "Press any key to start");
            Manager.menu.panelTask.SetActive(true);
            while (!Input.anyKeyDown)
                yield return null;
            Manager.menu.panelTask.SetActive(false);

        }

       private void InstructOff()
        {
            Manager.menu.SetupTaskPanel("", "");
        }

        IEnumerator InstructEnd()
        {
            Manager.menu.SetupTaskPanel("", "Press any key to advance");
            Manager.menu.panelTask.SetActive(true);
            while (!Input.anyKeyDown)
                yield return null;
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

        void Update()
        {

            TaskVariables();

            if (getTaskAction == "iti")
            {

                if (task_iti)
                {
                    task_iti = false;
                    task_trial = true;
                    pasNav.StopTrial();

                    StartCoroutine(trial.StartITI());
                    StartCoroutine(NextTrialSetup());
                    StartCoroutine(LogOutput());

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
                    StartCoroutine(trial.StopITI());
                }
            }

            else if (getTaskAction == "start")
            {
                if (task_start)
                {
                    Debug.Log("Start control");
                    task_start = false;
                    task_trial = true;
                    StartCoroutine(trial.StartITI());
                    StartCoroutine(NextTrialSetup());
                }

            }
            else if (getTaskAction == "run_end")
            {

                if (task_run_end)
                {
                    task_run_end = false;
                    StartCoroutine(RunEnd());
                }
            }

            else if (getTaskAction == "run_start")
            {

                if (task_run_start)
                {
                    task_run_start = false;
                    StartCoroutine(RunStart());
                }
            }
            else if (getTaskAction == "task_over")
            {
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
            run_trial_order = run.trials;
            yield return null;

            yield return StartCoroutine(trial.StartCountDown());

            yield return StartCoroutine(timer.SetUpTime(Manager.config.iti_time, Manager.config.trial_time,
                Manager.config.numT));
            taskOn = true;
            yield return StartCoroutine(timer.StartRun());

            task_run_end = true;

        }

        IEnumerator RunEnd()
        {
            taskOn = false;


            curR += 1;
            if (curR < Manager.config.numR)
            {
                yield return StartCoroutine(trial.RunBreak());
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
            string fname = subj + "_" + Manager.config.version + "_output.csv";
            //string dir = Manager.genBehav.BuildPath("Data", subj);

            output = GetComponent(typeof(OutputManager)) as OutputManager;
            yield return null;
            output.Setup(Manager.experiment.outputDir, fname);
            output.AddLine("Global_trial_num", "run_num", "trial_time", "resp_key", "resp_time",
                "trial_type", "acc", "currCity", "priorCity", "trialList", "respList", "curVidNav", "accuracy");

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
            yield return new WaitForSeconds(0.5f);

            curT = timer.cntTrial;
            if (curT < Manager.config.numT)
            {

                cityNum = run_trial_order[curT] - 1;

                if (curT == 0)
                {
                    priorCity = 99;
                    trialType = "null";
                }
                else
                {
                    accTrialCnt++;

                    priorCity = run_trial_order[curT - 1] - 1;
                    if (priorCity == cityNum)
                    {
                        trialType = "s";
                    }
                    else
                    {
                        trialType = "d";
                    }
                }


                //response variables
                respKey = "null";
                respTime = 0f;
                taskRespKeyList.Clear();
                taskRespTimeList.Clear();
                itiRespKeyList.Clear();
                itiRespTimeList.Clear();

                curVidNav = pasNav.SetupTrial(cityNum);

                var x = new List<float>();
                var y = new List<float>();

                x = coordsList[cityNum].x;
                y = coordsList[cityNum].y;


                for (int i = 0; i < curStoreList.Count; i++)
                {
                    Vector3 newPosition = GameObject.Find(curStoreList[i]).transform.position;

                    newPosition.x = x[i];
                    newPosition.z = y[i];

                    GameObject.Find(curStoreList[i]).transform.position = newPosition;
                }
            }
        }

        IEnumerator TaskOver()
        {
            background.Inactive();
            trial.TextOff();
            yield return StartCoroutine(InstructEnd());
            Manager.experiment.StartNextTask();
            InstructOff();

        }

        void TaskVariables()
        {
            if (taskOn)
            {
                getTaskAction = timer.GetAction();
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

        IEnumerator LogOutput()
        {
            if (respKey == trialType)
                acc = 1;
            else
                acc = 0;
            CalcAccuracy();
            Manager.experiment.accPerc = accPerc.ToString("F2");
            yield return new WaitForSeconds(.2f);

            output.AddLine(curT.ToString(), curR.ToString(), trialStartTime.ToString(),
                respKey, respTime.ToString(), trialType, acc.ToString(), cityNum.ToString(),
                priorCity.ToString(), "itiTrialList", "itiRespList", curVidNav, Manager.experiment.accPerc);

            accTotal = accTotal + acc;
        }


        void GetTrialResponse()
        {

            if (Input.GetKeyDown("left") || Input.GetKeyDown(KeyCode.Alpha1))
            {
                respKey = "s";
                respTime = timer.GetTime("trial");
                taskRespKeyList.Add(respKey);
                taskRespTimeList.Add(respTime);

            }

            if (Input.GetKeyDown("right") || Input.GetKeyDown(KeyCode.Alpha2))
            {
                respKey = "d";
                respTime = timer.GetTime("trial");
                Debug.Log(respTime);
                taskRespKeyList.Add(respKey);
                taskRespTimeList.Add(respTime);
            }
        }

        void CalcAccuracy()
        {
            accPerc = (float) accTotal / (float) (accTrialCnt);
            Debug.Log(accPerc);

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
}
