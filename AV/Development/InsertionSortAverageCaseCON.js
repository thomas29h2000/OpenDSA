"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr;
  av = new JSAV("InsertionSortAverageCaseCON");
  code = av.code({url: "../../../SourceCode/Processing/Sorting/Insertionsort.pde",
            lineNumbers: true,
            startAfter: "/* *** ODSATag: Insertionsort *** */",
            endBefore: "/* *** ODSAendTag: Insertionsort *** */", top: 225, left: 150});
  av.displayInit();	
  av.umsg("When record $i$ is processed, the number of times through the inner for loop depends on how far out of order the record is");
  arr = av.ds.array(["0", "1", "...","i-1", "i","...", "n-1"], {"left":300, "top":20,"indexed":false});
  code.css(3, {"background-color":"#99FF00"});
  arr.highlight(4);
  av.step();
  av.umsg("The inner for loop is executed once for each value greater than the value of record $i$ that appears in positions $0$ to $i-1$");
  arr.css([0,1,2,3],{"background-color":"#00FA9A"});
  av.step();	
  av.umsg("To calculate the average cost, we want to determine what is the average number of inversions will be for the record in position $i$");
  code.css(3, {"background-color":"white"});
  av.step();	
  av.umsg("This can be calculated as:");
  var eq = av.label("$\\frac{\\displaystyle\\sum_{j=1}^{i}j}{i}$",  {"top": "-30px", "left": "15px"}).css({'font-size': '16px', "text-align": "left"});
  av.step();	
  av.umsg("And since this had to be done for the records from $1$ to $n-1$, then we have the total cost as:");
  eq.hide();
  eq = av.label
    ("$\\begin{eqnarray*}\\displaystyle\\sum_{i=1}^{n-1}\\frac{\\displaystyle\\sum_{j=1}^{i}j}{i}\\end{eqnarray*}$", {"top": "-30px", "left": "15px"}).css({'font-size': '16px', "text-align": "left"});
  var label = av.label("|----------- $n-1$ -------------|",  {"top": "85px", "left": "365px"}).css({'font-size': '20px', "text-align": "center"});
  code.css(2, {"background-color":"#99FF00"});
  arr.unhighlight(4);
  arr.css([0,1,2,3],{"background-color":"white"});
  av.step();
  av.umsg("This can be solved as:");
  var current_content = eq.text();
  var added_content = "&=&\\displaystyle\\sum_{i=1}^{n-1}\\frac{i+1}{2} \\\\";  
  var new_content = insert_equation(current_content, added_content);
  eq.hide();
  eq = av.label(new_content,  {"top": "-30px", "left": "15px"}).css({'font-size': '16px', "text-align": "left"});
  av.step();
  current_content = eq.text();
  added_content = "&=&\\frac{(n-1)(n+4)}{4}";
  new_content = insert_equation(current_content, added_content);
  eq.hide();
  eq = av.label(new_content,  {"top": "-30px", "left": "15px"}).css({'font-size': '16px', "text-align": "left"});
  av.step();
  av.umsg("Therefore, the average case running time of insertion sort is $\\theta(n^2)$");
  code.css(2, {"background-color":"white"});
  label.hide();
  av.recorded();
  function insert_equation(current, added){
    var new_equation;
    var end_index = current.indexOf("\\end{eqnarray*}");
	new_equation = current.substr(0, end_index)+ added + current.substr(end_index);
    return new_equation;	
  }
}(jQuery));
