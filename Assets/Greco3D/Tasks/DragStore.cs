using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Greco3D.UnityFramework.Tasks.MapDraw
{
    public class DragStore : MonoBehaviour
    {

        private Vector3 _screenPoint, _offset, _curScreenPoint, _curPosition;

        void OnMouseDown()
        {
            print("mouse down");
            _screenPoint = Camera.main.WorldToScreenPoint(gameObject.transform.position);
            _offset = gameObject.transform.position -
                     Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y,
                         _screenPoint.z));
        }

        void OnMouseDrag()
        {
            _curScreenPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, _screenPoint.z);
            _curPosition = Camera.main.ScreenToWorldPoint(_curScreenPoint) + _offset;
            transform.position = new Vector3(_curPosition.x, _curPosition.y, _curPosition.z);
        }

        

        void OnGUI()
        {
            GUIStyle style = new GUIStyle();

            if (MapDrawController.storeView)
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

    }
}
