import { useAuth0 } from "@auth0/auth0-react";

const SignUpButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const options = {
        authorizationParams: {
            screen_hint: "signup"
        }
    }
    return (
        <>{
            !isAuthenticated && (<button onClick={() => loginWithRedirect(options)}>Sign Up</button>)
        }</>
    )
}

export default SignUpButton