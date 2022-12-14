import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.typeof && JSON.parse(localStorage.getAll('user')));

export const userService = {
    
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    getAll, 
    register
};

function login(username, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
        .then(user => {
            console.log(user);
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}


function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function register(data ){
    console.log(baseUrl);
    return fetchWrapper.post(`${baseUrl}/register`, {data })
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}