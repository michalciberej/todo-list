export class Project {
    constructor(name, tasks=[], isShown=true) {
        this.name = name,
        this.tasks = tasks,
        this.isShown = isShown
    }
}

export class Task {
    constructor(name, date) {
        this.name = name,
        this.date = date
    }
}