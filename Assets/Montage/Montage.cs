using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Montage : MonoBehaviour {

	private List<string> curStoreList= new List<string>();
	private bool monRunning= false;
	private GUIStyle style = new GUIStyle();

	string[] stages = {"Instructions", "Montage","End","Next"};

	private int cnt=0;
	private string curStage;
	private GameObject store;
	public int numRuns = 1;
	private bool spaceUp = false;
	public void  Start (){
		ConfigureCity();
		curStage=stages[cnt]; 
	}

	void  Update (){

		spaceUp = Input.GetKeyUp(KeyCode.Space);    

		if(spaceUp && !monRunning){
			StageChange();	
		}
	}

	IEnumerator RunMontage (){

		print("Run montage called");

		for( int i =0; i < numRuns; i++){
			foreach(string store_name in curStoreList){
				print(store_name);
				float degrees = 180f;
				float Stime = .1f;
				float Rtime = 2f;
				float Etime = .1f;
				float rate = degrees/Rtime;
				store = Instantiate(Resources.Load(store_name)) as GameObject;
				store.transform.position = new Vector3(0f,0f,0f);

				while(Stime > 0){
					Stime -= Time.deltaTime;
					yield return 0;
				}	
				while(Rtime > 0){
					Rtime -= Time.deltaTime;
					store.transform.Rotate(Vector3.up * Time.deltaTime*rate);
					yield return 0;
				}
				while(Etime > 0){
					Etime -= Time.deltaTime;
					yield return 0;
				}	


				Destroy(store); 	
			}

		}
		monRunning = false;
		StageChange();			
	}

	public void  OnGUI (){

		switch(curStage)
		{

		case "Instructions":

			string instructions1= "Study this presentation order";
			GUIStyle style1 = SetGUIStyle(40);
			Rect rect1= SetGUIRect(100f,50f,.5f,.1f);
			GUI.Label(rect1,instructions1,style1);

			GUIStyle style2= SetGUIStyle(20);
			string instructions2= "(Press spacebar to start)";
			Rect rect2= SetGUIRect(100f,50f,.5f,.9f);
			GUI.Label(rect2,instructions2,style2);
			break;

		case "Montage":

			break;

		case "End":


			string instructions3= "All done!";
			GUIStyle style3= SetGUIStyle(40);
			Rect rect3= SetGUIRect(100f,50f,.5f,.1f);
			GUI.Label(rect3,instructions3,style3);

			GUIStyle style4= SetGUIStyle(20);
			string instructions4= "(Press spacebar to continue)";
			Rect rect4= SetGUIRect(100f,50f,.5f,.9f);
			GUI.Label(rect4,instructions4,style4);
			break;  
		}


	}

	public void  StageChange (){																	//iterate stage index
		if(cnt <stages.Length-1){
			cnt++;

		}
		else{
			cnt =0;
		}

		curStage = stages[cnt];
		switch(curStage)
		{

		case "Instructions":

			break;

		case "Montage":

			if(monRunning==false){
				monRunning = true;
				StartCoroutine("RunMontage");
			}

			break;

		case "End":

			StopCoroutine("RunMontage");
			Destroy(store);
			monRunning = false;
			break;

		case "Next":

			Manager.experiment.LoadNextModule();
			break;
		}
	}

	GUIStyle SetGUIStyle ( int fontsize  ){

		style.fontSize = fontsize;
		style.normal.textColor = Color.white;
		style.alignment = TextAnchor.MiddleCenter;

		return style;
	}


	Rect SetGUIRect ( float buttonWidth  ,  float buttonHeight ,  float percW ,  float percH  ){															//Set GUIRect

		float screenWidth = (Screen.width * percW) - (buttonWidth * .5f);
		float screenHeight = (Screen.height * percH) - (buttonHeight*.5f);

		Rect rect= new Rect(screenWidth,screenHeight,buttonWidth,buttonHeight);
		return rect;
	}
		
	public void  ConfigureCity (){															
		City city = new City(Manager.config.version);
		curStoreList = city.stores;
	}
}