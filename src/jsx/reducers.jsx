/**
 * Created by webstudiopro on 3/8/17.
 */
const homeReducer = (state, action)=>{
    switch (action.type){
        case 'COMMENTS_ACTION':
            return {
                ...state,
                comments: action.comments
            };
        case 'SAVE_COMMENT_ACTION':
            return {
                ...state,
                added: action.added
            };
        default:
            return state;
    }
};

export default homeReducer;