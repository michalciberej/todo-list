import { Project } from "./projects.js"
import { addNewTaskInput } from "./tasks.js"
import { displayTasksInProjectsOnLoad } from "./tasks.js"

// !    SIDEBAR UI SHOW/HIDE 

export function displayProjectsMenu() {
    const pO = document.querySelectorAll(".projectsOptions")
    const pC = document.querySelector("#projectsContainer")
    const mC = document.querySelector("#mainContainer")
    const nP = document.querySelectorAll("#newProjects")

    if (pC.style.width === "15vw") {
        pC.style.width = "0vw"
        mC.style.marginLeft = "0vw"
        displayProjectOptions(pO, 0)
        displayProjectOptions(nP, 0)
    } else if (pC.style.width === "" || pC.style.width === "0vw") {
        pC.style.width = "15vw"
        mC.style.marginLeft = "15vw"
        displayProjectOptions(pO, 1)
        displayProjectOptions(nP, 1)
    }
}

function displayProjectOptions(arr, size) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.scale = size
    }
}

// !     ADD NEW PROJECT INPUT IN SIDEBAR

export function addNewProjectInput() {
    const projectsContainer = document.querySelector("#projectInput")
    const projectInput = document.createElement("input")

    projectInput.setAttribute("placeholder", "New Project")
    projectInput.setAttribute("type", "text")
    projectInput.setAttribute("id", "projectTextInput")

    projectsContainer.appendChild(projectInput)

    projectInput.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (projectInput.value !== "") {
            if (e.which === 13) {
                storeProjectToLocalStorage()
                resetContainer("#projectInput")
                displayTasksInProjectsOnLoad()
                }
            }
        }
    )
}

// !        STORE NEW PROJECT IN LOCALSTORAGE

function storeProjectToLocalStorage() {
    let project = new Project(document.querySelector("#projectTextInput").value)
    localStorage.setItem(project.name, JSON.stringify(project))
}

// !        DISPLAY PROJECTS IN SIDEBAR

export function displayProjectsInSideBar() {
    resetContainer("#newProjects")
    for (let i = 0; i < localStorage.length; i++) {
        let div = document.createElement("div")
        div.textContent = localStorage.key(i)
        div.dataset.name = localStorage.key(i)
        document.querySelector("#newProjects").appendChild(div)
        
        div.addEventListener("click", (e) => {
            showHideProjectInMainContainer(e)
            }
        )
    }
}

function showHideProjectInMainContainer(e) {

    const projectName = e.target.dataset.name
    console.log(projectName)

    const element = JSON.parse(localStorage.getItem(projectName))
    console.log(element)
    
    if (element.isShown === true) {
        element.isShown = false
    }   else {
        element.isShown = true
    }

    localStorage.setItem(projectName, JSON.stringify(element))
    
    displayTasksInProjectsOnLoad()
}

// !        DISPLAY PROJECTS IN MAIN CONTAINER

export function displayProjectsInMainContainer() {
    resetContainer("#contentContainer")
    for (let i = 0; i < localStorage.length; i++) {

        const projectName = localStorage.key(i)
        const element = JSON.parse(localStorage.getItem(projectName))

        if (element.isShown === true) {
            createMainContainerProject(projectName, "#contentContainer")
        }
    }
}   

// !        RESET DOM 

function resetNewProjectInput() {
    document.querySelector("#projectTextInput").innerHTML = ""
}

function resetContainer(id) {
    document.querySelector(id).innerHTML = ""
}

// !        GENERATE PROJECT DOM FOR PROJECT IN MAIN CONTAINER

function createMainContainerProject(element, id) {
    const div = document.createElement("div")
    div.classList.add("projects")
    div.setAttribute("id", element)

    const projectHeader = document.createElement("div")
    projectHeader.classList.add("projectHeader")

    const h3 = document.createElement("h3")
    h3.textContent = element

    const btnContainer = document.createElement("div")
    btnContainer.classList.add("projectBtns")

    const taskContainer = document.createElement("div")
    taskContainer.classList.add("tasksContainer")

    const btnOne = document.createElement("button")
    const btnTwo = document.createElement("button")
    btnOne.classList.add("plusBtn")
    btnTwo.classList.add("deleteBtn")
    btnTwo.setAttribute("data-name", element)
    btnOne.setAttribute("type", "button")
    btnTwo.setAttribute("type", "button")

    btnContainer.appendChild(btnOne)
    btnContainer.appendChild(btnTwo)

    projectHeader.appendChild(h3)
    projectHeader.appendChild(btnContainer)

    div.appendChild(projectHeader)
    div.appendChild(taskContainer)

    document.querySelector(id).appendChild(div)

    btnOne.addEventListener("click", (e) => {
        const x = e.target.closest(".projects").lastChild.classList
        if (x[0] !== "taskInputContainer") {
            addNewTaskInput(e)
        }
    }
)

    btnTwo.addEventListener("click", (e) => {
        e.target.closest(`#${btnTwo.dataset.name}`).remove()
        localStorage.removeItem(btnTwo.dataset.name)
        displayProjectsInSideBar()
        }
    )
}

