using System.Collections;
using System.Collections.Generic;
using UnityEngine;
 
public class MD_control : MonoBehaviour {

    public enum TaskType {GR,CE,PR,all};
    public TaskType taskType;
	public List<string> curStoreList;

    void Start () 
    {
		SetUpTaskType();	  
    }
  
	void SetUpTaskType()
	{
		
		if(taskType == TaskType.GR)
		{
		curStoreList = new List<string>() {"Bakery","Cell phones", "Gym", "Chinese Food", "Florist","Toy Store","Music Store", "Ice Cream", "Dentist"};
		}
		else if(taskType == TaskType.CE)
		{
        curStoreList = new List<string>() {"Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop"};
        }
        else if(taskType == TaskType.PR)
		{
        curStoreList = new List<string>() {"Book Store","Coffee Shop", "Craft Shop","1ST Bank"};		
	    }
		else if(taskType == TaskType.all)
        {
		curStoreList = new List<string>() {"New Store","Wall","Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop", "Music Store", "Ice Cream","Bakery","Cell phones", "Gym", "Chinese Food", "Florist","Costume Shop"};

		}
     }
}