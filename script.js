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





let toDoArray = []

fetch(urlToDo)
    .then(res => res.json())
    .then(toDoList => {
        toDoArray = toDoList
        // console.log(toDoArray)
        
    })
    .catch(() => {console.log('Erro de requisição!')})   


function toDoHTML() {
    const taskList = document.querySelector('#taskList')
    const item = document.createElement('li')

    const itemTask = `<h2> task </h2>`
    const itemDescription = `<p> Descrição: $descriçao </p>`
    const itemPriority = `<p> Prioridade: $prioridade </p>`
    const btnEdit = `<button id="task$">Editar</button>`

    item.innerHTML = itemTask + itemDescription + itemPriority + btnEdit
    
    taskList.appendChild(item)
}

toDoArray.forEach(task => {
    console.log(task)
})