#pragma strict

var currentStage : String;
//Shape setup
static var path: String = "file:/Users/stokesjd/Desktop/Shapes/";
static var cityShapeList  = new Array();
static var novelShapeList = new Array();
static var shapeTypesList = new Array();
static var shapeTypes =new Array("shape","10dot","5dot");//("shape","10dot","5dot");//("shape");
static var shapePaths = new Array(); 
static var numShapes : int = 4; //Number of morphs; Do not change
static var rotateShape : boolean =true;
static var feedBack : boolean = false;
static var fixation : boolean = false;

//Tasking timing variables
static  var numTrials : int = 20;//20
static var taskTime : float = 5;//5
static var itiTime : float = 5;//5
static var begTime : float = 2;//2
static var perCutOff : float =.70; //.70;

//Task stages
static var task_stage : String ="PreTest";
static var task_stages = new Array("PreTest","Test","Performance","End");
static var stageNum : int = 0;

//Other
static var cntBL : int = 0;
static var curRun : int = 1;
static var cur : String;
static var curCity : String;
static var curNovel : String;
static var curShapeTypes : int;
//Scripts
var getShapes : SL_getShapes_morph;
var test : SL_test_morph;
var perf : SL_perf_morph;
var output : SL_output_morph;
var end : SL_end_morph;
//Test mode related
static var studytime = 1; 
static var testMode : boolean = false;



function OnEnable(){


   if(PlayerPrefs.GetString("match_version") == 'A'){
   cityShapeList  = new Array("City2_NS5_FR9","City2_NS5_FR9","City2_NS5_FR9","City2_NS5_FR9","City2_NS5_FR9","City2_NS5_FR9");
   novelShapeList = new Array("Sh5Res8_6","Sh5Res8_6","Sh5Res8_73","Sh5Res8_73","Sh5Res8_62","Sh5Res8_62");
   shapeTypesList = new Array(1,3,1,3,1,3);
   //Tasking timing variables
	numTrials = 20;//20
	taskTime = 5;//5
	itiTime  = 5;//5
	begTime  = 2;//2
	perCutOff  =.70; //.70;
   }
   if(PlayerPrefs.GetString("match_version") == 'B'){
   cityShapeList  = new Array("City9_NS5_FR9","City9_NS5_FR9","City9_NS5_FR9","City9_NS5_FR9","City9_NS5_FR9","City9_NS5_FR9");
   novelShapeList = new Array("Sh5Res8_6","Sh5Res8_6","Sh5Res8_9","Sh5Res8_9","Sh5Res8_96","Sh5Res8_96");
   shapeTypesList = new Array(1,3,1,3,1,3);
	//Tasking timing variables
	numTrials = 20;//20
	taskTime = 5;//5
	itiTime  = 5;//5
	begTime  = 2;//2
	perCutOff  =.70; //.70;
   }
   if(PlayerPrefs.GetString("match_version") == 'test'){
   cityShapeList  = new Array("City9_NS5_FR9","City9_NS5_FR9","City9_NS5_FR9","City9_NS5_FR9","City9_NS5_FR9","City9_NS5_FR9");
   novelShapeList = new Array("Sh5Res8_6","Sh5Res8_6","Sh5Res8_9","Sh5Res8_9","Sh5Res8_96","Sh5Res8_96");
   shapeTypesList = new Array(1,3,1,3,1,3);
   testMode  = true;
	numTrials = 20;
	taskTime = 1;
	itiTime  = 1;
	begTime  = 1;
	perCutOff  =0;
   }
		
		



	//Get current city shape and current novel shape
    curCity = cityShapeList[cntBL];
	curNovel = novelShapeList[cntBL];
	curShapeTypes = shapeTypesList[cntBL];
	 
	//Setup task scripts
    getShapes = GetComponent(SL_getShapes_morph);
	test = GetComponent(SL_test_morph);
	perf = GetComponent(SL_perf_morph);
	output = GetComponent(SL_output_morph);
	end = GetComponent(SL_end_morph);
	
	

}

function Update(){

	currentStage = task_stage;//Present current stage
	
	if(cntBL < cityShapeList.length){
	curCity = cityShapeList[cntBL];
	curNovel = novelShapeList[cntBL];
	curShapeTypes = shapeTypesList[cntBL];
	}
	

	if(task_stage == "PreTest" ){
	getShapes.enabled = true;
	}
	
	if(task_stage == "Test" ){
	
	test.enabled = true;
	output.enabled = true;
	}

	if(task_stage == "Performance" ){
	
	perf.enabled = true;

	}
	
	
	if(task_stage == "End"){
	
	end.enabled = true;
	}

}



