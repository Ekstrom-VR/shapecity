#pragma strict

var csv : TextAsset; 
var output;
 var list = new Array();

{
	CSVReader.DebugOutputGrid( CSVReader.SplitCsvGrid(csv.text) ); 
	Debug.Log(CSVReader.DebugOutputGrid);
//	list =  CSVReader.DebugOutputGrid.split(","[0]);
}



