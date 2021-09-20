const urlToDo = "http://localhost:3000/to_do/"

//SALVAR NOVA TASK
const btnSave = document.querySelector('.saveTask')
btnSave.addEventListener('click', () => {
    const newTask = document.querySelector('.task').value
    const newDescription = document.querySelector('.description').value
    const prioritySelect = document.querySelector('.priority')
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
    toDoArray.forEach(item => {
        const taskList = document.querySelector('#taskList')
        const task = document.createElement('li')
        
        const taskName = `<h3> ${item.task} </h3>`
        const taskDescription = `<p> Descrição: ${item.description} </p>`
        const taskPriority = `<p> Prioridade: ${item.priority} </p>`

        task.innerHTML = taskName + taskDescription + taskPriority
        taskList.appendChild(task)
        task.classList.add(`task${item.id}`)
        
        const btnDel = document.createElement('button')
        btnDel.innerHTML = "Remover"
        btnDel.addEventListener('click', () => {deleteToDo(item.id)})
        task.appendChild(btnDel)
        btnDel.classList.add('deleteTask')

        const btnEdit = document.createElement('button')
        btnEdit.innerHTML = "Editar"
        btnEdit.addEventListener('click', () => {editTaskForm(item.id)})
        task.appendChild(btnEdit)
        btnEdit.classList.add('editTask')
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

//EDIT TASK = task.id
function editTaskForm(item) {
    const task = document.querySelector(`.task${item}`)

    const editName = `<label>Insira atividade: </label><input class='task editTask${item}'></input>`
    const editDescription = `<label>Descrição: </label><textarea type='text' class='description editDescription${item}'></textarea>`
    const editPriority = `<label>Prioridade: </label><select name='prioridade' class='priority editPriority${item}'><option value='3'>ALTA</option><option value='2'>MÉDIA</option><option value='1'>BAIXA</option><option value='0'>IRRELEVANTE</option></select>`

    task.innerHTML = editName + editDescription + editPriority

    const btnSave = document.createElement('button')
    btnSave.innerHTML = 'Salvar'
    btnSave.classList.add('saveTask')
    task.appendChild(btnSave)

    btnSave.addEventListener('click', () =>{editToDo(item)})
}

// edTask === item === id
function editToDo(edTask) {
    const urlEditTask = urlToDo + edTask

    const task = document.querySelector(`.editTask${edTask}`).value
    const description = document.querySelector(`.editDescription${edTask}`).value
    const prioritySelect = document.querySelector(`.editPriority${edTask}`)
    const priority = prioritySelect.options[prioritySelect.selectedIndex].text
    const priorityId = parseInt(prioritySelect.options[prioritySelect.selectedIndex].value)

    const editTask = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(
            {
                task: task,
                description: description,
                priority: priority,
                priority_Id: priorityId
            }
        )
    }
    fetch(urlEditTask, editTask)
        .then(window.alert('Atividade editada com sucesso!'))
}