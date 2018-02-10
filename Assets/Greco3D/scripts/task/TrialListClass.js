﻿#pragma strict


public class TrialListClass
{
	public  var trialList_CE = new Array();
	public  var trialList_GR_3c = new Array();
	public  var trialList_PR = new Array();
    
    public function TrialListClass(){
 
// 
// trialList_CE[0] =[ 1, 2, 3, 4, 1 ,2 ,3, 4];
// trialList_CE[1] =[ 1, 2, 3, 4, 1 ,2 ,3, 4];
trialList_CE[0] = [3,3,4,1,1,1,1,4,4,2,3,3,1,2,4,4,4,4,2,3,3,3,3,4];
trialList_CE[1] = [3,2,2,1,4,4,2,3,4,4,4,4,1,1,2,1,3,3,1,2,2,1,3,3];
trialList_CE[2] = [1,1,1,1,3,4,4,4,4,3,1,1,2,2,2,2,3,1,1,4,2,2,4,1];
trialList_CE[3] = [1,1,1,4,3,3,3,3,2,4,3,3,2,2,2,2,1,3,2,2,2,2,4,4];


//1234
//trialList_GR_3c[0] = [3,2,3,1,1,3,1,1,3,3,3,3,1,2,2,2,1,1,1,3,3,3,2,3,2];
//trialList_GR_3c[1] = [1,2,1,2,1,3,3,1,1,1,2,2,2,3,2,3,3,1,2,2,1,1,3,1,1];
//trialList_GR_3c[2] = [2,2,1,1,2,2,2,3,2,2,3,3,3,3,1,1,3,1,1,1,3,3,3,3,2];
//trialList_GR_3c[3] = [1,1,2,2,2,3,3,3,2,1,1,3,3,2,1,2,3,1,3,3,1,1,1,1,3];

//4213
//trialList_GR_3c[0] = [1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1]; 
//
//trialList_GR_3c[0] = [1,1,2,2,2,3,3,3,2,1,1,3,3,2,1,2,3,1,3,3,1,1,1,1,3]; //4
//trialList_GR_3c[1] = [1,2,1,2,1,3,3,1,1,1,2,2,2,3,2,3,3,1,2,2,1,1,3,1,1]; //2
//trialList_GR_3c[2] = [3,2,3,1,1,3,1,1,3,3,3,3,1,2,2,2,1,1,1,3,3,3,2,3,2]; //1
//trialList_GR_3c[3] = [2,2,1,1,2,2,2,3,2,2,3,3,3,3,1,1,3,1,1,1,3,3,3,3,2]; //3


//3214
trialList_GR_3c[0] = [2,2,1,1,2,2,2,3,2,2,3,3,3,3,1,1,3,1,1,1,3,3,3,3,2]; //3
trialList_GR_3c[1] = [1,2,1,2,1,3,3,1,1,1,2,2,2,3,2,3,3,1,2,2,1,1,3,1,1]; //2
trialList_GR_3c[2] = [3,2,3,1,1,3,1,1,3,3,3,3,1,2,2,2,1,1,1,3,3,3,2,3,2]; //1
trialList_GR_3c[3] = [1,1,2,2,2,3,3,3,2,1,1,3,3,2,1,2,3,1,3,3,1,1,1,1,3]; //4







//trialList_CE[0] = [4,4,1,1,4,1,1,4,1,4,4,1,4,4,4,1,4,4,1,4,4,4,1,1];
//trialList_CE[1] = [1,1,4,1,1,1,1,4,1,4,4,4,1,1,1,1,4,1,4,1,4,4,1,4];
//trialList_CE[2] = [1,1,1,4,4,4,1,1,4,4,1,1,1,4,4,1,4,1,4,4,4,1,4,1];
//trialList_CE[3] = [1,1,4,1,1,4,1,1,4,1,1,1,1,1,4,1,1,4,1,4,1,4,4,4];
//trialList_PR[0] = [1,1,1,2,2,2,1,1,1,2,2,2];
//	trialList_PR[0] = [2,	1,	2,	1,	1,	2,	2,	1,	2,	1,	1,	1,	2,	1,	2,	1,	2,	1,	2,	2];		
//	trialList_PR[2] = [1,	1,	2,	1,	1,	2,	2,	2,	2,	1,	2,	2,	2,	1,	1,	1,	1,	1,	2,	1];
//	trialList_PR[3] = [1,	1,	2,	1,	1,	2,	2,	2,	2,	1,	2,	2,	2,	1,	1,	1,	1,	1,	2,	1];		

trialList_PR[0] = [1,1,2,1,1,2,1,2,2,1];
trialList_PR[1] = [2,1,1,2,2,2,1,1,2,2];
trialList_PR[2] = [1,1,2,1,2,2,2,1,1,1];
trialList_PR[3] = [2,1,2,1,2,1,2,2,2,2];
trialList_PR[4] = [1,2,1,1,2,2,1,2,2,2];
trialList_PR[5] = [2,2,2,1,1,2,1,1,1,2];
trialList_PR[6] = [2,2,1,1,2,1,1,2,1,2];
trialList_PR[7] = [2,2,1,2,2,2,2,2,1,1];
trialList_PR[8] = [2,1,1,1,1,2,2,1,1,2];
trialList_PR[9] = [1,2,2,1,1,1,2,1,1,1];

	
						
	}
}

	