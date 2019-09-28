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
    // create two cells/col - one to display the checkbox and otherone to display the text
    cell1 = document.createElement("td");
    cell2 = document.createElement("td");
    //create a checkbox to insert in cell1
     // creating checkbox element 
    var checkbox = document.createElement('input'); 
    // Assigning the attributes 
    // to created checkbox 
    
    checkbox.type = "checkbox"; 
    //Create a textnode to insert in cell2
    var newToDoList = document.createTextNode(toDoText);
    cell2.appendChild(newToDoList);
    row.appendChild(checkbox);
    row.appendChild(cell2)

    toDoListTable.appendChild(row);
     
}




//after that build a dynamic table and update the todo list without deleting the old one