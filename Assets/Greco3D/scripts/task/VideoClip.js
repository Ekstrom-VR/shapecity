#pragma strict

public class VideoClip{
	var pos = new List.<Vector3>();
	var rot = new List.<Quaternion>();
	var path : String;

	public function VideoClip(pos:List.<Vector3>,rot:List.<Quaternion>,path : String){
		 this.pos = pos;
		 this.rot = rot;
		 this.path = path;
	}
}

