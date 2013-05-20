"use strict";

//array values for AlistCON1, AlistCON2
var arrValues = [13,12,20,8,3,26,71,25,"","","",""];
//elements size of array in AlistCON1,AlistCON2
var itemsSize = 8;
//array "It" in AlistCON2 for holding the copied element
var arrItValues = [""];

//sets the backgroud of the array elements according to their values
var bgColor = function(array){
	var i;
	for(i=0; i<array.size();i++)
	{
		if(array.value(i)=="")
		{
			array.css([i], {"background-color": "#eee"});
		}
		else
		{
			array.css([i], {"background-color": "#fff"});
		}
	}
};

//Array-Based list inserstion
(function ($) {

	var jsav = new JSAV("AlistCON1");
	//vertical arrow in step 1
	var arrow1 = jsav.g.line(256, -10, 256, 20,{"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
	//label in step 1
	var label = jsav.label("Insert 23", {before: arr, left: 230, top: -20});	
	//horizontal arrow in step 2
	var arrow2 = jsav.g.line(290, 10, 400, 10,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	// Create an array object under control of JSAV library
    var arr = jsav.ds.array(arrValues, {indexed: true, layout: "array"});
	
	//move the array object 20px down to make room
	arr.css({top: 20});
	//sets the background of empty elements to gray
	bgColor(arr);
	
	jsav.umsg("A list containing eight elements before inserting an element with value 23");
	jsav.displayInit();	

	// shift all existing elements one position to the right
	var temp, i;
	for(i=arr.size(); i >=0;i--)
	{
		if(i<arr.size()-1)
		{
			jsav.effects.copyValue(arr, i, arr, i+1);
		}		
	}

	arr.css([itemsSize], {"background-color": "#fff"});
	arr.value(0,"");

	arrow1.hide();
	arrow2.show();
	label.hide();
	jsav.umsg("Shift all existing elements one position to the right to make room.");
	//step 2
	jsav.step();
	
	arr.value(0,23);
	arr.highlight([0]);
	arrow2.hide();
	jsav.umsg(" Insert 23 in array position 0.  ");
	//step 3
	jsav.step();
	jsav.recorded();

}(jQuery));

//Array-Based list deletion
(function ($) {
	var jsav = new JSAV("AlistCON2");	
	//vertical arrow poitting to current position
	var arrow1 = jsav.g.line(396, -10, 396, 20,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	//horizontal arrow in step 4
	var arrow2 = jsav.g.line(550, 10,440, 10, {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	//label for current position in step 1
	var label = jsav.label("curr", {before: arr, left: 380, top: -20});	
	label.hide();

	// Create an array object under control of JSAV library
    var arr = jsav.ds.array(arrValues, {indexed: true, layout: "array"});
	var labelIt =jsav.label("It", {before: arrIt, left: 470, top: 113});
	var arrIt = jsav.ds.array(arrItValues, {indexed: false, layout: "array"});
	arrIt.hide();
	labelIt.hide();

	//move array objects down
	arr.css({top: 20});
	arrIt.css({top: 10});	
	
	//sets the background of empty elements to gray
	bgColor(arr);
	
	jsav.umsg("A list containing eight elements before deleting an element at current position");
	jsav.displayInit();

	arr.highlight([3]);
	label.show();
	arrow1.show();
	jsav.umsg("8 is the element at current position to be deleted");
	//step 2
	jsav.step();
	
	
	arrIt.show();
	labelIt.show();
	jsav.effects.copyValue(arr, 3, arrIt, 0);
	jsav.umsg(" Copy  the  element to be deleted");
	//step 3
	jsav.step();

	// shift elements after current position one position to the left
	var i;
	for(i=4; i < itemsSize;i++)
	{

			jsav.effects.copyValue(arr, i, arr, i-1);
	}

	arr.css([itemsSize-1], {"background-color": "#eee"});
	arr.value(7,"");
	arrow2.show();
	arr.unhighlight([3]);
	jsav.umsg(" Shift all elements after current element one position to the left");
	//step 4
	jsav.step();
	
	arrow2.hide();
	arrIt.highlight([0]);
	jsav.umsg(" return the deleted element");
	//step 5
	jsav.step();
	jsav.recorded();

}(jQuery));
