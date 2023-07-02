import { saveLocalStorage } from "./saveLocalStorage"

let users = JSON.parse(localStorage.getItem("users"))

export function setUserOnline() {
    for (let user of users) {
        if (user.lembrarDeMim) {
            user.online = true
        }
    }
    saveLocalStorage(users)
}