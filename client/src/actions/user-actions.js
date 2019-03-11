export const LOGIN_USER = 'user:loginUser';

export function loginUser(logedInUser) {
    return {
        type: LOGIN_USER,
        payload: {
            user: logedInUser
        }
    }
}