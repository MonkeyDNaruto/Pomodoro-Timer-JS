const taskContainer = document.querySelector('.task-container')
const submitButton = document.querySelector('.submit-button')

const tasks = [
    {
        name: "Practice CSS Animation",
        priority: 0
    },
    {
        name: "Learning Js",
        priority: 2
    },
    {
        name: "Learning Python",
        priority: 1
    }
]

const descendingTasks = tasks.sort((taskA, taskB) => taskA.priority - taskB.priority)
console.log(descendingTasks)

function render() {
    descendingTasks.forEach(task => {
        const taskBlock = document.createElement('div')
        const deleteElement = document.createElement('p');
        const title = document.createElement('p');
        const controllerButton = document.createElement('button')
    
        taskBlock.classList.add('task-block');
        deleteElement.classList.add('delete-icon')
        controllerButton.classList.add('controller-button')
    
        deleteElement.textContent = "☒";
        title.textContent = task.name
        controllerButton.textContent = "START"

        deleteElement.addEventListener('click', deleteTask)
    
        taskBlock.append(deleteElement, title, controllerButton)
        taskContainer.append(taskBlock)
    })
    
}

render();

function deleteTask(e) {
    console.log(e.target.parentNode)
    e.target.parentNode.remove()  
    console.log(tasks)  
}

function addTask() {
    const inputElement = document.querySelector('input')
    const value = inputElement.value
    if(value) {
        taskContainer.innerHTML = ''
        tasks.push({
            name: value,
            priority: tasks.length
        })
        inputElement.value = ''
        render()
    }
}

submitButton.addEventListener('click', addTask)