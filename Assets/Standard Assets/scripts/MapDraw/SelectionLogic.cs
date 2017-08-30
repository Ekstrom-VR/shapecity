using UnityEngine;
using System.Collections;

public class SelectionLogic : MonoBehaviour {
	new public static GameObject CurrSelection;
	// Update is called once per frame
	void OnMouseDown () {

		Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		RaycastHit hit;
		// Casts the ray and get the first game object hit
		Physics.Raycast(ray, out hit);
		Debug.Log("This hit at " + hit.collider.gameObject.name );
		if (hit.collider.gameObject == this.gameObject){
			CurrSelection = this.gameObject;
			//print(CurrSelection);
		}

	}
	
}
