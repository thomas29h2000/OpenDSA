"use strict";
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// The various arrays to start sweeps with or display
var tempArr = [10];
// List node width = min-width + padding-right
var nodeWidth = 42;
var nodeGap = 25;

// Diagram showing node concept
(function ($) {
  var jsav = new JSAV("listLinkedNodeCON", {"animationMode": "none"});
  var l = jsav.ds.list({"nodegap": 30, "top": 50, left: 350});

  // Relative offsets
  var labelLeftMargin = 350;
  var labelTopMargin = 10;

  var nodeLabel = jsav.label("nodes",
                    {before: l, left: labelLeftMargin + 70, top: labelTopMargin});
  var node1Arrow = jsav.g.line(labelLeftMargin + 75, labelTopMargin + 20,
                              labelLeftMargin + 15, labelTopMargin + 35,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 1});

  var node2Arrow = jsav.g.line(labelLeftMargin + 90, labelTopMargin + 20,
                              labelLeftMargin + 90, labelTopMargin + 35,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 1});

  var node3Arrow = jsav.g.line(labelLeftMargin + 105, labelTopMargin + 20,
                              labelLeftMargin + 165, labelTopMargin + 35,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 1});

  l.addFirst("").addFirst("").addFirst("");
  l.layout();
}(jQuery));


//Linked list insertion
(function ($) {
  var av = new JSAV("listLinkedCON1");
  //pseudocode
  var pseudo = av.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListInsert *** */",
                       endBefore: "/* *** ODSAendTag: LListInsert *** */"});
  // Left margin of the JSAV List
  var leftMargin = 5;
  // Create an list object under control of JSAV library
  var l = av.ds.list({"nodegap": 25, "center": false, left: leftMargin});
  
  //create two hidden arrays for ".copyValue" animation
  tempArr[0] = ""; 
  var arr = av.ds.array(tempArr, 
            {indexed: true, layout: "array"});
  arr.hide();  
  var cpyArr = [10]; 
  var arr1 = av.ds.array(cpyArr, 
            {indexed: true, layout: "array"});
  arr1.hide();

  //initialize the link list
  av.umsg("The linked list before insertion");
  l.addFirst("15")
   .addFirst(12)
   .addFirst(23)
   .addFirst("20");
  l.layout();
  l.css({top: 50, left: leftMargin});

  //Left margin of bar1
  var bar1Offset = leftMargin + 2 * nodeWidth + 1.5 * nodeGap;
  //Vertical bar in 1st, 2nd, 3rd and 4th step
  var bar1 = av.g.line(bar1Offset, 50, bar1Offset, 80,
		{"stroke-width": 1, "stroke":"#000"});
  //Left margin of "label"
  var labelOffset = leftMargin + nodeWidth * 2 + nodeGap - 4;
  var labelLeftMargin = leftMargin + nodeWidth + 10;
  //Label "curr" and arrow in 1st step
  var label = av.label("curr", 
	          {before: arr, left: labelLeftMargin, top: 3, "font-size":"20px"});
  var arrowLeftMargin = labelLeftMargin + 12;
  //Arrow pointing to "curr" in 1st step
  var arrow = av.g.line(arrowLeftMargin, 25, arrowLeftMargin + 20, 45,
	          {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  
  //Left margin of arrow2 object
  var arrow2LeftMargin = leftMargin + nodeWidth * 2 + nodeGap - 2;
  //Horizontal arrow in the 4rd step
  var arrow2= av.g.line(arrow2LeftMargin, 65, arrow2LeftMargin + 93, 65,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});

  //Left margin of bar2 in step 4
  var bar2LeftMargin = bar1Offset;
  //Vertical bar in 4th step
  var bar2 = av.g.line(bar2LeftMargin, 80, bar2LeftMargin, 110,
	         {"stroke-width": 1, "stroke":"#000"});	
  bar2.hide();
  pseudo.highlight(1);
  av.displayInit();
    
  //step 2
  var n3 = l.newNode("");	
  // Set the position for the new node
  n3.css({top: 60, left: nodeWidth * 2 + nodeGap - 7}); 
  av.umsg("create a new link node");
  //Copy 10 to the new link node   
  av.effects.copyValue(arr, 0, n3);
  n3.highlight();
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  av.step();
  
    //step 3
  av.umsg("copy current.element() to the new node");
  //Copy 10 to the new link node   
  av.effects.copyValue(l.get(1), n3);
  av.step();

  //step 4
  var node = l.get(1).next();    
  l.get(1).edgeToNext().hide();
  l.get(1).next(n3);	
  n3.next(node);
  n3.unhighlight();
  l.layout({updateTop: false}); // control that top coordinate of nodes should not be recalculated
  l.css({left: leftMargin});  
  l.get(3).highlight();  
  arrow2.show();
  av.umsg(" the next field of the new list node is assigned to point to the current node (the one after the node that curr points to).");
  av.step();

  //step 5
  l.get(1).highlight();
  l.get(3).unhighlight();
  l.get(1).next(n3).edgeToNext().show();	
  arrow2.hide();
  bar1.hide();
  bar2.show();
  av.umsg("the next field of node pointed to by curr is assigned to point to the newly inserted node.");
  av.step();

  //step 6
  l.get(1).unhighlight();
  bar2.hide();
  bar1.show();    
  n3.css({top: 0});
  l.get(2).highlight();
  av.umsg("The new link node is in its correct position in the list");
  l.layout();
  av.step();

  //step 7
  av.effects.copyValue(arr1, 0, l.get(2));
  //l.layout();
  av.umsg("The value of the new link node is set to 10");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  av.step();

  //step 8
  av.umsg("Increase the list size by 1");
  l.get(2).unhighlight();
  pseudo.unhighlight(3);
  pseudo.highlight(5);
  av.step();
  av.recorded();
}(jQuery));

//Linked list deletion
(function ($) {
  var av = new JSAV("listLinkedCON2");
  //pseudocode
  var pseudo = av.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListRemove *** */",
                       endBefore: "/* *** ODSAendTag: LListRemove *** */"});
  // Left margin of the JSAV List
  var leftMargin = 5;
  var l = av.ds.list({"nodegap": 25, "center": false, "left": leftMargin});
  //create a the hidden array
  var arr = av.ds.array(tempArr, {indexed: true, layout: "array"});
  arr.hide();

  //Left margin of bar1 in step 1
  var bar1LeftMargin = leftMargin + nodeWidth * 2 + nodeGap * 1.5;
  //vertical bar in 1st step
  var bar1 = av.g.line(bar1LeftMargin, 50, bar1LeftMargin, 80,
	         {"stroke-width": 1, "stroke":"#000"});

  //Left margin of label in step 1
  var labelLeftMargin = leftMargin + nodeWidth + 10;
  //label "curr" and arrow in the 1st step
  var label = av.label("curr", 
	          {before: arr, left: labelLeftMargin, top: 0, "font-size":"20px"});
  //Left margin of arrow in step 1
  var arrowLeftMargin = labelLeftMargin + 12;
  //arrow pointing to "curr" in the 1st step
  var arrow = av.g.line(arrowLeftMargin, 25, arrowLeftMargin + 20, 45,
	          {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Left margin of labelIt in the 3rd step
  var labelItLeftMargin = leftMargin + nodeGap + nodeWidth * 2 - 40;
  //label "it" and arrow in the 3rd step
  var labelIt = av.label("it", 
	            {before: arr, left: labelItLeftMargin, top: 104, "font-size":"20px"});
  //Left margin of arrowIt the 3rd step
  var arrowItLeftMargin = labelItLeftMargin + 18;
  var arrowIt = av.g.line(arrowItLeftMargin, 105, arrowItLeftMargin + 50, 75,
	            {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  labelIt.hide();
  //Left margin of dashline in the 4th step
  var dashlineLeftMargin = leftMargin + nodeGap + nodeWidth * 2 - 3;
  //dashline in the 4th step
  var dashline = av.g.polyline([[dashlineLeftMargin, 66], 
	  [dashlineLeftMargin + 13, 66], [dashlineLeftMargin + 13, 30],[dashlineLeftMargin + 83,30],[dashlineLeftMargin + 83,66],[dashlineLeftMargin + 101,66]], {"arrow-end":"classic-wide-long", "opacity":0, "stroke-width":2,"stroke-dasharray":"-"});
  var bar4 = av.g.line(dashlineLeftMargin + 23, 15, dashlineLeftMargin + 23, 45,
	         {"stroke-width": 1, "stroke":"#000"});
  bar4.hide();
	
  //Left Margin of arrowIt1 in the 5th step
  var arrowIt1LeftMargin = labelItLeftMargin + 15 ;
  //arrow pointing to 10 in the 5th step
  var arrowIt1 = av.g.line(arrowIt1LeftMargin, 115, arrowIt1LeftMargin + 20, 115,
	             {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});

  //initialize the linked list
  av.umsg("The linked list before deletion");
  l.addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst("20");
  l.layout();
  l.css({top: 50});
	
  //create new node 10
  var n3 = l.newNode("10");
  n3.highlight();
  n3.css({left: 105, top: 50}); 
  n3.hide();
  pseudo.highlight(1);
  av.displayInit(); 

  //step 2
  l.get(2).highlight();
  l.layout({updateLeft: false});
  av.umsg("10 is the current node to be deleted");
  av.step(); 

  //step 3
  labelIt.show();
  arrowIt.show();
  av.umsg("Remember the value by setting \"it\" to point to the element");
  pseudo.unhighlight(1);
  pseudo.highlight(3);
  av.step();

  //step 4
  l.get(1).edgeToNext().hide();
  l.get(2).edgeToNext().hide();
  bar1.hide();
  dashline.show();
  bar4.show();
  av.umsg(" The next field of the preceding list node is set to point to the node following the one being deleted");	
  pseudo.unhighlight(3);
  pseudo.highlight(6);
  av.step();	

  ////step 5
  l.remove(2);
  dashline.hide();
  bar4.hide();
  arrowIt.hide();
  bar1.show();  
  l.layout();
  l.get(1).edgeToNext().show();
  arrowIt1.show();
  n3.show();
  n3.hide();
  n3.show();
  av.umsg(" Finally, the node is removed from the linked list");
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  av.step();
  av.recorded();
}(jQuery));


// Initial state of a linked list when using a header node
(function ($) {
  var jsav = new JSAV("listLinkedInitCON", {"animationMode": "none"});
  var l = jsav.ds.list({"nodegap": 30, "top": 50, left: 367});

  // Relative offsets
  var labelLeftMargin = 350;
  var labelTopMargin = 10;

  var headLabel = jsav.label("head",
                    {before: l, left: labelLeftMargin, top: labelTopMargin});
  var headArrow = jsav.g.line(labelLeftMargin + 10, labelTopMargin + 20,
                              labelLeftMargin + 30, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  var currLabel = jsav.label("curr",
	  {before: l, left: labelLeftMargin + 70, top: labelTopMargin, "font-size":"20px"});
  //Curr arrow
  var currArrow = jsav.g.line(labelLeftMargin + 80, labelTopMargin + 20,
                              labelLeftMargin + 100, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Left margin of tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: labelLeftMargin + 120, top: labelTopMargin, "font-size":"20px"});
  //Tail arrow
  var tailArrow = jsav.g.line(labelLeftMargin + 130, labelTopMargin + 20,
                              labelLeftMargin + 110, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Diagonal slash
  var slash = jsav.g.line(labelLeftMargin + 125, labelTopMargin + 72,
                          labelLeftMargin + 135, labelTopMargin + 42,
	  {"opacity": 100,"stroke-width": 1});

  l.addFirst("")
   .addFirst("");
  l.layout();
  jsav.recorded();
}(jQuery));

// Bad representation version for linked list
(function ($) {
  var jsav = new JSAV("LlistBadCON");

  // Relative offsets
  var labelLeftMargin = 240;
  var labelTopMargin = 10;
  // Relative offsets for tail and slash in step 3
  var labelLeftMargin3 = labelLeftMargin -74;

  var l = jsav.ds.list({"nodegap": 30, "top": labelTopMargin + 40, left: labelLeftMargin + 17});

  var headLabel = jsav.label("head",
                    {before: l, left: labelLeftMargin, top: labelTopMargin});
  var headArrow = jsav.g.line(labelLeftMargin + 10, labelTopMargin + 20,
                              labelLeftMargin + 30, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  var currLabel = jsav.label("curr",
	  {before: l, left: labelLeftMargin + 150, top: labelTopMargin, "font-size":"20px"});
  //Curr arrow
  var currArrow = jsav.g.line(labelLeftMargin + 160, labelTopMargin + 20,
                              labelLeftMargin + 180, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Left margin of tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: labelLeftMargin + 300, top: labelTopMargin, "font-size":"20px"});
  //Tail arrow
  var tailArrow = jsav.g.line(labelLeftMargin + 310, labelTopMargin + 20,
                              labelLeftMargin + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Vertical bar
  var bar = jsav.g.line(labelLeftMargin + 145, labelTopMargin + 35,
                          labelLeftMargin + 145, labelTopMargin + 75,
	                      {"stroke-width": 1, "stroke":"#000"});
  //Diagonal slash
  var slash = jsav.g.line(labelLeftMargin + 346, labelTopMargin + 72,
                          labelLeftMargin + 356, labelTopMargin + 42,
	  {"opacity": 100,"stroke-width": 1});

  //Diagonal slash in step 3
  var slash3 = jsav.g.line(labelLeftMargin3 + 346, labelTopMargin + 72,
                          labelLeftMargin3 + 356, labelTopMargin + 42,
	  {"opacity": 0,"stroke-width": 1});

  //Label tail in step 3
  var tailLabel3 = jsav.label("tail",
	  {before: l, left: labelLeftMargin3 + 300, top: labelTopMargin, "font-size":"20px"}).hide();
  //Arrow tail in step 3
  var tailArrow3 = jsav.g.line(labelLeftMargin3 + 310, labelTopMargin + 20,
                              labelLeftMargin3 + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});

  l.addFirst(15)
   .addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst(20);
  l.layout();
  jsav.umsg("Here is a graphical depiction for a linked list storing five integers. The value stored in a pointer variable is indicated by an arrow \"pointing\" to something. A NULL pointer is indicated graphically by a diagonal slash through a pointer variable's box. The vertical line between the nodes labeled 23 and 10 indicates the current position (immediately to the right of this line).");
  jsav.displayInit();

  //step 2
  jsav.umsg("The list's first node is accessed from a pointer named head. To speed access to the end of the list, and to allow the append method to be performed in constant time, a pointer named tail is also kept to the last link of the list. The position of the current element is indicated by another pointer, named curr.");
  jsav.step();

  //step 3
  l.remove(2);
  l.layout();
  slash.hide();
  tailLabel.hide();
  tailArrow.hide();
  slash3.show();  
  tailLabel3.show();
  tailArrow3.show();
  jsav.umsg("Here is what we would like to have happen when we delete the current node (the one with value 10).");
  jsav.step();
  jsav.recorded();
}(jQuery));

// Bad Reason for the problem representation version of linked list
(function ($) {
  var jsav = new JSAV("LlistBadReasonCON");

  // Relative offsets
  var labelLeftMargin = 240;
  var labelTopMargin = 10;
  // Relative offsets for tail and slash in step 5
  var labelLeftMargin5 = labelLeftMargin -74;

  // Linked list
  var l = jsav.ds.list({"nodegap": 30, "top": labelTopMargin + 40, left: labelLeftMargin + 17});
  
  //Hiddent JSAV array for animation
  tempArr[0] = ""; 
  var arr = jsav.ds.array(tempArr, 
            {indexed: false, layout: "array", left:0}).hide();

  var headLabel = jsav.label("head",
                    {before: l, left: labelLeftMargin, top: labelTopMargin});
  var headArrow = jsav.g.line(labelLeftMargin + 10, labelTopMargin + 20,
                              labelLeftMargin + 30, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  var currLabel = jsav.label("curr",
	  {before: l, left: labelLeftMargin + 150, top: labelTopMargin, "font-size":"20px"});
  //Curr arrow
  var currArrow = jsav.g.line(labelLeftMargin + 160, labelTopMargin + 20,
                              labelLeftMargin + 180, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Left margin of tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: labelLeftMargin + 300, top: labelTopMargin, "font-size":"20px"});
  //Tail arrow
  var tailArrow = jsav.g.line(labelLeftMargin + 310, labelTopMargin + 20,
                              labelLeftMargin + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Vertical bar
  var bar = jsav.g.line(labelLeftMargin + 145, labelTopMargin + 35,
                          labelLeftMargin + 145, labelTopMargin + 75,
	                      {"stroke-width": 1, "stroke":"#000"});
  //Diagonal slash
  var slash = jsav.g.line(labelLeftMargin + 346, labelTopMargin + 72,
                          labelLeftMargin + 356, labelTopMargin + 42,
	  {"opacity": 100,"stroke-width": 1});
  //dash line in step 4
  var dashlineLeftMargin = 452
  var dashline = jsav.g.polyline([[dashlineLeftMargin, 66], 
	  [dashlineLeftMargin + 13, 66], [dashlineLeftMargin + 13, 30],[dashlineLeftMargin + 83,30],[dashlineLeftMargin + 83,66],[dashlineLeftMargin + 101,66]], {"arrow-end":"classic-wide-long", "opacity":0, "stroke-width":2,"stroke-dasharray":"-"});
  
  //Diagonal slash in step 5
  var slash5 = jsav.g.line(labelLeftMargin5 + 346, labelTopMargin + 72,
                          labelLeftMargin5 + 356, labelTopMargin + 42,
	  {"opacity": 0,"stroke-width": 1});

  //Label tail in step 5
  var tailLabel5 = jsav.label("tail",
	  {before: l, left: labelLeftMargin5 + 300, top: labelTopMargin, "font-size":"20px"}).hide();
  //Arrow tail in step 5
  var tailArrow5 = jsav.g.line(labelLeftMargin5 + 310, labelTopMargin + 20,
                              labelLeftMargin5 + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  //Label tail in step 6
  var tailLabel6 = jsav.label("tail",
	  {before: l, left: labelLeftMargin5 + 340, top: labelTopMargin, "font-size":"20px"}).hide();
  //Arrow tail in step 6
  var tailArrow6 = jsav.g.line(labelLeftMargin5 + 350, labelTopMargin + 20,
                              labelLeftMargin5 + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity":	0,"stroke-width": 2});

  l.addFirst(15)
   .addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst(20);
  l.layout();
  jsav.umsg("Another problem is that we have no link for the preceding node. Often we can get around this problem during deletion by copying the next value into the current node. Lets look again at the example where we delete value 10.");
  jsav.displayInit();
  
  //step 2
  l.get(2).value("");
  l.get(2).highlight();
  jsav.umsg("First we remove the value 10 from the current node.");
  jsav.step();
  
  //step 3
  jsav.effects.moveValue(l.get(3), l.get(2));
  jsav.umsg(" Now we move the next value (12) to the current node).");
  jsav.step();

  //step 4
  dashline.show();
  l.get(2).edgeToNext().hide();
  l.get(3).edgeToNext().hide();
  l.get(2).unhighlight();
  l.get(3).highlight();
  jsav.umsg("  Now we can route around the uneeded node.");
  jsav.step();

  //step 5
  dashline.hide();
  l.remove(3);
  l.get(2).edgeToNext().show();
  tailLabel.hide();
  tailArrow.hide();
  tailLabel5.show();
  tailArrow5.show();
  slash.hide();
  slash5.show();
  l.layout();
  jsav.umsg("  The node with a value of 10 is removed from the list. Unfortunately, this approach does not work when the current node is the last one on the list.");
  jsav.step();

  //step 6
  currLabel.hide();
  currArrow.hide();
  tailLabel5.text("curr");
  tailLabel6.show();
  tailArrow6.show();
  l.get(3).highlight();
  jsav.umsg(" As in this example. There is no way to update the \"next\" pointer of the node with value 15. There is no way around this problem with the list as shown here.");
  jsav.step();
  jsav.recorded();
}(jQuery));

// List with header and tailer nodes added
(function ($) {
  var jsav = new JSAV("listLinkedHeaderTailerCON", {"animationMode": "none"});

  // Relative offsets
  var labelLeftMargin = 163;
  var labelTopMargin = 10;

  var l = jsav.ds.list({"nodegap": 30, "top": labelTopMargin + 40, left: labelLeftMargin + 17});

  var headLabel = jsav.label("head",
                    {before: l, left: labelLeftMargin, top: labelTopMargin});
  var headArrow = jsav.g.line(labelLeftMargin + 10, labelTopMargin + 20,
                              labelLeftMargin + 30, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  var currLabel = jsav.label("curr",
	  {before: l, left: labelLeftMargin + 150, top: labelTopMargin, "font-size":"20px"});
  //Curr arrow
  var currArrow = jsav.g.line(labelLeftMargin + 160, labelTopMargin + 20,
                              labelLeftMargin + 180, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Left margin of tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: labelLeftMargin + 445, top: labelTopMargin, "font-size":"20px"});
  //Tail arrow
  var tailArrow = jsav.g.line(labelLeftMargin + 455, labelTopMargin + 20,
                              labelLeftMargin + 475, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Vertical bar
  var bar = jsav.g.line(labelLeftMargin + 145, labelTopMargin + 35,
                          labelLeftMargin + 145, labelTopMargin + 75,
	                      {"stroke-width": 1, "stroke":"#000"});
  //Diagonal slash
  var slash = jsav.g.line(labelLeftMargin + 494, labelTopMargin + 72,
                          labelLeftMargin + 504, labelTopMargin + 42,
	  {"opacity": 100,"stroke-width": 1});

  l.addFirst("")
   .addFirst(15)
   .addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst(20)
   .addFirst("");
  l.layout();
  jsav.recorded();
}(jQuery));

// Show off the data members
(function ($) {
  var jsav = new JSAV("LlistVarsCON");	
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                        lineNumbers: false,
                        startAfter: "/* *** ODSATag: LListVars *** */",
                        endBefore: "/* *** ODSAendTag: LListVars *** */"});
  jsav.umsg("Let's take a look at the data members for class <code>LList</code>.");
  jsav.displayInit();

  jsav.umsg("First, notice that class <code>LList</code> implements the <code>List</code> interface. This means that <code>LList</code> is required to give implementations for all of the methods listed as part of the <code>List</code> interface.");
  pseudo.highlight(0);
  jsav.step();

  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.umsg("The first of the private data members is <code>head</code>, the first node of the list. This header node is a link node like any other, but its value is ignored and it is not considered to be an actual element of the list.");
  jsav.step(); 
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.umsg("The second of the private data members is <code>tail</code>, the last node of the list. This tailer node is a link node like any other, but its <code>next</code> field is set to <code>null</code>, pointing to nowhere.");
  jsav.step();
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.umsg("The data member <code>curr</code> is the current node of the list. It could be any node on the list, except the <code>head</code> node.");
  jsav.step();
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.umsg(" Since there is no simple way to compute the length of the list simply from these three pointers, the list length will be stored explicitly, and updated by every operation that modifies the list size. The value cnt stores the length of the list.");
  jsav.step();
  pseudo.unhighlight(4);
  jsav.umsg("Because <code>head</code>, <code>tail</code>, and <code>cnt</code> are all declared to be <code>private</code>, they may only be accessed by methods of Class <code>LList</code>. Since <code>curr</code> is a protected data member, it can only be accessed by Class or Subclass of LList.");
  jsav.recorded();
}(jQuery));