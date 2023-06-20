import { Task } from "./projects.js"
import { displayProjectsInMainContainer, displayProjectsInSideBar } from "./menu.js"

export function addNewTaskInput(e) {

    const taskInputContainer = document.createElement("div")
    taskInputContainer.classList.add("taskInputContainer")
    
    const taskNameInput = document.createElement("input")
    taskNameInput.setAttribute("type", "text")
    taskNameInput.setAttribute("placeholder", "New Task")
    taskNameInput.setAttribute("id","taskNameInput")

    const taskDateInput = document.createElement("input")
    taskDateInput.setAttribute("type", "date")
    taskDateInput.setAttribute("id", "taskDateInput")

    const taskBtn = document.createElement("button")
    taskBtn.setAttribute("type", "button")
    taskBtn.classList.add("checkBtn")

    taskInputContainer.appendChild(taskNameInput)
    taskInputContainer.appendChild(taskDateInput)
    taskInputContainer.appendChild(taskBtn)

    e.target.closest(".projects").appendChild(taskInputContainer)

    taskBtn.addEventListener("click", (e) => {
        storeTasksInProject(e)
        displayTasksInProject(e)
        }
    )
}

function clearContainer(e) {
    e.target.closest(".projects").lastChild.remove()
}


export function displayTasksInProjectsOnLoad() {

    displayProjectsInSideBar()
    displayProjectsInMainContainer()
    
    for (let j = 0; j < localStorage.length; j++) {

        let projectName = localStorage.key(j)
        console.log(projectName)

        let element = JSON.parse(localStorage.getItem(localStorage.key(j)))
        console.log(element)

        if (element.isShown === true) {
            for (let i = 0; i < element.tasks.length; i++) {

            const task = document.createElement("div")
            task.classList.add("task")
            task.setAttribute("id", element.tasks[i].name)


            const taskNameP = document.createElement("p")
            taskNameP.textContent = element.tasks[i].name
            taskNameP.classList.add("taskNameText")

            const taskDateP = document.createElement("p")
            taskDateP.textContent = element.tasks[i].date
            taskDateP.classList.add("taskDateInput")

            const taskBtn = document.createElement("button")
            taskBtn.setAttribute("type", "button")
            taskBtn.classList.add("checkBtn")

            task.appendChild(taskNameP)
            task.appendChild(taskDateP)
            task.appendChild(taskBtn)

            document.querySelector(`#${projectName}`).querySelector(".tasksContainer").appendChild(task)

            taskBtn.addEventListener("click", (e) => {
                removeTask(e, element.tasks[i].index)
                e.target.closest(`#${element.tasks[i].name}`).remove()
                }
            )}
        }
    }
}



export function displayTasksInProject(e) {

    const projectName = e.target.closest(".projects").id
    console.log(projectName)

    const element = JSON.parse(localStorage.getItem(projectName))
    console.log(element)

    clearContainer(e)
    document.querySelector(`#${projectName}`).querySelector(".tasksContainer").innerHTML = ""

    for (let i = 0; i < element.tasks.length; i++) {

        const task = document.createElement("div")
        task.classList.add("task")
        task.setAttribute("id", element.tasks[i].name)

        const taskNameP = document.createElement("p")
        taskNameP.textContent = element.tasks[i].name
        taskNameP.classList.add("taskNameText")

        const taskDateP = document.createElement("p")
        taskDateP.textContent = element.tasks[i].date
        taskDateP.classList.add("taskDateInput")

        const taskBtn = document.createElement("button")
        taskBtn.setAttribute("type", "button")
        taskBtn.classList.add("checkBtn")
        taskBtn.dataset.name = element.tasks[i].name

        task.appendChild(taskNameP)
        task.appendChild(taskDateP)
        task.appendChild(taskBtn)
        
        document.querySelector(`#${projectName}`).querySelector(".tasksContainer").appendChild(task)

        taskBtn.addEventListener("click", (e) => {
            removeTask(e, element.tasks[i].index)
            e.target.closest(`#${element.tasks[i].name}`).remove()
            }
        )
    }
}

function removeTask(e) {
    const projectName = e.target.closest(".projects").id
    const taskName = e.target.closest(".task").id
    const element = JSON.parse(localStorage.getItem(projectName))

    for ( let i = 0; i < element.tasks.length; i++) {
        if (element.tasks[i].name === taskName) {
            element.tasks.splice(i, 1)
        }
    }

    localStorage.setItem(projectName, JSON.stringify(element))
}

function storeTasksInProject(e) {
    const projectName = e.target.closest(".projects").id
    
    const element = JSON.parse(localStorage.getItem(projectName))
    
    const task = new Task (
        document.querySelector("#taskNameInput").value,
        document.querySelector("#taskDateInput").value,
    )
    
    element.tasks.push(task)

    localStorage.setItem(projectName, JSON.stringify(element))
}



// *            MAKE PROJECTS LOAD ON FIRST VISIT/REFRESH
displayTasksInProjectsOnLoad()