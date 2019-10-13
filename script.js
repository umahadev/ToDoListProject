console.log('it\'s working!!!');

var todos = [];

document.getElementById("todo-list-table").addEventListener("load", populateToDoTable);

function populateToDoTable() {

    if (window.localStorage.length > 0) {
        //console.log("table on load function is called");
        //console.log(window.localStorage);
        var retriveToDos = window.localStorage.getItem('todoItem');
        var oldToDos = JSON.parse(retriveToDos);

        //console.log("from table - first time " + oldToDos);

        for (let todo of oldToDos) {
            console.log("printing =>" + todo.text + "=>" + todo.accomplished);

            row = document.createElement("tr");
            // create three cells/col - one to display the checkbox, 2nd to display the text and 3rd to display the remove button
            cell1 = document.createElement("td"); //Checkbox
            cell2 = document.createElement("td"); //to do task
            cell3 = document.createElement("td"); //remove button
            // creating checkbox element 
            var checkBox = document.createElement('input');
            checkBox.type = "checkbox";
            checkBox.setAttribute('id', 'chkbox');
            checkBox.setAttribute('onclick', 'strikeOrUnStrike(this)');
            if (todo.accomplished) {
                checkBox.checked = true;
            }
            cell1.appendChild(checkBox)
            row.appendChild(cell1);

            //Create a textnode to insert in cell2

            var newToDoList = document.createTextNode(todo.text);
            cell2.appendChild(newToDoList);
            if (todo.accomplished) {
                cell2.innerHTML = '<strike>' + todo.text + '</strike>';
            }
            row.appendChild(cell2);

            //add the remove button
            var btnRemove = document.createElement('input');
            btnRemove.setAttribute('type', 'button');
            btnRemove.setAttribute('name', 'Remove');
            btnRemove.setAttribute('value', 'Remove');
            btnRemove.setAttribute('onclick', 'removeRow(this)');
            cell3.appendChild(btnRemove);
            row.appendChild(cell3);
            var toDoTab = document.getElementById('todo-list-table');
            toDoTab.appendChild(row);
            todos.push({
                text: todo.text,
                accomplished: todo.accomplished,
            })
        }
    }
}
const addDataBtn = document.getElementById('add-data-btn');
addDataBtn.onclick = function(event) {
    console.log('add data button was clicked');
    getToDoData();
}

var input = document.getElementById("todo-text");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("add-data-btn").click();
    }
});


//function to read the data from input text box
function getToDoData() {
    var str = document.getElementById('todo-text').value;

    if (str.length != 0) {
        console.log("text val=" + str);
        addToDoListTable(str)
    } else {
        console.log("text is null");
    }

}


//function to add to the List Table
function addToDoListTable(toDoText) {
    // Create a table row to append
    row = document.createElement("tr");
    // create three cells/col - one to display the checkbox, 2nd to display the text and 3rd to display the remove button
    cell1 = document.createElement("td"); //Checkbox
    cell2 = document.createElement("td"); //to do task
    cell3 = document.createElement("td"); //remove button

    // creating checkbox element 
    var checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.setAttribute('id', 'chkbox');
    checkBox.setAttribute('onclick', 'strikeOrUnStrike(this)');
    cell1.appendChild(checkBox)
    row.appendChild(cell1);


    //Create a textnode to insert in cell2
    var newToDoList = document.createTextNode(toDoText);
    cell2.appendChild(newToDoList);
    row.appendChild(cell2);

    //add the remove button
    var btnRemove = document.createElement('input');
    btnRemove.setAttribute('type', 'button');
    btnRemove.setAttribute('name', 'Remove');
    btnRemove.setAttribute('value', 'Remove');
    btnRemove.setAttribute('onclick', 'removeRow(this)');
    cell3.appendChild(btnRemove);
    row.appendChild(cell3);
    var toDoTab = document.getElementById('todo-list-table');
    toDoTab.appendChild(row);
    todos.push({
        text: toDoText,
        accomplished: false
    })
    window.localStorage.clear();
    window.localStorage.setItem('todoItem', JSON.stringify(todos));
    //console.log("while adding");
    //console.log(todos);
}

function strikeOrUnStrike(cBox) {

    //console.log("row" + cBox.closest('tr').rowIndex);

    var toDoTab = document.getElementById('todo-list-table');
    var rowIdx = cBox.closest('tr').rowIndex;
    var rowTarget = toDoTab.rows[rowIdx];
    var todoTask = rowTarget.cells[1].innerHTML;
    //cell index is hardcoded. It should be relative to the postion. Need to come up with better idea
    if (cBox.checked) {
        //console.log("row clicked = " + rowTarget.cells[0].innerHTML);
        rowTarget.cells[1].innerHTML = '<strike>' + todoTask + '</strike>';
        todos[rowIdx - 1].accomplished = true;
        //console.log("checking........");
        //console.log(todos);
        window.localStorage.clear();
        window.localStorage.setItem('todoItem', JSON.stringify(todos));
    } else {
        //console.log("update uncheck = " + extractContent(todoTask));
        rowTarget.cells[1].innerHTML = extractContent(todoTask);
        todos[rowIdx - 1].accomplished = false;
        //console.log("checking........");
        //console.log(todos);
        window.localStorage.clear();
        window.localStorage.setItem('todoItem', JSON.stringify(todos));
    }
    //console.log(todos);
}

function extractContent(html) {

    return (new DOMParser).parseFromString(html, "text/html").
    documentElement.textContent;

}

// DELETE TABLE ROW.
function removeRow(rButton) {

    var toDoTab = document.getElementById('todo-list-table');
    var rowIdx = rButton.parentNode.parentNode.rowIndex;
    //console.log("rowindex removed:" + rowIdx);
    toDoTab.deleteRow(rButton.parentNode.parentNode.rowIndex); // BUTTON -> TD -> TR.
    //var rowIdx = rButton.closest('tr').rowIndex;
    //console.log("rowindex removed:" +rowIdx);
    todos.splice(rowIdx - 1, 1);
    //console.log("remving");
    //console.log(todos);
    window.localStorage.clear();
    window.localStorage.setItem('todoItem', JSON.stringify(todos));

}