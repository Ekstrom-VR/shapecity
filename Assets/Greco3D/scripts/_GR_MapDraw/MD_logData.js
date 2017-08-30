#pragma strict
static var dataLogged : boolean = false;

function Update(){

	//Exit task an enable output script when Escape is pressed
	if(Input.GetKeyUp(KeyCode.Escape)){	
     LogData();
     NextModule();
	}
}



function LogData(){
 var subj;
 var line : String;


var store_name : String;
var store_x    : float;
var store_y    : float;
var store_z    : float;
var map_tran   : Transform;


subj = PlayerPrefs.GetString("subj_id");
System.IO.Directory.CreateDirectory("Data/MapDraw/"+ MD_task.task_type + "/");
var newFile = System.IO.File.Create("Data/MapDraw/" + MD_task.task_type + "/" +subj +  "_MD_output.csv");
newFile.Close();

line =  'Map_name' + '\t' + 'Store_name' +  '\t' + 'Position_x' + '\t' + 'Position_y' + '\t' + 'Position_z' + '\n';
System.IO.File.AppendAllText("Data/MapDraw/" + MD_task.task_type + "/" +subj +  "_MD_output.csv",line);



for (var map : GameObject in MD_dupMap.allMaps){
for (var child : Transform in map.transform){
map_tran = child.parent;
store_name = child.name;

store_x =child.position.x;
store_y = child.position.y;
store_z = child.position.z;

line =  map_tran.name + "\t "+ store_name + '\t' + store_x + "\t" + store_y + "\t" + store_z + "\n";
//sw.WriteLine(line);
////sw.Close();
System.IO.File.AppendAllText("Data/MapDraw/" + MD_task.task_type + "/" +subj +  "_MD_output.csv",line);


}
}
}



	
function NextModule(){
	MD_task.task_stage = "End";
}  	
