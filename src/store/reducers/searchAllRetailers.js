import { 
    SEARCH_ALL_RETAILERS, 
} from '../constants/searchAllRetailers';

const initialState = {
    search: '',
};

const searchAllRetailers = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ALL_RETAILERS: 
            return {
                ...state,
                search: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default searchAllRetailers;