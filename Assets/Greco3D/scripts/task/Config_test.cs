using UnityEngine;
using System.Collections;
using System.Collections.Generic;//Allows us to use Lists. 
    

public class Config_test : MonoBehaviour
{
	public string version = "GR_st9_5000_3c";
	public string taskMode  =  "trial_compare"; 
	public int numVideos = 100;    
	public float trial_time = 20;
	public int numR = 4;
	public int numT = 25;
	public bool feedBackOn = false;
	public string preRun = "Task";//Either 'Task' or 'CountDown'
	public bool test_mode = true; 
	public bool present_city_info = false;
	public int pc_run = 0;
	public string bnavType = "passive_VC";
	public bool rotate_mode = true;
	public int rotate_type = 0;
	
	// Below variables are for active baseline
	public float iti_time = 5;
	public float int_AB_time = .3f;
	public int ab_num_trials = 3;
	public bool activeBL_On = true;

	public static Config_test instance = null;
	void Awake()
	{
	 	if (instance == null)
			instance = this;
		else if (instance != this)
			Destroy(gameObject);
		DontDestroyOnLoad(gameObject);
	}
}