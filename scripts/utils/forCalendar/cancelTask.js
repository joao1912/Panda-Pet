

export function cancelTask(obj) {
    const tasks = document.getElementById("dayTasks").children
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos"))
    
    for (let task of tasks) {
        let idTask = task.firstElementChild.textContent
        if (obj.id == idTask) {
            task.remove()
            let novosAgendamentos = agendamentos.filter( item => item.id != obj.id)
            localStorage.setItem("agendamentos", JSON.stringify(novosAgendamentos))
        }
    }

}