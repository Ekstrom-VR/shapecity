using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Menu : MonoBehaviour {

	private string subjectID;
	private string[] taskList = {"","Practice","CE","Greco"};
	public Dropdown dropTask;
	public Dropdown dropTaskDebug;


	void Start(){
		SetupDropTask();
		SetupDropTaskDebug ();
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
		List<Dropdown.OptionData> m_Messages = new List<Dropdown.OptionData>();
		Dropdown.OptionData newData;
		dropTask.ClearOptions ();
		dropTask.captionText.text = "Task type";

		foreach (string i in taskList) {
 			print (i);
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

	public void SetupDropTaskDebug(){
		List<Dropdown.OptionData> m_Messages = new List<Dropdown.OptionData>();

		Dropdown.OptionData newData;

		dropTaskDebug.ClearOptions ();

		dropTaskDebug.captionText.text = "Module";

		//Add blank
		newData = new Dropdown.OptionData
		{
			text = ""
		};
		m_Messages.Add (newData);

		//Add scenes
		int sceneCount = UnityEngine.SceneManagement.SceneManager.sceneCountInBuildSettings;

		for( int i = 0; i < sceneCount; i++ )
		{
			newData = new Dropdown.OptionData
			{
				text = System.IO.Path.GetFileNameWithoutExtension( UnityEngine.SceneManagement.SceneUtility.GetScenePathByBuildIndex( i ) )
			};
				
			m_Messages.Add (newData);
		}


		foreach (Dropdown.OptionData message in m_Messages) {
			dropTaskDebug.options.Add (message);
		}
	}

	public void ConfigureTask(){
		//Keep the current index of the Dropdown in a variable
		int m_DropdownValue = dropTask.value;
		//Change the message to say the name of the current Dropdown selection using the value
		string m_Message = dropTask.options[m_DropdownValue].text;

		Manager.config.version= m_Message;
		Manager.experiment.SetUpTask();
	}

	public void ConfigureTaskDebug(){
		//Keep the current index of the Dropdown in a variable
		int m_DropdownValue = dropTaskDebug.value;
		//Change the message to say the name of the current Dropdown selection using the value
		string m_Message = dropTaskDebug.options[m_DropdownValue].text;

		print(m_Message);
		Manager.experiment.LoadLevel(m_Message);

	}
}