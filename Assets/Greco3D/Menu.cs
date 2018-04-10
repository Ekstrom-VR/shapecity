using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Menu : MonoBehaviour {

	private string subjectID;
	private string[] taskList = {"Practice","CE","Greco"};
	public Dropdown dropTask;
    bool panelHidden = false;
    [SerializeField] GameObject panelMenu;
    public GameObject panelTask;




    private void OnEnable()
    {
        EventManager.onStartTask += HidePanel;
    }

    private void OnDisable()
    {
        EventManager.onStartTask -= HidePanel;
    }

    public void HidePanel()
    {
        panelHidden = !panelHidden;
        if (panelHidden)
        {
            panelMenu.SetActive(false);
        }
    }

    void Start(){
		SetupDropTask();
        panelTask.SetActive(false);
    }

    public void SetupTaskPanel(string top, string bottom)
    {
        Text[] textList;
        textList = panelTask.GetComponentsInChildren<Text>();
        foreach(Text text in textList)
        {
            if (text.name == "TextTop")
                text.text = top;
            else if (text.name == "TextBot")
                text.text = bottom;
        }
    }


	//public void AdvanceLevel(){
	//	Manager.experiment.StartNextTask();
	//}

	 public void GetID(){
		GameObject inputFieldGo = GameObject.Find("SubjectID");
		InputField inputFieldCo = inputFieldGo.GetComponent<InputField>() as InputField;
    
		subjectID = inputFieldCo.text;
		PlayerPrefs.SetString("subj_id",subjectID);
		print(subjectID);
	}

	public void SetupDropTask(){
		List<Dropdown.OptionData> m_Messages = new List<Dropdown.OptionData>();
		Dropdown.OptionData newData;
		dropTask.ClearOptions ();
		dropTask.captionText.text = taskList[0];

		foreach (string i in taskList) {
            newData = new Dropdown.OptionData
            {
                text = i
            };

			m_Messages.Add (newData);
		}
			
		foreach (Dropdown.OptionData message in m_Messages) {
			dropTask.options.Add (message);
		}
    }

    public void StartExperiment()
    {
        StartCoroutine(SetUpExperiment());
    }

	public IEnumerator SetUpExperiment(){
		//Keep the current index of the Dropdown in a variable
		int m_DropdownValue = dropTask.value;
		//Change the message to say the name of the current Dropdown selection using the value
		string m_Message = dropTask.options[m_DropdownValue].text;

		Manager.config.version= m_Message;
		Manager.experiment.SetUpTask();
        yield return null;
        EventManager.StartTask();
	}


}