using UnityEngine;
using System.Collections;

public class Drag : MonoBehaviour {

	private Vector3 screenPoint;
	private Vector3 offset;
	public float gridSize;

	public string storeName;
	
	void OnMouseDown()
	{ 
		screenPoint = Camera.main.WorldToScreenPoint(gameObject.transform.position);
		offset = gameObject.transform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
	}
	
	void OnMouseDrag() 
	{  
		Vector3 curScreenPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z);
		
		Vector3 curPosition   = Camera.main.ScreenToWorldPoint(curScreenPoint) + offset;
//		transform.position = new Vector3(curPosition.x, transform.position.y, (float)Math.Round(curPosition.z/gridSize)*gridSize);
		transform.position = new Vector3(curPosition.x,curPosition.y,curPosition.z);

		print(transform.position);
	}
}


