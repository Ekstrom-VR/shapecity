using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MapDrawDrag : MonoBehaviour {

    private Vector3 screenPoint, offset, curScreenPoint, curPosition;

    void OnMouseDown()
    {
        print("mouse down");
        screenPoint = Camera.main.WorldToScreenPoint(gameObject.transform.position);
        offset = gameObject.transform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
    }

    void OnMouseDrag()
    {
        curScreenPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z);
        curPosition = Camera.main.ScreenToWorldPoint(curScreenPoint) + offset;
        transform.position = new Vector3(curPosition.x, curPosition.y, curPosition.z);
    }

    GUIStyle style = new GUIStyle();
    void OnGUI()
    {
        Vector2 newPos = Camera.main.WorldToScreenPoint(this.transform.position);
        style.fontSize = 10;
        style.alignment = TextAnchor.UpperLeft;
        style.normal.textColor = Color.black;
        int buttonWidth = 5;
        int buttonHeight = 5;
        Rect buttonRect = new Rect(newPos.x, Screen.height - newPos.y + 20, buttonWidth, buttonHeight);
        GUI.Label(buttonRect, name, style);
    }

}
