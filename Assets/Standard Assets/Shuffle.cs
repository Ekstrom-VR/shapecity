using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Shuffle : MonoBehaviour {

    static public List<City.Run> ShuffleList(List<City.Run> list)
    {
       for (int i = 0; i<list.Count; i++) {
             City.Run temp = list[i];
             int randomIndex = Random.Range(i, list.Count);
             list[i] = list[randomIndex];
             list[randomIndex] = temp;
         }
        return list;
    }

}
