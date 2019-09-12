import React from 'react';
import ReactDOM from 'react-dom';

import '@/modules/utils/general_bash'


import TimerView from './js/views/TimerView.jsx';
import TodoApp from './js/views/TodoApp'
import Game from './js/TicTacToe'
import LifecycleContainer from './components/lifecycle'

const App = () => {
	return (
		<div>
			{/* <h1>React Lab</h1> */}
			<TimerView title="React Lab"/>
		    <Game />
			<TodoApp />
			<LifecycleContainer />			
		</div>
	);
};


ReactDOM.render(<App />, document.getElementById('react_app'));

export default App;
