let users = JSON.parse(localStorage.getItem("users"))

export function verifyUserOnline() {

    let userOnline
    if (users) {
    for (let obj of users) {
            if (obj.online) {
                userOnline = obj.id
        }
        } 
    }
    return userOnline ?? undefined
}