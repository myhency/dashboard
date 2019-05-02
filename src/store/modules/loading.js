import { handleActions } from 'redux-actions';

// 액션 타입 정의
const LOADING_START = 'loading/LOADING_START';
const LOADING_STOP = 'loading/LOADING_STOP';

// **** 액션 생섬함수 정의
export const loadingStart = () => dispatch => { 
    dispatch({
        type: LOADING_START 
    })
    return Promise.resolve();
};

export const loadingStop = () => dispatch => { 
    dispatch({
        type: LOADING_STOP 
    })
    return Promise.resolve();
};

// **** 초기상태 정의
const initialState = {
    isLoading: false
};

// **** 리듀서 작성
export default handleActions ({
    [LOADING_START]: (state, action) => {
        return {
            ...state,
            isLoading: true
        }
    },
    [LOADING_STOP]: (state, action) => {
        return {
            ...state,
            isLoading:false
        }
    }
}, initialState);