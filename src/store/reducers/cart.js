import { 
    GET_STORES, 
} from '../constants/cartTypes';

const initialState = {
      data: [],
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case GET_STORES: 
            return {
                ...state,
                data: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default cart;