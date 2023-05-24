import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const options = {
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    }

    return (
        <>{
            !isAuthenticated && (<button onClick={() => loginWithRedirect(options)}>Log In</button>)
        }</>
    )
}

export default LoginButton