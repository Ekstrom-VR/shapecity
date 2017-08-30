#pragma strict


static var shapePaths = new Array();
private var path: String;
private var cityShapeList  = new Array();
private var novelShapeList = new Array();
private var shapeTypes = new Array();
private var numShapes : int;
private var curCity : String;
private var curNovel : String;


function OnEnable(){

shapePaths = SL_task_morph.shapePaths;
path = SL_task_morph.path;
cityShapeList = SL_task_morph.cityShapeList;
novelShapeList = SL_task_morph.novelShapeList;
shapeTypes = SL_task_morph.shapeTypes;
numShapes = SL_task_morph.numShapes;
curCity = SL_task_morph.curCity;
curNovel = SL_task_morph.curNovel;


BuildShapePaths();
						
							
}



function BuildShapePaths(){


var cityPath  : String = SL_task_morph.path +  curCity  + '/morph_' + curNovel + '/';																																																								
var cT : int = 0;


for(var type : int =0; type < shapeTypes.length; type++){
    var hand = new String[SL_task_morph.numShapes];
	for(var cS : int = 0; cS < numShapes; cS++){
	hand[cS]=cityPath + 'morph_' + shapeTypes[type] + '_' + (cS+1) + '.png';
    yield;
	}
		
		
		shapePaths[type]=hand;
		
   yield;
 }
  hand = shapePaths[0];
SL_task_morph.task_stage = "Test";	
this.enabled = false;

}


