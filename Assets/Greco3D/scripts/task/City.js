#pragma strict
import System.Collections.Generic;

class City
{
	public var stores = new List.<String>();
	public var coordsList = new List.<Coords>();
    public var trialList = new List.<Run>();
	var x =  new List.<float>();
    var y =  new List.<float>();

	public class Run{
		
		public var trials = new List.<int>();
		
		public function Run(tri:int[]){
			for(var i :int in tri){
			   this.trials.Add(tri[i]);
			}
		}
	}

	class Coords{
		var x =  new List.<float>();
    	var y =  new List.<float>();

		function Coords(X : List.<float>,Y : List.<float>){
		    this.x = X;
            this.y = Y;
		}
	}

    function City(name : String){
		BuildCity(name);
	}
	
    function BuildCity(cityName : String){

    var run1 : Run;
    var run2 : Run;
    var run3 : Run;
    var run4 : Run;

	var coords1 : Coords;
    var coords2 : Coords;
    var coords3 : Coords;
 	var coords4 : Coords;

	switch(cityName)
	{
	case 'CE':
		run1 = new Run([3,3,4,1,1,1,1,4,4,2,3,3,1,2,4,4,4,4,2,3,3,3,3,4]);
		run2 = new Run([3,2,2,1,4,4,2,3,4,4,4,4,1,1,2,1,3,3,1,2,2,1,3,3]);
		run3 = new Run([1,1,1,1,3,4,4,4,4,3,1,1,2,2,2,2,3,1,1,4,2,2,4,1]);
		run4 = new Run([1,1,1,4,3,3,3,3,2,4,3,3,2,2,2,2,1,3,2,2,2,2,4,4]);
		trialList = new List.<Run>([run1,run2,run3,run4]);
		
		//City 1
		x = new List.<float>([293.50,293.50,293.50,256.00,218.50,218.50,218.50,256.00]);
		y = new List.<float>([293.50,243.50,218.50,218.50,218.50,268.50,293.50,293.50]);
		coords1 = new Coords(x,y);
        
		//City 2
		x = new List.<float>([291.03,294.70,291.03,256.00,220.97,217.30,220.97,256.00]);
		y = new List.<float>([291.03,244.00,220.97,216.81,220.97,268.00,291.03,295.19]);
		coords2 = new Coords(x,y);

		//City 3
		x = new List.<float>([288.56,295.90,288.56,256.00,223.44,216.10,223.44,256.00]);
		y = new List.<float>([288.56,244.49,223.44,215.13,223.44,267.51,288.56,296.87]);
		coords3 = new Coords(x,y);

		//City 4
		x = new List.<float>([286.09,297.11,286.09,256.00,225.91,214.89,225.91,256.00]);
		y = new List.<float>([286.09,244.99,225.91,213.44,225.91,267.01,286.09,298.56]);
		coords4 = new Coords(x,y);

		coordsList = new List.<Coords>([coords1,coords2,coords3,coords4]);

		stores = new List.<String>(["Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop"]);
		break;
	case 'Greco':
		run1 = new Run([3,2,3,1,1,3,1,1,3,3,3,3,1,2,2,2,1,1,1,3,3,3,2,3,2]);
		run2 = new Run([1,2,1,2,1,3,3,1,1,1,2,2,2,3,2,3,3,1,2,2,1,1,3,1,1]);
		run3 = new Run([2,2,1,1,2,2,2,3,2,2,3,3,3,3,1,1,3,1,1,1,3,3,3,3,2]);
		run4 = new Run([1,1,2,2,2,3,3,3,2,1,1,3,3,2,1,2,3,1,3,3,1,1,1,1,3]);
		trialList = new List.<Run>([run1,run2,run3,run4]);

		x = new List.<float>([279.74,251.32,229.88,201.28,226.39,264.04,289.14,290.84,293.10,279.74]);
		y = new List.<float>([282.20,306.13,284.86,256.50,240.93,217.58,202.01,225.77,257.44,282.20]);
		coords1 = new Coords(x,y);

		x = new List.<float>([279.54,257.94,230.50,214.97,225.89,255.69,282.88,286.69,291.76,279.54]);
		y = new List.<float>([282.63,311.46,287.76,256.23,225.32,214.04,206.78,228.56,257.59,282.63]);
		coords2 = new Coords(x,y);
		
		x = new List.<float>([279.33,264.56,231.12,228.67,225.39,247.34,276.62,282.53,290.42,279.33]);
		y = new List.<float>([283.05,316.80,290.67,255.97,209.71,210.50,211.55,231.35,257.75,283.05]);
		coords3 = new Coords(x,y);

		coordsList = new List.<Coords>([coords1,coords2,coords3]);

		stores = new List.<String>(["Bakery","Cell Phones", "Gym", "Chinese Food", "Florist","Toy Store","Music Store", "Ice Cream", "Dentist"]);
		break;
	case 'Practice':

		run1 = new Run([1,1,2,1,1,2,1,2,2,1]);
		run2 = new Run([2,1,1,2,2,2,1,1,2,2]);
		trialList = new List.<Run>([run1,run2]);

		x = new List.<float>([267.54,234.22,257.60,270.85]);
		y = new List.<float>([273.49,274.33,227.98,241.26]);
		coords1 = new Coords(x,y);

		x = new List.<float>([272.77,234.36,248.31,269.79]);
		y = new List.<float>([276.62,263.94,235.01,242.62]);
		coords2 = new Coords(x,y);

		coordsList = new List.<Coords>([coords1,coords2]);
		
		stores = new List.<String>(["Book Store","Coffee Shop", "Craft Shop","1ST Bank"]);
		break;
	}
}
}