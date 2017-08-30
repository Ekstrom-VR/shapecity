#pragma strict

// Shows how to read typing input from the keyboard
	// (eg. the user entering his name).
	// You need to attach this script to a GUIText object.
	function Update () {
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
	