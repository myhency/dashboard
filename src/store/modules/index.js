import { combineReducers } from 'redux';
import auth from 'store/modules/auth';
import loading from 'store/modules/loading';
import currentInfo from 'store/modules/currentInfo';

export default combineReducers({
    auth,
    loading,
    currentInfo
    // 다른 리듀서를 만들게되면 여기에 넣어줌..
});