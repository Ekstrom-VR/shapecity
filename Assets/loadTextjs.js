#pragma strict

import System.IO;



function Start() {

var str : String = "1,2,3,4";

var separator : char[] = [","[0]];
var strArray  = str.Split(separator);
print(strArray);
print("done");
}