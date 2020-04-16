//Get Task
async function getTaskFromDb() {
    title.value = "";
    description.value = "";
    duedate.value = defaultDate;
    priority.value = 'medium';

    let response = await fetch("/task")
    if (response.ok) {
        let tasks = await response.json();
        addDataToTable(tasks);
    } else {
        alert("Please Add some task to proceed");
    }
}

//variable declaration
const table = document.querySelector("#dataTable")
const title = document.querySelector("#title")
const description = document.querySelector("#description")
const priority = document.querySelector('#priority')
const note = document.querySelector('#note')
const modal = document.querySelector("#editTheTask")
const submit = document.querySelector("#addTask");
const sortBy = document.querySelector("#dataSorting");

//Set Default Date
const tomorrowsDate = new Date(new Date())
tomorrowsDate.setDate(tomorrowsDate.getDate() + 1)
const duedate = document.querySelector('#duedate')
const defaultDate = tomorrowsDate.toJSON().substring(0, 10)
duedate.value = defaultDate

//Add Tasks To Table, with Notes
function addDataToTable(data) {
    let row = CreateNewElement('tr', null);
    table.innerHTML = "";

    // Task Tag Elements 
    let myTitel = CreateNewElement('th', 'Titel');
    let myTaskDescription = CreateNewElement('th', 'Description');
    let myTaskPriority = CreateNewElement('th', 'Priority');
    let myTaskStatus = CreateNewElement('th', 'Status');
    let myDueStatus = CreateNewElement('th', 'Due Date');
    table.appendChild(row);

    // Styling
    myTitel.style.fontFamily = "lato";
    myTitel.style.fontSize = "30px";

    myTaskDescription.style.fontFamily = "lato";
    myTaskDescription.style.fontSize = "30px";

    myTaskPriority.style.fontFamily = "lato";
    myTaskPriority.style.fontSize = "30px";

    myTaskStatus.style.fontFamily = "lato";
    myTaskStatus.style.fontSize = "30px";

    myDueStatus.style.fontFamily = "lato";
    myDueStatus.style.fontSize = "30px";

    // Append in row
    row.appendChild(myTitel);
    row.appendChild(myTaskDescription);
    row.appendChild(myTaskPriority);
    row.appendChild(myTaskStatus);
    row.appendChild(myDueStatus);

    if (data.length === 0) {
        let row = CreateNewElement('tr', null);
        table.appendChild(row);
        let data = CreateNewElement('td', 'Nothing to Show!!');
        row.appendChild(data);
    } else {
        // Sort Task and append notes
        data = sortTask(data, sortBy.value);
        for (let task of data) {

            let row = CreateNewElement('tr', null);
            table.appendChild(row);

            let title = CreateNewElement('td', task.title);
            title.style.fontSize = "15px";
            title.style.fontFamily = "oswald"
            row.appendChild(title);

            if (task.description !== null && task.description !== "") {
                let tdDescription = CreateNewElement('td', task.description);
                tdDescription.style.fontSize = "15px"
                row.appendChild(tdDescription);
            } else {
                let tdDescription = CreateNewElement('td', "No Description");
                tdDescription.style.fontSize = "15px"
                row.appendChild(tdDescription);
            }
            if (task.priority === 'HIGH') {
                let tdChoice = CreateNewElement('td', 'High');
                tdChoice.style.color = "red"
                tdChoice.style.fontSize = "15px"
                    //tdChoice.style.fontFamily = "gotu"
                row.appendChild(tdChoice);
            } else if (task.priority === 'MEDIUM') {
                let tdChoice = CreateNewElement('td', 'Medium');
                //tdChoice.style.color = "blue"
                tdChoice.style.fontSize = "15px"
                    //tdChoice.style.fontFamily = "gotu"
                row.appendChild(tdChoice);
            } else {
                let tdChoice = CreateNewElement('td', 'Low');
                //tdChoice.style.color = "green"
                tdChoice.style.fontSize = "15px"
                    // tdChoice.style.fontFamily = "gotu"
                row.appendChild(tdChoice);
            }

            if (task.status === false) {
                let tdChoice = CreateNewElement('td', 'Incomplete');
                tdChoice.style.color = "red"
                tdChoice.style.fontSize = "15px"
                row.appendChild(tdChoice);
            } else {
                let tdChoice = CreateNewElement('td', 'Complete');
                tdChoice.style.fontSize = "15px"
                row.appendChild(tdChoice);
            }

            row.appendChild(CreateNewElement('td', task.duedate));

            let NoteRow = CreateNewElement('tr', null);

            table.appendChild(NoteRow);

            let rowData = document.createElement('td');
            NoteRow.className = 'notes';
            NoteRow.appendChild(rowData);
            getNotes(task.id, rowData);
            rowData.colSpan = 6;
        }
    }
}

// Creating new element
function CreateNewElement(type, data) {
    let element = document.createElement(type);
    if (data != null)
        element.textContent = data;
    return element;
}

async function addTaskToDb() {

    if (title.value === "") {
        alert("Please Enter Title to proceed!")
        return;
    }

    let task = {
        title: title.value,
        description: description.value,
        duedate: duedate.value,
        status: "false",
        priority: priority.options[priority.selectedIndex].value
    };

    try {
        await fetch("/task", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        alert("Task Added Successfully")
        getTaskFromDb()
    } catch (error) {
        alert("Error")
        return;
    }
}

//Set and Fetch notes from Database 
async function getNotes(id, rowData) {
    let list = CreateNewElement("ul", null)

    let noteHead = CreateNewElement("h4", "Notes.")
    list.appendChild(noteHead)
    list.className = "list-group"

    let deleteBtn = CreateNewElement("button", "Delete Task")
    deleteBtn.style.backgroundColor = "black"
    deleteBtn.style.color = "white"
    deleteBtn.type = "button"
    deleteBtn.value = "Delete Task"
    deleteBtn.style.borderRadius = "9px"
    deleteBtn.style.fontSize = "14px"
    deleteBtn.style.marginLeft = "14px"
    deleteBtn.style.padding = "6px"

    let input = CreateNewElement("input", null)
    input.className = "form-control mb-6"
    input.placeholder = "Enter note"
    input.id = id + "_input"

    let addBtn = CreateNewElement("input", null);
    addBtn.className = "btn btn-success"
    addBtn.type = "button"
    addBtn.value = "Add Note"
    addBtn.style.backgroundColor = "black"
    editBtn.style.borderRadius = "9px"
    addBtn.style.color = "white"
    addBtn.style.margin = "10px"

    let editBtn = CreateNewElement("button", "Edit Task");
    editBtn.style.backgroundColor = "black"
    editBtn.style.color = "white"
    editBtn.type = "button"
    editBtn.value = "Edit Task"
    editBtn.style.borderRadius = "9px"
    editBtn.style.fontSize = "16px"
    editBtn.style.padding = "6px"
    editBtn.className = "editButton"

    fetch("/task/" + id + "/note")
        .then((response) => {
            response
                .json()
                .then((data) => {
                    if (data.failure === undefined) {
                        for (let note of data) {
                            let li = CreateNewElement("a", note.content);
                            li.className = "list-group-item list-group-item-action";
                            li.style.fontFamily = "oswald";
                            list.appendChild(li);
                        }
                    } else {
                        let li = CreateNewElement(
                            "a",
                            "No Note Found! To proceed add some note"
                        );
                        li.className = "list-group-item list-group-item-action";
                        li.style.fontFamily = "oswald";
                        list.appendChild(li);
                    }
                    list.appendChild(CreateNewElement("br"));
                    rowData.appendChild(list);
                    rowData.appendChild(input);
                    rowData.appendChild(CreateNewElement("br"));
                    rowData.appendChild(addBtn);
                    rowData.appendChild(editBtn);
                    input.type = "text";
                    addBtn.onclick = function() {
                        addNote(input, id);
                    };
                    editBtn.onclick = function() {
                        editPopUp(id);
                    };
                    rowData.appendChild(deleteBtn);
                    deleteBtn.onclick = function() {
                        deleteThisTask(id);
                    };
                })
                .catch((err) => {
                    let li = CreateNewElement("a", "No Notes!");
                    li.className = "list-group-item list-group-item-action";
                    li.style.fontFamily = "oswald";
                    list.appendChild(li);
                    list.appendChild(CreateNewElement("br"));
                    rowData.appendChild(list);
                    rowData.appendChild(input);
                    rowData.appendChild(CreateNewElement("br"));
                    rowData.appendChild(addBtn);
                    rowData.appendChild(editBtn);
                    input.type = "text";
                    addBtn.onclick = function() {
                        addNote(input, id);
                    };
                    editBtn.onclick = function() {
                        editPopUp(id);
                    };
                    rowData.appendChild(deleteBtn);
                    deleteBtn.onclick = function() {
                        deleteThisTask(id);
                    };
                });
        })
        .catch((error) => {
            alert("Please try again");
        });
}

//Add Note to Database to particular record
async function addNote(input, id) {
    try {
        if (input.value !== "") {
            let note = {
                content: input.value
            };
            await fetch("/task/" + id + "/note", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });
            getTaskFromDb();
            alert("Note Added Successfully");
        }
    } catch (error) {
        alert("Please try again!")
    }
}

// Edit and Update Pop up model and task 
function editPopUp(data) {
    modal.style.display = "block";
    console.log("Updated" + data);
    try {
        fetch("/task/" + data).then((data) => data.json().then((data) => {
            document.querySelector("#dueDateEdit").value = data.duedate;
            document.querySelector("#priorityEdit").value = data.priority.toLowerCase();
            document.querySelector("#statusEdit").checked = data.status;
            document.querySelector("#saveButton").onclick = function() {
                updateTask(data);
            }
            document.querySelector("#closeButton").onclick = function() {
                modal.style.display = "none";
                document.querySelector("#saveButton").onclick = null;
            }
        }));
    } catch (error) {
        alert("Try again!")
    }
}

// Update task through edit pop up field
async function updateTask(data) {
    let choice;
    if (document.querySelector("#PriorityEdit").value === "") {
        choice = "MEDIUM";
    } else {
        choice = document.querySelector("#PriorityEdit").value;
    }
    let updatedTask = {
        duedate: document.querySelector("#DueDateEdit").value,
        priority: choice,
        status: document.querySelector("#StatusEdit").checked.toString()
    }
    try {
        await fetch("/task/" + data, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
        modal.style.display = "none";
        getTaskFromDb();
        alert("Task Updated Successfully");
    } catch (error) {
        alert("Task Not Updated, Please try again!");
    }
}

//Delete task
async function deleteThisTask(data) {
    try {
        await fetch('/task/' + data, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            alert("Task Deleted Successfully")
        }).then((json) => {
            // console.log(json);
        });
        window.location.reload();
    } catch (err) {
        alert("Please try again!")
    }
}

//OnClick Event
submit.onclick = addTaskToDb;

sortBy.onchange = getTaskFromDb;


// SORTING TASKS
function sortTask(tasks, sorting) {
    if (sorting === 'priority') {
        return sortingObject.prioritySorting(tasks);
    } else if (sorting === 'duedate') {
        return sortingObject.dateSorting(tasks);
    } else if (sorting === 'status') {
        return sortingObject.statusSorting(tasks);
    } else {
        return tasks;
    }
}

// Util Object for sorting of data
let sortingObject = {

    // Sort Data By Status
    statusSorting: function sortDataByStatus(data) {
        let priorityOrder = { true: 1, false: 2 }
        data.sort(function(d1, d2) {
            return (priorityOrder[d1.status] - priorityOrder[d2.status])
        })
        return data;
    },

    // Sort Data by Date
    dateSorting: function sortDataByDate(data) {
        data.sort(function(d1, d2) {
            if (d1.due < d2.due) return -1;
            else if (d1.due > d2.due) return 1;
            else return 0;
        })
        return data;
    },

    // Sort Data By Priority
    prioritySorting: function sortDataByPriority(data) {
        let priorityOrder = { 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 }

        data.sort(function(d1, d2) {
            return (priorityOrder[d1.priority] - priorityOrder[d2.priority])
        })

        return data
    }
}

/* for mobile devices*/
// Script to open and close sidebar when on tablets and phones
function my_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function my_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// Slideshow Apartment Images
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-opacity-off";
}