import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Config from './config';
import './App.css';

function App() {

  // states
  const [screenshot, setScreenshot] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {

    // create a socket for the connection
    const socket = io(Config.ServerUrl);

    // when the socket is disconnected
    socket.on('disconnect', () => {
      setScreenshot(null);
      setErr('Disconnected from the server');
    });


    // check for connection error
    socket.on('connect_error', (err) => {
      setScreenshot(null);
      setErr(err);
    });

    // whenever the server emits 'screenshot', this updates the screenshot
    socket.on('screenshot', data => {
      let bytes = new Uint8Array(data);
      let blob = new Blob([bytes.buffer]);  
      let reader = new FileReader();
      reader.onload = e => setScreenshot(e.target.result);
      reader.readAsDataURL(blob);
    });

    // whenever the server emits 'screenshot_error', update the errrr message
    socket.on('screenshot_error', err => {
      setScreenshot(null);
      setErr(err);
    });

    // repeatedly get screenshot from the server
    let interval = setInterval(() => {
      if (socket.connected) {
        socket.emit('screenshot');
      }
    }, 100);

    // do cleanup
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.close();
      clearInterval(interval);
    };

  }, []);

  return (
    <div className="App">
      {screenshot && <img src={screenshot} alt="screenshot" />}
      {!screenshot && 
        <div className="error">
          <h1>Oops! We have encountered an error</h1>
          <hr/>
          <p>We have enoutered an error while connection to server. Here are a few things you can try out:</p>
          <ul>
            <li>
              Make sure that you have set the correct server url? <br/>
              You can change the server url by going to <span className='highlight'>src/config.js</span> and updating the variable <span className='highlight'>ServerUrl</span>
            </li>
            <li>
              Make sure that your server is running.
            </li>
            <li>
              Make sure that your server is running on the same network as this client.
            </li>
            <li>
              Make sure that you have specified the correct port number in the server url.
            </li>
          </ul>
          <div>
            Here is the error message: <br/>
            <pre>
              {err && err.toString()}
              {!err && 'No error message'}
            </pre>
          </div>
          <p>
            <strong>Still having trouble?</strong ><br/>
            Please contact the support team.
          </p>
        </div>
      }
    </div>
  );
}

export default App;
