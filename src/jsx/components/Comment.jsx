/**
 * Created by webstudiopro on 3/4/17.
 */
import React from 'react';


class Comment extends React.Component {
    render(){
        return(
            <div className="row card-guestbook">
                <div className="col-md-2">
                    <img width="120" height="120" className="img-thumbnail rounded-circle" src="http://placehold.it/120x120" alt="image"/>
                    {this.props.comment.created}
                </div>
                <div className="col-md-8">
                    <div className="card card-comment">
                        <div className="card-block">
                            <p className="blockquote-reverse">
                                {this.props.comment.comment}
                            </p>
                        </div>
                        <div className="card-footer">
                            {this.props.comment.name}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;