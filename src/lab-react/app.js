import React from 'react';
import ReactDOM from 'react-dom';

import TimerView from './js/views/TimerView.jsx.js'


const App = () => {
	return (
		<div>
			{/* <h1>React Lab</h1> */}
			<TimerView title="React Lab"/>
		</div>
	);
};

// function tick() {
// 	const element = (
// 		<div>
// 			<h1>Hello React!</h1>
// 			<h2>It is {new Date().toLocaleTimeString()}.</h2>
// 		</div>
// 	);
// 	ReactDOM.render(
// 		element,
// 		document.getElementById('react_app')
// 	)
// }

// setInterval(tick, 1000);
ReactDOM.render(<App />, document.getElementById('react_app'));

export default App;
