using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GenBehav : MonoBehaviour {

    public string BuildPath(params string[] list)
    {
        string sep = "/";
        string path = "";
        foreach (string i in list)
        {
            path = path + i + sep;
        }
        return path;
    }

}
