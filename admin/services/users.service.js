export const usersService= {
    getUserList,
    addUser,
}
const api={
    userList    :"/accounts/getUserList",
    addUser     :"/accounts/add",
}

function addUser(obj){
    const requestOptions={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
    }
    return fetch(api.addUser,requestOptions).then(handleResponse);
}

function getUserList(page){
    const requestOptions={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({page: page})
    }
    return fetch(api.userList,requestOptions).then(handleResponse);
}

function handleResponse(response){
    if(!response.ok){
        return Promise.reject(response.statusText);
    }
    return response.json();
}