using UnityEngine;
using System.Collections;

public class Dup: MonoBehaviour
{
	public GameObject rocketPrefab;
	private int identifier = 0;
	public GameObject hand;

	public GameObject rocketInstance;

	void Update ()
	{

		  
		if(Input.GetButtonDown("Fire2"))
		{
			hand = GameObject.Find ("Map1");
			identifier = identifier +1;

			rocketInstance = Instantiate(rocketPrefab,rocketPrefab.transform.position + new Vector3(1,1,0),  Quaternion.identity) as GameObject;//+ new Vector3(50,0,50)
			rocketInstance.name = "Store" + identifier.ToString();
			rocketInstance.transform.parent = hand.transform;
		}
	}
}