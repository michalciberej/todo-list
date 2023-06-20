import "./style.css"
import "./date.js"
import "./tasks.js"
import "./projects"
import { displayProjectsMenu, addNewProjectInput } from "./menu.js"




document.querySelector("#burgerMenu").addEventListener("click", () => displayProjectsMenu())
document.querySelector("#newProjectBtn").addEventListener("click", () => addNewProjectInput())