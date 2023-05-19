import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const SendVerificationEmailButton = () => {
    const { user, isAuthenticated } = useAuth0();
    const isEmailVerified = user?.email_verified!
    const auth0UserId = user?.sub!
    const params = {
        "ext-user-id": auth0UserId
    }

    const handleSendVerificationEmail = (auth0UserId: string) => {
        axios.post(`${process.env.PUBLIC_URL} /api/v1/users/send-verification-email`, null, { params }).then((data) => {
            alert('Email sent');
        }).catch((err) => {
            alert('Failed to send verification email due to ' + err);
        });
    }

    return (
        <>{
            isEmailVerified == false && isAuthenticated && (<button onClick={() => handleSendVerificationEmail(auth0UserId)}>Resend Verification Email</button>)
        }</>
    )
}

export default SendVerificationEmailButton