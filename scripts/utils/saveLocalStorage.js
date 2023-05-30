export function saveLocalStorage(users) {

    localStorage.setItem('users', JSON.stringify(users))

}