import "./style.css"
import { displayProjectsMenu, addNewProject } from "./menu"

document.querySelector("#burgerMenu").addEventListener("click", () => displayProjectsMenu())
document.querySelector("#newProjectBtn").addEventListener("click", () => addNewProject())
