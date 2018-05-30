using UnityEngine;
using System.Collections.Generic;
using System.Collections;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class Experiment : MonoBehaviour {
    [Header("Settings")]
    [SerializeField] public bool DebugTour;
    public List<string> tasks = new List<string>();
	public int curModule = 0;
	public bool debug_mode;
    public Video video;
    public string outputDir;
    public Video.Paths paths;
	public Image black;
	public Animator anim;
    public string taskName;
    [SerializeField] GameObject background;
    [SerializeField] GameObject panel;
    public string accPerc;
    [SerializeField] GameObject fade;
    private bool _nextTask = true;

    [Header("Progress bar")]
    [SerializeField] GameObject loadingUI;
    [SerializeField] Slider loadingProgbar;
    [SerializeField] Text loadingText;
    AsyncOperation sceneAO;
    // the actual percentage while scene is fully loaded
    private const float LOAD_READY_PERCENTAGE = 0.9f;

    private void Awake()
    {
        fade.SetActive(true);
    }

    private void OnEnable()
    {
        EventManager.onStartTask += StartNextTask;
        EventManager.onStartTask += Manager.menu.HidePanel;
        EventManager.onEndExperiment += Manager.menu.ShowPanel;
        EventManager.onEndExperiment += Manager.experiment.LoadExperiment;
    }

    private void OnDisable()
    {
        EventManager.onStartTask -= StartNextTask;
        EventManager.onStartTask -= Manager.menu.HidePanel;
        EventManager.onEndExperiment -= Manager.menu.ShowPanel;
        EventManager.onEndExperiment -= Manager.experiment.LoadExperiment;
    }


    public void ChangeScene(string sceneName)
    {
        loadingUI.SetActive(true);
        loadingText.text = "LOADING...";
        StartCoroutine(LoadingSceneRealProgress(sceneName));
    }

    IEnumerator LoadingSceneRealProgress(string sceneName)
    {
        yield return new WaitForSeconds(1);
        sceneAO = SceneManager.LoadSceneAsync(sceneName);

        // disable scene activation while loading to prevent auto load
        sceneAO.allowSceneActivation = false;

        while (!sceneAO.isDone)
        {
            loadingProgbar.value = sceneAO.progress;

            if (sceneAO.progress >= LOAD_READY_PERCENTAGE)
            {
                loadingProgbar.value = 1f;
                loadingText.text = "PRESS SPACE TO CONTINUE";
                if (Input.GetKeyDown(KeyCode.Space))
                {
                    sceneAO.allowSceneActivation = true;
                }
            }
            Debug.Log(sceneAO.progress);
            yield return null;
        }
        Debug.Log(sceneAO.progress);
        yield return null;
        loadingUI.SetActive(false);
    }
 

    public void LoadVideos()
    {
        video = new Video(Manager.config.navPath,Manager.config.version, Manager.config.numCities);
        VideoTest();
    }

	public IEnumerator NavigationTestSetup(){
		Manager.config.version = "Practice";
        curModule = 1;
		yield return null;
		SetUpTask ();
		yield return null;
        EventManager.StartTask();
    }

	public void StartTest(){

		StartCoroutine ("NavigationTestSetup");
	}

    public void VideoTest()
    {
        print(video.TaskVideos.Count);
        Video.CityRoutes cityRoutes = video.TaskVideos[0];
        print(cityRoutes.list.Count);
        Video.Route route = cityRoutes.list[0];
        print(route.list.Count);
        Video.PosRot posrot = route.list[0];
        print(posrot.position);
        print(posrot.rotation);
    }

    public void PathsTest()
    {
        print(paths.TaskPaths.Count);
        List<Video.Paths.PosRotPath> cityPaths = paths.TaskPaths[0];
        print(cityPaths.Count);
        Video.Paths.PosRotPath posrotpath = cityPaths[0];
        print(posrotpath.posPath);
        print(posrotpath.rotPath);
    }


    public void LoadPaths()
	{
        paths = new Video.Paths(Manager.config.navPath, Manager.config.version, Manager.config.numCities);

    }
   

	 public void LoadTask(string name){
		Debug.Log ("New Level load: " + name);
		SceneManager.LoadScene(name);
	}

	 public void QuitRequest(){
		#if UNITY_EDITOR
		UnityEditor.EditorApplication.isPlaying = false;
		#else
		Application.Quit();
		#endif
	}
 

	public void LoadExperiment(){
		curModule = 0;
		SceneManager.LoadScene("Experiment");
        background.SetActive(true);
        panel.SetActive(true);

    }

	public void ReloadCurrentScene(){
		Scene scene = SceneManager.GetActiveScene();
		SceneManager.LoadScene(scene.name);
	}
		
	public void OnGUI(){
		if(debug_mode){
            if (GUILayout.Button("Debug-skip"))
                   EventManager.StartTask();
            if (GUILayout.Button("Debug-exit"))
			QuitRequest();
        }

    }

	public void DebugToggle(){
		debug_mode = !debug_mode;
	}
		
	public void SetUpTask(){

        //Setup subject directory string
        string subj = PlayerPrefs.GetString("subj_id");
        outputDir = Manager.genBehav.BuildPath("Data", subj);


        switch (Manager.config.version) {
		case "Greco":
			Manager.config.numVideos = 100;
			Manager.config.trial_time = 20f;
			Manager.config.numR = 4;
			Manager.config.numT = 16;
            Manager.config.numCities = 3;
                LoadPaths();
                break;

		case "CE":
			Manager.config.numVideos = 100;
			Manager.config.trial_time = 16;
            Manager.config.numR = 4;
			Manager.config.numT = 16;
            Manager.config.numCities = 4;
                LoadPaths();
                break;
		case "Practice":
			Manager.config.numVideos = 20;
			Manager.config.trial_time = 16f;
			Manager.config.numR = 1;
			Manager.config.numT = 10;
            Manager.config.iti_time = 2;
            Manager.config.numCities = 2;
                LoadPaths();
                break;
        case "":
            Manager.config.numVideos = 0;
            Manager.config.trial_time = 0;
            Manager.config.numR = 0;
            Manager.config.numT = 0;
            Manager.config.numCities = 0;
            break;
		}

	    if(DebugTour)
	    {
	        Manager.config.numR = 1;
	        Manager.config.numT = 2;
	        Manager.config.trial_time = 1f;
            Manager.config.iti_time = 1;
	    }
    }

    public void StartNextTask()
    {
        if(_nextTask)
            StartCoroutine(SetupNextTask());
    }


   private IEnumerator SetupNextTask()
    {
            taskName = tasks[curModule];
            print(taskName);
            anim.SetTrigger("fade");
            yield return new WaitUntil(() => black.color.a == 1);

            SceneManager.LoadScene(taskName);
            //ChangeScene(taskName);
            anim.SetTrigger("fade");
            background.SetActive(false);
            curModule++;
            yield return null;
             _nextTask = true;
    }
}
