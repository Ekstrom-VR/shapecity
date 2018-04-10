using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class MapDraw : MonoBehaviour 
{

	[SerializeField] GameObject panelInstructions;
    [SerializeField] GameObject panelMap;
    bool taskStart = true;
    bool buildMap;
    string taskType;
    [SerializeField] List<string> curStoreList = new List<string>();
    [SerializeField] Text mapText;
    int storeCount = 0;
    [SerializeField] GameObject storePrefab;
    private GameObject curMap;
    public int curMapNum = 1;
    public int cityCount, mapCount;
    List<GameObject> mapList = new List<GameObject>();


    private void OnEnable()
	{
		EventManager.onStartTaskMD += PanelInstruxToggle;
        EventManager.onStartTaskMD += PanelMapToggle;
        EventManager.onStartTaskMD += StartTask;
    }

	private void OnDisable()
	{
		EventManager.onStartTaskMD -= PanelInstruxToggle;
        EventManager.onStartTaskMD -= PanelMapToggle;
        EventManager.onStartTaskMD -= StartTask;

    }


    void Start()
    {
        PanelMapToggle();
    }


	void Update () 
	{

		if (taskStart) {
			if (Input.anyKeyDown) {
				taskStart = false;
				EventManager.StartTaskMD ();
			}
		}

        if (buildMap)
        {
            DupStore();

        }
        else
        {
            DupMap();
            SwitchMaps();
        }

    }

	void PanelInstruxToggle(){
        bool active = panelInstructions.activeSelf;
        panelInstructions.SetActive(!active);
	}

    void PanelMapToggle()
    {
        bool active = panelMap.activeSelf;
        panelMap.SetActive(!active);
    }

    void StartTask()
    {
        taskType = "Practice";
        //City city = new City(Manager.config.version);
        City city = new City(taskType);

        curStoreList = city.stores;
        cityCount = city.coordsList.Count;
        StartCoroutine(SetupMap());
    }

    IEnumerator SetupMap()
    {
        curMap = GameObject.Find("Map " + curMapNum.ToString());
        mapList.Add(curMap);
        mapText.text = "Build Map " + curMapNum.ToString();
        yield return new WaitForSeconds(.5f);
        buildMap = true;
        mapCount = 1;

    }



    void DupStore()
    {

        if (curStoreList.Count > 0)
        {
            if (Input.GetButtonUp("Fire2"))
            {
                GameObject storeInstance = Instantiate(storePrefab, storePrefab.transform.position + new Vector3(1, 1, 0), Quaternion.identity);
                storeInstance.name = curStoreList[storeCount];
                curStoreList.RemoveAt(storeCount);
                storeInstance.transform.parent = curMap.transform;
            }
        }
        else
        {
            buildMap = false;
        }

    }

    void DupMap()
    {
        if(Input.GetKeyDown(KeyCode.M) && curStoreList.Count == 0 && mapCount < cityCount)
        {
            mapCount++;
            GameObject newMap = Instantiate(curMap, curMap.transform.position, Quaternion.identity);
            newMap.name = "Map " + mapCount.ToString();
            mapList.Add(newMap);
            print(mapList.Count);
            //Inactivate prior Map
            curMap.SetActive(false);

            curMap = newMap;

            curMapNum = mapCount;

            mapText.text = "Build Map " + curMapNum.ToString();
        }
    }

    void SwitchMaps()
    {
        if(Input.GetKeyDown(KeyCode.LeftArrow) && mapCount > 1 && curMapNum > 1){

            curMapNum--;
            curMap.SetActive(false);
            curMap = mapList[curMapNum-1];
            curMap.SetActive(true);
            mapText.text = "Build Map " + curMapNum.ToString();

        }
        else if(Input.GetKeyDown(KeyCode.RightArrow) && curMapNum < mapCount)
        {

            curMapNum++;
            curMap.SetActive(false);
            curMap = mapList[curMapNum-1];
            curMap.SetActive(true);
            mapText.text = "Build Map " + curMapNum.ToString();

        }
    }
}

