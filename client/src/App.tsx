import './App.css';
import SignUpButton from './components/SignUpButton';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SendVerificationEmailButton from './components/SendVerificationEmailButton';

function App() {
  return (
    <div className="App">
      <SignUpButton />
      <LoginButton />
      <LogoutButton />
      <SendVerificationEmailButton />
    </div>
  );
}

export default App;
