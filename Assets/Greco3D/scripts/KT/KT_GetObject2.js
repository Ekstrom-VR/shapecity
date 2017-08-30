#pragma strict


static var pres_list = new Array();
private var object_list = new Array("Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop","Music Store", "Ice Cream");
private var presNum : int = 5;


function Awake() {


			//Build pres list
			for(var i : int = 0; i < presNum; i++){
					for(var j : int = 0; j < object_list.length; j++){
			
				       pres_list.Add(object_list[j]);
					}
			
			}

        //Randomize preslist
        RandomizeArray(pres_list);
        
        print(pres_list);

}




function RandomizeArray(arr : Array){
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i+1);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
}

