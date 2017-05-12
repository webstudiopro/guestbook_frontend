import config from './config.jsx';


// COMMENTS

// GET COMMENTS
 export const commentsAction = (comments) => {
    return {
        type: 'COMMENTS_ACTION',
        comments
    };
 };

 export const recieveComments = (dispatch)=> {
    $.ajax({
        url: config.DOMAIN+"/api/comments"
    }).done(function(data) {
        dispatch(commentsAction(data));
    });
 };

 // ADD COMMENT
export const saveAction = (added) => {
    return {
        type: 'SAVE_COMMENT_ACTION',
        added
    };
};

export const addComment = (dispatch, data)=> {
    $.ajax({
        url: config.DOMAIN+"/api/new",
        data: data,
        type:'POST'
    }).done(function(data) {
        console.log(data);
        dispatch(saveAction(data));
    });
};