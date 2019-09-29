console.log('it\'s working!!!')
const addDataBtn = document.getElementById('add-data-btn')
const toDoListTable = document.getElementById('todo-list-table')

addDataBtn.onclick = function(event) {
    console.log('add data button was clicked');
    getToDoData();
}

//function to read the data from input text box
function getToDoData(){
    var str = document.getElementById('todo-text').value;
    
    if( str.length != 0){
    console.log("text val="+ str + str.length);
    addToDoListTable(str)
    }
    else{
        console.log("text is null");
    }

}

//function to add to the List Table
function addToDoListTable(toDoText){
    // Create a table row to append
    row=document.createElement("tr");
    // create three cells/col - one to display the checkbox, 2nd to display the text and 3rd to display the remove button
    //cell1 = document.createElement("td");
    cell2 = document.createElement("td");
    cell3 = document.createElement("td");
    //create a checkbox to insert in cell1
     // creating checkbox element 
    var checkbox = document.createElement('input'); 
    // Assigning the attributes 
    // to created checkbox 
    checkbox.type = "checkbox"; 
    row.appendChild(checkbox);
    

    //Create a textnode to insert in cell2
    var newToDoList = document.createTextNode(toDoText);
    cell2.appendChild(newToDoList);
    row.appendChild(cell2);

    //add the remove button
    
    var btnRemove= document.createElement('input');
    btnRemove.setAttribute('type','button');
    btnRemove.setAttribute('name','Remove');
    btnRemove.setAttribute('value','Remove');
    btnRemove.setAttribute('onclick', 'removeRow(this)');
    cell3.appendChild(btnRemove);
    row.appendChild(cell3);
     toDoListTable.appendChild(row);
     
}

 // DELETE TABLE ROW.
 function removeRow(oButton) {
    var empTab = document.getElementById('todo-list-table');
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex);       // BUTTON -> TD -> TR.
}





//after that build a dynamic table and update the todo list without deleting the old one