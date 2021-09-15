const btnSave = document.querySelector('#saveTask')


const urlToDo = "http://localhost:3000/to_do"

btnSave.addEventListener('click', function() {
    const newTask = document.querySelector('#newTask').value
    const newDescription = document.querySelector('#description').value
    const prioritySelect = document.querySelector('#priority')
    const newPriority = prioritySelect.options[prioritySelect.selectedIndex].text

    const submitTask = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(
            {
                task: newTask,
                description: newDescription,
                priority: newPriority
            }
        )
    }
    fetch(urlToDo, submitTask)
})


const taskList = document.querySelector('#taskList')

fetch(urlToDo)
    .then(res => res.json())
    .then(toDoList => {

        toDoList.map(tasks => {
            const item = document.createElement('li')

            const itemTask = document.createElement('h2')
            itemTask.textContent = tasks.task

            const itemDescription = document.createElement('p')
            itemDescription.textContent = `Descrição: ${tasks.description}`

            const itemPriority = document.createElement('p')
            itemPriority.textContent = `Prioridade: ${tasks.priority}`

            item.appendChild(itemTask)
            item.appendChild(itemDescription)
            item.appendChild(itemPriority)
            taskList.appendChild(item)
            
        })   
    })

