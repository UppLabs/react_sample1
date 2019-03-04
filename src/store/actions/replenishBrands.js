import api from '../../utils/api';
import {
    GET_BRANDS,
    LOADING_BY_SCROLL_BRANDS,
    SET_CURRENT_BRANDS,
} from '../constants/replenishBrands';

const setReplenishBrands = brands => ({ type: GET_BRANDS, payload: brands });
const getLoadingBrands = loading => ({ type: LOADING_BY_SCROLL_BRANDS, payload: loading }); 

export const getReplenishBrands = () => (dispatch, getState) => {
  const state = getState();
  const { retailerId } = state.role;

  api.get(`/retailers/${retailerId}/suppliers`).then((response) => {
    dispatch(setReplenishBrands(response.data));
  });
	// var brands = [
 //    {
 //      img: '123.jpg',
 //      name: 'adidas',
 //    },{
 //      img: '123.jpg',
 //      name: 'puma',
 //    },{
 //      img: '123.jpg',
 //      name: 'nike',
 //    },{
 //      img: '123.jpg',
 //      name: 'mmm',
 //    },{
 //      img: '123.jpg',
 //      name: 'adidas',
 //    },
 //  ];
 //    dispatch(setReplenishBrands(brands));
};

export const setFilterProductsBrans = (name, img) => (dispatch, getState) => {
  const state = getState();
  const { currentBrand, brandsName } = state.replenishBrands;
  brandsName.forEach((item, i) => {
    if (item === name) {
      dispatch({ type: SET_CURRENT_BRANDS, payload: { value: name, label: img } });
    }
  });

};

export const loadingBrands = () => (dispatch, getState) => {
	var loading = [
    {
      img: '123.jpg',
      name: 'adidas',
    },{
      img: '123.jpg',
      name: 'puma',
    },{
      img: '123.jpg',
      name: 'nike',
    },
  ];
  setTimeout(function () {
    dispatch(getLoadingBrands(loading));
  }, 1500);

};