import { Task } from "./projects.js"
import { displayProjectsInMainContainer, displayProjectsInSideBar } from "./menu.js"
import { updateReminders } from "./date.js"
import { format, parseISO} from "date-fns"

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
        updateReminders()
        }
    )
}

function clearContainer(e) {
    e.target.closest(".projects").lastChild.remove()
}


export function displayTasksInProjectsOnLoad() {

    displayProjectsInSideBar()
    displayProjectsInMainContainer()
    updateReminders()
    
    for (let j = 0; j < localStorage.length; j++) {

        let projectName = localStorage.key(j)

        let element = JSON.parse(localStorage.getItem(localStorage.key(j)))

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

            const dateBtnDiv = document.createElement("div")

            const taskBtn = document.createElement("button")
            taskBtn.setAttribute("type", "button")
            taskBtn.classList.add("checkBtn")

            task.appendChild(taskNameP)
            dateBtnDiv.appendChild(taskDateP)
            dateBtnDiv.appendChild(taskBtn)

            task.appendChild(dateBtnDiv)

            document.querySelector(`#${projectName}`).querySelector(".tasksContainer").appendChild(task)

            taskBtn.addEventListener("click", (e) => {
                removeTask(e, element.tasks[i].index)
                e.target.closest(`#${element.tasks[i].name}`).remove()
                updateReminders()
                updateTasksTotal()
                }
            )}
        }
    }
}



export function displayTasksInProject(e) {

    const projectName = e.target.closest(".projects").id

    const element = JSON.parse(localStorage.getItem(projectName))

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

        const dateBtnDiv = document.createElement("div")

        const taskBtn = document.createElement("button")
        taskBtn.setAttribute("type", "button")
        taskBtn.classList.add("checkBtn")
        taskBtn.dataset.name = element.tasks[i].name

        task.appendChild(taskNameP)
        dateBtnDiv.appendChild(taskDateP)
        dateBtnDiv.appendChild(taskBtn)

        task.appendChild(dateBtnDiv)
        
        document.querySelector(`#${projectName}`).querySelector(".tasksContainer").appendChild(task)

        taskBtn.addEventListener("click", (e) => {
            removeTask(e, element.tasks[i].index)
            e.target.closest(`#${element.tasks[i].name}`).remove()
            updateReminders()
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
    
    let formatDate = task.date 
    formatDate = format(parseISO(formatDate), "dd/MM/yyyy")

    task.date = formatDate

    element.tasks.push(task)

    localStorage.setItem(projectName, JSON.stringify(element))
}



// *            MAKE PROJECTS LOAD ON FIRST VISIT/REFRESH
displayTasksInProjectsOnLoad()