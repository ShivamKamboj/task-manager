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