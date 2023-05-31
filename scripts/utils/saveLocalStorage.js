export function saveLocalStorage(users) {
    if (typeof users != "string") {
        localStorage.setItem('users', JSON.stringify(users))
    } else {
        localStorage.setItem('users', users)
    }
    
}