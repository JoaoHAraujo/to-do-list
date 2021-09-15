const btnSave = document.querySelector('#saveTask')


const urlToDo = "http://localhost:3000/to_do"

btnSave.addEventListener('click', function() {
    const newTask = document.querySelector('#newTask').value
    const newDescription = document.querySelector('#description').value
    const prioritySelect = document.querySelector('#priority')
    const newPriority = prioritySelect.options[prioritySelect.selectedIndex].text

    const submitTask = {
        method: 'POST',
        body: `{"nome": "${newTask}", "descricao": "${newDescription}", "urgencia": "${newPriority}"}`,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }
    fetch(urlToDo, submitTask)
})