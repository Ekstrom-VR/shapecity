using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Montage : MonoBehaviour {

	private List<string> curStoreList= new List<string>();

	[SerializeField] int NumRuns = 1;
	private bool spaceUp = false;

	public void  Start (){
		ConfigureCity();
        StartCoroutine(StartMontage());
    }

    IEnumerator StartMontage()
    {
        yield return StartCoroutine(InstuctStart());
        Manager.menu.panelTask.SetActive(false);
        yield return StartCoroutine(RunMontage());
//        yield return StartCoroutine(InstructEnd());
//        Manager.menu.panelTask.SetActive(false);
        Manager.experiment.StartNextTask();
    }


    IEnumerator InstuctStart()
    {
        Manager.menu.SetupTaskPanel("Store preview", "Press any key to start");
        Manager.menu.panelTask.SetActive(true);
        while (!Input.anyKeyDown)
            yield return null;
    }

    IEnumerator InstructEnd()
    {
        Manager.menu.SetupTaskPanel("", "Press any key to advance");
        Manager.menu.panelTask.SetActive(true);
        while (!Input.anyKeyDown)
            yield return null;
    }

    IEnumerator RunMontage (){

		for( int i =0; i < NumRuns; i++){
			foreach(string store_name in curStoreList){
				print(store_name);
				float degrees = 180f;
				float Stime = .1f;
				float Rtime = 2f;
				float Etime = .1f;
				float rate = degrees/Rtime;
			    GameObject store = Instantiate(Resources.Load(store_name)) as GameObject;

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
	}

	public void  ConfigureCity (){															
		var city = new City(Manager.config.version);
		curStoreList = city.stores;
	}
}