const urlToDo = "http://localhost:3000/to_do/"

//SALVAR NOVA TASK
const btnSave = document.querySelector('#saveTask')
btnSave.addEventListener('click', () => {
    const newTask = document.querySelector('#newTask').value
    const newDescription = document.querySelector('#description').value
    const prioritySelect = document.querySelector('#priority')
    const newPriority = prioritySelect.options[prioritySelect.selectedIndex].text
    const newPriorityId = parseInt(prioritySelect.options[prioritySelect.selectedIndex].value)

    const submitTask = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(
            {
                task: newTask,
                description: newDescription,
                priority: newPriority,
                priority_Id: newPriorityId
            }
        )
    }
    fetch(urlToDo, submitTask)
        .then (window.alert('Atividade salva com sucesso!'))
})

//REQUISIÇÃO DE TASK LIST PARA ARRAY
let toDoArray = []
fetch(urlToDo)
    .then(res => res.json())
    .then(toDoList => {
        toDoArray = toDoList
        sortToDo(toDoArray)
        renderToDo()
    })
    .catch(() => {console.log('Erro de requisição!')})   


//RENDERIZE TASK LIST WITH OPTIONS
function renderToDo(){
    toDoArray.forEach(task => {
        const taskList = document.querySelector('#taskList')
        const item = document.createElement('li')
        
        const itemTask = `<h3> ${task.task} </h3>`
        const itemDescription = `<p> Descrição: ${task.description} </p>`
        const itemPriority = `<p> Prioridade: ${task.priority} </p>`

        item.innerHTML = itemTask + itemDescription + itemPriority
        taskList.appendChild(item)
        
        const btnDel = document.createElement('button')
        btnDel.innerHTML = "Remover"
        btnDel.addEventListener('click', () => {deleteToDo(task.id)})
        taskList.appendChild(btnDel)

        const btnEdit = document.createElement('button')
        btnEdit.innerHTML = "Editar"
        btnEdit.addEventListener('click', () => {editToDo(task.id)})
        taskList.appendChild(btnEdit)
    })
}

// SORT toDoArray
function sortToDo(taskList){
    taskList.sort((a, b) =>{
        if(a.priority_Id < b.priority_Id) {
            return 1
        }
        if (a.priority_Id > b.priority_Id) {
            return -1
        }
        else {
            return 0
        }
    })
}

//DELETE TASK
function deleteToDo(delTask) {
    const urlDelTask = urlToDo + delTask
    const removeTask = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }  
    }
    fetch(urlDelTask, removeTask)
        .then(window.alert('Atividade removida!'))
}

//EDIT TASK
function editToDo(editTask) {
    console.log(editTask)
}