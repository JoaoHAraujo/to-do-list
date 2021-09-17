const btnSave = document.querySelector('#saveTask')


const urlToDo = "http://localhost:3000/to_do"


//SALVAR NOVA TASK
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


//LISTA DE TASKS, COM BOTÕES
let toDoArray = []
fetch(urlToDo)
    .then(res => res.json())
    .then(toDoList => {
        toDoArray = toDoList
        toDoHTML()
    })
    .catch(() => {console.log('Erro de requisição!')})   

function toDoHTML(){
    toDoArray.forEach(task => {
        const taskList = document.querySelector('#taskList')
        const item = document.createElement('li')

        const itemTask = `<h2> ${task.task} </h2>`
        const itemDescription = `<p> Descrição: ${task.description} </p>`
        const itemPriority = `<p> Prioridade: ${task.priority} </p>`
        const btnEdit = `<button id="task${task.id}">Editar</button>`

        item.innerHTML = itemTask + itemDescription + itemPriority + btnEdit
        
        taskList.appendChild(item)
    })
}