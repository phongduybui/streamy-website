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
            const profile = this.auth.currentUser.get().getBasicProfile();
            console.log(profile.getImageUrl());
            this.props.signIn({
                userId: profile.getId(),
                userName: profile.getName(),
                userImgUrl: profile.getImageUrl()
            });
        } else {
            this.props.signOut();
        }
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
              <div>
                    <img alt="avatar" className="ui avatar image" src={this.props.profile.userImgUrl} />  
                    <span>{this.props.profile.userName}</span>
                    <button 
                        className="ui red google button"
                        onClick={() => this.auth.signOut()}
                    >
                        <i className="google icon" />
                        Sign Out
                    </button>
              </div>
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
    return { 
        isSignedIn: state.auth.isSignedIn,
        profile: state.auth.profile
    };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);