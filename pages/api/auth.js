import { userService } from '../../services';



export function getCurrentUser(){
    
    return userService.userValue;
}
export function get(){
    return userService.userValue;
}
export function getRole(){
    return userService.userValue
}