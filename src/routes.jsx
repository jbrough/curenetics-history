import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './app'
import History from './components/History'

import 'styles/index.scss'

const store = function () {
	let db = {}

	function get(key) {
		return db[key]
	}

	function set(obj) {
		db = Object.assign({}, db, obj)
		console.log(db)
	}

	return {
		get, set,
	}
}()

const style = {
}

const Routes = (myProps) => (
  <Router>
		<div style={style}>
			<Route
				path="/"
				render={ props => <History store={store} questions={myProps.questions} {...props} /> }
			/>

		</div>
	</Router>
)

export default Routes
