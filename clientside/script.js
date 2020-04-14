//to get req from /todo
async function getData() {
    let res = await fetch("/todo");
    let data = await res.json();
    addToTable(data);
}

//to add the data in table
function addToTable(data) {
    table.innerHTML = "";
    let row = newElement('tr', null);
    table.appendChild(row);
    row.appendChild(newElement('th', 'Index'));
    row.appendChild(newElement('th', 'Title'));
    row.appendChild(newElement('th', 'Description'));
    row.appendChild(newElement('th', 'Due Date'));
    row.appendChild(newElement('th', 'Status'));
    row.appendChild(newElement('th', 'Priority'));

    if (data.length == 0) {
        let row = newElement('tr', null);
        table.appendChild(row);
        let data = newElement('td', 'No data to display');
        row.appendChild(data);
        data.colSpan = "6";
        data.style.textAlign = "center";
        data.style.color = "gray";
    }
    else {
        let indexVal = 1;
        for (item of data) {
            let row = newElement('tr', null);
            table.appendChild(row);
            row.appendChild(newElement('td', indexVal));
            row.appendChild(newElement('td', item.title));
            row.appendChild(newElement('td', item.description));
            row.appendChild(newElement('td', item.due));
            var statusVal = "Incomplete";
            if (item.status == true) {
                statusVal = "Complete";
            }
            row.appendChild(newElement('td', statusVal));
            row.appendChild(newElement('td', item.priority));
            let rowNote = newElement('tr', null);

            table.appendChild(rowNote);
            rowNote.className = 'notes';
            rowData = document.createElement('td');
            rowNote.appendChild(rowData);
            //getNotes(item.id, rowData);
            rowData.colSpan = 6;
            indexVal++;

        }
    }

}

