using UnityEngine;
using System.Collections.Generic;
using UnityEngine.SceneManagement;

public class Experiment : MonoBehaviour {

	public List<string> tasks = new List<string>();
	private int curModule = 0;
	public bool debug_mode;
    public Video video;
    public Video.Paths paths;

    void Start(){
		print(Application.persistentDataPath);
}
 

    public void LoadVideos()
    {
        video = new Video(Manager.config.navPath,Manager.config.version, Manager.config.numCities);
        VideoTest();
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

        Debug.Log(paths);

    }
    public void StartTask()
	{	
		SceneManager.LoadScene(tasks[curModule]);
		print("loading module " +curModule);	
	}

	 public void LoadLevel(string name){
		Debug.Log ("New Level load: " + name);
		SceneManager.LoadScene(name);
		print("load level" + name);
	}

	 public void QuitRequest(){
		#if UNITY_EDITOR
		UnityEditor.EditorApplication.isPlaying = false;
		#else
		Application.Quit();
		#endif
	}

	 public void LoadNextModule(){
		curModule ++;
		SceneManager.LoadScene(tasks[curModule]);
		print("loading module " +curModule + " " + tasks[curModule]);	
	}

	public void LoadExperiment(){
		curModule = 0;
		SceneManager.LoadScene("Experiment");
	}

	public void ReloadCurrentScene(){
		Scene scene = SceneManager.GetActiveScene();
		SceneManager.LoadScene(scene.name);
	}
		
	public void OnGUI(){
		if(debug_mode){
		if (GUILayout.Button("Debug-skip"))
			LoadNextModule();
		if (GUILayout.Button("Debug-exit"))
			QuitRequest();
	    }

    }

	public void DebugToggle(){
		debug_mode = !debug_mode;
	}
		
	public void SetUpTask(){

		switch (Manager.config.version) {
		case "Greco":
			Manager.config.numVideos = 100;
			Manager.config.trial_time = 20f;
			Manager.config.numR = 4;
			Manager.config.numT = 25;
            Manager.config.numCities = 3;
                LoadPaths();
                break;

		case "CE":
			Manager.config.numVideos = 100;
			Manager.config.trial_time = 20f;
			Manager.config.numR = 4;
			Manager.config.numT = 25;
            Manager.config.numCities = 4;
                LoadPaths();
                break;
		case "Practice":
			Manager.config.numVideos = 20;
			Manager.config.trial_time = 20f;
			Manager.config.numR = 1;
			Manager.config.numT = 10;
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
    }
}