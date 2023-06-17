import "./style.css"

document.querySelector("#burgerMenu").addEventListener("click", () => displayProjectsMenu())

function displayProjectsMenu() {
    const pO = document.querySelectorAll(".projectsOptions")
    const pC = document.querySelector("#projectsContainer")
    const mC = document.querySelector("#mainContainer")
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

function displayProjectOptions(arr, size) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.scale = size
    }
}