import { handleActions } from 'redux-actions';

// 액션 타입 정의
const SIGN_IN = 'auth/SIGN_IN';
const SIGN_OUT = 'auth/SIGN_OUT';

// **** 액션 생섬함수 정의
export const signIn = (userId) => dispatch => {
    dispatch({
        type: SIGN_IN,
        payload: userId
    })
    return Promise.resolve();
};

export const signOut = () => dispatch => {
    dispatch({
        type: SIGN_OUT
    })
    return Promise.resolve();
};

// **** 초기상태 정의
const initialState = {
    userId: undefined
};

// **** 리듀서 작성
export default handleActions({
    [SIGN_IN]: (state, action) => ({
        ...state,
        userId: action.payload
    }),
    [SIGN_OUT]: (state, action) => ({
        ...state,
        userId: undefined
    })
}, initialState);