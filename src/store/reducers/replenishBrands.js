import { 
    GET_BRANDS,
    LOADING_BY_SCROLL_BRANDS,
    SET_CURRENT_BRANDS,
} from '../constants/replenishBrands';

const initialState = {
      brands: [],
      currentBrand: '',
      brandsName: [],
};

const replenishBrands = (state = initialState, action) => {
    switch (action.type) {
        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload,
                currentBrand: {
                    value: action.payload[0].supplier.name,
                    label: action.payload[0].supplier.small_logo_path,
                },
                brandsName: action.payload.map((item) => {
                    return {
                        value: item.supplier.name,
                        label: item.supplier.small_logo_path,
                    };
                }),
            };
        case LOADING_BY_SCROLL_BRANDS:
            return {
                ...state,
                brands: [...state.brands, ...action.payload],
            };
        case SET_CURRENT_BRANDS:
            return {
                ...state,
                currentBrand: {
                    value: action.payload.name,
                    label: action.payload.img,
                },
            };
        }

    return state;
};

export default replenishBrands;