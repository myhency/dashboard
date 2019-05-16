import { handleActions } from 'redux-actions';

// 액션 타입 정의
const SET_PAGE = 'tempPageName/SET_PAGE';

// **** 액션 생섬함수 정의
export const setPage = (pageName) => dispatch => { 
    dispatch({
        type: SET_PAGE,
        payload: pageName 
    })
    return Promise.resolve();
};

// **** 초기상태 정의
const initialState = {
    pageName: undefined
};

// **** 리듀서 작성
export default handleActions({
    [SET_PAGE]: (state, action) => ({
        ...state,
        pageName: action.payload
    })
}, initialState);