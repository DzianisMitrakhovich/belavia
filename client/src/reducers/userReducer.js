import {LOGIN_USER} from '../actions/user-actions';

export default function userReducer(state=[], {type, payload}) {
    if (type === LOGIN_USER) {
        return payload.user;
    }
    return state;
}