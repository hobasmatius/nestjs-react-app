import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    const options = {
        logoutParams: {
            returnTo: window.location.origin
        }
    }
    return (
        <>{
            isAuthenticated && (<button onClick={() => logout(options)}>Log Out</button>)
        }</>
    )
}

export default LogoutButton