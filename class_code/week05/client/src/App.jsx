import { useState } from "react";


const App = () => {

  // Add our use states here
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // promises -> pending -> sucecess or failure
  const handleButton = async() => {
      try {
        const response = await fetch(`http://localhost:8000/data`);
        const data = await response.json();
        console.log(data);

      } catch (error) {
        console.log(error);

      }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginForm = new FormData();
    loginForm.append('username', username);
    loginForm.append('password', password);

      try {
        const response = await fetch(`http://localhost:8000/data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: loginForm,
        });
        const data = await response.json();
        console.log(data);

      } catch (error) {
        console.log(error);

      }
  }

  return (
    <div>
      <button onClick={handleButton}>Fetch Data</button>
      <p>--------------------------------------------</p>
      <form>
        <input
          type= "text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />
      </form>
    </div>
  )
}

export default App;