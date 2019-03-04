import { 
    ACCEPTED_INVITATION_RETAILERS, 
    ACCEPTED_INVITATION_RETAILERS_OFFSET, 
    ACCEPTED_INVITATION_RETAILERS_ORDER,
    ACCEPTED_INVITATION_RETAILERS_COUNT,
    ACCEPTED_INVITATION_RETAILERS_LOADING, 
} from '../constants/acceptedInvitationRetailers';

const initialState = {
      data: [],
      offset: 0,
      order: 'asc',
      count: 0,
      perPage: 20,
      isLoading: false,
};

const acceptedInvitationRetailers = (state = initialState, action) => {
    switch (action.type) {
        case ACCEPTED_INVITATION_RETAILERS: 
            return {
                ...state,
                data: action.payload,
            };
        case ACCEPTED_INVITATION_RETAILERS_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case ACCEPTED_INVITATION_RETAILERS_ORDER: 
            return {
                ...state,
                order: action.payload,
            };
        case ACCEPTED_INVITATION_RETAILERS_COUNT:
            return {
                ...state,
                count: +action.payload,
            };
        case ACCEPTED_INVITATION_RETAILERS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            break;
    }

    return state;
};

export default acceptedInvitationRetailers;