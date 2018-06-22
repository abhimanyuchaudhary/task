import React from 'react';
import ReactGoogleAuth from 'react-google-auth';
import LandingPage from './LandingPage';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
function Example(props) {
    console.log("gapi exists", window.gapi);
    return <div>
        <LandingPage isSignedOut = {false}/>
        <button className="Button Button-primary" onClick={props.onSignOutClick}>Sign out</button>
    </div>;
}

function Loader(props) {
    return <div className="Text Text-emphasis">Loading...</div>;
}

function SignIn(props) {
    if(props.initializing) {
        return <div className="Text Text-emphasis">Initializing...</div>;
    }
    if(props.error) {
        console.log('Error', props.error);
        return <div className="Text Text-strong">Error!</div>;
    }
    return <div>
        <LandingPage isSignedOut = {true}/>
        <button className="Button Button-primary" onClick={props.onSignInClick}>Sign in</button>
        {props.signingIn && <div>Signing in...</div>}
    </div>;
}

export default ReactGoogleAuth({
    clientId: "510513669401-q127av927vrbs59oib2t0jd7jrcrh3ll.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
    loader: Loader,
    scope: "https://www.googleapis.com/auth/tasks",
    signIn: SignIn
})(Example);