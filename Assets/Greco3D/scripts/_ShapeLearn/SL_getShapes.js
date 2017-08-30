#pragma strict


var lure_list = new Array();
var first_lure : int = 2;
var last_lure : int = 100;
var lure_name : String = "Sh5Res8_";
private var path: String = "file:/Users/jdstokes/Desktop/Shapes/";
var family_size : int = 100;
static var protoPath : String;
static var lurePaths = new Array();
static var targetPaths = new Array();
static var randPaths = new Array();
static var randTrialcode = new Array();
static var randAngle = new Array();



function OnEnable() {


print("DB: " +  Application.dataPath);
//Get target shape path 
protoPath = path +  SL_task.curCityName  + '/' + SL_task.curCityName + '_proto.png';
print("Target path: " + protoPath);

//Build lure shape array

for(var sh : int = first_lure; sh < last_lure; sh++){
lure_list.Push(lure_name + sh);
}
//Get lure shape paths
var cnt1 : int = 0;
for(var item : String in lure_list){
	for(var ii: int = 1; ii < family_size + 1; ii++){
	
	if(ii < 10){
	lurePaths.Push(path + item + '/' + item + '_0' + ii + '.png');
	}
	else{
		lurePaths.Push(path + item + '/' +  item + '_' + ii + '.png');

	}
	cnt1++;
	}
}

cnt1 = 0;
for(ii = 1; ii < family_size + 1; ii++){

	if(ii < 10){
	targetPaths[cnt1] = path + SL_task.curCityName + '/' + SL_task.curCityName + '_0' + ii + '.png';
	}
	else{
		targetPaths[cnt1] = path + SL_task.curCityName + '/' +  SL_task.curCityName + '_' + ii + '.png';

	}
cnt1++;
}


//Create randomized trial list
var holdR;
var holdP;
var responseArray = new Array('targ','lure');
	for(ii=0; ii < 500; ii ++ ){
     
     holdR = responseArray[Random.Range(0,2)];
     if(holdR =='targ'){
     
     holdP = targetPaths[Random.Range(0,targetPaths.length)];
     
     }
     else if (holdR== 'lure'){
     
     holdP = lurePaths[Random.Range(0,lurePaths.length)];
     }
     
     randPaths[ii] = holdP;
     randTrialcode[ii] = holdR;
     randAngle[ii] = Random.Range(0,360);

	}

}