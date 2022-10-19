import { useEffect, useState } from 'react';
import ScreenViewer from './ScreenViewer';
import './App.css';

function App() {
  const [serverUrl, setServerUrl] = useState('');
  const [showScreen, setShowScreen] = useState(false);

  useEffect(()=>{
    let oldUrl = localStorage.getItem('serverUrl');
    if (oldUrl) {
      setServerUrl(oldUrl);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem('serverUrl', serverUrl);
  }, [serverUrl]);

  return (
    <div>
      {!showScreen && <div>
        <h1>Screen Viewer</h1>
        <hr/>
        <p>
          Enter the server url below to view the screen of the server.        
        </p>
        <form onSubmit={event => {
          event.preventDefault();
          setShowScreen(true);
        }}>
          <input type="text" value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
          <button>Submit</button>
        </form>
      </div>}
      {showScreen && <ScreenViewer serverUrl={serverUrl} />}
    </div>
  )
}

export default App;
