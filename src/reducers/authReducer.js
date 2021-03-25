import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    profile: {
        userId: null,
        userName: null,
        userImgUrl: null
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN: 
            return { 
                ...state,
                isSignedIn: true,
                profile: {
                    userId: action.payload.userId,
                    userName: action.payload.userName,
                    userImgUrl: action.payload.userImgUrl
                }
            };
        case SIGN_OUT:
            return {
                ...state, 
                isSignedIn: false, 
                profile: {
                    userId: null,
                    userName: null,
                    userImgUrl: null
                }
            }
        default:
            return state;
    }
};