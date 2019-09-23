console.log('it\'s working!!!')
const addDataBtn = document.getElementById('add-data-btn')
const toDoListTable = document.getElementById('todo-list-table')

addDataBtn.onclick = function(event) {
    console.log('add data button was clicked');
    getToDoData();
}

//function to read the data from input text box
function getToDoData(){
    var toDoText = document.getElementById('todo-text').value;
    console.log(toDoText);
    addToDoListTable(toDoText)

}

function addToDoListTable(toDoText){
    row=document.createElement("tr");
    cell1 = document.createElement("td");
    var newToDoList = document.createTextNode(toDoText);
    cell1.appendChild(newToDoList);
    row.appendChild(cell1);
    toDoListTable.appendChild(row);

}


//after that build a dynamic table and update the todo list without deleting the old one