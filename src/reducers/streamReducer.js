import _ from 'lodash';
import {
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    CREATE_STREAM
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        case FETCH_STREAMS:
            // const converterArr = action.payload.map(item => ({ [item.id]: item }));
            // return { ...converterArr };
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
};