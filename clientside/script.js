//------ Task Fetcher
async function getTaskFromDb() {
    title.value = "";
    description.value = "";
    duedate.value = defaultDate;
    priority.value = 'medium';
    let response = await fetch("/task");
    if (response.ok) {
        let tasks = await response.json();
        addDataToTable(tasks);
    } else {
        alert("Please Add some task to proceed");
    }
}

//------ variable declaration
const description = document.querySelector("#description");
const title = document.querySelector("#title");
const priority = document.querySelector("#priority");
const table = document.querySelector("#data_table");
const note = document.querySelector("#note");
const modal = document.querySelector("#EditTheTask");
const submit = document.querySelector("#add_Task");
const sortBy = document.querySelector("#data_Sorting");

//Set Default Date
const tomorrowsDate = new Date(new Date());
tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
const duedate = document.querySelector('#duedate');
const defaultDate = tomorrowsDate.toJSON().substring(0, 10);
duedate.value = defaultDate;

//Add Tasks To Table, with Notes
function addDataToTable(tasks) {
    let row = CreateNewElement('tr', null);
    table.innerHTML = "";

    // Task Heading Tag Elements 
    let myTitel = CreateNewElement('th', 'Titel');
    let myTaskDescription = CreateNewElement('th', 'Description');
    let myTaskPriority = CreateNewElement('th', 'Priority');
    let myTaskStatus = CreateNewElement('th', 'Status');
    let myDueStatus = CreateNewElement('th', 'Due Date');
    table.appendChild(row);

    // Styling of Heading
    myTitel.style.fontFamily = "lato";
    myTitel.style.fontSize = "25px";

    myTaskDescription.style.fontFamily = "lato";
    myTaskDescription.style.fontSize = "25px";

    myTaskPriority.style.fontFamily = "lato";
    myTaskPriority.style.fontSize = "25px";

    myTaskStatus.style.fontFamily = "lato";
    myTaskStatus.style.fontSize = "25px";

    myDueStatus.style.fontFamily = "lato";
    myDueStatus.style.fontSize = "25px";

    // Append child in row
    row.appendChild(myTitel);
    row.appendChild(myTaskDescription);
    row.appendChild(myTaskPriority);
    row.appendChild(myTaskStatus);
    row.appendChild(myDueStatus);

    if (tasks.length === 0) {
        let row = CreateNewElement('tr', null);
        table.appendChild(row);
        let data = CreateNewElement('td', 'Nothing to Show!!');
        row.appendChild(data);
    } else {
        // Sort Task and append notes as well
        tasks = sortTask(tasks, sortBy.value);
        for (let task of tasks) {

            let row = CreateNewElement('tr', null);
            table.appendChild(row);

            let title = CreateNewElement('td', task.title);
            title.style.fontSize = "15px";
            title.style.fontFamily = "lato"
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
                row.appendChild(tdChoice);
            } else if (task.priority === 'MEDIUM') {
                let tdChoice = CreateNewElement('td', 'Medium');
                tdChoice.style.fontSize = "15px"
                row.appendChild(tdChoice);
            } else {
                let tdChoice = CreateNewElement('td', 'Low');
                tdChoice.style.fontSize = "15px"
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

//------ Add Task from User To DB--> /task POST request
async function addTaskToDB() {

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
        });
        alert("Task Addition Successful");
        getTaskFromDb();
    } catch (error) {
        alert("Error");
        return;
    }
}

//Set and Fetch notes from Database  
// /task/id/note  GET request
async function getNotes(id, rowData) {
    let list = CreateNewElement("ul", null);

    let noteHead = CreateNewElement("h4", "Notes...");
    list.appendChild(noteHead);
    list.className = "list-group";

    let deleteBtn = CreateNewElement("button", "Delete Task");
    deleteBtn.style.backgroundColor = "black"
    deleteBtn.style.color = "white"
    deleteBtn.type = "button"
    deleteBtn.value = "Delete Task"
    deleteBtn.style.borderRadius = "9px"
    deleteBtn.style.fontSize = "14px"
    deleteBtn.style.marginLeft = "14px"
    deleteBtn.style.padding = "6px"

    let input = CreateNewElement("input", null);
    input.className = "form-control mb-6";
    input.placeholder = "Enter note";
    input.id = id + "_input";

    let addBtn = CreateNewElement("input", null);
    addBtn.className = "btn btn-success"
    addBtn.type = "button"
    addBtn.value = "Add Note"
    addBtn.style.backgroundColor = "black"
    addBtn.style.borderRadius = "9px"
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
                            li.style.fontFamily = "oswald";
                            list.appendChild(li);
                        }
                    } else {
                        let li = CreateNewElement(
                            "a",
                            "No Note Found! To proceed please add some note"
                        );
                        li.style.fontFamily = "Baloo Paaji 2";
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
                        deleteTaskOverId(id);
                    };
                })
                .catch((err) => {
                    let li = CreateNewElement("a", "No Notes Found!");
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
                        deleteTaskOverId(id);
                    };
                });
        })
        .catch((error) => {
            // console.log(error);
            alert("Please try again");
        });
}

//Add Note to Database to particular record
// task/id/note POST request
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
            alert("Note Addition Successful");
        }
    } catch (error) {
        alert("Please try again!")
    }
}

// Edit and Update Pop up model and task  
function editPopUp(id) {
    modal.style.display = "block";
    console.log("Updated" + id);
    try {
        fetch("/task/" + id).then((data) => data.json().then((data) => {
            document.querySelector("#DueDateEdit").value = data.duedate;
            document.querySelector("#PriorityEdit").value = data.priority.toLowerCase();
            document.querySelector("#StatusEdit").checked = data.status;
            document.querySelector("#saveButton").onclick = function() {
                updateTask(id);
            }
            document.querySelector("#closeButton").onclick = function() {
                modal.style.display = "none";
                document.querySelector("#saveButton").onclick = null;
            }
        }));
    } catch (error) {
        alert("Please try again!")
    }
}

// Update task through edit pop up field
async function updateTask(id) {
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
        await fetch("/task/" + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
        modal.style.display = "none";
        getTaskFromDb();
        alert("Task Updation Successful");
    } catch (error) {
        alert("Task Not Updated, Please try again!");
    }
}

//Delete task
// --> task/id DELETE request
async function deleteTaskOverId(id) {
    try {
        await fetch('/task/' + id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            alert("Task Deletion Successful")
        }).then((json) => {});
        window.location.reload();
    } catch (err) {
        alert("Please try again!")
    }
}

//------ OnClick Event
submit.onclick = addTaskToDB;

sortBy.onchange = getTaskFromDb;

// SORTING DATA /TASKS
function sortTask(tasks, sorting) {
    if (sorting === 'priority') {
        return sortingObject.prioritySort(tasks);
    } else if (sorting === 'duedate') {
        return sortingObject.dateSort(tasks);
    } else if (sorting === 'status') {
        return sortingObject.statusSorting(tasks);
    } else {
        return tasks;
    }
}

//Object for sorting of Task
let sortingObject = {


    // Sort Data By Status
    statusSorting: function sortDataByStatus(task) {
        let priorityOrder = { true: 1, false: 2 }
        task.sort(function(d1, d2) {
            return (priorityOrder[d1.status] - priorityOrder[d2.status])
        });
        return task;
    },

    // Sort Data by Date
    dateSort: function sortDataByDate(task) {
        task.sort((d1, d2) => {
            if (d1.duedate < d2.duedate)
                return -1;
            else if (d1.duedate > d2.duedate)
                return 1;
            else
                return 0;
        });
        return task;
    },

    // Sort Data By Priority
    prioritySort: function sortDataByPriority(task) {
        let priorityOrder = { 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 }

        task.sort(function(d1, d2) {
            return (priorityOrder[d1.priority] - priorityOrder[d2.priority])
        });

        return task;
    }
}

/* for mobile devices*/
// Script to open and close sidebar when on tablets and phones
function w3_open() {
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
}