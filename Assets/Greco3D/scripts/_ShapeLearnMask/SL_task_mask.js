#pragma strict

//Inspector
var currentStage : String;

//Version/run setupt
private var targetShapes = new Array();
private var lureShapes = new Array();
private var levels = new Array();
static  var numShapes : float;

static  var numTrials : float;
static  var taskTime : float;
static  var itiTime : float;
static  var begTime : float;
static  var perCutOff : float;


static var task_stage : String = "Target";
static var task_stages = new Array("Target","Test","Performance","End");
static var stageNum : int = 0;
static var cityList = new Array();
static var lureList = new Array();
static var shapeNames = new Array();
static var maskList = new Array();
static var curLureName : String;


static var cntBL : int = 0;
static var curCityName : String;
static var curShapeName : String;
static var curMaskType : String;
static var curRun : int = 1;

var sl_presentTarget : SL_presentTarget_mask;
var getShapes : SL_getShapes_mask;
var sl_test : SL_test_mask;
var sl_perf : SL_perf_mask;
var sl_output : SL_output_mask;
var sl_end : SL_end_mask;

static var studytime = 1; 
static var testMode : boolean = false;



function Awake(){

																						//Establish version
	if(PlayerPrefs.GetString("mask_version") == 'A_long'){
	targetShapes = new Array("City2_NS5_FR9","City1_NS5_FR9");
	lureShapes = new Array("New_City2_NS5_FR8","New_City1_NS5_FR8");
	levels = new Array("3","4","5","6","7");
	numShapes = 1;
	numTrials = 20;//20
    taskTime = 4;//4
    itiTime  = 1.5;//1
    begTime = 2;//2
    perCutOff = .80;//.70
	}
	if(PlayerPrefs.GetString("mask_version") == 'A_med'){
	targetShapes = new Array("City2_NS5_FR9","City1_NS5_FR9");
	lureShapes = new Array("New_City2_NS5_FR8","New_City1_NS5_FR8");
	levels = new Array("3","4","5","6","7");
	numShapes = 1;
	numTrials = 20;//20
    taskTime = 3;//4
    itiTime  = 1;//1
    begTime = 2;//2
    perCutOff = .75;//.70
	
	}
	if(PlayerPrefs.GetString("mask_version") == 'A_short'){
	targetShapes = new Array("City2_NS5_FR9","City1_NS5_FR9");
	lureShapes = new Array("New_City2_NS5_FR8","New_City1_NS5_FR8");
	levels = new Array("3","4","5","6","7");
	numShapes = 1;
	numTrials = 20;//20
    taskTime = 2;//4
    itiTime  = 1;//1
    begTime = 2;//2
    perCutOff = .70;//.70
	
	}
	if(PlayerPrefs.GetString("mask_version") == 'B_long'){
	targetShapes = new Array("City9_NS5_FR9","City1_NS5_FR9");
	lureShapes = new Array("New_City9_NS5_FR8","New_City1_NS5_FR8");
	levels = new Array("3","4","5","6","7");
//	numShapes = 1;
	numTrials = 20;//20
    taskTime = 4;//4
    itiTime  = 1.5;//1
    begTime = 2;//2
    perCutOff = .80;//.70
	
	}
	if(PlayerPrefs.GetString("mask_version") == 'B_med'){
	targetShapes = new Array("City9_NS5_FR9","City1_NS5_FR9");
	lureShapes = new Array("New_City9_NS5_FR8","New_City1_NS5_FR8");
	levels = new Array("3","4","5","6","7");
//	numShapes = 1;
	numTrials = 20;//20
    taskTime = 3;//4
    itiTime  = 1;//1
    begTime = 2;//2
    perCutOff = .75;//.70
	}
	
   if(PlayerPrefs.GetString("mask_version") == 'B_short'){
	targetShapes = new Array("City9_NS5_FR9","City1_NS5_FR9");
	lureShapes = new Array("New_City9_NS5_FR8","New_City1_NS5_FR8");
	levels = new Array("3","4","5","6","7");
//	numShapes = 1;
	numTrials = 20;//20
    taskTime = 2;//4
    itiTime  = 1;//1
    begTime = 2;//2
    perCutOff = .70;//.70
	}
	if(PlayerPrefs.GetString("mask_version") == 'test'){

	targetShapes = new Array("City9_NS5_FR9","City1_NS5_FR9");
	lureShapes = new Array("New_City9_NS5_FR8","New_City1_NS5_FR8");
	levels = new Array("3","4","5","6","7");
//	numShapes = 1;
	numTrials = 2;//20
    taskTime = 1;//4
    itiTime  = 1;//1
    begTime = 1;//2
    perCutOff = 0;//.70
    testMode = true;
	}
	
	
	SetUpArrays();
}

function OnEnable(){


	
    curCityName = cityList[cntBL];
	curShapeName = shapeNames[cntBL];
	curMaskType =  maskList[cntBL];
	curLureName = lureList[cntBL];
	 
	 
	sl_presentTarget = GetComponent(SL_presentTarget_mask);
    getShapes = GetComponent(SL_getShapes_mask);
	sl_test = GetComponent(SL_test_mask);
	sl_perf = GetComponent(SL_perf_mask);
	sl_output = GetComponent(SL_output_mask);
	sl_end = GetComponent(SL_end_mask);
    
	
}

function Update(){

	currentStage = task_stage;
	
	if(cntBL < cityList.length){
	curCityName = cityList[cntBL];
	curShapeName = shapeNames[cntBL];
	curMaskType =  maskList[cntBL];
	curLureName = lureList[cntBL];
	}
	

	if(currentStage == "Target" ){
	getShapes.enabled = true;
	sl_presentTarget.enabled = true;
	
	}

	if(currentStage == "Test" ){
	getShapes.enabled = false;
	sl_test.enabled = true;
	sl_output.enabled = true;
	}

	if(currentStage == "Performance" ){
	
	sl_perf.enabled = true;
	}
	
	
	if(currentStage == "End"){
	
	sl_end.enabled = true;
	}

}




function SetUpArrays(){


for(var mask : String in levels){
	for (var shape : int; shape < targetShapes.length;shape++){
		cityList.Add(targetShapes[shape]);
		lureList.Add(lureShapes[shape]);
		shapeNames.Add("Shape " + (shape + 1) + " Diff " + mask);
		maskList.Add(mask);
	}
}
}

