using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MapDraw : MonoBehaviour 
{

	[SerializeField] GameObject panelInstructions;
    [SerializeField] GameObject panelMap;
    [SerializeField] GameObject panelEnd;
    bool taskStart = true;
    bool buildMap, taskOver;
    [SerializeField] List<string> curStoreList = new List<string>();
    [SerializeField] Text mapText;
    int storeCount = 0;
    [SerializeField] GameObject storePrefab;
    private GameObject curMap;
    public int curMapNum = 1;
    public int cityCount, mapCount;
    List<GameObject> mapList = new List<GameObject>();
    public static bool storeView = true;


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
        PanelEndToggle();
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
        else if(!taskOver)
        {
            DupMap();
            SwitchMaps();
            EndTask();
        }
        else if (taskOver)
        {
            NextTask();
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

    void PanelEndToggle()
    {
        bool active = panelEnd.activeSelf;
        panelEnd.SetActive(!active);
    }

    void StartTask()
    {

        City city = new City(Manager.config.version);

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



    void EndTask()
    {

        if (Input.GetKeyUp(KeyCode.Escape) && mapCount == cityCount)
        {
            storeView = false;
            Output();
            PanelEndToggle();
            taskOver = true;
        }

    }

    void Output()
    {
        string subj = PlayerPrefs.GetString("subj_id");
        string fname = subj + "_" + Manager.config.version + "_MD_output.csv";
        string dir = Manager.genBehav.BuildPath("Data", "Map", Manager.config.version);

        Manager.outputManager.Setup(dir, fname);
        Manager.outputManager.AddLine("Map_name", "Store_name", "Position_x", "Position_y", "Position_z");


        foreach (GameObject map in mapList)
        {
            foreach (Transform child in map.transform)
            {
                Manager.outputManager.AddLine(map.name, child.name, child.position.x.ToString(), 
                    child.position.y.ToString(), child.position.z.ToString());

            }
        }
    }
    void NextTask()
    {
        if (Input.anyKeyDown)
        {
            EventManager.StartTask();
            print("Mapdraw task over");

        }
    
    }
}

