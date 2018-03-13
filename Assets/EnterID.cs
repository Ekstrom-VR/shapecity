using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class EnterID : MonoBehaviour {

	public string subjectID;

	public void AdvanceLevel(){
		Experiment.LoadNextModule();
	}

	 public void GetID(){
		GameObject inputFieldGo = GameObject.Find("SubjectID");
		InputField inputFieldCo = inputFieldGo.GetComponent<InputField>();
		subjectID = inputFieldCo.text;
		PlayerPrefs.SetString("subj_id",subjectID);
		print(subjectID);
	}
}
