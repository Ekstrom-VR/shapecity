#pragma strict

	private var screenPoint : Vector3 ;
	private var offset : Vector3;
	public var gridSize : float;
	public var storeName : String;
	var curScreenPoint : Vector3 ;
	var curPosition : Vector3;
		
	function OnMouseDown()
	{ 
	 print("mouse down");
		screenPoint = Camera.main.WorldToScreenPoint(gameObject.transform.position);
		offset = gameObject.transform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
	}
	
	function OnMouseDrag() 
	{  
		curScreenPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z);
		
		curPosition = Camera.main.ScreenToWorldPoint(curScreenPoint) + offset;
//		transform.position = new Vector3(curPosition.x, transform.position.y, (float)Math.Round(curPosition.z/gridSize)*gridSize);
		transform.position = new Vector3(curPosition.x,curPosition.y,curPosition.z);
	}