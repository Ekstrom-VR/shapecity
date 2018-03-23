#pragma strict
import System.Collections.Generic;
import VideoClips;
import City;

static class Shuffle{

function ShuffleList(list : List.<Run>):List.<Run>
{
   for (var i : int = 0; i < list.Count; i++) {
         var temp : Run = list[i];
         var randomIndex : int = Random.Range(i, list.Count);
         list[i] = list[randomIndex];
         list[randomIndex] = temp;
		return list;
     }
}

function ShuffleList(list : List.<Clip>):List.<Clip>
{
	print("shuffle clips");
   for (var i : int = 0; i < list.Count; i++) {
         var temp : Clip = list[i];
         var randomIndex : int = Random.Range(i, list.Count);
         list[i] = list[randomIndex];
         list[randomIndex] = temp;
		return list;
     }
}

}