#pragma strict

static var target_shape : String = "Sh5Res8_1";
static var lure_list = new Array("Sh5Res8_2","Sh5Res8_3","Sh5Res8_4","Sh5Res8_5");
private var path: String = "file:/Users/stokesjd/Projects/GrecoEnc/task/make_shapes/Shapes/";
var family_size : int = 100;
static var protoPath : String;
static var lurePaths = new Array();
static var targetPaths = new Array();

static var randPaths = new Array();
static var randTrialcode = new Array();
static var randAngle = new Array();



function OnEnable() {

//Get target shape path 
protoPath = path +  target_shape  + '/' + target_shape + '_proto.png';
print("Target path: " + protoPath);
//Get lure shape paths
var cnt1 : int = 0;
for(var item : String in lure_list){
	for(var ii: int = 1; ii < family_size + 1; ii++){
	
	if(ii < 10){
	lurePaths[cnt1] = path + item + '/' + item + '_0' + ii + '.png';
	}
	else{
		lurePaths[cnt1] = path + item + '/' +  item + '_' + ii + '.png';

	}
	cnt1++;
	}
}

cnt1 = 0;
for(ii = 1; ii < family_size + 1; ii++){

	if(ii < 10){
	targetPaths[cnt1] = path + target_shape + '/' + target_shape + '_0' + ii + '.png';
	}
	else{
		targetPaths[cnt1] = path + target_shape + '/' +  target_shape + '_' + ii + '.png';

	}
cnt1++;
}


print("lurepaths length: " + lurePaths.length);
print("targetpaths length: " + targetPaths.length);


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
     
     holdP = lurePaths[Random.Range(0,targetPaths.length)];
     }
     
     randPaths[ii] = holdP;
     randTrialcode[ii] = holdR;
     randAngle[ii] = Random.Range(0,360);

	}

}