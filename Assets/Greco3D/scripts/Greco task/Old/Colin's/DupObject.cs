//using UnityEngine;
//using System.Collections;
//
//public class DupObject: MonoBehaviour
//{
//    public Object rocketPrefab;
//    public int identifier = 1;
//    
//    void Update ()
//    {
//        if(Input.GetButtonDown("Fire2"))
//        {
//            Object rocketInstance;
//            rocketInstance = Instantiate(rocketPrefab, SelectionLogic.CurrSelection.transform.position+ new Vector3(50,0,50), SelectionLogic.CurrSelection.transform.rotation) as GameObject;//+ new Vector3(50,0,50)
//			identifier = identifier +1;
//			rocketInstance.name = identifier.ToString();
//			//PrefabUtility.DisconnectPrefabInstance(rocketInstance);
//        }
//    }
//}