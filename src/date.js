import { parseISO, isToday } from "date-fns";

export function updateReminders() {
    let todayCount = 0;
    let totalCount = 0;
    for (let i = 0; i < localStorage.length; i++)    {
        const projects = JSON.parse(localStorage.getItem(localStorage.key(i)))
        
        for (let j = 0; j < projects.tasks.length; j++) {
            const projectDate = parseISO(projects.tasks[j].date)
            totalCount++
            if (isToday(projectDate)) {
                todayCount++
            }   
        }
    }
    document.querySelector("#todayReminder").textContent = todayCount
    document.querySelector("#upcomingCount").textContent = totalCount - todayCount

}
