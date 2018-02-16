#pragma strict

public class CityListClass
{
public var city_x_CE=  new Array();
public var city_y_CE = new Array();
public var city_x_GR = new Array();
public var city_y_GR = new Array();

public var city_x_GR_st5 = new Array();
public var city_y_GR_st5 = new Array();
public var city_x_GR_st5_2000 = new Array();
public var city_y_GR_st5_2000 = new Array();
public var city_x_GR_st5_3000 = new Array();
public var city_y_GR_st5_3000 = new Array();
public var city_x_GR_st5_4000 = new Array();
public var city_y_GR_st5_4000 = new Array();
public var city_x_GR_st5_5000 = new Array();
public var city_y_GR_st5_5000 = new Array();
public var city_x_GR_st5_6000 = new Array();
public var city_y_GR_st5_6000 = new Array();
public var city_x_GR_st5_7000 = new Array();
public var city_y_GR_st5_7000 = new Array();

public var city_x_GR_st13 = new Array();
public var city_y_GR_st13 = new Array();
public var city_x_GR_st30 = new Array();
public var city_y_GR_st30 = new Array();
public var city_x_GR_5000 = new Array();
public var city_y_GR_5000 = new Array();

public var city_x_GR_st8_5000_ND = new Array();
public var city_y_GR_st8_5000_ND = new Array();

public var city_x_GR_st9_5000_3c = new Array();
public var city_y_GR_st9_5000_3c = new Array();


public var city_x_PR = new Array();
public var city_y_PR = new Array();	    
public var city_x_PR_1000 = new Array();
public var city_y_PR_1000 = new Array();	    
public var city_x_PR_2000 = new Array();
public var city_y_PR_2000 = new Array();
	


var city1_CE = new CE_1();
var city2_CE = new CE_2();
var city3_CE = new CE_3();
var city4_CE = new CE_4();

var city1_GR = new City1();
var city2_GR = new City2();
var city3_GR = new City3();
var city4_GR = new City4();

var city1_GR_st5 = new City1_st5();
var city2_GR_st5 = new City2_st5();
var city3_GR_st5 = new City3_st5();
var city4_GR_st5 = new City4_st5();

var city1_GR_st5_2000 = new City1_st5_2000();
var city2_GR_st5_2000 = new City2_st5_2000();
var city3_GR_st5_2000 = new City3_st5_2000();
var city4_GR_st5_2000 = new City4_st5_2000();

var city1_GR_st5_3000 = new City1_st5_3000();
var city2_GR_st5_3000 = new City2_st5_3000();
var city3_GR_st5_3000 = new City3_st5_3000();
var city4_GR_st5_3000 = new City4_st5_3000();

var city1_GR_st5_4000 = new City1_st5_4000();
var city2_GR_st5_4000 = new City2_st5_4000();
var city3_GR_st5_4000 = new City3_st5_4000();
var city4_GR_st5_4000 = new City4_st5_4000();

var city1_GR_st5_5000 = new City1_st5_5000();
var city2_GR_st5_5000 = new City2_st5_5000();
var city3_GR_st5_5000 = new City3_st5_5000();
var city4_GR_st5_5000 = new City4_st5_5000();

var city1_GR_st5_6000 = new City1_st5_6000();
var city2_GR_st5_6000 = new City2_st5_6000();
var city3_GR_st5_6000 = new City3_st5_6000();
var city4_GR_st5_6000 = new City4_st5_6000();

var city1_GR_st5_7000 = new City1_st5_7000();
var city2_GR_st5_7000 = new City2_st5_7000();
var city3_GR_st5_7000 = new City3_st5_7000();
var city4_GR_st5_7000 = new City4_st5_7000();

var city1_GR_st13 = new City1_st13();
var city2_GR_st13 = new City2_st13();
var city3_GR_st13 = new City3_st13();
var city4_GR_st13 = new City4_st13();

var city1_GR_st30 = new City1_st30();
var city2_GR_st30 = new City2_st30();
var city3_GR_st30 = new City3_st30();
var city4_GR_st30 = new City4_st30();

var city1_GR_5000 = new City1_5000();
var city2_GR_5000 = new City2_5000();
var city3_GR_5000 = new City3_5000();
var city4_GR_5000 = new City4_5000();

var city1_PR = new PRAC_1();
var city2_PR = new PRAC_2();

var city1_PR_1000 = new PRAC_1_1000();
var city2_PR_1000 = new PRAC_2_1000();

var city1_PR_2000 = new PRAC_1_2000();
var city2_PR_2000 = new PRAC_2_2000();

var city1_GR_st8_5000_ND = new City1_st8_5000_ND();
var city2_GR_st8_5000_ND = new City2_st8_5000_ND();
var city3_GR_st8_5000_ND = new City3_st8_5000_ND();
var city4_GR_st8_5000_ND = new City4_st8_5000_ND();

var city1_GR_st9_5000_3c = new City1_st9_5000_3c();
var city2_GR_st9_5000_3c = new City2_st9_5000_3c();
var city3_GR_st9_5000_3c=  new City3_st9_5000_3c();


	public function CityListClass(){
	city_x_CE[0] = city1_CE.x;
	city_y_CE[0] = city1_CE.y;
	city_x_CE[1] = city2_CE.x;
	city_y_CE[1] = city2_CE.y;
	city_x_CE[2] = city3_CE.x;
	city_y_CE[2] = city3_CE.y;
	city_x_CE[3] = city4_CE.x;
	city_y_CE[3] = city4_CE.y;
	
	city_x_GR[0] = city1_GR.x;
    city_y_GR[0] = city1_GR.y;
    city_x_GR[1] = city2_GR.x;
   	city_y_GR[1] = city2_GR.y;
   	city_x_GR[2] = city3_GR.x;
   	city_y_GR[2] = city3_GR.y;
   	city_x_GR[3] = city4_GR.x;
   	city_y_GR[3] = city4_GR.y;
   	
   	
   	city_x_GR_st13[0] = city1_GR_st13.x;
    city_y_GR_st13[0] = city1_GR_st13.y;
    city_x_GR_st13[1] = city2_GR_st13.x;
   	city_y_GR_st13[1] = city2_GR_st13.y;
   	city_x_GR_st13[2] = city3_GR_st13.x;
   	city_y_GR_st13[2] = city3_GR_st13.y;
   	city_x_GR_st13[3] = city4_GR_st13.x;
   	city_y_GR_st13[3] = city4_GR_st13.y;
   	
   	city_x_GR_st5[0] = city1_GR_st5.x;
    city_y_GR_st5[0] = city1_GR_st5.y;
    city_x_GR_st5[1] = city2_GR_st5.x;
   	city_y_GR_st5[1] = city2_GR_st5.y;
   	city_x_GR_st5[2] = city3_GR_st5.x;
   	city_y_GR_st5[2] = city3_GR_st5.y;
   	city_x_GR_st5[3] = city4_GR_st5.x;
   	city_y_GR_st5[3] = city4_GR_st5.y;
   	
   	city_x_GR_st5_2000[0] = city1_GR_st5_2000.x;
    city_y_GR_st5_2000[0] = city1_GR_st5_2000.y;
    city_x_GR_st5_2000[1] = city2_GR_st5_2000.x;
   	city_y_GR_st5_2000[1] = city2_GR_st5_2000.y;
   	city_x_GR_st5_2000[2] = city3_GR_st5_2000.x;
   	city_y_GR_st5_2000[2] = city3_GR_st5_2000.y;
   	city_x_GR_st5_2000[3] = city4_GR_st5_2000.x;
   	city_y_GR_st5_2000[3] = city4_GR_st5_2000.y;
   	
   	city_x_GR_st5_3000[0] = city1_GR_st5_3000.x;
    city_y_GR_st5_3000[0] = city1_GR_st5_3000.y;
    city_x_GR_st5_3000[1] = city2_GR_st5_3000.x;
   	city_y_GR_st5_3000[1] = city2_GR_st5_3000.y;
   	city_x_GR_st5_3000[2] = city3_GR_st5_3000.x;
   	city_y_GR_st5_3000[2] = city3_GR_st5_3000.y;
   	city_x_GR_st5_3000[3] = city4_GR_st5_3000.x;
   	city_y_GR_st5_3000[3] = city4_GR_st5_3000.y;
   	
   	city_x_GR_st5_4000[0] = city1_GR_st5_4000.x;
    city_y_GR_st5_4000[0] = city1_GR_st5_4000.y;
    city_x_GR_st5_4000[1] = city2_GR_st5_4000.x;
   	city_y_GR_st5_4000[1] = city2_GR_st5_4000.y;
   	city_x_GR_st5_4000[2] = city3_GR_st5_4000.x;
   	city_y_GR_st5_4000[2] = city3_GR_st5_4000.y;
   	city_x_GR_st5_4000[3] = city4_GR_st5_4000.x;
   	city_y_GR_st5_4000[3] = city4_GR_st5_4000.y;
   	
   	city_x_GR_st5_5000[0] = city1_GR_st5_5000.x;
    city_y_GR_st5_5000[0] = city1_GR_st5_5000.y;
    city_x_GR_st5_5000[1] = city2_GR_st5_5000.x;
   	city_y_GR_st5_5000[1] = city2_GR_st5_5000.y;
   	city_x_GR_st5_5000[2] = city3_GR_st5_5000.x;
   	city_y_GR_st5_5000[2] = city3_GR_st5_5000.y;
   	city_x_GR_st5_5000[3] = city4_GR_st5_5000.x;
   	city_y_GR_st5_5000[3] = city4_GR_st5_5000.y;
   	
   	city_x_GR_st5_6000[0] = city1_GR_st5_6000.x;
    city_y_GR_st5_6000[0] = city1_GR_st5_6000.y;
    city_x_GR_st5_6000[1] = city2_GR_st5_6000.x;
   	city_y_GR_st5_6000[1] = city2_GR_st5_6000.y;
   	city_x_GR_st5_6000[2] = city3_GR_st5_6000.x;
   	city_y_GR_st5_6000[2] = city3_GR_st5_6000.y;
   	city_x_GR_st5_6000[3] = city4_GR_st5_6000.x;
   	city_y_GR_st5_6000[3] = city4_GR_st5_6000.y;
   	
   	city_x_GR_st5_7000[0] = city1_GR_st5_7000.x;
    city_y_GR_st5_7000[0] = city1_GR_st5_7000.y;
    city_x_GR_st5_7000[1] = city2_GR_st5_7000.x;
   	city_y_GR_st5_7000[1] = city2_GR_st5_7000.y;
   	city_x_GR_st5_7000[2] = city3_GR_st5_7000.x;
   	city_y_GR_st5_7000[2] = city3_GR_st5_7000.y;
   	city_x_GR_st5_7000[3] = city4_GR_st5_7000.x;
   	city_y_GR_st5_7000[3] = city4_GR_st5_7000.y;
   
   	city_x_GR_st30[0] = city1_GR_st30.x;
    city_y_GR_st30[0] = city1_GR_st30.y;
    city_x_GR_st30[1] = city2_GR_st30.x;
   	city_y_GR_st30[1] = city2_GR_st30.y;
   	city_x_GR_st30[2] = city3_GR_st30.x;
   	city_y_GR_st30[2] = city3_GR_st30.y;
   	city_x_GR_st30[3] = city4_GR_st30.x;
   	city_y_GR_st30[3] = city4_GR_st30.y;
   	
   	
	city_x_GR_5000[0] = city1_GR_5000.x;
	city_y_GR_5000[0] = city1_GR_5000.y;
	city_x_GR_5000[1] = city2_GR_5000.x;
	city_y_GR_5000[1] = city2_GR_5000.y;
	city_x_GR_5000[2] = city3_GR_5000.x;
	city_y_GR_5000[2] = city3_GR_5000.y;
	city_x_GR_5000[3] = city4_GR_5000.x;
	city_y_GR_5000[3] = city4_GR_5000.y;
	
	city_x_GR_st8_5000_ND[0] = city1_GR_st8_5000_ND.x;
	city_y_GR_st8_5000_ND[0] = city1_GR_st8_5000_ND.y;
	city_x_GR_st8_5000_ND[1] = city2_GR_st8_5000_ND.x;
	city_y_GR_st8_5000_ND[1] = city2_GR_st8_5000_ND.y;
	city_x_GR_st8_5000_ND[2] = city3_GR_st8_5000_ND.x;
	city_y_GR_st8_5000_ND[2] = city3_GR_st8_5000_ND.y;
	city_x_GR_st8_5000_ND[3] = city4_GR_st8_5000_ND.x;
	city_y_GR_st8_5000_ND[3] = city4_GR_st8_5000_ND.y;
	
	
	
    city_x_GR_st9_5000_3c[0] = city1_GR_st9_5000_3c.x;
	city_y_GR_st9_5000_3c[0] = city1_GR_st9_5000_3c.y;
	city_x_GR_st9_5000_3c[1] = city2_GR_st9_5000_3c.x;
	city_y_GR_st9_5000_3c[1] = city2_GR_st9_5000_3c.y;
	city_x_GR_st9_5000_3c[2] = city3_GR_st9_5000_3c.x;
	city_y_GR_st9_5000_3c[2] = city3_GR_st9_5000_3c.y;

	
	
	city_x_PR[0] = city1_PR.x;
	city_y_PR[0] = city1_PR.y;
	city_x_PR[1] = city2_PR.x;
	city_y_PR[1] = city2_PR.y;

	city_x_PR_1000[0] = city1_PR_1000.x;
	city_y_PR_1000[0] = city1_PR_1000.y;
	city_x_PR_1000[1] = city2_PR_1000.x;
	city_y_PR_1000[1] = city2_PR_1000.y;
	
	city_x_PR_2000[0] = city1_PR_2000.x;
	city_y_PR_2000[0] = city1_PR_2000.y;
	city_x_PR_2000[1] = city2_PR_2000.x;
	city_y_PR_2000[1] = city2_PR_2000.y;
	}

}

