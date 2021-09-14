const btnSave = document.querySelector('#saveTask')


const urlToDo = "http://localhost:3000/to_do"

btnSave.addEventListener('click', function() {
    const input = document.querySelector('#newTask')
    const task = input.value
    const submitTask = {
        method: 'POST',
        body: `{"nome": "${task}", "descricao": "a definir", "urgencia": 0}`,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }
    fetch(urlToDo, submitTask)
})