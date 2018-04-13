using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using System.Linq;

public class OutputManager : MonoBehaviour {
    private string _fpath, _newLineChar;

    private void Awake()
    {
        _newLineChar = System.Environment.NewLine;
    }

    public void Setup(string dataDir, string fname)
    {
        //Create output directory
        Directory.CreateDirectory(dataDir);

        //CreateOutputFile
        _fpath = dataDir + fname;
        Debug.Log(_fpath);
        var fs = File.Create(_fpath);
        fs.Close();
    }

    private string BuildLine(string[] varList)
    {
        var line = varList.Aggregate("", (current, var) => current + var + ", ");
        line = line + _newLineChar;
        return line;
    }
    public void AddLine(params string[] varList)
    {
        var line = BuildLine(varList);
        Debug.Log(line);
        File.AppendAllText(_fpath,line);

    }
}
