export function displayProjectsMenu() {
    const pO = document.querySelectorAll(".projectsOptions")
    const pC = document.querySelector("#projectsContainer")
    const mC = document.querySelector("#mainContainer")
    resetInput()
    if (pC.style.width === "15vw") {
        pC.style.width = "0vw"
        mC.style.marginLeft = "0vw"
        displayProjectOptions(pO, 0)
    }   else if (pC.style.width === "" || pC.style.width === "0vw") {
        pC.style.width = "15vw"
        mC.style.marginLeft = "15vw"
        displayProjectOptions(pO, 1)
    }
}

export function addNewProject() {
    const projectsContainer = document.querySelector("#projectInput")
    const projectInput = document.createElement("input")
    
    resetInput()
    projectInput.setAttribute("placeholder", "New Project")
    projectsContainer.appendChild(projectInput)
}

function displayProjectOptions(arr, size) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.scale = size
    }
}

function resetInput() {
    document.querySelector("#projectInput").innerHTML = ""
}

