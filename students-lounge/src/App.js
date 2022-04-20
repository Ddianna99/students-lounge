import './App.css';
import SignupForm from './Components/SignupForm';
//import LoginForm from './Components/LoginForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignupForm
          formAction="/"
        />
      </header>
    </div>
  );
}

export default App;
