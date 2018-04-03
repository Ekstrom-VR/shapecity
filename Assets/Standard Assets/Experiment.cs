using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;


public class Experiment : MonoBehaviour {

	public List<string> tasks = new List<string>();
	private  int curModule = 0;
	public bool debug_mode;
//	private static Experiment instance;
	public bool startExperiment  = false;

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

	public void ReloadCurrentScene(){
		Scene scene = SceneManager.GetActiveScene();
		SceneManager.LoadScene(scene.name);
	}
		
	public void OnGUI(){
		if(debug_mode){
		if (GUILayout.Button("Debug-skip"))
			LoadNextModule();
	    }
    }

	public void SetUpTask(){

		switch (Manager.config.version) {
		case "Greco":
			Manager.config.numVideos = 100;
			Manager.config.trial_time = 20f;
			Manager.config.numR = 4;
			Manager.config.numT = 25;
			break;

		case "CE":
			Manager.config.numVideos = 100;
			Manager.config.trial_time = 20f;
			Manager.config.numR = 4;
			Manager.config.numT = 25;
			break;
		case "Practice":
			Manager.config.numVideos = 20;
			Manager.config.trial_time = 20f;
			Manager.config.numR = 1;
			Manager.config.numT = 10;
			break;
		}

	}
}