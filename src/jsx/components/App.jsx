import React from 'react';
import configStore from '../store.jsx';
import * as actions from '../actions.jsx';
import Comment from './Comment.jsx';
import config from '../config.jsx';
import {
    FBComments,
    FBCommentsCount,
    FBEmbedPost,
    FBEmbedVideo,
    FBFollow,
    FBLike,
    FBPage,
    FBSend,
    FBShare
} from 'facebook-plugins';

class App extends React.Component {
    constructor(props){
        super(props);
        this.store = configStore();
        this.state = this.store.getState();
    }
    componentDidMount(){
        $('.card-form').hide();
        this.unsubscribe = this.store.subscribe(()=>{
            this.setState(this.store.getState());
        });
        actions.recieveComments(this.store.dispatch);
    }
    componentWillUnMount(){
        this.unsubscribe();
    }
    toggleForm(){
        $('.card-form').toggle('slow');
        Webcam.attach('#my_camera');
    }
    submitForm(event){
        if($('#myForm')[0].checkValidity()==false) return;
        event.preventDefault();
        let data = {
            name: $('#name').val(),
            email: $('#email').val(),
            comment: $('#comment').val(),
            facebook: $('#facebook').val()
        };
        actions.addComment(this.store.dispatch, data);
        actions.recieveComments(this.store.dispatch);
        $('#name').val('');
        $('#email').val('');
        $('#comment').val('');
        $('#facebook').val('');
        $('.card-form').hide();
        return false;
    }
    showMessage(){
        if(this.state.added.type){
            console.log(this.state.added);
            if(this.state.added.type == 'success'){
                return <div className="alert alert-success">{this.state.added.message}</div>;
            } else {
                return <div className="alert alert-danger">{this.state.added.message}</div>;
            }
        }
    }
    selfie(){
        Webcam.snap( function(data_uri) {
            document.getElementById('my_result').innerHTML = '<img width="120" height="120" class="img-thumbnail rounded-circle" src="'+data_uri+'"/>';
        } );
    }
    render(){
        return (
            <main id="guestbook" className="container-fluid">
                <div className="row">
                    <h1 className="page-header">Gastenboek</h1>
                </div>
                <div className="row">
                    {this.showMessage()}
                </div>
                <div className="row card-guestbook">
                    <div className="col-md-2">
                        <button onClick={this.toggleForm.bind(this)} className="btn btn-success btn-lg button-add"><i className="fa fa-plus-circle fa-3x"></i></button>
                    </div>
                    <div className="col-md-10">
                        <div className="card card-form">
                            <form className="card-body" id="myForm">
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="name">Naam:</label>
                                    <input id="name" type="text" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="email">Email:</label>
                                    <input id="email" type="email" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="comment">Bericht:</label>
                                    <textarea id="comment" type="text" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="comment">Bericht plaatsen op facebook</label>
                                    <FBShare appId={config.FACEBOOK.appId}
                                             href="http://facebook.com"
                                             layout="box_count"
                                             locale="nl_NL"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="facebook">Facebook url:</label>
                                    <input id="facebook" type="text" className="form-control" placeholder="bvb.: https://www.facebook.com/benny.fret" />
                                </div>
                                <div className="form-group">
                                    <button onClick={this.selfie.bind(this)} className="btn btn-secondary btn-block btn-lg"><i className="fa fa-camera"></i> Neem een selfie</button>
                                    <div className="row" id="my_camera_output">
                                        <div className="col-md-6" id="my_camera" style={{width:'320px', height:'240px'}}></div>
                                        <div className="col-md-6" id="my_result"></div>
                                    </div>
                                </div>
                                <input onClick={this.submitForm.bind(this)}  type="submit" className="btn btn-primary btn-block btn-lg" value="Gastenboek tekenen" />
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.comments.map((comment)=>{
                    return <Comment key={comment.id} comment={comment} />
                })}
            </main>
        );
    }
}

export default App;
