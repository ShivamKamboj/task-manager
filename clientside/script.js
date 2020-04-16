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