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

	void Start () {
//		tasksS = tasks;

		if(startExperiment){
		StartTask();			
		}
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
		Debug.Log ("Quit requested");
		Application.Quit();
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
}