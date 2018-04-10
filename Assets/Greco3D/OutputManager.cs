using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class OutputManager : MonoBehaviour {
    public string fpath, newLineChar;

    private void Awake()
    {
        newLineChar = System.Environment.NewLine;

    }
    public void Setup(string dataDir, string fname)
    {
        //Create output directory
        Directory.CreateDirectory(dataDir);

        //CreateOutputFile
        fpath = dataDir + fname;
        Debug.Log(fpath);
        FileStream fs = File.Create(fpath);
        fs.Close();
    }

    private string BuildLine(string[] varList)
    {
        string line = "";
        foreach (string var in varList)
        {
            line = line + var + ", ";
        }
        line = line + newLineChar;
        return line;
    }
    public void AddLine(params string[] varList)
    {
        string line = BuildLine(varList);
        Debug.Log(line);
        File.AppendAllText(fpath,line);

    }
}
