//init for the exercise
var init = function()
{
    //var good = false;
    //while(good === false)
    //{
        //try to clean everything
        if(dynTable !== undefined)
        {
            for(i = 0; i < dynTable.length; i++)
            {
                dynTable[i].hide();
                dynTable[i].clear();
            }
        }
        if(itemTable !== undefined)
        {
            for(i = 0; i < itemTable.length; i++)
            {
                itemTable[i].hide();
                itemTable[i].clear();
            }
        }
        if(valueList !== undefined)
        {
            valueList.hide();
            valueList.clear();
        }
        if(tableSel !== undefined)
        {
            tableSel.value(null);
        }
        if(tableSelRow !== undefined)
        {
            tableSel.value(-1);
        }
        if(tableSelCol !== undefined)
        {
            tableSel.value(-1);
        }
        if(listSel !== undefined)
        {
            listSel.value(null);
        }
        if(itemLabel !== undefined)
        {
            itemLabel.hide();// = jsav.label("item");
            weightLabel.hide();// = jsav.label("weight");
            valueLabel.hide();// = jsav.label("value");
            choiceLabel.hide();
        }
        dynTable = [];
        itemTable = [];
        startDynTable = [];
        startValueList = [];
        curValue = 0;
        weight = [];
        number = [];
        value = [];
        numItems = randomInt(3, 4);
        tableSel = jsav.variable(null);
        tableSelRow = jsav.variable(-1);
        tableSelCol = jsav.variable(-1);
        listSel = jsav.variable(-1);
        //generate items
        capacity = randomInt(5, 8);        
        for(i = 0; i < numItems; i++)
        {
            if(i >= Math.floor(numItems/2))
            {
                weight[i] = Math.floor(Math.random()*(Math.floor(capacity/1.5)))+1;
            }
            else
            {
                weight[i] = Math.floor(Math.random()*6)+1;
            }
            number[i] = i+1;
            value[i] = Math.floor(Math.random()*5)+1;
        }
        itemTable[0] = jsav.ds.array(number, {centered:false, left:50, top:0});
        itemTable[1] = jsav.ds.array(weight, {centered:false, left:50, top:40});
        itemTable[2] = jsav.ds.array(value, {centered:false, left:50, top:80});
        itemLabel = jsav.label("item", {left:(60 + 40 * itemTable[0].size()), top:10});
        weightLabel = jsav.label("weight", {left:(60 + 40 * itemTable[0].size()), top:50});
        valueLabel = jsav.label("value", {left:(60 + 40 * itemTable[0].size()), top:90});
        
        //initalize dynTable
        var row = [];
        for(i = 0; i <= numItems; i++)
        {
            row = [];
            if(i == 0)
            {
                for(j = 0; j <= capacity; j++)
                {
                    row[j] = 0; 
                }
            }
            else
            {
                for(j = 0; j <= capacity; j++)
                {
                    if(j == 0)
                        row[j] = 0;
                    else
                        row[j] = "";
                }
            }
            dynTable[i] = jsav.ds.array(row);
            dynTable[i].click(genDynClickFunction(i));
            //dynTable[i].click(clickDynTable);
        }
        fillTableComplete(dynTable, itemTable);
        clearCells(dynTable, itemTable, numItems, capacity);

        //store the starting table for later use by model answer
        startDynTable = [];
        for(i = 0; i < dynTable.length; i++)
        {
            var row;
            row = [];
            for(j = 0; j < dynTable[i].size(); j++)
            {
                row[j] = dynTable[i].value(j);
            }
            startDynTable[i] =row;
        }

        valueList = jsav.ds.array(startValueList, {top: (-50)});
        //console.log(parseInt(valueList.css("left")));
        choiceLabel = jsav.label("choices", {top:-40, left:(parseInt(valueList.css("left")) - 60)});
        valueList.click(clickValueList);
        //if(valueList.size() <= 12 && valueList.size() >= 8)
        //    good = true; 
    //}
    return dynTable;
}

//lets model the answer for the students
var modelAnswer = function(jsav)
{
    //build the structures needed the visualization
    var dynTable = []; //the dynamic table
    for(i = 0; i < startDynTable.length; i++)
    {
        dynTable[i] = jsav.ds.array(startDynTable[i]);
    }
    var itemTable = []; //the item table
    itemTable[0] = jsav.ds.array(number, {centered: false, top: 20, left:20});
    itemTable[1] = jsav.ds.array(weight, {centered: false, top: 60, left:20});
    itemTable[2] = jsav.ds.array(value,  {centered: false, top: 100,left:20});
    var valueList = jsav.ds.array(startValueList, {top: -50});//the value choice list

    //all the datastructures are setup, now it's time to solve this
    solveTable(jsav, dynTable, itemTable, valueList, numItems, capacity);
    return dynTable;//return the array of tables
}

//recurcive helper to model the answer for the modeAnswer function
var solveTable = function(jsav, dynTable, itemTable, valueList, n, w)
{
    var val, i;
    var highlight;
    if(n === 0 || w === 0 || dynTable[n].value(w) !== "-")
    {
        return;
    }
    else if(w < itemTable[1].value(n-1))
    {
        solveTable(jsav, dynTable, itemTable, valueList, n-1, w);
        val = dynTable[n-1].value(w);
    }
    else
    {
        solveTable(jsav, dynTable, itemTable, valueList, n-1, w-itemTable[1].value(n-1))
        solveTable(jsav, dynTable, itemTable, valueList, n-1, w);
        val = Math.max(dynTable[n-1].value(w),
                     dynTable[n-1].value(w-itemTable[1].value(n-1)) +
                                        itemTable[2].value(n-1));
    }
    //highlight the array element
    for(i = 0; i < valueList.size(); i++)
    {
        if(valueList.value(i) == val)
        {
            valueList.css(i, {"background-color": "yellow"});              
            highlight = i;
            i = 1000;
        }
    }
    jsav.step();  
    
    //remove the element from the table
    //delShiftLeft(valueList, highlight);
    valueList.value(highlight, "-");

    dynTable[n].value(w, val);
    valueList.css(highlight, {"background-color": "white"}); //unhighlight
    //console.log("highlight: " + highlight);
    jsav.stepOption("grade", true);
    jsav.step();
}

//give parameters for a call to knapsack, and blank out
//cells that the call would use.
var clearCells = function(dynTable, itemTable, n, w)
{
    if(n > 0 && w > 0 && dynTable[n].value(w) != "-")
    {
        startValueList[curValue++] = dynTable[n].value(w);
        dynTable[n].value(w, "-");//clear the value
        if(itemTable[1].value(n-1) > w)
        {
            //console.log("call: (" + (n-1) + ", " + w + ")"); //DEBUG
            clearCells(dynTable, itemTable, n-1, w);
        }
        else
        {
            //console.log("call: (" + (n-1) + ", " + (w-itemTable[1].value(n-1)) + ")"); //DEBUG
            clearCells(dynTable, itemTable, n-1, w-itemTable[1].value(n-1));
            //console.log("call: (" + (n-1) + ", " + w + ")"); //DEBUG
            clearCells(dynTable, itemTable, n-1, w);
        }
    }
}

var clickValueList = function(index)
{
    if(listSel.value() === index)//deselect case
    {
        valueList.css(index, {"background-color":"white"});
        listSel.value(-1);
    }
    else if(valueList.value(index) !== "-")//if the cell is selectable
    {
        if(tableSelRow.value() === -1)//no value from dyntable selected yet
        {
            if(listSel.value() === -1)//no other selected row in dynTable
            {
                valueList.css(index, {"background-color":"yellow"});
                listSel.value(index);
            }
            else//there is another selected value in valueList
            {
                valueList.css(listSel.value(), {"background-color":"white"});
                listSel.value(index);
                valueList.css(index, {"background-color":"yellow"});
            }
        }
        else//value from dynTable already selected
        {
            //copy value over and clear selected values
            dynTable[tableSelRow.value()].value(tableSelCol.value(), valueList.value(index));
            valueList.value(index, "-");
            dynTable[tableSelRow.value()].css(tableSelCol.value(), {"background-color":"white"});
            listSel.value(-1);
            tableSelRow.value(-1);
            tableSelCol.value(-1);
            exercise.gradeableStep();
        }
    }
}

var genDynClickFunction = function(offset)
{
    return function(index)
    {
        if(tableSelRow.value() === offset &&
           tableSelCol.value() === index)//deselect case
        {
            dynTable[offset].css(index, {"background-color":"white"});
            tableSelRow.value(-1);
            tableSelCol.value(-1);
        }
        else if(dynTable[offset].value(index) === "-")//if the cell is selectable
        {
            if(listSel.value() === -1)//no value from valulist selected yet
            {
                if(tableSelRow.value() === -1)//no other selected row in dynTable
                {
                    tableSelRow.value(offset);
                    tableSelCol.value(index);
                    dynTable[offset].css(index, {"background-color":"yellow"});
                }
                else//there is another selected row in dyntable
                {
                    dynTable[tableSelRow.value()].css(tableSelCol.value(), {"background-color":"white"});
                    tableSelRow.value(offset);
                    tableSelCol.value(index);
                    dynTable[offset].css(index, {"background-color":"yellow"});
                }
            }
            else//value from valuelist already selected
            {
                //copy value over and clear selected values
                dynTable[offset].value(index, valueList.value(listSel.value()));
                valueList.value(listSel.value(), "-");
                valueList.css(parseInt(listSel.value()), {"background-color":"white"});
                listSel.value(-1);
                tableSelRow.value(-1);
                tableSelCol.value(-1);
                exercise.gradeableStep();
            }
        }
    }
}

var randomInt = function(a, b)
{
    return Math.floor(Math.random()*(b-a+1)) + a;
}