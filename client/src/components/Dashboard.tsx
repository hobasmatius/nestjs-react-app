import { useAuth0 } from '@auth0/auth0-react';
import Retool from 'react-retool';

const Dashboard = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <>{
            isAuthenticated && (
                <Retool
                    url="https://hobasmatius.retool.com/embedded/public/df411845-c300-4421-b5ae-c43a61ab8b20"
                />
            )
        }</>
    )
}

export default Dashboard