import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Users from "./Users";
import Calculator from "./Calculator";

//ReactDOM.render(<App />, document.getElementById('alt'));

ReactDOM.render(<Users />,document.getElementById('table'));
ReactDOM.render(<Calculator />,document.getElementById('calculator'));
registerServiceWorker();