using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Menu : MonoBehaviour {

	private string subjectID;
	private string[] taskList = {"Practice","CE","Greco"};
	List<Dropdown.OptionData> m_Messages = new List<Dropdown.OptionData>();
	public Dropdown dropTask;
	private Dropdown.OptionData newData;

	void Start(){
		SetupDropTask();
	}
	public void AdvanceLevel(){
		Manager.experiment.LoadNextModule();
	}

	 public void GetID(){
		GameObject inputFieldGo = GameObject.Find("SubjectID");
		InputField inputFieldCo = inputFieldGo.GetComponent<InputField>();
		subjectID = inputFieldCo.text;
		PlayerPrefs.SetString("subj_id",subjectID);
		print(subjectID);
	}

	public void SetupDropTask(){
		
		dropTask.ClearOptions ();
//		Dropdown.OptionData newData;
		dropTask.captionText.text = "Task type";
		foreach (string i in taskList) {
			print (i);
			newData = new Dropdown.OptionData ();
			newData.text = i;
			m_Messages.Add (newData);
		}
			
		foreach (Dropdown.OptionData message in m_Messages) {
			dropTask.options.Add (message);
		}
	}

	public void ConfigureTask(){
		//Keep the current index of the Dropdown in a variable
		int m_DropdownValue = dropTask.value;
		//Change the message to say the name of the current Dropdown selection using the value
		string m_Message = dropTask.options[m_DropdownValue].text;
		//Change the onscreen Text to reflect the current Dropdown selection
		Manager.config.version= m_Message;
		Manager.experiment.SetUpTask ();
	}


}