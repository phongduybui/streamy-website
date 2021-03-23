import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                client_id: '430053566606-ff7pjlosj71vtgdorqjdl91t40tcvaiv.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    }

    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return null;
        } else if(this.state.isSignedIn) {
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

export default GoogleAuth;