import axios from "axios";

export const serverName = "http://updivision.local/";

export const attemptGet = (address, callback) => {
    axios.get(serverName + "api/" + address)
        .then(response => callback(response))
        .catch(error => callback(error.response));
}

export const attemptPost = (address, data, callback) => {
    axios.post(serverName + "api/" + address, data,
        { headers: { 'Content-Type': "application/json; charset=utf-8" } }
    ).then(response => callback(response))
        .catch(error => callback(error.response));
}

export const attemptDelete = (address, callback) => {
    axios.delete(serverName + "api/" + address,
        { headers: { 'Content-Type': "application/json; charset=utf-8" } }
    ).then(response => callback(response))
        .catch(error => callback(error.response));
}