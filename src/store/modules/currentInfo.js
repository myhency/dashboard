import { handleActions } from 'redux-actions';

// 액션 타입 정의
const SET_INFO = 'currentInfo/SET_INFO';

// **** 액션 생섬함수 정의
export const setInfo = (info) => dispatch => { 
    dispatch({
        type: SET_INFO,
        payload: info 
    })
    return Promise.resolve();
};

// **** 초기상태 정의
const initialState = {
    info: undefined
};

// **** 리듀서 작성
export default handleActions({
    [SET_INFO]: (state, action) => ({
        ...state,
        info: action.payload
    })
}, initialState);