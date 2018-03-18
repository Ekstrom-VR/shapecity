﻿#pragma strict

public class City
{

	public var trialList = new Array();
	public var stores = new Array();
	public var city_x = new Array();
	public var city_y = new Array();
    
    public function City(tri : Array, sto : Array, x : Array, y : Array){
		trialList = tri;
		stores = sto;
		city_x = x;
		city_y = y;
	}
}

// trial lists
public var trialList = new Array();
public var city_x = new Array();
public var city_y = new Array();
public var stores = new Array();
public var new_city : City;

public function BuildCity(cityName : String):City{

	switch(cityName)
	{
	case 'CE':
		trialList[0] = [3,3,4,1,1,1,1,4,4,2,3,3,1,2,4,4,4,4,2,3,3,3,3,4];
		trialList[1] = [3,2,2,1,4,4,2,3,4,4,4,4,1,1,2,1,3,3,1,2,2,1,3,3];
		trialList[2] = [1,1,1,1,3,4,4,4,4,3,1,1,2,2,2,2,3,1,1,4,2,2,4,1];
		trialList[3] = [1,1,1,4,3,3,3,3,2,4,3,3,2,2,2,2,1,3,2,2,2,2,4,4];

		city_x[0] =[293.50,293.50,293.50,256.00,218.50,218.50,218.50,256.00];
		city_y[0] =[293.50,243.50,218.50,218.50,218.50,268.50,293.50,293.50];
		city_x[1] =[291.03,294.70,291.03,256.00,220.97,217.30,220.97,256.00];
		city_y[1] =[291.03,244.00,220.97,216.81,220.97,268.00,291.03,295.19];
		city_x[2] =[288.56,295.90,288.56,256.00,223.44,216.10,223.44,256.00];
		city_y[2] =[288.56,244.49,223.44,215.13,223.44,267.51,288.56,296.87];
		city_x[3] =[286.09,297.11,286.09,256.00,225.91,214.89,225.91,256.00];
		city_y[3] =[286.09,244.99,225.91,213.44,225.91,267.01,286.09,298.56];

		stores = ["Toy Store","1ST Bank", "Book Store", "Camera Store", "Coffee Shop","Craft Shop","Dentist","Fast Food Shop"];
		new_city = City(trialList,stores,city_x,city_y);
		return new_city;
		break;
	case 'Greco':

		trialList[0] = [3,2,3,1,1,3,1,1,3,3,3,3,1,2,2,2,1,1,1,3,3,3,2,3,2];
		trialList[1] = [1,2,1,2,1,3,3,1,1,1,2,2,2,3,2,3,3,1,2,2,1,1,3,1,1];
		trialList[2] = [2,2,1,1,2,2,2,3,2,2,3,3,3,3,1,1,3,1,1,1,3,3,3,3,2];
		trialList[3] = [1,1,2,2,2,3,3,3,2,1,1,3,3,2,1,2,3,1,3,3,1,1,1,1,3];

		city_x[0] =[279.74,251.32,229.88,201.28,226.39,264.04,289.14,290.84,293.10,279.74];
		city_y[0] =[282.20,306.13,284.86,256.50,240.93,217.58,202.01,225.77,257.44,282.20];
		city_x[1] =[279.54,257.94,230.50,214.97,225.89,255.69,282.88,286.69,291.76,279.54];
		city_y[1] =[282.63,311.46,287.76,256.23,225.32,214.04,206.78,228.56,257.59,282.63];
		city_x[2] =[279.33,264.56,231.12,228.67,225.39,247.34,276.62,282.53,290.42,279.33];
		city_y[2] =[283.05,316.80,290.67,255.97,209.71,210.50,211.55,231.35,257.75,283.05];

		stores = new Array("Bakery","Cell Phones", "Gym", "Chinese Food", "Florist","Toy Store","Music Store", "Ice Cream", "Dentist");

	new_city = City(trialList,stores,city_x,city_y);
		return new_city;
		break;
	case 'Practice':

		trialList[0] = [1,1,2,1,1,2,1,2,2,1];
		trialList[1] = [2,1,1,2,2,2,1,1,2,2];

		city_x[0] =[267.54,234.22,257.60,270.85];
		city_y[0] =[273.49,274.33,227.98,241.26];
		city_x[1] =[272.77,234.36,248.31,269.79];
		city_y[1] =[276.62,263.94,235.01,242.62];

		stores = ["Book Store","Coffee Shop", "Craft Shop","1ST Bank"];

		new_city = City(trialList,stores,city_x,city_y);
		return new_city;
		break;
	}
}