"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr;
  av = new JSAV("QuickSortWorstCaseCON"); 
  av.umsg("Quicksort's worst case will occur when the pivot does a poor job of breaking the array, that is, when there are no records in one partition, and $n-1$ records in the other");
  av.displayInit();
  av.umsg("Let's start with an array of size $n$");
  av.g.rect(100, 0, 400, 30);
  av.label("$n$",  {"top": "-17px", "left": "300px"}).css({'font-size': '18px', "text-align": "center"});
  av.step();
  av.umsg("The pivot partitions the array into two parts one of size $0$ and the other of size $n-1$ ... This requires $n-1$ units of work");
  av.g.rect(100, 80, 400, 30);
  av.g.rect(100, 80, 20, 30);
  av.label("|-----------------------------  $> A[pivot]$  ---------------------------|",  {"top": "40px", "left": "120px"}).css({'font-size': '14px', "text-align": "center"});
  av.label("pivot",  {"top": "74px", "left": "98px"}).css({'font-size': '11px', "text-align": "center"}).addClass("rotated");
  av.label("$n-1$",  {"top": "67px", "left": "270px"}).css({'font-size': '18px', "text-align": "center"});
  av.label("$n-1$",  {"top": "67px", "left": "600px"}).css({'font-size': '18px', "text-align": "center"});
  av.label("<b><u>Amount Of Work</b></u>",  {"top": "-17px", "left": "580px"}).css({'font-size': '18px', "text-align": "center"});
  av.step();
  av.umsg("For the $n-1$ partition, the pivot breaks it into two parts one of size $0$ and the other of size $n-2$ ... This requires $n-2$ units of work");
  av.g.rect(120, 160, 380, 30);
  av.g.rect(120, 160, 20, 30);
  av.label("|---------------------------  $> A[pivot]$  -------------------------|",  {"top": "120px", "left": "140px"}).css({'font-size': '14px', "text-align": "center"});
  av.label("pivot",  {"top": "154px", "left": "118px"}).css({'font-size': '11px', "text-align": "center"}).addClass("rotated");
  av.label("$n-2$",  {"top": "147px", "left": "290px"}).css({'font-size': '18px', "text-align": "center"});
  av.label("$n-2$",  {"top": "147px", "left": "600px"}).css({'font-size': '18px', "text-align": "center"});
  av.step();
  av.umsg("For the $n-2$ partition, the pivot breaks it into two parts one of size $0$ and the other of size $n-3$ ... This requires $n-3$ amount of work");
  av.g.rect(140, 240, 360, 30);
  av.g.rect(140, 240, 20, 30);
  av.label("|-------------------------  $> A[pivot]$  -----------------------|",  {"top": "200px", "left": "160px"}).css({'font-size': '14px', "text-align": "center"});
  av.label("pivot",  {"top": "234px", "left": "138px"}).css({'font-size': '11px', "text-align": "center"}).addClass("rotated");
  av.label("$n-3$",  {"top": "227px", "left": "300px"}).css({'font-size': '18px', "text-align": "center"});
  av.label("$n-3$",  {"top": "227px", "left": "600px"}).css({'font-size': '18px', "text-align": "center"});
  av.step();
  av.umsg("In the last level, the pivot breaks a partition of size $2$ into two parts one of size $0$ and the other of size $1$ ... This requires a single unit of work");
  av.label("...",  {"top": "240px", "left": "470px"}).css({'font-size': '32px', "text-align": "center"}).addClass("rotated");
  av.label("...",  {"top": "240px", "left": "620px"}).css({'font-size': '32px', "text-align": "center"}).addClass("rotated");
  av.g.rect(460, 315, 40, 30);
  av.g.rect(460, 315, 20, 30);
  av.label("pivot",  {"top": "309px", "left": "458px"}).css({'font-size': '11px', "text-align": "center"}).addClass('rotated');
  av.label("$1$",  {"top": "302px", "left": "485px"}).css({'font-size': '18px', "text-align": "center"});
  av.label("$1$",  {"top": "302px", "left": "620px"}).css({'font-size': '18px', "text-align": "center"});
  av.step();
  av.umsg("Thus, the total amount of work is determined by the summation $\\displaystyle\\sum_{i=1}^{n-1}i$");
  av.label("|------------------- $n-1$ -------------------|", 
  {"top": "180px", "left": "550px"}).css({'font-size': '16px', "text-align": "center"}).addClass("rotated");
  av.step();
  av.umsg("Therefore, the worst case running time of Quicksort is $\\theta(n^2)$");
  av.recorded();
}(jQuery));
