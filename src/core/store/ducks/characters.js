import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
	getDataApi: ['params'],
	successDataApi: [],
	errorDataApi: [],

	// setListDetail: ['params'],
	// getDetail: ['params'],
	// successDetail: [],
	// errorDetail: [],

	// getData:['params'],
	// successData: [],
	// errorData: []
});

const initialState = {
	data: [],
	loading: false,
	error: false
};

/*GET PEOPLE*/
const getDataApi = (state = initialState, action) => {
	return {
		...state,
		loading: true,
		error: false
	}
};

const successDataApi = (state = initialState, action) => ({
	...state,
	data: action.response,
	loading: false,
	error: false
});

const errorDataApi = (state = initialState, action) => ({
	...state,
	data: [],
	loading: false,
	error: action.err
});

// const setListDetail = (state = initialState, action) => {
// 	return {
// 		...state,
// 		[action.params.type]: action.params.data
// 	}
// };

// const getDetail = (state = initialState, action) => {
// 	return {
// 		...state,
// 		loading: true,
// 		error: false
// 	}
// };

// const successDetail = (state = initialState, action) => ({
// 	...state,
// 	dataDetail: action.response,
// 	loading: false,
// 	error: false
// });

// const errorDetail = (state = initialState, action) => ({
// 	...state,
// 	dataDetail: [],
// 	loading: false,
// 	error: action.err
// });

// const getData = (state = initialState, action) => {
// 	return {
// 		...state
// 	}
// };

// const successData = (state = initialState, action) => ({
// 	...state,
// 	[action.response.type]: action.response.data,
// 	loading: false,
// 	error: false
// });

// const errorData = (state = initialState, action) => ({
// 	...state,
// 	dataDetail: [],
// 	loading: false,
// 	error: action.err
// });


export default createReducer(initialState, {
	[Types.GET_DATA_API]: getDataApi,
	[Types.SUCCESS_DATA_API]: successDataApi,
	[Types.ERROR_DATA_API]: errorDataApi,

	// [Types.SET_LIST_DETAIL]: setListDetail,
	// [Types.GET_DETAIL]: getDetail,
	// [Types.SUCCESS_DETAIL]: successDetail,
	// [Types.ERROR_DETAIL]: errorDetail,

	// [Types.GET_DATA]: getData,
	// [Types.SUCCESS_DATA]: successData,
	// [Types.ERROR_DATA]: errorData,
});