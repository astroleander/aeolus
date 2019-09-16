import React from 'react';
import ReactDOM from 'react-dom';

import AppReact from './AppReact';
import "@babel/polyfill";

const App = function() {
	return (
		<AppReact />
	);
};


ReactDOM.render(<App />, document.getElementById('react_app'));

export default App;
