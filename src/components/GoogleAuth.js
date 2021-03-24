import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                client_id: '430053566606-ff7pjlosj71vtgdorqjdl91t40tcvaiv.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    //Callback onAuthChange khi truyen vao trong ham listen thi duoc nhan vao mot doi so
    //la boolean ghi lai trang thai dang nhap
    //nen ko can dung this.auth.isSignedIn.get() ben trong callback nay
    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
                <button 
                    className="ui red google button"
                    onClick={() => this.auth.signOut()}
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        return (
            <button 
                className="ui red google button"
                onClick={() => this.auth.signIn()}
            >
                <i className="google icon" />
                Sign In with Google
            </button>
        );
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);