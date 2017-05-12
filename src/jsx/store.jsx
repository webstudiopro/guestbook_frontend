/**
 * Created by webstudiopro on 3/8/17.
 */
import {createStore} from 'redux';
import adminReducer from './reducers.jsx';

const configStore = ()=>{
    return createStore(adminReducer, {
        comments: [],
        added: ''
    });
};

export default configStore;