#pragma strict

public class CityListClass

{
public var city_x_CE=  new Array();
public var city_y_CE = new Array();

public var city_x_GR_st9_5000_3c = new Array();
public var city_y_GR_st9_5000_3c = new Array();

public var city_x_PR = new Array();
public var city_y_PR = new Array();	    
public var city_x_PR_1000 = new Array();
public var city_y_PR_1000 = new Array();	    

var city1_PR_1000 = new PRAC_1_1000();
var city2_PR_1000 = new PRAC_2_1000();

var city1_GR_st9_5000_3c = new City1_st9_5000_3c();
var city2_GR_st9_5000_3c = new City2_st9_5000_3c();
var city3_GR_st9_5000_3c=  new City3_st9_5000_3c();

var city1_CE = new CE_1();
var city2_CE = new CE_2();
var city3_CE = new CE_3();
var city4_CE = new CE_4();


	public function CityListClass(){
	city_x_CE[0] = city1_CE.x;
	city_y_CE[0] = city1_CE.y;
	city_x_CE[1] = city2_CE.x;
	city_y_CE[1] = city2_CE.y;
	city_x_CE[2] = city3_CE.x;
	city_y_CE[2] = city3_CE.y;
	city_x_CE[3] = city4_CE.x;
	city_y_CE[3] = city4_CE.y;
		
    city_x_GR_st9_5000_3c[0] = city1_GR_st9_5000_3c.x;
	city_y_GR_st9_5000_3c[0] = city1_GR_st9_5000_3c.y;
	city_x_GR_st9_5000_3c[1] = city2_GR_st9_5000_3c.x;
	city_y_GR_st9_5000_3c[1] = city2_GR_st9_5000_3c.y;
	city_x_GR_st9_5000_3c[2] = city3_GR_st9_5000_3c.x;
	city_y_GR_st9_5000_3c[2] = city3_GR_st9_5000_3c.y;


	city_x_PR_1000[0] = city1_PR_1000.x;
	city_y_PR_1000[0] = city1_PR_1000.y;
	city_x_PR_1000[1] = city2_PR_1000.x;
	city_y_PR_1000[1] = city2_PR_1000.y;	
	}
}