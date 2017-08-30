#pragma strict

function Start () {

}

function Update () {
	//var script : SelectionLogic;
	//script = GetComponent("SelectionLogic");
	//var script : SelectionLogic;
	//script = GetComponent(SelectionLogic);
	//Debug.Log(this.gameObject.transform.parent.gameObject);
	//Debug.Log(SelectionLogic.CurrSelection);
//	if (SelectStore.CurrSelect == this.gameObject.transform.parent.gameObject){
	if (SelectStore.currStoreSelect == this.gameObject){

	print('test inputtext');
	
		for (var c : char in Input.inputString) {
			// Backspace - Remove the last character
			if (c == "\b"[0]) {
				if (GetComponent.<GUIText>().text.Length != 0)
					GetComponent.<GUIText>().text = GetComponent.<GUIText>().text.Substring(0, GetComponent.<GUIText>().text.Length - 1);
			}
			// End of entry
			else if (c == "\n"[0] || c == "\r"[0]) {// "\n" for Mac, "\r" for windows.
				print ("User entered his name: " + GetComponent.<GUIText>().text);
			}
			// Normal text input - just append to the end
			else {
				GetComponent.<GUIText>().text += c;
			}
		}
	}
	
	
	
	
	
	
	}