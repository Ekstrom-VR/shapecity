#pragma strict

var currentStage : String;
static var task_stage : String = "Target";
static var task_stages = new Array("Target","Test","Performance","End");
static var stageNum : int = 0;
static var allCities = new Array();
static var allShapeNames = new Array();
static var allRuns = new Array();
static var cities = new Array("City1_NS5_FR9","City2_NS5_FR9","City1_NS5_FR9","City2_NS5_FR9","City1_NS5_FR9","City2_NS5_FR9");
static var shapeNames = new Array("Shape 1","Shape 2","Shape 1","Shape 2","Shape 1","Shape 2");

static var cntBL : int = 0;
static var numRuns : float = 2;
static var curCityName : String;
static var curShapeName : String;
static var curRun : int;

var sl_presentTarget : SL_presentTarget;
var getShapes : SL_getShapes;
var sl_test : SL_test;
var sl_perf : SL_perf;
var sl_output : SL_output;
var sl_end : SL_end;

static var studytime = 1; 
static var testMode : boolean = false;


function OnEnable(){

	sl_presentTarget = GetComponent(SL_presentTarget);
    getShapes = GetComponent(SL_getShapes);
	sl_test = GetComponent(SL_test);
	sl_perf = GetComponent(SL_perf);
	sl_output = GetComponent(SL_output);
	sl_end = GetComponent(SL_end);

	
	
	//Build city list
	for(var iC1 in cities){
		for(var iR : int = 0 ;iR < numRuns ;iR++){		
		  allCities.Push(iC1);
		  allRuns.Push(iR + 1);
		 } 
	 }
	 
	 for(var iC2 in shapeNames){
		for(iR = 0;iR < numRuns ;iR++){		
		  allShapeNames.Push(iC2);
		 } 
	 }
	 
	 curCityName = allCities[cntBL];
	 curShapeName = allShapeNames[cntBL];
	
}

function Update(){

	currentStage = task_stage;
	
	if(cntBL < allCities.length){
	curCityName = allCities[cntBL];
	curShapeName = allShapeNames[cntBL];
	curRun = allRuns[cntBL];
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
	
	if(currentStage == "TestStart" ){
	
	sl_perf.enabled = true;
	}
	
	
	if(currentStage == "End"){
	
	sl_end.enabled = true;
	}

}