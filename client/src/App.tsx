import './App.css';
import SignUpButton from './components/SignUpButton';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SendVerificationEmailButton from './components/SendVerificationEmailButton';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading, error } = useAuth0();
  
  return (
    <div className="App">
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <SignUpButton />
          <LoginButton />
          <LogoutButton />
          <SendVerificationEmailButton />
        </>
      )}
    </div>
  );
}

export default App;
