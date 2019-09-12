import React from 'react';
import ReactDOM from 'react-dom';
import '@/modules/utils/general_bash'

import Router from './Navigation'

// import { Router, Route, Link} from 'react-router';

const App = function() {
	return (
		<div>
			<h1>React Lab</h1>
			<Router/>
			{/* <TimerView title="React Lab"/>
		    <Game />
			<TodoApp />
			<LifecycleContainer />			 */}
		</div>
	);
};


ReactDOM.render(<App />, document.getElementById('react_app'));

export default App;
