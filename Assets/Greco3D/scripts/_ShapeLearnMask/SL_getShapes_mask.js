#pragma strict


private var lure_list = new Array();
private var family_size : int = 100;
private var path: String = "file:/Users/jdstokes/Desktop/Shapes/";
//private var path: String = "file:/Users/stokesjd/Projects/GrecoEnc/task/make_shapes/Shapes/";


static var protoPath : String;
static var lurePaths = new Array();
static var targetPaths = new Array();
static var randPaths = new Array();
static var randTrialcode = new Array();
static var randAngle = new Array();



function OnEnable() {

protoPath = path +  SL_task_mask.curCityName  + '/' + SL_task_mask.curCityName + '_proto.png';  					//Get target shape path 

lurePaths.Clear();																									//Clear array


																													
var cnt1 : int = 0;																									//Get lure shape paths

	for(var ii: int = 1; ii < family_size + 1; ii++){
	
	if(ii < 10){
					
		lurePaths.Push(path + SL_task_mask.curLureName + '/MasksSZ' + SL_task_mask.curMaskType +'/'
					+ SL_task_mask.curLureName + '_0' + ii + '.png');
	}
	else{
		lurePaths.Push(path + SL_task_mask.curLureName + '/MasksSZ' + SL_task_mask.curMaskType +'/'
					+ SL_task_mask.curLureName + '_' + ii + '.png');

	}
	cnt1++;
	}



//Get CurCity
cnt1 = 0;
for(ii = 1; ii < family_size + 1; ii++){

	if(ii < 10){
	targetPaths[cnt1] = path + SL_task_mask.curCityName + '/MasksSZ' + SL_task_mask.curMaskType +'/' + SL_task_mask.curCityName + '_0' + ii + '.png';
	}
	else{
		targetPaths[cnt1] = path + SL_task_mask.curCityName + '/MasksSZ' + SL_task_mask.curMaskType +'/'+  SL_task_mask.curCityName + '_' + ii + '.png';

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